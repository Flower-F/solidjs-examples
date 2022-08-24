import { Component, createEffect, createSignal } from 'solid-js';

const EffectExample: Component = () => {
  const [count, setCount] = createSignal(0);
  setInterval(() => setCount(count() + 1), 1000);

  createEffect(() => {
    console.log('定时器计时', count());
  });

  return <div>hello world</div>;
};

export default EffectExample;
