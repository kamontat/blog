import { Plugin } from "unified"

declare module "rehype-highlight" {
  declare const remark: Plugin
  export = remark
}
