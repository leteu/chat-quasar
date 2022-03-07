import { QField, QIcon, useQuasar } from 'quasar';
import { Nullable } from 'src/assets/common/type/Nullable';
import {
  defineComponent,
  h,
  ref,
  Ref,
  VNode,
  RendererElement,
  RendererNode,
  watch,
  nextTick
} from 'vue'

type ChildSlot = VNode<RendererNode, RendererElement, { [key: string]: any; }>

export default defineComponent({
  props: {
    modelValue: {
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    inputClass: {
      type: String,
      default: '',
    },
    inputStyle: {
      type: String,
      default: '',
    },
    tabindex: {
      type: Number,
      default: 0,
    },
    clearable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    }
  },
  emits: ['update:modelValue', 'clear', 'keydown'],
  setup(props, { emit, slots }) {
    const $q = useQuasar();
    const inputText = ref(props.modelValue);
    const inputRef = ref(null) as Ref<Nullable<HTMLInputElement>>;
    const childrenSlots = {} as { [k: string]: () => ChildSlot | Array<Nullable<ChildSlot>> };
    const QFieldRef = ref(null) as Ref<Nullable<QField>>;

    const hasError = ref(false);
    const ErrorIcon = h(QIcon, { name: $q.iconSet.field.error, color: 'negative' });
    const ClearIcon = h(QIcon, {
      name: $q.iconSet.field.clear,
      class: 'q-field__focusable-action',
      type: 'button',
      tag: 'button',
      role: null,
      'aria-hidden': null,
      onClick: onClickClearable
    });

    function emitEvtValue(event: Event) {
      emit('update:modelValue', (event.target as HTMLInputElement).value);
    };

    function onClickClearable(e: MouseEvent) {
      e.cancelable !== false && e.preventDefault();
      e.stopPropagation();

      QFieldRef.value?.blur();
      QFieldRef.value?.resetValidation();

      emit('update:modelValue', null);
      emit('clear', props.modelValue);

      nextTick(() => {
        QFieldRef.value?.resetValidation();
        inputRef.value?.focus();
      })
    }

    childrenSlots.append = () => [
      props.clearable && props.modelValue ? ClearIcon : null,
      hasError.value ? ErrorIcon : null,
    ].filter(item => item !== null);

    nextTick(() => {
      watch(
        () => (QFieldRef.value as any)?.hasError,
        (newVal) => {
          hasError.value = newVal;
        },
        {
          deep: true
        }
      );
    });

    Object.keys(slots).forEach(slot => {
      const currentSlot = slots[slot];

      if (slot === 'append') {
        (childrenSlots[slot] as () => ChildSlot[])().unshift(h(currentSlot !== void 0 ? currentSlot : {}))
      } else {
        if (currentSlot !== void 0) {
          childrenSlots[slot] = () => h(currentSlot !== void 0 ? currentSlot : {});
        }
      }
    });

    watch(
      () => props.modelValue,
      (newVal: any) => (inputRef.value as HTMLInputElement).value = newVal,
      {
        deep: true
      }
    );

    return () => h(QField,
      {
        ref: QFieldRef,
        ...props,
        noErrorIcon: true,
        clearable: false,
      },
      {
        control: () => h(props.type === 'textarea' ? 'textarea' : 'input',
          {
            type: 'text',
            'model-value': inputText.value,
            onInput: (evt: Event) => emitEvtValue(evt),
            class: `${props.type === 'textarea' ? 'q-field__native' : 'q-field__input'} q-placeholder ${props.inputClass}`,
            rows: props.type === 'textarea' ? 6 : void 0,
            style: `${props.inputStyle}`,
            placeholder: props.placeholder,
            readonly: props.readonly,
            disabled: props.disable,
            tabindex: props.tabindex,
            ref: inputRef,
            onBlur: () => { QFieldRef.value?.validate() },
            onKeydown: (evt:KeyboardEvent) => emit('keydown', evt)
          }
        ),
        ...childrenSlots
      }
    )
  }
})
