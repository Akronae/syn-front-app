import '@/styles/mobile-normalize.css'
import '@/styles/animate.css'
import '@/styles/transitions.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/app'
import router from '@/router'
import store from '@/stores'
import theme from '@/theme'
import {InlineSvgPlugin} from 'vue-inline-svg';
import GreekUtils from '@/utils/GreekUtils'
import GreekInflectionUtils from '@/utils/GreekInflectionUtils'
import GreekAlphabet from '@/utils/GreekAlphabet'
import GreekDeclensionNounTables from '@/utils/GreekDeclensionNounTables'
import GreekDeclensionVerbTables from '@/utils/GreekDeclensionVerbTables'
import GreekGrammar from '@/utils/GreekGrammar'
import StringUtils from '@/utils/StringUtils'
import GreekWord from '@/utils/GreekWord'
import GreekDictionary from '@/utils/GreekDictionary'
import GreekNumerals from '@/utils/GreekNumerals'
import EnglishDeclensionVerbTables from '@/utils/EnglishDeclensionVerbTables'
import EnglishGrammar from '@/utils/EnglishGrammar'
import ObjectUtils from '@/utils/ObjectUtils'
import * as Buffer from 'buffer'

GreekInflectionUtils.populate()

window.modules =
{
    GreekUtils,
    GreekInflectionUtils,
    GreekDeclensionNounTables,
    GreekDeclensionVerbTables,
    StringUtils,
    GreekWord,
    GreekGrammar,
    GreekDictionary,
    GreekAlphabet,
    GreekNumerals,
    ObjectUtils,
    EnglishDeclensionVerbTables,
    EnglishGrammar,
    Buffer
}

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(InlineSvgPlugin);

theme.applyTheme()

// These svg are used with <inline-svg> which takes some time to render svgs for the first time.
// Without preloading images, it gives a cringy feeling when svg are rendered,
// especially on mobiles where it's clearly visible that the elements are resized as the image contained into is loaded.
function buildApp ()
{
    window.app = new Vue({
        el: '#app',
        router,
        store,
        template: '<App />',
        components: { App },
    
        data ()
        {
            return {
            }
        },
    
        methods:
        {
        },
    
        created: onAppCreated,
        mounted: onAppMounted
    })
}

function onAppCreated ()
{
}

function onAppMounted ()
{
}

buildApp()