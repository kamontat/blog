import { Plugin } from "unified"

declare module "remark-preset-lint-markdown-style-guide" {
  declare const recommand: Plugin
  export = recommand
}
