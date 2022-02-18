<template>
  <div id="container">
    <q-card class="height-inherit">
      <q-card-section class="full-height full-width">
        <SnakeComponentVue />
      </q-card-section>
    </q-card>
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
