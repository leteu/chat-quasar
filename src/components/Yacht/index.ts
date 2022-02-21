import { defineComponent, h } from 'vue';
import YachtDiceBoard from './YachtDiceBoard.vue';

export default defineComponent({
  setup() {
    return () => h(YachtDiceBoard);
  }
})
