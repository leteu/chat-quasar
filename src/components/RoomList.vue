<template>
  <q-list bordered separator class="full-height">
    <template v-for="(item, index) in !dataList.length ? dataAPIList : dataList" :key="`roomId-${item.id}`">
      <q-item clickable @click="evt => onClickRoom(evt, item)">
        <q-item-section class="ell_wrap">
          {{item.name}}
        </q-item-section>
        <q-item-section side>
          <div class="flex items-center justify-end q-gutter-x-md fs-130">
            <span>
              <q-icon :name="item.private ? 'lock' : 'mdi-lock-open-variant'" />
            </span>

            <span>
              <q-icon name="people" />
              {{ item.userCount }}
            </span>

            <q-btn
              color="red"
              icon="delete"
              @click.stop.prevent="onClickRemove(item)"
              dense
            />
          </div>
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
      dataAPIList: [],
    }
  },
  async created() {
    this.getList();
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
    },

    getList() {
      // axios.get('')
      //   .then((res) => {
      //     // { status }

      //     // this.dataAPIList = 
      //   })
    }
  }
})
</script>
