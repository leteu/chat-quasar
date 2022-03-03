<template>
  <q-dialog ref="dialog" :seamless="false">
    <q-card class="min-width-600px">
      <q-card-section class="flex justify-between items-center q-py-sm text-h6">
        <div>방 만들기</div>
        <q-icon name="clear" class="cursor-pointer" size="32px" @click="hide()"></q-icon>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-gutter-y-md">
        <div class="relative-position">
          <div class="text-bold small-font essentials">방 이름</div>
          <q-input
            dense
            square
            outlined
            v-model="roomTitle"
            :rules="[val => !!val && !!val.trim() || '']"
            class="hideErrorMessageSlot"
            hide-bottom-space
          />
        </div>
        <div class="relative-position">
          <div class="text-bold small-font flex items-center q-gutter-x-sm">
            <div>
              비밀방
            </div>
            <q-checkbox
              dense
              square
              outlined
              v-model="$data.private"
              @update:model-value="() => password = ''"
            />
          </div>
          <q-input
            dense
            square
            outlined
            v-model="password"
            placeholder="비밀번호"
            v-if="$data.private"
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
  props: {
    roomType: {
      type: String,
      validator: (val: string) => ['GENERAL', 'YAHTZEE'].includes(val),
      default: 'GENERAL'
    }
  },
  data() {
    return {
      roomTitle: '',
      private: false,
      password: '',
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
      axios.put('chatroom', { roomName: this.roomTitle, password: this.password||null, type: this.$props.roomType })
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
