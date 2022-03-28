function clamp (value, min, max)
{
    return Math.min(Math.max(value, min), max);
}

function isBetween (value, from, to)
{
    return clamp(value, from, to) == value
}

function rectFromPoint ({x, y} = {})
{
    return { top: y, left: x, bottom: y, right: x, width: 0, height: 0 }
}

function areRectsColliding (a, b)
{
    return a.top + a.height > b.top
        && a.left + a.width > b.left
        && a.bottom - a.height < b.bottom
        && a.right - a.width < b.right
}
export default { clamp, isBetween, areRectsColliding, rectFromPoint }