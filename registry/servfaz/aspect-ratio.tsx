"use client"

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

/*
 * AspectRatio - base do Aspect Ratio do shadcn. Mantém a proporção do
 * conteúdo (imagem, vídeo, mapa). Sem estilo próprio.
 */

function AspectRatio(props: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }
