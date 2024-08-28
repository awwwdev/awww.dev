import { Preset, Rule, RuleContext, toEscapedSelector, Preflight, Variant } from "unocss";
import * as radixColors from "@radix-ui/colors";
import type { Theme } from "unocss/preset-uno";
import Color from "colorjs.io";

// 🔴 use variant to wrap css variables into the one .light-theme ...
// 🔴 P3 opt in opt out options @supports (color:color(display-p3 0 0 0)) 
// 🔴 unified way for handling black and white
// 🔴 fg shade
// 🔴 dynamic aliasing
// 🔴 supporting only one theme => remove variables for the other theme.

// 🔴 shades constant
// 🔴 type of Hue or Alias
// 🔴 Typescript type Alias name cannot be RadixHue name

// ✅ use constructCSS (didn't solve my issue)
// ✅ safelist aliases
// ✅ safeList colors for runtime values
// ✅ variant handling
// ✅ automatictokeny create accent Alpha and base Alpha
// ✅ use shortcut to add css variables with color values;

type Alpha = "A" | "";
type RadixHue = (typeof radixHues)[number];
type Hue = RadixHue | "white" | "black";
type Shade = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13";
type P3 = "P3" | "";
type Dark = "Dark" | "";
type Token = string;
type Property = string;
type Alias = string;
type Aliases = Record<Alias, RadixHue>;
interface PresetRadixOptions {
  safeListColors?: readonly RadixHue[];
  safeListAliases?: readonly Alias[];
  /**
   * The prefix of the generated css variables
   * @default --un-preset-radix
   */
  prefix?: string;
  /**
   * Customize the selector used to apply the dark versions of the color palette
   * @default ".dark-theme"
   */
  darkSelector?: string;
  /**
   * Customize the selector used to apply the light versions of the color palette
   * @default ":root, .light-theme"
   */
  lightSelector?: string;
  /** Add color aliases */
  aliases?: Aliases;
  /**
   * Extend instead of override the default theme
   * @default false
   */
  extend?: boolean;
}

export const radixHues = [
  "amber",
  "blue",
  "bronze",
  "brown",
  "crimson",
  "cyan",
  "gold",
  "grass",
  "gray",
  "green",
  "indigo",
  "lime",
  "mauve",
  "mint",
  "olive",
  "orange",
  "pink",
  "plum",
  "purple",
  "red",
  "sage",
  "sand",
  "sky",
  "slate",
  "teal",
  "tomato",
  "violet",
  "yellow",
  "jade",
  "iris",
  "ruby",
] as const;

function getColorValue({
  hue,
  dark = "",
  shade,
  alpha = "",
  p3 = "",
}: {
  alpha?: Alpha;
  hue: Hue;
  dark?: Dark;
  shade: Shade;
  p3?: P3;
}) {
  let value = "";

  if (shade === "0") {
    if (alpha === "" && dark === "Dark") value = "#000000";
    if (alpha === "" && dark === "") value = "#ffffff";
    if (alpha === "A" && dark === "Dark") value = "transparent";
    if (alpha === "A" && dark === "") value = "transparent";
  } else if (shade === "13") {
    if (alpha === "" && dark === "Dark") value = "#ffffff";
    if (alpha === "" && dark === "") value = "#000000";
    if (alpha === "A" && dark === "Dark") value = "white"; // for consistency we don't use hex to opt out of opacity support
    if (alpha === "A" && dark === "") value = "black"; // for consistency we don't use hex to opt out of
  } else {
    value = radixColors[`${hue}${dark}${p3}${alpha}`][`${hue}${alpha}${shade}`];
  }

  if (p3 === "P3") return value; // return in p3 format ex: 'color(display-p3 , 1 4 5)'

  const color = new Color(value);

  // convert Hex values to rgb values
  value = color.toString({ format: "rgba" });

  // convert 'rgba(100 , 40, 50)' to '100 40 50' to be used in rgba(  / <alpha-value>)
  // so we can use tailwind opacity (bg-opacity-30 or bg-blue9/30) with it
  if (alpha === "") value = value.replace("rgba(", "").replace(")", "");
  return value;
}

