import { Component } from 'solid-js';
import { Portal } from 'solid-js/web';

const PortalExample: Component = () => {
  return (
    <Portal>
      <div class="fixed" left-0 right-0 bottom-0 top-0 flex items-center justify-center>
        <h1>This is a popup</h1>
      </div>
    </Portal>
  );
};

export default PortalExample;
