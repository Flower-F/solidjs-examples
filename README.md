# 对不起 React，我变成了你想要的样子

上个星期的周会上，一个同事聊到能不能回归到 jquery 的时代，直接操纵 dom 来实现性能的优化，但是想到 jquery 代码恐怖的维护难度，这恐怕并不现实。而听到这一观点的时候，我的脑中便第一时间蹦出 [Solidjs](https://www.solidjs.com/) 的影子

本文代码同步更新到[仓库](https://github.com/Flower-F/solidjs-examples)，你可以在 [starter](https://github.com/Flower-F/solidjs-examples/tree/starter) 分支直接获取配置好的开发环境

# 什么是 Solidjs

和 React、Vue、Svelte 一样，Solidjs 是一款新兴的 Web 开发框架/库

# 为什么需要 Solidjs

既然已经有了 Vue、React，那么为什么还需要 Solidjs 呢？原因主要有以下几点：
- 完备的响应式系统：传统 React Hooks 的心智负担问题正在逐步暴露出来，比如 Hook 不能条件式调用、useEffect 的依赖难以轻松准确地识别、需要 useMemo 和 useCallback 进行优化等。而 React 团队正在试图通过 React Forget 来弥补原先的缺陷，但是因为 tsx 的灵活性，这一功能的实现并不轻松。而 Solidjs 通过依赖追踪的方式解决了这些问题
- 性能：Solidjs 直接标榜自己的性能是对标原生 js 的，而在 [js framework benchmark](https://krausest.github.io/js-framework-benchmark/index.html) 中这一点也得到了证实。关于 Solidjs 为什么这么快，后面会解释
![performance compare](./images/performance.png)

# 怎么用

下面会通过一系列例子教会你快速入门 Solidjs，当然前提是你最好有一定的 React Hooks 使用经验，这样你也能更直观地感受到 Solidjs 相比于 React 的优势

## Hello World

这是一个无需解释的例子
```tsx
const App: Component = () => {
  return <div>hello world</div>;
};
```

## Signal

Signals 实际上就是类比于 React 里面 state 的概念。只不过不同之处是它的返回参数第一个是一个 getter，第二个是一个 setter，两个都是函数
```tsx
const SignalExample: Component = () => {
  const [count, setCount] = createSignal(0);
  setInterval(() => setCount(count() + 1), 1000);

  return <div>定时器：{count()}</div>;
};
```

更为神奇的是，这种响应式是可以传递的，这有点类似于 vue 中 computed/watch 的概念

```tsx
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
```

## Effect

Effect 实际上就是类比于 React 里面 useEffect 的概念，但是它的使用更加符合直觉的编程思维。你不需要声明依赖，因为 Solidjs 自动帮你跟踪了
```tsx
const EffectExample: Component = () => {
  const [count, setCount] = createSignal(0);
  setInterval(() => setCount(count() + 1), 1000);

  createEffect(() => {
    console.log('定时器计时', count());
  });

  return <div>hello world</div>;
};
```

## Memo
不要因为 React 的存在导致你一看到 memo 这个单词就害怕，事实上在 Solidjs 里面 memo 也不需要你手动进行依赖追踪。通过 createMemo 方法，你的计算结果将会被 Solidjs 缓存起来，因此页面整体的重新计算速度会非常快

```tsx
function fibonacci(num: number): number {
  if (num <= 1) return 1;

  return fibonacci(num - 1) + fibonacci(num - 2);
}

const MemoExample: Component = () => {
  const [count, setCount] = createSignal(10);
  const fib = createMemo(() => {
    console.log('calculate');
    return fibonacci(count());
  });

  return (
    <div>
      <button onClick={() => setCount(count() + 1)}>Count: {count()}</button>
      <div>
        1. {fib()} {fib()} {fib()} {fib()} {fib()}
      </div>
      <div>
        2. {fib()} {fib()} {fib()} {fib()} {fib()}
      </div>
      <div>
        3. {fib()} {fib()} {fib()} {fib()} {fib()}
      </div>
      <div>
        4. {fib()} {fib()} {fib()} {fib()} {fib()}
      </div>
      <div>
        5. {fib()} {fib()} {fib()} {fib()} {fib()}
      </div>
    </div>
  );
};
```

## Show

Show 就是一种条件渲染方式，类似于 vue 中的 v-show

```tsx
const ShowExample: Component = () => {
  const [login, setLogin] = createSignal(false);
  const toggle = () => setLogin(!login());

  return (
    <Show when={login()} fallback={<button onClick={toggle}>Log in</button>}>
      <button onClick={toggle}>Log out</button>
    </Show>
  );
};
```

## Switch

除了 Show 之外，另一种条件渲染的方式叫做 Switch，表示根据不同的条件进行渲染

```tsx
const SwitchExample: Component = () => {
  const [x, setX] = createSignal(7);

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
```


## For

For 就是一种列表渲染方式，类似于 vue 中的 v-for

```tsx
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
```

## Dynamic

这个也就是我们平常所说的动态组件，该特性在 vue 和 react 中也都有相应的支持，这里不多做介绍。

```tsx
const DynamicExample: Component = () => {
  const [selected, setSelected] = createSignal('red');

  return (
    <>
      <select value={selected()} onInput={e => setSelected(e.currentTarget.value)}>
        <For each={Object.keys(options)}>{color => <option value={color}>{color}</option>}</For>
      </select>
      <Dynamic component={options[selected() as keyof typeof options]} />
    </>
  );
};
```

## Popup

Popup 类似于 React 中的 createPortal，基本上就是完全为了弹窗组件设计的。通过 Popup 可以解决掉 z-index 有时候不生效，以及不方便维护的问题

```tsx
const DynamicExample: Component = () => {
  const [selected, setSelected] = createSignal('red');

  return (
    <>
      <select value={selected()} onInput={e => setSelected(e.currentTarget.value)}>
        <For each={Object.keys(options)}>{color => <option value={color}>{color}</option>}</For>
      </select>
      <Dynamic component={options[selected() as keyof typeof options]} />
    </>
  );
};
```

限于篇幅原因，关于基本使用的介绍就说这么多，其实这里还有很多 solid 的特性没有涉及到，感兴趣的朋友们可以自己去[官网教程](https://www.solidjs.com/tutorial/introduction_basics)查看。


