import { Plugin } from "unified"

// declare module "remark-preset-lint-markdown-style-guide" {
//   declare const html: Plugin<[htmlOptions?]>
//   export = html
// }

declare module "remark-preset-lint-markdown-style-guide" {
  declare const recommand: Plugin
  export = recommand
}
