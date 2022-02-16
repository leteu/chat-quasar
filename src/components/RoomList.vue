<template>
  <q-list bordered separator class="full-height">
    <template v-for="(item, index) in dataList" :key="`roomId-${item.id}`">
      <q-item class="flex items-center" clickable @click="evt => onClickRoom(evt, item)">
        <q-icon name="lock" v-if="false" />
        {{item.name}}
      </q-item>
      <q-separator v-if="dataList.length === (index+1)" />
    </template>
  </q-list>
</template>

<script lang="ts">
import axios from 'axios';
import { Room } from 'src/store/StompModule/state';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoomList',
  data() {
    return {

    }
  },
  async created() {
    
  },
  computed: {
    dataList: function () {
      return this.$store.getters['StompModule/getRoomListData'];
    }
  },
  methods: {
    onClickRoom(evt: MouseEvent, item: Room) {
      this.$emit('update:room', item);
    }
  }
})
</script>
