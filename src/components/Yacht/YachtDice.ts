import { defineComponent, h } from 'vue';

export default defineComponent({
  props: {
    diceValue: {
      type: Number,
      validator: (val:number) => val >= 1 && val <=6,
      required: true
    }
  },
  setup(props) {
    const dotElement = Array.from(
      {
        length: props.diceValue
      },
      (_, index) => index+1
    ).map(dot => {
      return h('div', { class: 'dice-face__dot round-radius' }) 
    });

    return () => h('div',
      {
        class: `dice-face dice-face__${props.diceValue}`
      },
      dotElement
    )
  }
})
