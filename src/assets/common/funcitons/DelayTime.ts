function delay(time: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(() => { resolve(); }, time*1000) );
};

export default delay;