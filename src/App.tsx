import { Component, createSignal, For } from 'solid-js';
import HelloWorld from './examples/HelloWorld';
import SwitchExample from './examples/Switch';
import ForExample from './examples/For';
import ShowExample from './examples/Show';
import MemoExample from './examples/Memo';
import EffectExample from './examples/Effect';
import SignalExample from './examples/Signal';
import { Dynamic } from 'solid-js/web';
import NotFound from './examples/404';
import DynamicExample from './examples/Dynamic';
import PortalExample from './examples/Portal';

interface IRouteItem {
  title: string;
  route: string;
  component: Component<any>;
}

const options: IRouteItem[] = [
  {
    title: '404 Not Found',
    route: '404',
    component: NotFound
  },
  {
    title: 'Hello World',
    route: 'helloworld',
    component: HelloWorld
  },
  {
    title: 'Signal Example',
    route: 'signal',
    component: SignalExample
  },
  {
    title: 'Effect Example',
    route: 'effect',
    component: EffectExample
  },
  {
    title: 'Memo Example',
    route: 'memo',
    component: MemoExample
  },
  {
    title: 'Show Example',
    route: 'show',
    component: ShowExample
  },
  {
    title: 'Switch Example',
    route: 'switch',
    component: SwitchExample
  },
  {
    title: 'For Example',
    route: 'for',
    component: ForExample
  },
  {
    title: 'Dynamic Example',
    route: 'dynamic',
    component: DynamicExample
  },
  {
    title: 'Portal Example',
    route: 'portal',
    component: PortalExample
  }
];

const App: Component = () => {
  const [selected, setSelected] = createSignal(0);

  return (
    <div flex flex-col items-center justify-center h-screen bg-light>
      <h1 text-purple text-2xl>
        请选择
      </h1>
      <div flex flex-col mt-2px>
        <select
          value={options[0].route}
          onInput={e => {
            const findIndex = options.findIndex(item => item.route === e.currentTarget.value);
            if (findIndex) {
              setSelected(findIndex);
            }
          }}
        >
          <For each={options}>{route => <option value={route.route}>{route.title}</option>}</For>
        </select>
      </div>

      <div mt-20>
        <h1 text-purple text-2xl>
          效果演示
        </h1>
        <Dynamic component={options[selected()].component} />
      </div>
    </div>
  );
};

export default App;
