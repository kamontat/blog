import { Plugin } from "unified"

declare module "remark-images" {
  declare const remark: Plugin
  export = remark
}
