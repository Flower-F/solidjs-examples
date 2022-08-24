import { Component, createMemo, createSignal } from 'solid-js';

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

export default MemoExample;
