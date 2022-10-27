import ArrayUtils from './ArrayUtils';

/**
 * @template TKey, TValue
 * @extends {Map<Array<TKey>, TValue>}
 */
export default class ArrayKeyedMap extends Map
{
    /**
     * @param {TKey[]} keyToFind 
     * @returns {TValue}
     */
    get (keyToFind, {ignoreOrder = true} = {})
    {
        const entry = Array.from(this.entries()).find(([key, value]) => ArrayUtils.areEqual(key, keyToFind, {ignoreOrder}))
        return entry ? entry[1] : undefined
    }
}