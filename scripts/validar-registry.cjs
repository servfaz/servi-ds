#!/usr/bin/env node
/*
 * Valida o registry.json antes de publicar.
 *
 * Roda no prebuild (todo `npm run build`, inclusive o da Vercel) e no
 * workflow "Validar registry" de cada PR. Se qualquer regra abaixo falhar, o
 * build para e nada é publicado em ds.servfaz.app: o registry no ar continua
 * sendo a última versão válida.
 *
 * Regras (erro):
 *  1. Nome de item único.
 *  2. Todo arquivo listado em `files` existe.
 *  3. Toda `registryDependencies` é a URL completa de um item deste registry
 *     (https://ds.servfaz.app/r/<nome>.json) e esse item existe aqui.
 *     Nome puro (ex. "button") resolve no registry oficial do shadcn, não no
 *     Servi DS, por isso é proibido.
 *  4. Todo import relativo de outro componente ("./popover") está declarado em
 *     `registryDependencies`. Sem isso, o consumidor recebe um arquivo que
 *     importa algo que não foi instalado.
 *  5. Todo pacote npm importado está em `dependencies` (react e react-dom
 *     vêm do próprio projeto consumidor).
 *  6. Import com alias "@/" só pode ser "@/lib/utils", o único caminho que
 *     existe em todo consumidor.
 *
 * Aviso (não para o build): componente em registry/servfaz/*.tsx sem item no
 * registry.json. Pode ser intencional, mas nenhum item publicado pode
 * depender dele (regras 3 e 4).
 */

const fs = require("fs")
const path = require("path")

const ROOT = path.resolve(__dirname, "..")
const BASE = "https://ds.servfaz.app/r/"
const PACOTES_DO_CONSUMIDOR = new Set(["react", "react-dom"])

const registry = JSON.parse(fs.readFileSync(path.join(ROOT, "registry.json"), "utf8"))
const itens = registry.items || []
const erros = []
const avisos = []

const nomes = new Set()
for (const item of itens) {
  if (nomes.has(item.name)) erros.push(`"${item.name}" aparece mais de uma vez em registry.json.`)
  nomes.add(item.name)
}

function nomeDaDependencia(dep) {
  if (!dep.startsWith(BASE) || !dep.endsWith(".json")) return null
  return dep.slice(BASE.length, -".json".length)
}

function pacoteDoImport(spec) {
  const partes = spec.split("/")
  return spec.startsWith("@") ? partes.slice(0, 2).join("/") : partes[0]
}

function nomeDoPacote(dep) {
  // "@radix-ui/react-popover@^1.1.0" -> "@radix-ui/react-popover"
  const i = dep.lastIndexOf("@")
  return i > 0 ? dep.slice(0, i) : dep
}

const IMPORT_RE = /(?:import|export)\s+(?:[^"';]*?\sfrom\s+)?["']([^"']+)["']/g

for (const item of itens) {
  const deps = item.registryDependencies || []
  const declaradas = new Set()

  for (const dep of deps) {
    const nome = nomeDaDependencia(dep)
    if (nome !== null) declaradas.add(nome)
    if (nome === null) {
      erros.push(`"${item.name}": registryDependencies "${dep}" precisa ser a URL completa ${BASE}<nome>.json.`)
    } else if (!nomes.has(nome)) {
      erros.push(`"${item.name}" depende de "${nome}", que não está publicado em registry.json. Publique "${nome}" antes ou junto.`)
    }
  }

  const pacotes = new Set((item.dependencies || []).map(nomeDoPacote))

  for (const arquivo of item.files || []) {
    const caminho = path.join(ROOT, arquivo.path)
    if (!fs.existsSync(caminho)) {
      erros.push(`"${item.name}": arquivo ${arquivo.path} não existe.`)
      continue
    }
    const fonte = fs.readFileSync(caminho, "utf8")
    for (const [, spec] of fonte.matchAll(IMPORT_RE)) {
      if (spec.startsWith("./") || spec.startsWith("../")) {
        const nome = path.basename(spec).replace(/\.(tsx?|jsx?)$/, "")
        if (!declaradas.has(nome)) {
          erros.push(`"${item.name}" importa "${spec}", mas não declara ${BASE}${nome}.json em registryDependencies.`)
        }
      } else if (spec.startsWith("@/")) {
        if (spec !== "@/lib/utils") {
          erros.push(`"${item.name}" importa "${spec}". O único alias permitido é "@/lib/utils".`)
        }
      } else {
        const pacote = pacoteDoImport(spec)
        if (!PACOTES_DO_CONSUMIDOR.has(pacote) && !pacotes.has(pacote)) {
          erros.push(`"${item.name}" importa o pacote "${pacote}", que não está em dependencies.`)
        }
      }
    }
  }
}

const pasta = path.join(ROOT, "registry", "servfaz")
const publicados = new Set(itens.flatMap((i) => (i.files || []).map((f) => path.normalize(f.path))))
for (const arquivo of fs.readdirSync(pasta)) {
  if (!arquivo.endsWith(".tsx")) continue
  const rel = path.normalize(path.join("registry", "servfaz", arquivo))
  if (!publicados.has(rel)) avisos.push(`${rel} não tem item em registry.json (não publicado).`)
}

for (const aviso of avisos) console.warn(`aviso: ${aviso}`)

if (erros.length) {
  console.error(`\nvalidar-registry: ${erros.length} erro(s). Nada foi publicado.\n`)
  for (const erro of erros) {
    console.error(`- ${erro}`)
    if (process.env.GITHUB_ACTIONS) console.log(`::error title=Registry inválido::${erro}`)
  }
  process.exit(1)
}

console.log(`validar-registry: ${itens.length} itens válidos.`)
