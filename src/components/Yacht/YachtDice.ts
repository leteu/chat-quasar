import { defineComponent, h } from 'vue';
import YachtDiceFace from './YachtDiceFace';

export default defineComponent({
  props: {
    diceValue: {
      type: Number,
      validator: (val:number) => val >= 1 && val <=6,
      required: true
    },
    roll: {
      type: Boolean
    },
    fixed: {
      type: Boolean
    }
  },
  setup(props) {


    return () => h('div',
      {
        class: `dice dice__show-${props.diceValue} ${props.roll ? 'roll-dice' : ''} ${ props.fixed ? 'dice__fixed' : '' }`
      },
      [
        h(YachtDiceFace, { diceValue: 1 }),
        h(YachtDiceFace, { diceValue: 2 }),
        h(YachtDiceFace, { diceValue: 3 }),
        h(YachtDiceFace, { diceValue: 4 }),
        h(YachtDiceFace, { diceValue: 5 }),
        h(YachtDiceFace, { diceValue: 6 }),
      ]
    )
  }
})