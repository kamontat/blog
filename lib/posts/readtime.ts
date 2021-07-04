// Data from this article (https://www.funtrivia.com/askft/Question145725.html)
// I calculate read time by divide content character with average read time on adult human
export const calculateReadTime = (content: string): number => {
  if (content.length <= 0) return -1

  return content.length / 25
}
