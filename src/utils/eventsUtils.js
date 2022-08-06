export default class EventsUtils
{
    static throttle (callback, limit)
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

    static debounce (func, wait, immediate, context)
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

    static setDelayedInterval (action, interval, delay, clearAfter)
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

    /**
     *
     * @param {string} eventName
     */
    static awaitEvent (eventName)
    {
        return new Promise(resolve =>
        {
            document.addEventListener(eventName, resolve)
        })
    }
    /**
     * @template T
     * @param {string} eventName
     * @param {T} detail
     * @returns {T}
     */
    static dispatchEvent (eventName, detail)
    {
        document.dispatchEvent(new CustomEvent(eventName, {detail}))
        return detail
    }
}