function throttle (callback, limit)
{
    let wait = false
    
    return function ()
    {
		let ctx = this, args = arguments

        if (!wait)
        {
            callback.apply(ctx, args)
            wait = true
            setTimeout(() => wait = false, limit)
        }
    }
}

function debounce (func, wait, immediate, context)
{
    let timeout
    
    return function ()
    {
		let ctx = this, args = arguments
        let later = function ()
        {
			timeout = null
			if (!immediate) func.apply(ctx, args)
		}
		let callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(ctx, args)
	}
}

function setDelayedInterval (action, interval, delay, clearAfter)
{
    if (!delay) delay = 0
    if (!clearAfter) clearAfter = -1

    let actionInterval
    setTimeout(() => actionInterval = setInterval(action, interval), delay)

    if (clearAfter > 0)
    {
        setTimeout(() => clearInterval(actionInterval), clearAfter)
    }
}

function onSplashscreenHidden ()
{
    return new Promise(resolve =>
    {
        if (navigator.splashscreen.visible == false) return resolve()
        document.addEventListener('splashscreenhidden', resolve)
    })
}

function onSplashscreenHidding ()
{
    return new Promise(resolve =>
    {
        if (navigator.splashscreen.visible == false) return resolve()
        document.addEventListener('splashscreenhidding', resolve)
    })
}

export default { throttle, debounce, setDelayedInterval, onSplashscreenHidden, onSplashscreenHidding }