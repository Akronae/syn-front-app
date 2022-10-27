import Vue from 'vue'
import DialogComponent from '@/components/Dialog'
import DialogPromptComponent from '@/components/DialogPrompt'
import ChatBubble from '@/components/ChatBubble'
import VueUtils from '@/utils/vueUtils'

function showDialog ({ title, description, placeholder, buttons, customClass, isPrompt = false, promptAutoComplete } = {},)
{
    return VueUtils.createComponent(isPrompt ? DialogPromptComponent : DialogComponent, { title, description, placeholder, buttons, customClass }, {promptAutoComplete})
}

async function waitForUserConfirmationAsync ({ title = 'Attention', description = 'Voulez vous vraiment effectuer cette action ?', isDanger = true } = {})
{
    return new Promise((resolve, reject) =>
    {
        const buttons =
        [
            { label: 'Non', action: () => resolve(false) },
            { label: 'Oui', isDanger, action: () => resolve(true) }
        ]

        VueUtils.createComponent(DialogComponent, { title, description, buttons })
    })
}

async function promptAsync ({ title = 'Saisissez une valeur ici', placeholder } = {})
{
    return new Promise((resolve, reject) =>
    {
        let dialogInstance

        const buttons =
        [
            { label: 'Annuler', action: () => resolve(false) },
            { label: 'OK', action: () => resolve(dialogInstance.promptValue) }
        ]

        dialogInstance = VueUtils.createComponent(DialogPromptComponent, { title, placeholder, buttons })
    })
}

async function showChatBubble ({ message = '', buttons = [], showCloseButton, closeOnClick })
{
    const componentClass = Vue.extend(ChatBubble)
    const instance = new componentClass({ propsData: { message, buttons, showCloseButton, closeOnClick } })
    instance.$mount()
    window.app.$el.prepend(instance.$el)
}

export default { showDialog, waitForUserConfirmationAsync, promptAsync, showChatBubble }