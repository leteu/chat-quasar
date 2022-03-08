<template>
  <q-card class="width-inherit q-mb-sm text-center" flat square>
    <q-card-section horizontal class="q-pa-none row full-height width-inherit">
      <q-card-section class="col-2 sticky left-0px q-pa-none">
        <q-card flat bordered class="bg-blue-2 full-height text-weight-bold column" square>
          <q-card-section class="q-pa-none q-py-sm col">점수판</q-card-section>
          <template v-for="(item, index) in rules" :key="`rule-${index}`">
            <q-separator />
            <q-card-section class="q-pa-none q-py-sm col">
              {{item.label}}
              <q-icon name="info" class="cursor-pointer info" v-if="item.desc">
                <q-tooltip>
                  {{item.desc}}
                </q-tooltip>
              </q-icon>
            </q-card-section>
          </template>
        </q-card>
      </q-card-section>
      <template v-if="!!users.length">
        <template v-for="(user, index) in users" :key="`user-${user.userName}-${index}`">
          <q-card-section class="col q-pa-none scroll-x row no-wrap">
            <q-card flat bordered class="full-height col min-width-200px" square>
              <q-card-section class="q-pa-none q-py-sm q-py-sm">
                {{ user.userName }}
              </q-card-section>
              <template v-if="user.scoreBoard.length">
                <template v-for="(item, idx) in user.scoreBoard" :key="`user-${item.id}-${idx}`">
                  <q-separator />
                  <q-card-section
                    class="q-pa-none q-py-sm col min-height-37px"
                    :class="`${item.score ? 'bg-green-5' : ''} ${!['합계', '보너스'].includes(item.label) && !!currentDice && user.myTurn ? 'cursor-pointer' : ''}`"
                    @click="() => !['합계', '보너스'].includes(item.label) && !!currentDice && user.myTurn
                                    ? getScore(user, item.label)
                                    : {}"
                  >
                    <template v-if="decodeToken().id === user.id">
                      <span
                        :class="!item.score && !!hint[item.value] ? 'text-grey-5' : ''"
                        class="text-weight-bold"
                      >
                        {{item.score !== null ? item.score : hint[item.value]||''}}
                      </span>
                    </template>
                    <template v-else>
                      {{item.score !== null ? item.score : ''}}
                    </template>
                  </q-card-section>
                </template>
              </template>
              <template v-else>
                <q-separator />
                <div class="full-height full-width flex items-center justify-center">
                  대기중
                </div>
              </template>
            </q-card>
          </q-card-section>
        </template>
      </template>
      <template v-else>
        <q-card-section class="col q-pa-none column">
          <q-separator />
          <div class="col flex items-center justify-center">
            게임이 시작되지 않았습니다.
          </div>
          <q-separator />
        </q-card-section>
        <q-separator vertical />
      </template>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import axios from 'axios';
import { Nullable } from 'src/assets/common/type/Nullable';
import { UserInfo } from 'src/store/StompModule/state';
import { defineComponent } from 'vue'
import { DiceObj } from '.';

const rules = [
  {
    label: 'Ones',
    desc: '1 눈금의 합계'
  },
  {
    label: 'Twos',
    desc: '2 눈금의 합계'
  },
  {
    label: 'Threes',
    desc: '3 눈금의 합계'
  },
  {
    label: 'Fours',
    desc: '4 눈금의 합계'
  },
  {
    label: 'Fives',
    desc: '5 눈금의 합계'
  },
  {
    label: 'Sixes',
    desc: '6 눈금의 합계'
  },
  {
    label: '보너스',
    desc: '위 합계들의 합이 63을 넘으면 보너스 35점'
  },
  {
    label: '초이스',
    desc: '모든 눈금의 합'
  },
  {
    label: '풀하우스',
    desc: '같은 눈금의 주사위 3개와 나머지 같은 눈금의 주사위 2개의 모든 눈금의 합'
  },
  {
    label: 'Four of a kind',
    desc: '같은 숫자가 4개일때 모든 눈금의 합'
  },
  {
    label: '라지 스트레이트',
    desc: '주사위의 눈금이 5개가 연결될때 40점'
  },
  {
    label: '스몰 스트레이트',
    desc: '주사위의 눈금이 4개가 연결될때 30점'
  },
  {
    label: 'Yacht',
    desc: '모두 같은 눈금일때 50점'
  },
  {
    label: '합계'
  },
];

const newScoreBoard = [
  { label: 'ones',      value: 'ones',          score: null as Nullable<number> },
  { label: 'twos',      value: 'twos',          score: null as Nullable<number> },
  { label: 'threes',    value: 'threes',        score: null as Nullable<number> },
  { label: 'fours',     value: 'fours',         score: null as Nullable<number> },
  { label: 'fives',     value: 'fives',         score: null as Nullable<number> },
  { label: 'sixes',     value: 'sixes',         score: null as Nullable<number> },
  { label: 'bonus',     value: 'bonus',         score: null as Nullable<number> },
  { label: 'choice',    value: 'chance',        score: null as Nullable<number> },
  { label: 'fullHouse', value: 'fullHouse',     score: null as Nullable<number> },
  { label: 'fourOf',    value: 'fourOfKind',    score: null as Nullable<number> },
  { label: 'lgSt',      value: 'largeStraight', score: null as Nullable<number> },
  { label: 'smSt',      value: 'smallStraight', score: null as Nullable<number> },
  { label: 'yacht',     value: 'yahtzee',       score: null as Nullable<number> },
  { label: '합계',      value: 'totalScore',    score: null as Nullable<number> },
];

type ScoreType = 'ones'
| 'twos'
| 'threes'
| 'fours'
| 'fives'
| 'sixes'
| 'bonus'
| 'chance'
| 'fullHouse'
| 'fourOfKind'
| 'largeStraight'
| 'smallStraight'
| 'yahtzee'
| 'totalScore'

export default defineComponent({
  props: [ 'currentDice' ],
  data() {
    return {
      rules,
      hint: {
        ones: 0,
        twos: 0,
        threes: 0,
        fours: 0,
        fives: 0,
        sixes: 0,
        chance: 0,
        fullHouse: 0,
        fourOfKind: 0,
        largeStraight: 0,
        smallStraight: 0,
        yahtzee: 0,
      }
    }
  },
  computed: {
    users: function() {
      return (this.$store.getters['StompModule/getYachtScoreBoard']?.userInfos||[]).map((item: {[k: string]: any}) => {
        return {
          id: item.userId,
          userName: item.userName,
          simpSessionId: item.simpSessionId,
          myTurn: this.$store.getters['StompModule/getYachtScoreBoard'].turnUserId === this.decodeToken().id,
          scoreBoard: newScoreBoard.map(board => {
            board.score = item[board.value]||0;
            return board;
          })
        }
      })
    }
  },
  methods: {
    getScore(user: any, item: ScoreType) {
      // this.$emit('get:score', { user, item });

      console.log(user, item)

      this.$store.dispatch('StompModule/sendYachtGetScore', {
        roomId: this.$route.params.roomId,
        simpSessionId: user.simpSessionId,
        scoreType: item,
        score: (this.hint as { [k: string]: any })[item]||0
      })
    },

    sendDice(value: DiceObj) {
      axios.post('/expected/score', { dices: Object.values(value)})
        .then(({data}) => {
          this.hint = data;
        })
    }
  },
  watch: {
    currentDice: {
      deep: true,
      handler(newVal, oldVal) {
        this.sendDice(newVal);
      }
    }
  }
})
</script>

<style lang="sass" scoped>
.info
  position: absolute
  right: 10px
</style>
