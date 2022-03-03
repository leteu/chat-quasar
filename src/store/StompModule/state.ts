import { Client } from 'webstomp-client';

export interface Room {
  chatRoomId : number
  chatRoomName : string,
  private: boolean,
  type: 'GENERAL' | 'YAHTZEE'
}

export interface Chat {
  userName: string,
  messageContent: string,
  authority?: string,
  date: string
}

export interface UserInfo {
  userName: string
}

export interface ExampleStateInterface {
  prop: boolean;
  stomp: Client | null,
  roomList: Room[],
  yachtList: Room[],
  connectStatus: boolean,
  chatlist: Chat[],
  currentRoom: Room | null,
  currentYacht: Room | null,
  randomName: string,
  userInfo: UserInfo[],
}

function state(): ExampleStateInterface {
  return {
    prop: false,
    stomp: null,
    roomList: [],
    yachtList: [],
    connectStatus: false,
    chatlist: [],
    currentRoom: null,
    currentYacht: null,
    randomName: '',
    userInfo: []
  }
};

export default state;
