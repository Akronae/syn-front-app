import MathUtils from '@/utils/mathUtils'
import TouchUtils from '@/utils/touchUtils'
import ColorUtils from '@/utils/colorUtils'
import theme from '@/theme'

function animateCSS (element, animationName, duration, callback)
{
    if (!element) return
    if (typeof element == 'string') element = document.querySelector(element)
    
    if (duration == undefined) duration = '1s'

    // element.classList.add('animated', animationName)
    element.style.animation = animationName
    element.style.animationDuration = duration

    let parsedDuration = duration

    if (typeof parsedDuration == 'number')
    {
        // if < 1, probably the given number was to be understood as seconds
        if (parsedDuration < 1) parsedDuration *= 1000
    }
    else if (parsedDuration.includes('ms'))
    {
        parsedDuration = parsedDuration.replace('ms', '')
    }
    else if (parsedDuration.includes('s'))
    {
        parsedDuration = parsedDuration.replace('s', '')
        parsedDuration = Number.parseFloat(parsedDuration) * 1000
    }

    setTimeout(() =>
    {
        if (!element) return
        element.classList.remove('animated', animationName)
        element.style.animation = null
        element.style.animationDuration = null

        if (typeof callback === 'function') callback()
    }, parsedDuration)
}

function getMatchingMediaName ()
{
    if (window.matchMedia(`(min-width: ${theme.properties.screenMdMin})`).matches)
    {
        return 'desktop'
    }
    if (window.matchMedia(`(min-width: ${theme.properties.screenSmMin})`).matches)
    {
        return 'tablet'
    }
    
    return 'mobile'
}

function isLargeMobile ()
{
    return window.matchMedia('only screen and (min-device-width: 375px) and (min-device-height: 668px) and (max-width: 681px)').matches
}

function isSmallMobile ()
{
    return window.matchMedia('only screen and (max-width: 320px) and (max-height: 566px)').matches
}

function isLargeDesktop ()
{
    return window.matchMedia('only screen and (min-width: 1500px)').matches
}

function getWindowYScroll ()
{
    return window.pageYOffset || 
           document.body.scrollTop ||
           document.documentElement.scrollTop || 0
}

function getDocumentHeight ()
{
    return Math.max(
        document.body.scrollHeight || 0, 
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0, 
        document.documentElement.offsetHeight || 0,
        document.body.clientHeight || 0, 
        document.documentElement.clientHeight || 0
    )
}

function getScrollDistanceFromDocumentBottom ()
{
    return getDocumentHeight() - (getWindowYScroll() + document.documentElement.clientHeight)
}

function createRange (node, chars, range)
{
    if (!range)
    {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
    }

    if (chars.count === 0)
    {
        range.setEnd(node, chars.count);
    }
    else if (node && chars.count >0)
    {
        if (node.nodeType === Node.TEXT_NODE)
        {
            if (node.textContent.length < chars.count)
            {
                chars.count -= node.textContent.length;
            }
            else
            {
                range.setEnd(node, chars.count);
                chars.count = 0;
            }
        }
        else
        {
            for (let lp = 0; lp < node.childNodes.length; lp++)
            {
                range = createRange(node.childNodes[lp], chars, range);

                if (chars.count === 0) break;
            }
        }
    }    

    return range;
}

function setCurrentCursorPosition (node, chars)
{
    if (chars >= 0)
    {
        let selection = window.getSelection();

        const range = createRange(node.parentNode, { count: chars });

        if (range)
        {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {Number} topMargin 
 */
function scrollToElement (element, topMargin = 50)
{
    setTimeout(() =>
    {
        element.scrollIntoView({ alignToTop: true })
        setTimeout(() => scrollBy(0, -topMargin), 0)
    }, 0)
}

function getElementContentRect (element)
{
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect()

    rect.width -= Number.parseFloat(style.paddingLeft) + Number.parseFloat(style.paddingRight)
    rect.height -= Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom)
    
    rect.width -= Number.parseFloat(style.borderLeftWidth) + Number.parseFloat(style.borderRightWidth)
    rect.height -= Number.parseFloat(style.borderTopWidth) + Number.parseFloat(style.borderBottomWidth)

    return rect
}

function setFavicon (url)
{
    let link = document.querySelector('link[rel*="icon"]') || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
}

function getElementNodeIndex (elem)
{
    for (var i = 0; (elem=elem.previousSibling); i++);

    return i
}

/**
 * @param {Boolean} scrolling 
 */
function toggleBodyScrolling (scrolling)
{
    const scrollPos = {x: window.scrollX, y: window.scrollY }

    window.onscroll = scrolling
        ? undefined
        : () => window.scrollTo(scrollPos.x, scrollPos.y)

    document.body.style.overflow = scrolling ? '' : 'hidden'
}

/**
 * @param {String} rule 
 */
function addCssRule (rule)
{
    const styles = document.getElementsByTagName('style')
    styles[styles.length - 1].innerHTML += rule
}

/**
 * 
 * @param {HTMLElement} el 
 */
function isMouseOverElement (el)
{
    return MathUtils.areRectsColliding(el.getBoundingClientRect(), MathUtils.rectFromPoint(TouchUtils.mousePos))
}

/**
 * 
 * @param {HTMLElement} el 
 */
function isElementVisible (el)
{
    // Thanks jQuery :)
    return !!( el.offsetWidth || el.offsetHeight || el.getClientRects().length )
    // you still suck though
}

/**
 * 
 * @param {HTMLElement} el 
 * @param {Function} callback 
 */
function onElementVisible (el, callback)
{
    const observer = new IntersectionObserver((entries, observer) =>
    {
        if (!el || !el.parentElement || !el.style) return observer.disconnect()
        callback(el, entries, observer)
    },
    { root: document.documentElement });

    observer.observe(el);
}

function appendScriptElem (src)
{
    var s = document.createElement('script');
    s.setAttribute('src', src);
    document.body.appendChild(s);

    return new Promise(resolve =>
    {
        s.onload = resolve
    })
}

function invertTextColorsIfNeeded (rootElement)
{
    const backgroundColor = window.getComputedStyle(rootElement).backgroundColor
    const elems = rootElement.querySelectorAll('p, span, strong')

    for (let elem of elems)
    {
        const color = elem.style.color
        if (!color) continue

        const contrast = ColorUtils.contrast(backgroundColor, color)
        const MIN_CONTRAST = 1.6
        if (contrast < MIN_CONTRAST)
        {
            console.log('Inverting color of', elem, 'contrast is', contrast, '<', MIN_CONTRAST, 'compared to background', backgroundColor)
            elem.style.filter = 'invert(1)'
        }
    }
}

const nbsp = '\u00A0'



export default { animateCSS, getMatchingMediaName, isLargeMobile, isSmallMobile, isLargeDesktop, getWindowYScroll,
    getDocumentHeight, getScrollDistanceFromDocumentBottom, setCurrentCursorPosition, scrollToElement, getElementContentRect,
    setFavicon, getElementNodeIndex, toggleBodyScrolling, addCssRule, onElementVisible, nbsp, isMouseOverElement, isElementVisible,
    appendScriptElem, invertTextColorsIfNeeded }