<template>
  <q-list bordered separator class="full-height">
    <template v-for="(item, index) in dataList" :key="`roomId-${item.id}`">
      <q-item class="flex items-center" clickable @click="evt => onClickRoom(evt, item)">
        <q-item-section>
          <q-icon name="lock" v-if="false" />
          {{item.name}}
        </q-item-section>
        <q-item-section side>
          <q-btn
            color="red"
            icon="delete"
            @click.stop.prevent="onClickRemove(item)"
            dense
          />
        </q-item-section>
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
    },

    onClickRemove(item: Room) {
      this.$emit('remove:room', item)
    }
  }
})
</script>
