import { dirname, join } from "path";

import { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-storysource"),
    getAbsolutePath("@storybook/addon-mdx-gfm"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite") as '@storybook/react-vite',
    options: {},
  },

  features: {
    storyStoreV7: true,
  },

  staticDirs: ["../public"],

  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        preserveSymlinks: true,
      },
    });
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

export default config;