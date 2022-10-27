export default class ArrayUtils
{
    /**
     * @template T
     * @param {T} type 
     * @returns {T[]}
     */
    static empty (type)
    {
        return []
    }

    /**
     * @template T
     * @param {T[]} arr 
     * @returns T
     */
    static getLast (arr)
    {
        if (this.isEmpty(arr)) return null
        return arr[arr.length - 1]
    } 

    /**
     * @template T
     * @param {T[]} arr 
     * @param {T} value 
     * @returns {T}
     */
    static setLast (arr, value)
    {
        if (this.isEmpty(arr)) return null
        return arr[arr.length - 1] = value
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
        return []
    }

    static isEmpty (arr)
    {
        return (!Array.isArray(arr) || arr.length == 0)
    }

    /**
     * @template T
     * @param {Array<T>} arr 
     * @returns {Array<T>}
     */
    static clone (arr)
    {
        return arr.slice(0)
    }

    /**
     * @template T
     * @param {Array<T>} a 
     * @param {Array<T>} b 
     * @param {Object} args
     * @param {boolean} [args.ignoreOrder]
     * @returns {boolean}
     */
    static areEqual (a, b, { ignoreOrder = false } = {})
    {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
      
        if (ignoreOrder)
        {
            a = this.clone(a).sort()
            b = this.clone(b).sort()
        }
      
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    /**
     * @template T
     * @param {Array<T>} arr 
     * @returns {Array<T>}
     */
    static removeDuplicates (arr)
    {
        return Array.from(new Set(arr))
    }

    /**
     * @template T
     * @param {Array<T>} arr 
     * @param {...T} toRemove 
     * @returns {Array<T>}
     */
    static removeAll (arr, ...toRemove)
    {
        return arr.filter(item => !toRemove.includes(item))
    }
}