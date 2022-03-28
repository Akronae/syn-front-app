<script>
import Button from '@/components/Button'
import Mattew from '~/static/matthew.json'
import Axios from 'axios'
import XMLJS from 'xml-js'
import GreekUtils from '@/utils/GreekUtils'
import StringUtils from '@/utils/StringUtils'
import GreekInflectionUtils from '@/utils/GreekInflectionUtils'
import ObjectUtils from '@/utils/ObjectUtils'
import GreekGrammar from '@/utils/GreekGrammar'
import GreekDictionary from '@/utils/GreekDictionary'
import GreekParsedWord from '@/utils/GreekParsedWord'
import GreekSemantic from '@/utils/GreekSemantic'

export default
{
    name: 'home',

    async created()
    {
        
    },

    render () 
    {
        const matthew = Mattew.collections['New Testament']['The Book of Matthew']
        /**
         * @type {GreekParsedWord[][]}
         */
        const parsed = Object.entries(matthew.milestones['1']).filter(([verseNumber]) => !verseNumber.includes('_')).map(([verseNumber, verse]) =>
        {
            const verseParsed = []
            verse.split(' ').forEach(word =>
            {
                const declension = GreekInflectionUtils.getDeclension(word.replace(/[.,]/g, ''))
                const definition = GreekDictionary.get(declension.lemma)
                verseParsed.push(new GreekParsedWord({word, declension, definition}))
            })
            GreekSemantic.correct(verseParsed)
            return verseParsed
        })

        return (
            <div id='home-view'>
                <div class='title'>{matthew.name.en}</div>

                {
                    parsed.map(verseWords => (
                        <div class='verse'>
                        <div class='verse-number'>{matthew.shortName.en} {1}:{parsed.indexOf(verseWords) + 1}</div>
                        <div class='verse-text'>
                        {
                            verseWords.map(({word, declension, definition}) =>
                            {
                                return (
                                    <div class={{'verse-word': true, ['case-' + declension.case]: true}}>
                                        <div class='verse-word-text'>{word}</div>
                                        {
                                            declension &&
                                            [
                                                definition && <div class='verse-word-translation'>
                                                    {declension.case == GreekGrammar.CASES.GENITIVE && 'of '}
                                                    {declension.case == GreekGrammar.CASES.DATIVE && 'to '}
                                                    {definition.translation}
                                                    {definition.le}
                                                </div>,
                                                <div class='verse-word-declension'>
                                                    {definition && <div>{definition.pos}</div> }
                                                    <div>{GreekInflectionUtils.shortenDeclensionString(`${declension.case || ''}-${declension.number || ''}-${declension.gender || ''}`)}</div>
                                                </div>,
                                            ]
                                        }
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    ))
                }
            </div>
        )
    },

    data () 
    {
        return {
            words: {}
        }
    },

    computed:
    {
    },

    async mounted ()
    {
    },

    methods:
    {
    },

    components:
    {
        Button,
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

#home-view
{
    .verse
    {
        &:not(&:first-of-type)
        {
            margin-top: 50px;
        }

        .verse-text
        {
            display: flex;
            flex-direction: row;

            .verse-word
            {
                padding: 10px;
                border-radius: 10px;
                background-color: var(--theme-border-color-extra-light);
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 10px;

                &:not(:last-of-type)
                {
                    margin-right: 10px;
                }

                &.case-nominative
                {
                    background-color: var(--theme-nominative-color);
                }
                &.case-genitive
                {
                    background-color: var(--theme-genitive-color);
                }
                &.case-accusative
                {
                    background-color: var(--theme-accusative-color);
                }
                &.case-dative
                {
                    background-color: var(--theme-dative-color);
                }
                &.case-vocative
                {
                    background-color: var(--theme-vocative-color);
                }

                .verse-word-translation
                {
                    margin-top: 5px;
                }

                .verse-word-declension
                {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size: 70%;
                    margin-top: 5px;
                }
            }
        }
    }
}
</style>
