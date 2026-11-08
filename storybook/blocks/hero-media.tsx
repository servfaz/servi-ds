/**
 * Mídia do hero: imagem estática ou vídeo (.webm), conforme o
 * caminho informado no frontmatter. O vídeo toca sem som uma vez só, quando a
 * página carrega, e para no último quadro. Para quem pediu menos movimento no
 * sistema, mostra só o poster.
 */
const VIDEO = /\.(webm|mp4)$/i

export function HeroMedia({
  src,
  poster,
  className,
}: {
  src: string
  /** Primeiro quadro do vídeo, mostrado enquanto carrega e com movimento reduzido. */
  poster?: string
  className?: string
}) {
  if (!VIDEO.test(src)) {
    return <img src={src} alt="" className={className} />
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
      {poster && (
        <img src={poster} alt="" className={`${className ?? ""} hidden motion-reduce:block`} />
      )}
    </>
  )
}
