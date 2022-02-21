import { defineComponent, h } from 'vue';
import YachtDiceBoard from './YachtDiceBoard.vue';
import YachtScoreBoard from './YachtScoreBoard.vue';

export default defineComponent({
  setup() {
    return () => h('div',
      {
        class: 'column full-height'
      },
      [
        h(YachtScoreBoard, { class: 'col' }),
        h(YachtDiceBoard)
      ]
    );
  }
})
