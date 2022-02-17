import { Client } from 'webstomp-client';

export interface Room {
  id : number
  name : string,
  private: boolean
}

export interface Chat {
  userName: string,
  content: string,
  type?: string,
  date: string
}

export interface UserInfo {
  userName: string
}

export interface ExampleStateInterface {
  prop: boolean;
  stomp: Client | null,
  roomList: Room[],
  connectStatus: boolean,
  chatlist: Chat[],
  currentRoom: Room | null,
  randomName: string,
  userInfo: UserInfo[],
}

function state(): ExampleStateInterface {
  return {
    prop: false,
    stomp: null,
    roomList: [],
    connectStatus: false,
    chatlist: [],
    currentRoom: null,
    randomName: '',
    userInfo: []
  }
};

export default state;
