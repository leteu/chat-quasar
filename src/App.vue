<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',

  created(){
    this.$store.dispatch('AuthModule/setHeaderAction');
    this.$store.dispatch('StompModule/setterStomp');
  }
})
</script>
