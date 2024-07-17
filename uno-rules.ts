import type { Rule, Shortcut } from "unocss";
export const rules: Rule[] = [
  ["max-w-page", { "max-width": 'var(--max-w-page)' }],
  ["font-display", { "font-family": 'var(--font-display)' }],
  ["font-content", { "font-family": 'var(--font-content)' }],
  ["font-mono", { "font-family": 'var(--font-mono)' }],
  ["text-larger", { "font-size": 'var(--larger-font-size)' }],
  ["text-smaller", { "font-size": "var(--smaller-font-size)" }],
  [/^line-height-(.*)$/, ([, x]) => ({ "line-height": `calc(${x} * var(--line-height))` })],
  // project specific
  [/^var-(.*):(.*)$/, ([, varName, value]) => ({ [`--${varName}`]: `${value}` })],
  [/^content-(.*)$/, ([, cnt]) => ({ content: `"${cnt}"` })],

  // font size utility classes without affecting line height
  ["fs-2xs", { "font-size": "0.625rem" }], // 10px
  ["fs-xs", { "font-size": "0.75rem" }], // 12px
  ["fs-sm", { "font-size": "0.875rem" }], // 14px
  ["fs-md", { "font-size": "1rem" }], // 16px
  ["fs-base", { "font-size": "1rem" }], // 16px
  ["fs-lg", { "font-size": "1.125rem" }], // 18px
  ["fs-xl", { "font-size": "1.25rem" }], // 20px
  ["fs-2xl", { "font-size": "1.5rem" }], // 24px
  ["fs-3xl", { "font-size": "1.875rem" }], // 30px
  ["fs-4xl", { "font-size": "2.25rem" }], // 36px
  ["fs-5xl", { "font-size": "3rem" }], // 48px
  ["fs-6xl", { "font-size": "3.75rem" }], // 60px
  ["fs-7xl", { "font-size": "4.5rem" }], // 72px
  ["fs-8xl", { "font-size": "6rem" }], // 96px
  ["fs-9xl", { "font-size": "8rem" }], // 128px
  // line height utility classes
  ["max-w-main", { "max-width": "calc(100vw - var(--sidebar-width) - 3rem)" }],
  ["max-table-width-in-mobile", { "max-width": "calc(100vw - 4rem)" }],
  ["w-sidebar", { width: "var(--sidebar-width)" }],

  ["ls-tightest", { "letter-spacing": "-0.025em" }],
  ["ls-tighter", { "letter-spacing": "-0.0125em" }],
  ["ls-tight", { "letter-spacing": "-0.00625em" }],
  ["ls-normal", { "letter-spacing": "0" }],
  ["ls-wide", { "letter-spacing": "0.00625em" }],
  ["ls-wider", { "letter-spacing": "0.0125em" }],
  ["ls-widest", { "letter-spacing": "0.025em" }],
  ["rel", { position: "relative" }],
  ["abs", { position: "absolute" }],
  ["text-2xs", { "font-size": "0.6rem", "line-height": "0.9rem" }],
  ["shd-1", { "box-shadow": "var(--shadow-1)" }],
  ["shd-2", { "box-shadow": "var(--shadow-2)" }],
  ["shd-3", { "box-shadow": "var(--shadow-3)" }],
  ["shd-4", { "box-shadow": "var(--shadow-4)" }],
  ["shd-5", { "box-shadow": "var(--shadow-5)" }],
  ["shd-tinted-1", { "box-shadow": "var(--shadow-tinted-1)" }],
  ["shd-tinted-2", { "box-shadow": "var(--shadow-tinted-2)" }],
  ["shd-tinted-3", { "box-shadow": "var(--shadow-tinted-3)" }],
  ["shd-tinted-4", { "box-shadow": "var(--shadow-tinted-4)" }],
  ["shd-tinted-5", { "box-shadow": "var(--shadow-tinted-5)" }],

  [
    /^grid-min-col-(.*)$/,
    ([, minColWidth]) => ({ "grid-template-columns": `repeat(auto-fill, minmax(min(${minColWidth}, 100%), 1fr))` }),
  ],
  // [/^g-span-row-(.*)$/, ([, gridRow]) => ({ "grid-row": `span ${gridRow}` })],
  // [/^g-span-col-(.*)$/, ([, gridCol]) => ({ "grid-column": `span ${gridCol}` })],
  [/^g-row-(.*)$/, ([, gridRow]) => ({ "grid-row": gridRow })],
  [/^g-col-(.*)$/, ([, gridCol]) => ({ "grid-column": gridCol })],
  [
    "glass-effect",
    {
      "background-image": "url('/static/noise.svg')",
      "background-size": "auto",
      "background-repeat": "repeat",
      "backdrop-filter": "blur(10px)",
    },
  ],
];

