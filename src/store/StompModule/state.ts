import { Client } from 'webstomp-client';

export interface Room {
  id : number
  name : string
}

export interface ExampleStateInterface {
  prop: boolean;
  stomp: Client | null,
  roomList: Room[],
  connectStatus: boolean,
  chatlist: any[],
  currentRoom: Room | null
}

function state(): ExampleStateInterface {
  return {
    prop: false,
    stomp: null,
    roomList: [],
    connectStatus: false,
    chatlist: [],
    currentRoom: null
  }
};

export default state;
