import { Plugin } from "unified"

declare module "remark-images" {
  declare const highlight: Plugin
  export = highlight
}
