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
      <template v-for="(user, index) in users" :key="`user-${user.userName}-${index}`">
        <q-card-section class="col q-pa-none scroll-x row no-wrap">
          <q-card flat bordered class="full-height col min-width-200px" square>
            <q-card-section class="q-pa-none q-py-sm q-py-sm">
              {{ user.userName }}
            </q-card-section>
            <template v-for="(item, idx) in user.scoreBoard" :key="`user-${item.id}-${idx}`">
              <q-separator />
              <q-card-section
                class="q-pa-none q-py-sm col min-height-37px"
                :class="item.score ? 'bg-green-5' : ''"
                @click="() => !['합계', '보너스'].includes(item.label) ? getScore(user, item.label) : {}"
              >
                {{item.score||''}}
              </q-card-section>
            </template>
          </q-card>
        </q-card-section>
      </template>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
  { label: 'ones',      score: 0 },
  { label: 'twos',      score: 0 },
  { label: 'threes',    score: 0 },
  { label: 'fours',     score: 0 },
  { label: 'fives',     score: 0 },
  { label: 'sixes',     score: 0 },
  { label: 'bonus',     score: 0 },
  { label: 'choice',    score: 0 },
  { label: 'fullHouse', score: 0 },
  { label: 'fourOf',    score: 0 },
  { label: 'lgSt',      score: 0 },
  { label: 'smSt',      score: 0 },
  { label: 'yacht',     score: 0 },
  { label: '합계',      score: 0 },
];

export default defineComponent({
  props: [ 'currentDice' ],
  data() {
    return {
      rules,
      users: [
        {
          userName: '나',
          scoreBoard: newScoreBoard
        }
      ]
    }
  },
  methods: {
    getScore(user: any, item: string) {
      // this.$emit('get:score', { user, item });

      console.log(user, item)
    }
  },
  watch: {
    currentDice: {
      deep: true,
      handler(newVal, oldVal) {
        console.log(newVal)
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
