import { Component, createSignal, For } from 'solid-js';

const ForExample: Component = () => {
  const [personList] = createSignal([
    { id: '1', name: 'Tom' },
    { id: '2', name: 'Amy' },
    { id: '3', name: 'Jack' }
  ]);

  return (
    <ul>
      <For each={personList()}>
        {(person, i) => (
          <li>
            {i() + 1}: {person.name}
          </li>
        )}
      </For>
    </ul>
  );
};

export default ForExample;