export const shortcuts: Shortcut[] = [
  {
    "skeleton-text": "animate-pulse rounded-md bg-sand5 h-[calc(var(--line-height)-0.2em)] py-[0.1em]  bg-clip-content",
    skeleton: "animate-pulse rounded-md bg-sand5 h-[var(--line-height)]",
    "iso-rel": "relative isolate",
    field: "px-2 py-1 rd b-1 b-transparent bg-gray2",
    chip: "no-underline rd-xl px-4 py-2 bg-gray1 c-sand11 hover:bg-gray2",
    "chip-link": "chip data-[in-path=true]:bg-accent9 data-[in-path=true]:c-accent1",
    jc: "justify-center",
    jb: "justify-between",
    ic: "items-center",
    ac: "items-center",
    "tab-link":
      "b rd-lg text-center  px-4 py-2 hover:b-accent7 hover:c-accent11 data-[in-path]:b-accent7 data-[in-path]:c-accent11",
    "tab-radix": "b b-accent6 c-accent11 rd-2xl hover:b-accent7 hover:c-accent12  data-[state=active]:bg-accent3",
    "btn-disabled": "!c-gray9 !bg-gray5 !b-gray5",
    "btn-accent":
      "b-1   fw-500 px-4 py-1 rd-lg b-accent10 bg-accent10 c-white  hover:bg-accent9 hover:b-accent9 focus:bg-accent9 focus:b-accent9 active:bg-accent11 active:b-accent9 disabled:btn-disabled",
    "btn-danger":
      "b-1 fw-500 px-4 py-1 rd-lg b-red10 bg-red10 c-white  hover:bg-red9 hover:b-red9 focus:bg-red9 focus:b-red9 active:bg-red11 active:b-red9 disabled:btn-disabled",
    "btn-text":
      "b-1  fw-500 px-4 py-1 rd-lg b-transparent bg-transparent c-gray12  hover:bg-gray2 hover:b-gray2 focus:bg-gray2 focus:b-gray2 active:bg-gray3 active:b-gray3 disabled:btn-disabled",
    "btn-text-accent":
      "b-1  fw-500 px-4 py-1 rd-lg b-transparent bg-transparent c-accent11  hover:bg-accent2 hover:b-accent2 focus:bg-accent2 focus:b-accent2 active:bg-accent3 active:b-accent3 disabled:btn-disabled",
    btn: "b-1   fw-500 px-4 py-1 rd-lg b-gray10 bg-gray10 c-white  hover:bg-gray9 hover:b-gray9 focus:bg-gray9 focus:b-gray9 active:bg-gray11 active:b-gray9 disabled:btn-disabled",
    "btn-ghost-accent":
      " b-1   fw-500 px-4 py-1 rd-lg b-accent7 c-accent11 active:b-accent11 active:bg-accent1 hover:b-accent9 hover:bg-accent1 focus:b-accent9 focus:bg-accent1 disabled:btn-disabled",
    "btn-ghost":
      " b-1 fw-500 px-4 py-1 rd-lg b-gray7 c-sand11 active:b-gray11 active:bg-gray1 hover:b-gray9 hover:bg-gray1 focus:b-gray9 focus:bg-gray1 disabled:btn-disabled",
    // "btn-link-accent":
    //   " b-1 b-transparent   fw-500 px-4 py-1 rd-lg  c-accent11 active:(b-accent3 bg-accent3) hover:(b-accent2  bg-accent2) focus:(b-accent2 bg-accent2) disabled:(btn-disabled)",
    // "btn-link":
    //   " b-1 b-transparent   fw-500 px-4 py-1 rd-lg  c-sand11 active:(b-gray3 bg-gray3) hover:(b-gray2  bg-gray2) focus:(b-gray2 bg-gray2) disabled:(btn-disabled)",
    "snack-info":
      "text-sm b-1 b-blue7 b-l-4 bg-blue3 c-blue11 rd-lg p-4 pis-12 rel isolate before:inline-block before:content-none  before:i-ph-info before:vertical-text-top before:abs before:top-5 before:left-4",
    "snack-warning":
      "text-sm b-1 b-yellow7 b-l-4 bg-yellow3 c-yellow11 rd-lg p-4 pis-12 rel isolate before:inline-block before:content-none  before:i-ph-warning before:vertical-text-top before:abs before:top-5 before:left-4",
    "snack-success":
      "text-sm b-1 b-green7 b-l-4 bg-green3 c-green11 rd-lg p-4 pis-12 rel isolate before:inline-block before:content-none  before:i-ph-check-circle before:vertical-text-top before:abs before:top-5 before:left-4",
    "snack-error":
      "text-sm b-1 b-red7 b-l-4 bg-red3 c-red11 rd-lg p-4 pis-12 rel isolate before:inline-block before:content-none  before:i-ph-x-circle before:vertical-text-top before:abs before:top-5 before:left-4",
    "snack-danger":
      "text-sm b-1 b-red7 b-l-4 bg-red3 c-red11 rd-lg p-4 pis-12 rel isolate before:inline-block before:content-none  before:i-ph-warning-octagon before:vertical-text-top before:abs before:top-5 before:left-4",
    "info-line": "bf-i-ph-info before:c-blue11 before:opacity-100 text-sm c-blue10 ",
    "success-line": "bf-i-ph-check-circle before:c-green11 before:opacity-100 text-sm c-green10",
    "warning-line": "bf-i-ph-warning before:c-yellow11 before:opacity-100 text-sm c-yellow10",
    "error-line": "bf-i-ph-x-circle before:c-red11 before:opacity-100 text-sm c-red10",
    "danger-line": "bf-i-ph-warning-octagon before:c-red11 before:opacity-100 text-sm c-red10",
    snack: "b b-gray7 bg-gray3 c-sand11 rd-lg p-4 text-sm",
    H1: "fs-3xl sm:fs-4xl  ls-tightest",
    H2: "fs-2xl sm:fs-3xl  ls-tighter",
    H3: "fs-xl sm:fs-2xl  ls-tighter",
    H4: "fs-lg sm:fs-xl ls-tight",
    'text-caption': "text-xs ",
    'text-all-caps': "uppercase tracking-wider",
    "large-title": "fs-5xl sm:fs-7xl md:fs-9xl  fw-900 ls-tightest ",
    "text-note": "c-sand11 text-sm",
    "text-tiny-note": "c-sand11 text-xs",
    "table-header-cell":
      "px-2 py-1 pt-2 first-of-type:pis-4 first-of-type:rd-tl-xl  last-of-type:pie-4  last-of-type:rd-tr-xl",
    "table-body-cell": "px-2 py-4 first-of-type:pis-4  last-of-type:pie-4",
    "table-footer-cell":
      "b-gray5 px-2 py-1 pb-3 first-of-type:pis-4 first-of-type:rd-bl-xl  last-of-type:pie-4  last-of-type:rd-br-xl b-e-1 ",
    "mx-responsive": "mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-24 2xl:mx-36",
    "my-responsive": "my-4 sm:my-4 md:my-6 lg:my-8 xl:my-12 2xl:my-24",
    "px-responsive": "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-36",
    "py-responsive": "py-4 sm:py-4 md:py-6 lg:py-8 xl:py-12 2xl:py-24",
  },
  [
    /^bf-i-(.*)$/,
    ([, iconName]) =>
      `before:opacity-40 before:mie-2 empty:before:mie-0 before:vertical-middle before:scale-120 translate-y--0.125em  before:content-none before:inline-block before:i-${iconName}`,
  ],
  [
    /^af-i-(.*)$/,
    ([, iconName]) =>
      `after:opacity-40 after:mis-2 empty:after:mis-0 after:vertical-middle after:scale-120  after:content-none before:inline-block after:i-${iconName}`,
  ],
  [/^ol-(.*)$/, ([, val]) => `outline-${val}`],
];
