export class Slug {
  static parseSlugname(slugname: string): Slug {
    const bySlash = slugname.split("/")
    if (bySlash.length === 2) {
      return Slug.parseFilename(bySlash[0], bySlash[1])
    } else {
      return Slug.parseFilename(undefined, slugname)
    }
  }

  static parseFilename(language: string | undefined, filename: string): Slug {
    const fname = filename.replace(/\.md$/, "")
    const byDot = fname.split(".", 3)

    const isDraft = fname.startsWith(".draft")
    const idIndex = isDraft ? 1 : 0
    const nameIndex = isDraft ? 2 : 1

    const defaultID = 0
    const id = byDot.length === 2 ? parseInt(byDot[idIndex]) : defaultID
    const name = byDot.length >= 2 ? byDot[nameIndex] : fname

    return new Slug(isFinite(id) ? id : defaultID, language, name, isDraft)
  }

  constructor(
    public readonly id: number,
    public readonly language: string | undefined,
    public readonly name: string,
    public readonly isDraft: boolean
  ) {}

  toFilename(): string {
    const lang = this.language ? this.language + "/" : ""
    const draft = this.isDraft ? ".draft." : ""
    const prefix = this.id > 0 ? this.id.toString() + "." : ""
    const name = this.name
    const ext = ".md"

    return `${lang}${draft}${prefix}${name}${ext}`
  }

  equal(s: Slug): boolean {
    return s.toFilename() === this.toFilename()
  }
}
