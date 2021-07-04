import { Plugin } from "unified"

declare module "remark-slug" {
  declare const recommand: Plugin
  export = recommand
}
