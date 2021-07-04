import { Plugin } from "unified"

declare module "remark-slug" {
  declare const remark: Plugin
  export = remark
}
