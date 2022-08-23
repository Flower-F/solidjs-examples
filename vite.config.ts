import { defineConfig, loadEnv } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import Unocss from 'unocss/vite';

import { presetAttributify, presetUno, presetIcons } from 'unocss';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      solidPlugin(),
      Unocss({
        presets: [presetIcons(), presetAttributify(), presetUno()]
      })
    ]
  };
});
