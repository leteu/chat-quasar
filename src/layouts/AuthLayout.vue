<template>
  <q-layout class="bg-primary">
    <router-view />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AuthLayout'
})
</script>
