export default class ObjectUtils
{
    static getValuesPathes (obj)
    {
        if (!obj) return []
        
        const pathes = {}
        Object.keys(obj).forEach(key =>
        {
            const value = obj[key]
            if (typeof value === 'object' && value)
            {
                Object.assign(pathes, Object.fromEntries(Object.entries(this.getValuesPathes(value)).map(([k, v]) => [`${key}.${k}`, v])))
            }
            else
            {
                pathes[key] = value
            }
        })
        return pathes
    }

    static set (obj, path, value)
    {
        var i;
        path = path.split('.');
        for (i = 0; i < path.length - 1; i++)
        {
            obj[path[i]] = obj[path[i]] || {};
            obj = obj[path[i]];
        }
    
        obj[path[i]] = value;
    }

    static buildObjectFromPathes (pathes)
    {
        const obj = {}
        Object.entries(pathes).forEach(([key, value]) => this.set(obj, key, value))
        return obj
    }

    static clone (obj)
    {
        return JSON.parse(JSON.stringify(obj))
    }
}