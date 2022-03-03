import { Nullable } from 'src/assets/common/type/Nullable';
import {
  QField,
  QIcon,
  QItem,
  QItemLabel,
  QItemSection,
  QMenu,
  QVirtualScroll,
  useQuasar
} from 'quasar';
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
    options: {
      type: Array,
      default: () => []
    },
    modelValue: {
      required: true
    },
    useInput: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
  },
  emits: ['update:inputValue', 'update:modelValue', 'blur', 'focus', 'keydown', 'clear'],
  setup(props, { emit, slots, attrs }) {
    const $q = useQuasar();
    const menu = ref(false);
    const useInputText = ref('');
    const useInputRef = ref(null) as Ref<Nullable<HTMLInputElement>>;
    const QFieldRef = ref(null) as Ref<Nullable<QField>>;
    const QVirtualScrollRef = ref(null) as Ref<Nullable<QVirtualScroll>>;
    const currentTabIndex = ref(-1) as Ref<number>;
    const optionsList = ref(Array.from({ length: props.options.length }, (_, index) => ref(null))) as Ref<Ref<Nullable<QItem>>[]>;
    const childrenSlots = {} as { [k: string]: () => ChildSlot | Array<Nullable<ChildSlot>> };

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

    childrenSlots.append = () => [
      props.clearable && props.modelValue ? ClearIcon : null,
      hasError.value ? ErrorIcon : null,
      h(
        QIcon,
        {
          name: $q.iconSet.arrow.dropdown,
          class: `q-select__dropdown-icon ${menu.value ? ' rotate-180' : ''}`
        }
      ),
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
      () => useInputText.value,
      (value) => {
        emit('update:inputValue', value);
      },
      {
        deep: true
      }
    );

    watch(
      () => props.options,
      (value) => {
        optionsList.value = Array.from({ length: value.length }, (_, index) => ref(null));
      },
      {
        deep: true
      }
    );

    function onMenu(value: boolean) {
      menu.value = value;
      currentTabIndex.value = -1;

      if (value) {
        window.addEventListener('keydown', keydownScroll);
      } else {
        window.removeEventListener('keydown', keydownScroll);
        useInputText.value = '';
      }
    }

    function onClickOption(item: { label: string; value: string; } | null) {
      emit('update:modelValue', item);
    }

    function emitBlur(event: Event) {
      emit('blur', event);
    }

    function keydownScroll(event: KeyboardEvent) {
      if (menu.value && [38, 40].includes(event.keyCode)) {
        event.preventDefault();

        const index = currentTabIndex.value;
        const maxIndex = props.options.length - 1;

        if (event.keyCode === 38) {
          currentTabIndex.value = index <= 0 ? maxIndex : index - 1;
        } else {
          currentTabIndex.value = index === maxIndex ? 0 : index + 1;
        }

        const currentIndex = currentTabIndex.value;
        const currentItem = optionsList.value[currentIndex].value as QItem;

        QVirtualScrollRef.value?.scrollTo(currentIndex, 'center');
        (currentItem.$el as HTMLElement).focus();
      }
    }

    function onClickClearable(e: MouseEvent) {
      e.cancelable !== false && e.preventDefault();
      e.stopPropagation();

      QFieldRef.value?.blur();
      QFieldRef.value?.resetValidation();

      emit('update:modelValue', null);
      emit('clear', props.modelValue);

      nextTick(() => {
        QFieldRef.value?.resetValidation();
        useInputRef.value?.focus();
      })
    }

    return () => h(
      QField,
      {
        ...attrs,
        ...props,
        onBlur: (evt: Event) => {
          emitBlur(evt);
        },
        value: props.modelValue,
        ref: QFieldRef,
        noErrorIcon: true,
        clearable: false
      },
      {
        default: () => h(
          QMenu,
          {
            fit: true,
            noFocus: true,
            autoClose: true,
            'onUpdate:model-value': (value: boolean) => onMenu(value)
          },
          () => {
            return h(
              QVirtualScroll,
              {
                ref: QVirtualScrollRef,
                separator: true,
                items: props.options
              },
              {
                default: ({ item, index }: {
                  item: {
                    label: string;
                    value: string;
                  },
                  index: number;
                }) => h(
                  QItem,
                  {
                    clickable: true,
                    onClick: () => onClickOption(item),
                    ref: optionsList.value[index],
                  },
                  () => h(QItemSection, {}, () => h(QItemLabel, {}, () => item.label))
                )
              }
            )
          }
        ),

        control: () => [
          h(
            'span',
            {
              class: `q-pr-xs ${(props.modelValue as { value: string })?.value ? '' : 'placeholder'}`
            },
            (props.modelValue as { label: string })?.label || ''
          ),
          props.useInput
            ? h(
              'input',
              {
                ref: useInputRef,
                type: 'text',
                value: useInputText.value,
                onInput: (evt: Event) => useInputText.value = (evt.target as HTMLInputElement).value,
                class: 'q-field__input q-placeholder col',
                onBlur: () => { QFieldRef.value?.validate() }
              }
            )
            : null
        ].filter(item => item !== null),

        ...childrenSlots
      }
    )
  }
})
