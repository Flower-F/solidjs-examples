import { Component, createSignal, Show } from 'solid-js';

const ShowExample: Component = () => {
  const [login, setLogin] = createSignal(false);
  const toggle = () => setLogin(!login());

  return (
    <Show when={login()} fallback={<button onClick={toggle}>Log in</button>}>
      <button onClick={toggle}>Log out</button>
    </Show>
  );
};

export default ShowExample;
