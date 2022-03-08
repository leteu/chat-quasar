<template>
  <div class="column">
    <q-card bordered>
      <q-card-section class="flex items-center justify-between q-gutter-x-xl">
        <template v-for="(item, index) in ['first', 'second', 'third', 'fourth', 'fifth']" :key="`roll-dice-${index}`">
          <YachtDice
            :diceValue="dice[item].value"
            :fixed="dice[item].fixed"
            :roll="dice[item].roll"
            @click="fixedDice(dice[item])"
          />
        </template>
      </q-card-section>
    </q-card>
    <div class="text-center q-mt-sm q-gutter-x-lg">
      <q-btn label="게임 시작" color="primary" @click="startGame()" :disable="gameState" />
      <q-btn label="굴리기" color="primary" @click="rollDice()" :disable="times === 3 || !gameState" />
      <span class="fs-125 text-weight-bold text-vertical-bottom">
        {{ times }} / 3
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import YachtDice from './YachtDice'
import delay from 'src/assets/common/funcitons/DelayTime'
import axios from 'axios';
import { YachtListSub } from 'src/store/StompModule/actions';

export default defineComponent({
  components: {
    YachtDice
  },
  data() {
    return {
      dice: {
        first: {
          value: 1,
          fixed: false,
          roll: false
        },
        second: {
          value: 1,
          fixed: false,
          roll: false
        },
        third: {
          value: 1,
          fixed: false,
          roll: false
        },
        fourth: {
          value: 1,
          fixed: false,
          roll: false
        },
        fifth: {
          value: 1,
          fixed: false,
          roll: false
        }
      },

      times: 0
    };
  },
  computed: {
    gameState: function () {
      return this.$store.getters['StompModule/isYachtStarted'];
    }
  },
  created() {
    if(!YachtListSub) {
      const subRoomList = setInterval(() => {
        if(this.$store.getters['StompModule/getConnectStatus']) {
          clearInterval(subRoomList);
          this.$store.dispatch('StompModule/SubscribeYachtList');
          this.gameState;
        }
      }, 1000);
    }
  },
  methods: {
    async rollDice() {
      this.$data.times += 1;

      this.rollDiceEach(this.$data.dice.first);
      this.rollDiceEach(this.$data.dice.second);
      this.rollDiceEach(this.$data.dice.third);
      this.rollDiceEach(this.$data.dice.fourth);
      this.rollDiceEach(this.$data.dice.fifth);

      await delay(1);

      this.$emit('update:diceValue', {
        first: this.$data.dice.first.value,
        second: this.$data.dice.second.value,
        third: this.$data.dice.third.value,
        fourth: this.$data.dice.fourth.value,
        fifth: this.$data.dice.fifth.value
      });
    },

    async rollDiceEach(who: { value: number; fixed: boolean; roll: boolean; }) {
      if(!who.fixed){
        who.roll = true;
        await delay(1);
        who.value = this.getRandomFace();
        who.roll = false;
      }
    },

    fixedDice(dice: { value: number; fixed: boolean; roll: boolean; }) {
      dice.fixed = !dice.fixed;
    },

    getRandomFace() {
      const random = window.crypto?.getRandomValues(new Uint32Array(1))[0]/4294967296;
      return Math.floor(random * 6 + 1);
    },

    startGame() {
      axios.put(`/room/${this.$route.params.roomId}/start`)
        .then(({data, status}) => {
          if(status === 200) {
            this.$store.dispatch('StompModule/setterYachtState', true)
          }
        })
    }
  }
})
</script>

<style lang="sass">
@import './style/dice'
</style>