function createRules({ prefix, darkSelector, lightSelector, aliases }) {
  return [
    [
      /^alias-([A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])-([A-Za-z]+)(A)?(P3)?$/,
      ([token, alias, hue, p3, alpha]: [Token, Alias, Hue, P3, Alpha], context: RuleContext) => {
        // discard mismatched rules
        if (![...Object.keys(radixColors), ...Object.keys(aliases)].includes(hue)) return;

        let selector = toEscapedSelector(context.rawSelector);

        return `
        ${selector} {
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            .map((shade) => {
              return `--${prefix}-${alias}${shade}${alpha}: --${prefix}-${hue}${shade}${alpha}${p3};`;
            })
            .join(" ")}
        }

        ${lightSelector} {
          ${["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]
            .map((shade: Shade) => {
              return `--${prefix}-${hue}${shade}${alpha}${p3}: ${getColorValue({ alpha, dark: "", shade, hue, p3 })}`;
            })
            .join(" ")}
          }
          ${darkSelector} {
            ${["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]
            .map((shade: Shade) => {
              return `--${prefix}-${hue}${shade}${alpha}${p3}: ${getColorValue({
                alpha,
                dark: "Dark",
                shade,
                hue,
                p3,
              })}`;
            })
            .join(" ")}
        }
        `;
      },
    ],
    [
      /^add-radix-color-([A-Za-z]+)(0|1|2|3|4|5|6|7|8|9|10|11|12|13)(A)?(P3)?-to-css$/,
      (
        [token, hueOrAlias, shade, alpha = "", p3 = ""]: [Token, HueOrAlias, Shade, Alpha, P3],
        context: RuleContext
      ) => {
        if (![...Object.keys(radixColors), ...Object.keys(aliases)].includes(hueOrAlias)) return;

        let hue = Object.keys(aliases).includes(hueOrAlias) ? aliases[hueOrAlias] : hueOrAlias;

        if (hue === "white" || hue === "black") {
          if (alpha === "") return;
          return `
          :root {
            --${prefix}-${hue}${shade}${alpha}: ${getColorValue({ hue, shade, dark: "", alpha, p3 })};
          }`;
        }
        // context.generator.generate();
        // context.constructCSS({"dfdf":})
        return `${lightSelector} {--${prefix}-${hueOrAlias}${shade}${alpha}${p3}: ${getColorValue({
          alpha,
          dark: "",
          shade,
          hue,
          p3,
        })};}
        ${darkSelector} {--${prefix}-${hueOrAlias}${shade}${alpha}${p3}: ${getColorValue({
          alpha,
          dark: "Dark",
          shade,
          hue,
          p3,
        })};}`;
      },
      { internal: true, layer: 'theme-layer' },
    ],
  ] as Rule[];
}

type Options = PresetRadixOptions;

type HueOrAlias = Hue | keyof Options["aliases"];

