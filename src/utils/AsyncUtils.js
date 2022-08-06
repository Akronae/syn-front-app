export default class AsyncUtils
{
    static async sleep (ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}