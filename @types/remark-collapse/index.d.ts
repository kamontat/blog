import { Plugin } from "unified"

declare module "remark-collapse" {
  declare const remark: Plugin
  export = remark
}
