import { Plugin } from "unified"

declare module "rehype-highlight" {
  declare const highlight: Plugin
  export = highlight
}
