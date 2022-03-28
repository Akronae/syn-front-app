window.document.body.addEventListener('touchstart', onTouchStart, { passive: true, capture: true })
window.document.body.addEventListener('touchmove', onTouchMove, { passive: true, capture: true })
window.document.body.addEventListener('touchend', onTouchEnd, { passive: true, capture: true })
window.document.body.addEventListener('mousemove', onMouseMoved, { passive: true, capture: true })

let lastTouchStart
let currentTouchDelta = { x: 0, y: 0 }
let mousePos = { x: 0, y: 0 }

function onTouchStart (event)
{
    lastTouchStart = event.touches[0]
}

function onTouchMove (event)
{
    const touch = event.touches[0]

    currentTouchDelta.x = touch.screenX - lastTouchStart.screenX
    currentTouchDelta.y = touch.screenY - lastTouchStart.screenY

    mousePos.x = touch.screenX
    mousePos.y = touch.screenY
}

function onTouchEnd (event)
{
    currentTouchDelta.x = 0
    currentTouchDelta.y = 0
}

function onMouseMoved (event)
{
    mousePos.x = event.clientX
    mousePos.y = event.clientY
}

export default { currentTouchDelta, lastTouchStart, mousePos }