export function myPreset(options: Options): Preset<Theme> {
  const {
    prefix: _prefix = "--un-preset-radix-",
    darkSelector = ".dark-theme",
    lightSelector = ":root, .light-theme",
    // palette: selectedColors,
    aliases = {},
    safeListColors = [],
    safeListAliases = [],
    extend = false,
  } = options;

  let prefix = _prefix.replaceAll("-", " ").trim().replaceAll(" ", "-"); // remove hyphens from start and end.

  return {
    name: "unocss-preset-radix",
    rules: createRules({ darkSelector, lightSelector, aliases, prefix }),

    // use internal rules +  shortcuts to that color utility to default rule and add color rules.
    shortcuts: [
      [
        /^([A-Za-z0-9-]+)-([A-Za-z]+)(0|1|2|3|4|5|6|7|8|9|10|11|12|13)(A)?(P3)?$/,
        (
          [token, property, hueOrAlias, shade, alpha = "", p3 = ""]: [Token, Property, HueOrAlias, Shade, Alpha, P3],
          context: RuleContext
        ) => {
          if (![...Object.keys(radixColors), ...Object.keys(aliases)].includes(hueOrAlias)) return `${token}`; // if not a radix color don't add it.
          if (safeListColors?.includes(hueOrAlias as RadixHue)) return `${token}`; // colors in safelist are added in preflight. no need to add in runtime.
          if (["black", "white"].includes(hueOrAlias) && alpha === "") return `${token}`; // makes sure we never need to deal with bg-black4 later on.
          return `add-radix-color-${hueOrAlias}${shade}${alpha}${p3}-to-css ${token}`;
        },
      ],
    ],
    extendTheme(theme: Theme) {
      theme.colors = {
        ...Object.fromEntries(
          [...radixHues, ...Object.keys(aliases)].map((hue) => {
            return [
              hue,
              {
                "0": `rgba( var(--${prefix}-${hue}0) , <alpha-value>)`,
                "1": `rgba( var(--${prefix}-${hue}1) , <alpha-value>)`,
                "2": `rgba( var(--${prefix}-${hue}2) , <alpha-value>)`,
                "3": `rgba( var(--${prefix}-${hue}3) , <alpha-value>)`,
                "4": `rgba( var(--${prefix}-${hue}4) , <alpha-value>)`,
                "5": `rgba( var(--${prefix}-${hue}5) , <alpha-value>)`,
                "6": `rgba( var(--${prefix}-${hue}6) , <alpha-value>)`,
                "7": `rgba( var(--${prefix}-${hue}7) , <alpha-value>)`,
                "8": `rgba( var(--${prefix}-${hue}8) , <alpha-value>)`,
                "9": `rgba( var(--${prefix}-${hue}9) , <alpha-value>)`,
                "10": `rgba( var(--${prefix}-${hue}10) , <alpha-value>)`,
                "11": `rgba( var(--${prefix}-${hue}11) , <alpha-value>)`,
                "12": `rgba( var(--${prefix}-${hue}12) , <alpha-value>)`,
                "13": `rgba( var(--${prefix}-${hue}13) , <alpha-value>)`,

                "0A": `var(--${prefix}-${hue}0A)`,
                "1A": `var(--${prefix}-${hue}1A)`,
                "2A": `var(--${prefix}-${hue}2A)`,
                "3A": `var(--${prefix}-${hue}3A)`,
                "4A": `var(--${prefix}-${hue}4A)`,
                "5A": `var(--${prefix}-${hue}5A)`,
                "6A": `var(--${prefix}-${hue}6A)`,
                "7A": `var(--${prefix}-${hue}7A)`,
                "8A": `var(--${prefix}-${hue}8A)`,
                "9A": `var(--${prefix}-${hue}9A)`,
                "10A": `var(--${prefix}-${hue}10A)`,
                "11A": `var(--${prefix}-${hue}11A)`,
                "12A": `var(--${prefix}-${hue}12A)`,
                "13A": `var(--${prefix}-${hue}13A)`,

                "0P3": `var(--${prefix}-${hue}0P3)`,
                "1P3": `var(--${prefix}-${hue}1P3)`,
                "2P3": `var(--${prefix}-${hue}2P3)`,
                "3P3": `var(--${prefix}-${hue}3P3)`,
                "4P3": `var(--${prefix}-${hue}4P3)`,
                "5P3": `var(--${prefix}-${hue}5P3)`,
                "6P3": `var(--${prefix}-${hue}6P3)`,
                "7P3": `var(--${prefix}-${hue}7P3)`,
                "8P3": `var(--${prefix}-${hue}8P3)`,
                "9P3": `var(--${prefix}-${hue}9P3)`,
                "10P3": `var(--${prefix}-${hue}10P3)`,
                "11P3": `var(--${prefix}-${hue}11P3)`,
                "12P3": `var(--${prefix}-${hue}12P3)`,
                "13P3": `var(--${prefix}-${hue}13P3)`,

                "0AP3": `var(--${prefix}-${hue}0AP3)`,
                "1AP3": `var(--${prefix}-${hue}1AP3)`,
                "2AP3": `var(--${prefix}-${hue}2AP3)`,
                "3AP3": `var(--${prefix}-${hue}3AP3)`,
                "4AP3": `var(--${prefix}-${hue}4AP3)`,
                "5AP3": `var(--${prefix}-${hue}5AP3)`,
                "6AP3": `var(--${prefix}-${hue}6AP3)`,
                "7AP3": `var(--${prefix}-${hue}7AP3)`,
                "8AP3": `var(--${prefix}-${hue}8AP3)`,
                "9AP3": `var(--${prefix}-${hue}9AP3)`,
                "10AP3": `var(--${prefix}-${hue}10AP3)`,
                "11AP3": `var(--${prefix}-${hue}11AP3)`,
                "12AP3": `var(--${prefix}-${hue}12AP3)`,
                "13AP3": `var(--${prefix}-${hue}13AP3)`,
              },
            ];
          })
        ),
        white: {
          "": "#ffffff",
          "0A": `var(--${prefix}-white0A)`,
          "1A": `var(--${prefix}-white1A)`,
          "2A": `var(--${prefix}-white2A)`,
          "3A": `var(--${prefix}-white3A)`,
          "4A": `var(--${prefix}-white4A)`,
          "5A": `var(--${prefix}-white5A)`,
          "6A": `var(--${prefix}-white6A)`,
          "7A": `var(--${prefix}-white7A)`,
          "8A": `var(--${prefix}-white8A)`,
          "9A": `var(--${prefix}-white9A)`,
          "10A": `var(--${prefix}-white10A)`,
          "11A": `var(--${prefix}-white11A)`,
          "12A": `var(--${prefix}-white12A)`,
          "13A": `var(--${prefix}-white13A)`,
          "0AP3": `var(--${prefix}-white0AP3)`,
          "1AP3": `var(--${prefix}-white1AP3)`,
          "2AP3": `var(--${prefix}-white2AP3)`,
          "3AP3": `var(--${prefix}-white3AP3)`,
          "4AP3": `var(--${prefix}-white4AP3)`,
          "5AP3": `var(--${prefix}-white5AP3)`,
          "6AP3": `var(--${prefix}-white6AP3)`,
          "7AP3": `var(--${prefix}-white7AP3)`,
          "8AP3": `var(--${prefix}-white8AP3)`,
          "9AP3": `var(--${prefix}-white9AP3)`,
          "10AP3": `var(--${prefix}-white10AP3)`,
          "11AP3": `var(--${prefix}-white11AP3)`,
          "12AP3": `var(--${prefix}-white12AP3)`,
          "13AP3": `var(--${prefix}-white13AP3)`,
        },
        black: {
          "": "#000000",
          "0A": `var(--${prefix}-black0A)`,
          "1A": `var(--${prefix}-black1A)`,
          "2A": `var(--${prefix}-black2A)`,
          "3A": `var(--${prefix}-black3A)`,
          "4A": `var(--${prefix}-black4A)`,
          "5A": `var(--${prefix}-black5A)`,
          "6A": `var(--${prefix}-black6A)`,
          "7A": `var(--${prefix}-black7A)`,
          "8A": `var(--${prefix}-black8A)`,
          "9A": `var(--${prefix}-black9A)`,
          "10A": `var(--${prefix}-black10A)`,
          "11A": `var(--${prefix}-black11A)`,
          "12A": `var(--${prefix}-black12A)`,
          "13A": `var(--${prefix}-black13A)`,
          "0AP3": `var(--${prefix}-black0AP3)`,
          "1AP3": `var(--${prefix}-black1AP3)`,
          "2AP3": `var(--${prefix}-black2AP3)`,
          "3AP3": `var(--${prefix}-black3AP3)`,
          "4AP3": `var(--${prefix}-black4AP3)`,
          "5AP3": `var(--${prefix}-black5AP3)`,
          "6AP3": `var(--${prefix}-black6AP3)`,
          "7AP3": `var(--${prefix}-black7AP3)`,
          "8AP3": `var(--${prefix}-black8AP3)`,
          "9AP3": `var(--${prefix}-black9AP3)`,
          "10AP3": `var(--${prefix}-black10AP3)`,
          "11AP3": `var(--${prefix}-black11AP3)`,
          "12AP3": `var(--${prefix}-black12AP3)`,
          "13AP3": `var(--${prefix}-black13AP3)`,
        },
        // white: '#ffffff',
        // black: '#000000',
        transparent: "transparent",
        current: "currentColor",
        inherit: "inherit",

        ...(extend ? theme.colors : []),
      } as Theme["colors"];
    },
    preflights: [
      {
        getCSS: () => genCSS(safeListColors, safeListAliases, aliases, darkSelector, lightSelector, prefix),

      },
    ],
    // postprocess: (util) => {
    //   if (util.selector === 'bg-green4'){
    //     // console.log("🚀 ~ util.selector:", util.)
    //   }

    //   // util
    // }
  };
}

