<template>
  <q-dialog ref="dialog" :seamless="false">
    <q-card class="min-width-600px">
      <q-card-section class="flex justify-between items-center q-py-sm text-h6">
        <div>방 만들기</div>
        <q-icon name="clear" class="cursor-pointer" size="32px" @click="hide()"></q-icon>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="relative-position">
          <div class="text-bold small-font essentials">방 이름</div>
          <q-input
            dense
            square
            outlined
            v-model="roomTitle"
            :rules="[val => !!val && !!val?.id || '']"
            class="hideErrorMessageSlot"
            hide-bottom-space
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-btn
          label="생성"
          color="primary"
          @click="onClickSubmit()"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import axios from 'axios';
import { QDialog } from 'quasar'
import { defineComponent, ref } from 'vue'

const DialogMixin = defineComponent({
  methods: {
    show() {
      (this.$refs.dialog as QDialog).show();
    },

    hide() {
      (this.$refs.dialog as QDialog).hide();
    }
  }
})

export default defineComponent({
  mixins: [ DialogMixin ],
  setup() {
    const roomTitle = ref('');

    function onClickSubmit() {
      axios.post('create/room', { roomName: roomTitle.value })
        .then((res) => {
          console.log(res)
        })
    }

    return {
      roomTitle,
      onClickSubmit
    }
  },
})
</script>
