<template>
  <q-list bordered separator class="full-height">
    <template v-for="(item, index) in !dataList.length ? dataAPIList : dataList" :key="`roomId-${item.id}`">
      <q-item clickable @click="evt => onClickRoom(evt, item)">
        <q-item-section class="ell_wrap text-weight-bold">
          {{item.chatRoomName}}
        </q-item-section>
        <q-item-section side>
          <div class="flex items-center justify-end q-gutter-x-md fs-130">
            <span>
              <q-icon
                name="casino"
                :color="roomType === 'GENERAL'
                          ? $q.dark.isActive ? 'grey-9' : 'grey-4'
                          : ''"
                v-if="roomType === 'YACHT'"
              />
            </span>

            <span>
              <q-icon
                :name="item.private ? 'lock' : 'mdi-lock-open-variant'"
                :color="!item.private
                          ? $q.dark.isActive ? 'grey-9' : 'grey-4'
                          : ''"
              />
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
  props: {
    roomType: {
      type: String,
      validator: (val: string) => ['GENERAL', 'YACHT'].includes(val)
    }
  },
  data() {
    return {
      dataAPIList: [],
    }
  },
  computed: {
    dataList: function () {
      return this.$store.getters[`StompModule/${this.$props.roomType === 'GENERAL' ? 'getRoomListData' : 'getYachtListData'}`];
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
