import { Component, createSignal, Match, Switch } from 'solid-js';
import Effect from './Effect';
import HelloWorld from './HelloWorld';
import Memo from './Memo';
import Signal from './Signal';
import Show from './Show';

const App: Component = () => {
  const [route, setRoute] = createSignal('helloworld');

  return (
    <div flex flex-col items-center justify-center h-screen bg-light>
      <h1 text-purple text-2xl>
        请选择
      </h1>
      <div flex flex-col>
        <div
          onclick={() => setRoute('helloworld')}
          hover:cursor-pointer
          class={`${route() === 'helloworld' && 'text-indigo underline'}`}
        >
          1.Hello World
        </div>
        <div
          onclick={() => setRoute('signal')}
          hover:cursor-pointer
          class={`${route() === 'signal' && 'text-indigo underline'}`}
          mt-2
        >
          2.Signal
        </div>
        <div
          onclick={() => setRoute('effect')}
          hover:cursor-pointer
          class={`${route() === 'effect' && 'text-indigo underline'}`}
          mt-2
        >
          3.Effect
        </div>
        <div
          onclick={() => setRoute('memo')}
          hover:cursor-pointer
          class={`${route() === 'memo' && 'text-indigo underline'}`}
          mt-2
        >
          4.Memo
        </div>
        <div
          onclick={() => setRoute('show')}
          hover:cursor-pointer
          class={`${route() === 'show' && 'text-indigo underline'}`}
          mt-2
        >
          5.Show
        </div>
      </div>

      <div mt-20>
        <h1 text-purple text-2xl>
          效果演示
        </h1>
        <Switch fallback={<div>404 Not Found</div>}>
          <Match when={route() === 'helloworld'}>
            <HelloWorld />
          </Match>
          <Match when={route() === 'signal'}>
            <Signal />
          </Match>
          <Match when={route() === 'effect'}>
            <Effect />
          </Match>
          <Match when={route() === 'memo'}>
            <Memo />
          </Match>
          <Match when={route() === 'show'}>
            <Show />
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default App;
