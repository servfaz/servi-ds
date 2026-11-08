/**
 * Mídia do hero: imagem estática ou vídeo (.webm), conforme o
 * caminho informado no frontmatter. O vídeo toca sem som uma vez só, quando a
 * página carrega, e para no último quadro. Para quem pediu menos movimento no
 * sistema, mostra só o poster.
 *
 * Safari e iPhone (todo navegador do iOS usa o motor do Safari) não mostram a
 * transparência do .webm: o fundo aparece preto. Neles entra a versão animada
 * em .webp, que também toca uma vez só e para no último quadro.
 */
const VIDEO = /\.(webm|mp4)$/i

function lacksWebmAlpha() {
  if (typeof navigator === "undefined") return false
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/.test(ua)) return true
  return /AppleWebKit/.test(ua) && /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR|Android/.test(ua)
}

export function HeroMedia({
  src,
  poster,
  animated,
  className,
}: {
  src: string
  /** Primeiro quadro do vídeo, mostrado enquanto carrega e com movimento reduzido. */
  poster?: string
  /** Versão animada em .webp, usada no Safari e no iPhone. */
  animated?: string
  className?: string
}) {
  if (!VIDEO.test(src)) {
    return <img src={src} alt="" className={className} />
  }

  const posterImage = poster && (
    <img src={poster} alt="" className={`${className ?? ""} hidden motion-reduce:block`} />
  )

  if (animated && lacksWebmAlpha()) {
    return (
      <>
        <img src={animated} alt="" className={`${className ?? ""} motion-reduce:hidden`} />
        {posterImage}
      </>
    )
  }

  const type = src.toLowerCase().endsWith(".mp4") ? "video/mp4" : "video/webm"

  return (
    <>
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={poster}
        aria-hidden="true"
        className={`${className ?? ""} motion-reduce:hidden`}
      >
        <source src={src} type={type} />
      </video>
      {posterImage}
    </>
  )
}