export function genCSS(
  safeListColors: PresetRadixOptions["safeListColors"] = [],
  safeListAliases: PresetRadixOptions["safeListAliases"] = [],
  aliases: Aliases,
  darkSelector: string,
  lightSelector: string,
  prefix: string
): string {
  const lightThemeCSS: string[] = [];
  const darkThemeCSS: string[] = [];

  const safeList = [...safeListColors, ...safeListAliases];

  if (safeList.length === 0) return "";
  const alphas: Alpha[] = ["", "A"];
  const P3s: P3[] = ["", "P3"];
  const shades: Shade[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];

  for (const hueOrAlias of safeList) {
    const isAlias = !radixHues.includes(hueOrAlias as RadixHue);
    if (isAlias && !aliases?.[hueOrAlias]) continue; // if the safelisted alias is not in aliases object skip to next iteration;
    const hue = isAlias ? aliases[hueOrAlias] : (hueOrAlias as RadixHue);
    for (const alpha of alphas) {
      if (["black", "white"].includes(hue) && alpha === "") continue; // skip to next iteration for black and whie with no alpha
      for (const p3 of P3s) {
        for (const shade of shades) {
          lightThemeCSS.push(
            `--${prefix}-${hueOrAlias}${shade}${alpha}${p3}: ${getColorValue({ hue, shade, alpha, dark: "", p3 })};`
          );
          darkThemeCSS.push(
            `--${prefix}-${hueOrAlias}${shade}${alpha}${p3}: ${getColorValue({ hue, shade, alpha, dark: "Dark", p3 })};`
          );
        }
      }
    }
  }

  return `${lightSelector} {
  ${lightThemeCSS.join("\n")}
}
${darkSelector} {
  ${darkThemeCSS.join("\n")}
}`;
}
