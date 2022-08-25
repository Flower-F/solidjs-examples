import { Component, createSignal, Match, Switch } from 'solid-js';

const SwitchExample: Component = () => {
  const [x, setX] = createSignal(5);

  return (
    <div>
      <button onclick={() => setX(x() + 1)}>click me to +1</button>
      <Switch fallback={<p>{x()} is between 5 and 10</p>}>
        <Match when={x() > 10}>
          <p>{x()} is greater than 10</p>
        </Match>
        <Match when={5 > x()}>
          <p>{x()} is less than 5</p>
        </Match>
      </Switch>
    </div>
  );
};

export default SwitchExample;
