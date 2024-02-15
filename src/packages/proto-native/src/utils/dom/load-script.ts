export function loadScript(src: string): Promise<void> {
  return new Promise((resolve) => {
    const script = document.createElement(`script`)
    script.type = `text/javascript`
    script.src = src
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    document.body.appendChild(script)
  })
}
