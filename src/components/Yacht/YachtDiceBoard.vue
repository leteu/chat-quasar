<template>
  <div class="column q-gutter-y-md">
    <q-card bordered>
      <q-card-section class="flex items-center justify-between q-gutter-x-xl">
        <YachtDice :diceValue="dice.first.value"  :fixed="dice.first.fixed"  :roll="dice.first.roll"  @click="fixedDice(dice.first)" />
        <YachtDice :diceValue="dice.second.value" :fixed="dice.second.fixed" :roll="dice.second.roll" @click="fixedDice(dice.second)" />
        <YachtDice :diceValue="dice.third.value"  :fixed="dice.third.fixed"  :roll="dice.third.roll"  @click="fixedDice(dice.third)" />
        <YachtDice :diceValue="dice.fourth.value" :fixed="dice.fourth.fixed" :roll="dice.fourth.roll" @click="fixedDice(dice.fourth)" />
        <YachtDice :diceValue="dice.fifth.value"  :fixed="dice.fifth.fixed"  :roll="dice.fifth.roll"  @click="fixedDice(dice.fifth)" />
      </q-card-section>
    </q-card>
    <div class="text-center">
      <q-btn label="굴리기" color="primary" @click="rollDice()" :disable="times === 3" />
      <span class="q-ml-md fs-125 text-weight-bold text-vertical-bottom">
        {{ times }} / 3
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import YachtDice from './YachtDice'
import delay from 'src/assets/common/funcitons/DelayTime'

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
  methods: {
    async rollDice() {
      this.$data.times += 1;

      this.$data.dice.first.roll = true;
      this.$data.dice.second.roll = true;
      this.$data.dice.third.roll = true;
      this.$data.dice.fourth.roll = true;
      this.$data.dice.fifth.roll = true;

      await delay(1);

      this.$data.dice.first.roll = false;
      this.$data.dice.second.roll = false;
      this.$data.dice.third.roll = false;
      this.$data.dice.fourth.roll = false;
      this.$data.dice.fifth.roll = false;
    },

    fixedDice(dice: { value: number; fixed: boolean; roll: boolean; }) {
      dice.fixed = !dice.fixed;
    }
  }
})
</script>

<style lang="sass">
@import './style/dice'
</style>
