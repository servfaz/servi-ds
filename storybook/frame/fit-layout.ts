/**
 * O layout do Storybook ocupa 100dvh. Com o header em cima, ele passa a caber
 * na área abaixo dele: todo elemento dos primeiros níveis de #root que ficar
 * mais alto que o próprio #root recebe height 100%.
 */
const SHALLOW = ":scope > *, :scope > * > *, :scope > * > * > *"

export function fitLayoutToRoot(root: HTMLElement) {
  let frame = 0

  const fit = () => {
    frame = 0
    const limit = root.clientHeight + 1
    root.querySelectorAll<HTMLElement>(SHALLOW).forEach((element) => {
      if (element.getBoundingClientRect().height > limit) element.style.height = "100%"
    })
  }

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(fit)
  }

  new MutationObserver(schedule).observe(root, { childList: true, subtree: true })
  window.addEventListener("resize", schedule)
  schedule()
}
