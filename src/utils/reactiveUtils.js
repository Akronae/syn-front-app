import Vue from 'vue'

const reactives = Vue.observable({ currentMediaName: getMatchingMediaName() })

window.addEventListener('resize', () =>
{
    reactives.currentMediaName = getMatchingMediaName()
}, true)

export default reactives