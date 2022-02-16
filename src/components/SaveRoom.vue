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
      <q-card-section class="text-right q-py-sm">
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

export default defineComponent({
  data() {
    return {
      roomTitle: ''
    }
  },
  methods: {
    show() {
      (this.$refs.dialog as QDialog).show();
    },

    hide() {
      (this.$refs.dialog as QDialog).hide();
    },

    onClickSubmit() {
      axios.post('room', { roomName: this.roomTitle })
        .then(({status}) => {
          if(status === 200) {
            this.hide();
          } else {
            alert('실패! 다시 시도해주세요.');
            return;
          }
        })
    }
  }
})
</script>
