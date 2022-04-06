export default class ArrayUtils
{
    static getLast (arr)
    {
        return arr[arr.length - 1]
    } 

    /**
     * 
     * @param  {...any[]} args 
     * @returns {any[]}
     */
    static firstNotEmpty (...args)
    {
        for (let arg of args)
        {
            if (arg && arg.length) return arg
        }
    }
}