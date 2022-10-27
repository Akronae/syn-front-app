import StringUtils from './StringUtils'

export default class GreekNumerals
{
    static BASE =
    {
        4: 'τέσσαρες',
        10: 'δεκα'
    }

    /**
     * @param {string} str 
     * @returns {Boolean}
     */
    static isNumber (str)
    {
        return StringUtils.replaceAny(str, Object.values(this.BASE), StringUtils.EMPTY) == StringUtils.EMPTY
    }

    static wordsToNumber (str)
    {
        var num = 0
        const BASES_BY_LENGTH = Object.entries(this.BASE).sort((a, b) => b[1].length - a[1].length)
        
        const nbrs = []
        while (str.length > 0)
        {
            const beforeLen = str.length
            for (const [baseNbr, baseStr] of BASES_BY_LENGTH)
            {
                if (str.startsWith(baseStr))
                {
                    nbrs.push(Number.parseInt(baseNbr))
                    str = str.replace(baseStr, StringUtils.EMPTY)
                }
            }
            if (str.length == beforeLen) break
        }

        for (let i = 0; i < nbrs.length; i++) num += nbrs[i]
        
        return num
    }
}