export default class LocalStorageUtils
{
    static get collection ()
    {
        return localStorage.getItem('collection') || 'NT';
    }
    static set collection (value)
    {
        localStorage.setItem('collection', value);
    }

    static get book ()
    {
        return localStorage.getItem('book') || 'Matthew';
    }
    static set book (value)
    {
        localStorage.setItem('book', value);
    }

    /**
     * @returns {number}
     */
    static get chapter ()
    {
        return Number.parseInt(localStorage.getItem('chapter')) || 1;
    }
    static set chapter (value)
    {
        localStorage.setItem('chapter', value.toString());
    }

    static get verse ()
    {
        return Number.parseInt(localStorage.getItem('verse')) || 1;
    }
    static set verse (value)
    {
        console.log('setting verse to', value)
        localStorage.setItem('verse', value.toString());
    }
}