import { Component, createSignal, For } from 'solid-js';
import { Dynamic } from 'solid-js/web';

const RedThing = () => <strong style="color: red">Red Thing</strong>;
const GreenThing = () => <strong style="color: green">Green Thing</strong>;
const BlueThing = () => <strong style="color: blue">Blue Thing</strong>;

const options = {
  red: RedThing,
  green: GreenThing,
  blue: BlueThing
};

const DynamicExample: Component = () => {
  const [selected, setSelected] = createSignal<keyof typeof options>('red');

  return (
    <>
      <select value={selected()} onInput={e => setSelected(e.currentTarget.value as keyof typeof options)}>
        <For each={Object.keys(options)}>{color => <option value={color}>{color}</option>}</For>
      </select>
      {/* <Switch fallback={<BlueThing />}>
        <Match when={selected() === 'red'}>
          <RedThing />
        </Match>
        <Match when={selected() === 'green'}>
          <GreenThing />
        </Match>
      </Switch> */}
      <Dynamic component={options[selected()]} />
    </>
  );
};

export default DynamicExample;
