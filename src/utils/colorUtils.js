/**
 * @param {number[]|string} rgb 
 */
function luminanace (rgb)
{
    rgb = colorStringToArray(rgb)
    
    var a = rgb.map(function (v)
    {
        v /= 255

        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 )
    })

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

/**
 * @param {number[]|string} rgb1 
 * @param {number[]|string} rgb2 
 */
function contrast (rgb1, rgb2)
{
    var lum1 = luminanace(rgb1)
    var lum2 = luminanace(rgb2)
    var brightest = Math.max(lum1, lum2)
    var darkest = Math.min(lum1, lum2)

    return (brightest + 0.05) / (darkest + 0.05)
}

/**
 * @param {string|number[]} str 
 */
function colorStringToArray (str)
{
    if (typeof str != 'string') return str

    return str.includes('#')
        ? str.match(/#([a-fA-F0-9]{6})/)[1].match(/.{2}/gm).map(e => Number.parseInt(e, 16))
        : str.trim().split(',').map(e => Number.parseInt(e.replace(/\D/gm, '')))
}

export default { luminanace, contrast }