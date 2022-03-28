import Vue from 'vue'
import DOMUtils from '@/utils/DOMUtils'

const LifecycleHooksInterceptorPlugin = 
{
    _hookHandlers: {},

    install: function (Vue, options)
    {
        Vue.mixin
        ({
            created: function (){ LifecycleHooksInterceptorPlugin.fire('created', this) },
            mounted: function (){ LifecycleHooksInterceptorPlugin.fire('mounted', this) },
            updated: function (){ LifecycleHooksInterceptorPlugin.fire('updated', this) },
        })
    },

    /**
     * 
     * @param {string} hook 
     * @param {Function} callback 
     * @param {string} [component] Component name filter
     */
    on (hook, callback, component)
    {
        if (!this._hookHandlers[hook]) this._hookHandlers[hook] = []
        this._hookHandlers[hook].push({ component, callback })
    },

    fire (hook, vm)
    {
        for (let handler of this._hookHandlers[hook] || [])
        {
            if (handler.component && handler.component != getInstanceComponentName(vm)) continue
            handler.callback(vm)
        }
    }
}

function getInstanceComponentName (instance)
{
    if (instance.componentInstance) instance = instance.componentInstance

    return instance.$options.name
}

function isInstanceOfComponent (instance, component)
{
    return getInstanceComponentName(instance) == component.name
}

function destroyInstance (instance)
{
    instance.$destroy()
    if (instance.$el)
    {
        instance.$el.parentNode.removeChild(instance.$el)
        instance.$el = null
    }
}

function getObserverless (object)
{
    if (!object) return object
    
    return JSON.parse(JSON.stringify(object))
}

function isVNode (object)
{
    if (!object) return false
    
    return object.__proto__.constructor.name == 'VNode' || (object.context && object.context._isVue)
}

/**
 * 
 * @param {CombinedVueInstance} parent 
 * @param {*} type 
 */
function getChildrenOfType (parent, type)
{
    const children = []
    const searchDirectChildren = node =>
    {
        for (const child of node.$children)
        {
            if (isInstanceOfComponent(child, type)) children.push(child)
            if (child.$children && child.$children.length > 0) searchDirectChildren(child)
        }
    }

    searchDirectChildren(parent)

    const sortedByIndex = children.sort((a, b) => DOMUtils.getElementNodeIndex(a.$el) - DOMUtils.getElementNodeIndex(b.$el))

    return sortedByIndex
}

function createComponent (componentConstructor, props)
{
    const componentClass = Vue.extend(componentConstructor)
    const instance = new componentClass({ propsData: props })
    instance.$mount()
    window.app.$el.prepend(instance.$el)

    return instance
}

export default { isInstanceOfComponent, destroyInstance, getObserverless, isVNode, getChildrenOfType, createComponent,
    LifecycleHooksInterceptorPlugin }