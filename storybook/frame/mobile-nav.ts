import type { API } from "storybook/manager-api"
import { STORY_CHANGED } from "storybook/internal/core-events"

const BUTTON = 'button[aria-label="Open navigation menu"]'
const LABEL_CLASS = "frame-mobile-nav__label"
const SEARCH_ID = "storybook-explorer-searchfield"

/** "Documentação/Introdução" e "Docs" viram grupo "Documentação" e página "Introdução". */
function labelFor(api: API) {
  const data = api.getCurrentStoryData() as { title?: string; name?: string } | undefined
  if (!data?.title) return null
  const parts = data.title.split("/")
  const group = parts.length > 1 ? parts[0] : ""
  const last = parts[parts.length - 1]
  const page = data.name && data.name !== "Docs" ? `${last} · ${data.name}` : last
  return { group, page }
}

/**
 * Barra de navegação inferior do Storybook em telas estreitas:
 * - mostra o grupo e o nome da página atual, no lugar do caminho completo
 *   ("Documentação/Introdução/Docs");
 * - o menu abre direto na lista de páginas. No iPhone, abrir o menu focava o
 *   campo de busca escondido, e a gaveta mostrava "Recently opened" primeiro.
 */
export function enhanceMobileNav(api: API) {
  const render = () => {
    const button = document.querySelector<HTMLButtonElement>(BUTTON)
    const label = labelFor(api)
    if (!button || !label) return

    let wrapper = button.querySelector<HTMLSpanElement>(`.${LABEL_CLASS}`)
    if (!wrapper) {
      wrapper = document.createElement("span")
      wrapper.className = LABEL_CLASS
      wrapper.innerHTML =
        '<span class="frame-mobile-nav__group"></span><span class="frame-mobile-nav__page"></span>'
      button.append(wrapper)
    }
    const group = wrapper.querySelector<HTMLSpanElement>(".frame-mobile-nav__group")!
    const page = wrapper.querySelector<HTMLSpanElement>(".frame-mobile-nav__page")!
    if (group.textContent !== label.group) group.textContent = label.group
    group.hidden = !label.group
    if (page.textContent !== label.page) page.textContent = label.page
  }

  api.on(STORY_CHANGED, () => requestAnimationFrame(render))
  // A barra só existe em telas estreitas e o Storybook a recria ao mudar de
  // layout: o rótulo volta sempre que ela reaparece.
  new MutationObserver(() => {
    const button = document.querySelector(BUTTON)
    if (button && !button.querySelector(`.${LABEL_CLASS}`)) render()
  }).observe(document.body, { childList: true, subtree: true })

  document.addEventListener("focusin", (event) => {
    const target = event.target as HTMLElement | null
    if (target?.id === SEARCH_ID && target.closest('[role="dialog"]')) target.blur()
  })

  render()
}
