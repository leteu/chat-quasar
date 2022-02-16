<template>
  <q-dialog ref="dialog" :seamless="false">
    <q-card class="min-width-200px">
      <q-card-section class="text-center">
        <q-spinner-hourglass
          color="dark"
          size="4em"
        />
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        서버 연결 중입니다...
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { QDialog } from 'quasar'
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    show() {
      (this.$refs.dialog as QDialog).show();
    },

    hide() {
      (this.$refs.dialog as QDialog).hide();
    }
  }
})
</script>
