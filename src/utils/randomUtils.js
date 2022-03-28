export default
{
    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     * 
     * @param {number} [randomValue] the random number used to generate new number in range, default to Math.random()
     */
    getRandomFloat (min, max, randomValue)
    {
        randomValue = randomValue || Math.random()

        return randomValue * (max - min) + min;
    },

    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     * Using Math.round() will give you a non-uniform distribution!
     * 
     * @param {number} [randomValue] the random number used to generate new number in range, default to Math.random()
     */
    getRandomInt (min, max, randomValue)
    {
        randomValue = randomValue || Math.random()

        min = Math.ceil(min);
        max = Math.floor(max);
    
        return Math.floor(randomValue * (max - min + 1)) + min;
    },

    getSeededRandomGenerator (seed)
    {
        return () =>
        {
            var x = Math.sin(seed++) * 10000;
            
            return x - Math.floor(x);
        }
    }
}