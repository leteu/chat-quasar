import { Client } from 'webstomp-client';

export interface Room {
  id : number
  name : string,
  private: boolean
}

export interface ExampleStateInterface {
  prop: boolean;
  stomp: Client | null,
  roomList: Room[],
  connectStatus: boolean,
  chatlist: any[],
  currentRoom: Room | null,
  randomName: string
}

function state(): ExampleStateInterface {
  return {
    prop: false,
    stomp: null,
    roomList: [],
    connectStatus: false,
    chatlist: [],
    currentRoom: null,
    randomName: ''
  }
};

export default state;
