import { Component, createSignal } from 'solid-js';

const SignalExample: Component = () => {
  const [count, setCount] = createSignal(0);
  const doubleCount = () => count() * 2;

  setInterval(() => setCount(count() + 1), 1000);

  return (
    <div>
      <div>定时器：{count()}</div>
      <div>双倍计数：{doubleCount()}</div>
    </div>
  );
};

export default SignalExample;
