<template>
  <div id="container">
    <div class="height-full full-width flex items-center justify-center">
      <SnakeComponentVue />
    </div>
  </div>
</template>

<script lang="ts">
import SnakeComponentVue from 'src/components/SnakeComponent.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    SnakeComponentVue
  },
})
</script>

<style lang="sass">
.height-full
  height: 100% !important

@media screen and (max-width: 768px)
  .height-full
    height: calc(100% - 110px) !important
    touch-action: none
</style>
