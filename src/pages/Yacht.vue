<template>
  <div id="container">
    <div class="height-full full-width flex items-center justify-center">
      <Yacht />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Yacht from 'src/components/Yacht';

export default defineComponent({
  components: {
    Yacht
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
