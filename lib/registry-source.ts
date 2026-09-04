import fs from "node:fs"
import path from "node:path"

const REGISTRY_DIR = path.join(process.cwd(), "registry", "servfaz")

/** Lê o arquivo fonte real de registry/servfaz/<name>.tsx, sempre em sincronia com o componente publicado. */
export function readComponentSource(name: string): string {
  const filePath = path.join(REGISTRY_DIR, `${name}.tsx`)
  return fs.readFileSync(filePath, "utf8").trimEnd()
}
