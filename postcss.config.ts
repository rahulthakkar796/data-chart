// postcss.config.js

import type { Plugin } from 'postcss';

interface PostCSSConfig {
  plugins: {
    [pluginName: string]: Plugin;
  };
}

const postcssConfig: PostCSSConfig = {
  plugins: {
    tailwindcss: {
      postcssPlugin: ''
    },
    autoprefixer: {
      postcssPlugin: ''
    },
  },
};

export default postcssConfig;
