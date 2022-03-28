import RandomUtils from '@/utils/randomUtils'

function createParticle ({ x = [0, innerWidth], y = [0, innerHeight], size = [5, 25], duration = [500, 1500], delay = [0, 300], zIndex = 5,
    color, text, destinationX, destinationY, opacity = {from: 1, to: 0} } = {})
{
    const particle = document.createElement('particle')
    document.body.appendChild(particle) 
    if (Array.isArray(x)) x = RandomUtils.getRandomInt(x[0], x[1])
    if (Array.isArray(y)) y = RandomUtils.getRandomInt(y[0], y[1])
    if (Array.isArray(size)) size = RandomUtils.getRandomInt(size[0], size[1])
    if (Array.isArray(duration)) duration = RandomUtils.getRandomInt(duration[0], duration[1])
    if (Array.isArray(delay)) delay = RandomUtils.getRandomInt(delay[0], delay[1])
    if (!color) color = `hsl(${RandomUtils.getRandomInt(0, 360)}, ${RandomUtils.getRandomInt(60, 80)}%, ${RandomUtils.getRandomInt(50, 85)}%)`
    
    if (!destinationX) destinationX = x + (Math.random() - 0.5) * 2 * 75
    else if (Array.isArray(destinationX)) destinationX = RandomUtils.getRandomInt(destinationX[0], destinationX[1])
    
    if (!destinationY) destinationY = y + (Math.random() - 0.5) * 2 * 75
    else if (Array.isArray(destinationY)) destinationY = RandomUtils.getRandomInt(destinationY[0], destinationY[1])

    particle.style.position = 'fixed'
    particle.style.left = 0
    particle.style.top = 0
    particle.style.borderRadius = '50%'
    particle.style.pointerEvents = 'none'
    particle.style.opacity = 0
    particle.style.zIndex = zIndex
    particle.style.width = `${size}px`
    particle.style.height = `${size}px` 
    if (text)
    {
        let selected = text
        if (Array.isArray(text)) selected = text[RandomUtils.getRandomInt(0, text.length - 1)]
        particle.innerHTML = selected
        particle.style.color = color
        particle.style.fontSize = size + 'px'
    }
    else
    {
        particle.style.background = color
    }

    const animation = particle.animate(
    [
        {
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
            opacity: opacity.from
        },
        {
            transform: `translate(${destinationX}px, ${destinationY}px)`,
            opacity: opacity.to
        }
    ],
    {
        duration,
        easing: 'cubic-bezier(.94,.73,.34,.83)',
        delay
    })

    animation.onfinish = () =>
    {
        particle.remove()
    }
}

export default { createParticle }