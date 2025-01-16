
import {
  presetIcons,
  presetUno,
  transformerVariantGroup,
  defineConfig
} from "unocss";
// import { presetRadix } from "unocss-preset-radix";
import { presetRadix } from "unocss-preset-radix-ui-colors";

// import * as radixColors from '@radix-ui/colors';
import { rules , shortcuts } from './uno-rules';
// import presetPrimitives from "unocss-preset-primitives";

export default defineConfig({
    rules,
    // @ts-ignore
  shortcuts,
  theme: {
    color: {
      subdued: "var(--rx-slate11)",
    },
    breakpoints: {
      xxs: '420px',
      xs: '480px',
      sm: '640px',
      md: '768px'
    }
  },
  transformers: [transformerVariantGroup()],
  presets: [
    presetUno({
      dark: "class"
    }), 
    presetIcons(),
    presetRadix({
      prefix: "--rx-",
    //   palette: [
    //     // neutrals
    //     'gray', 'slate', 'mauve',  'olive', 'sage', 'sand',
    //     // forground-colors
    //     'amber',  'sky',  'yellow','lime' , 'mint',
    //     // orangish-colors
    //     'bronze',  'gold', 'brown' , 'orange', 'tomato',
    //     //red-ish colors
    //     'red',   'ruby', 'crimson',  'pink', 'plum',
    //     // purplish-colors
    //      'purple','violet', 'iris' , 'indigo', 'blue' , 
    //      // green-ish colors
    //      'cyan', 'teal', 'jade' , 'green', 'grass', 
    //  ],
      aliases: {
        accent: "cyan",
        base: "slate",
        success: "jade",
        warning: "amber",
        error: "tomato",
        info: "blue",
      },
      useP3Colors: true,
      onlyOneTheme: "dark",
      safelist: ["cyan8A"]
    }),
  ],
});
