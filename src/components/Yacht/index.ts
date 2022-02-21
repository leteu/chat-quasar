import { defineComponent, h, Ref, ref } from 'vue';
import YachtDiceBoard from './YachtDiceBoard.vue';
import YachtScoreBoard from './YachtScoreBoard.vue';

interface DiceObj {
  first: number;
  second: number;
  third: number;
  fourth: number;
  fifth: number;
}

export default defineComponent({
  setup() {
    const currentDice = ref(null) as Ref<DiceObj | null>;

    return () => h('div',
      {
        class: 'full-height q-mb-md full-width'
      },
      [
        h(YachtScoreBoard,
          {
            currentDice: currentDice.value
          }
        ),
        h(YachtDiceBoard,
          {
            'onUpdate:diceValue': (value: DiceObj) => currentDice.value = value
          }
        )
      ]
    );
  }
})
