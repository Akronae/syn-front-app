<script>
//@ts-ignore
import Abarim from '~/static/abarim.json'
import GreekGrammar from '@/utils/GreekGrammar'
import GreekInflectionUtils from '@/utils/GreekInflectionUtils'
import StringUtils from '@/utils/StringUtils'
import GreekDeclension from '@/utils/GreekDeclension'

export default
{
    name: 'hardcoded',

    async created()
    {
    },

    render () 
    {
        const chapter = 1
        const matthew = Abarim.matthew[chapter]
        const parsed = matthew.versesParsed

        return (
            <div id='hardcoded-view'>
                <div class='title'>{matthew.book}</div>
                {
                    parsed.map(verse => (
                        <div class='verse'>
                        <div class='verse-number'>{verse.book} {verse.chapter}:{verse.verseNumber}</div>
                        <div class='verse-translation'>{verse.verseTranslated}</div>
                        <div class='verse-text'>
                        {
                            verse.wordsParsed.map(parsedWord =>
                            {
                                // const {word, declension, definition, translation} = parsedWord
                                var {greek, english, parsing} = parsedWord
                                const word = greek
                                parsing = parsing.replace(/-/gm, '.').replace(/\n/gm, '.')
                                parsing = parsing.replace('nom', 'nominative')
                                parsing = parsing.replace('si', 'singular')
                                parsing = parsing.replace('fem', 'feminine')
                                parsing = parsing.replace('mas', 'masculine')
                                parsing = parsing.replace('gen', 'genitive')
                                parsing = parsing.replace('aor', 'aorist')
                                parsing = parsing.replace('acc', 'accusative')
                                parsing = parsing.replace('neu', 'neuter')
                                parsing = parsing.replace('art', 'article')
                                parsing = parsing.replace('act', 'active')
                                parsing = parsing.replace('pron', 'pronoun')
                                parsing = parsing.replace('.ind.', '.indicative.')
                                parsing = parsing.replace('3rd-p', 'third')
                                parsing = parsing.replace('noun (name)', 'proper_noun')
                                var strDecl = parsing.replace(/ /gm, '.').replace(/-/gm, '.').replace(/\n/gm, '.')
                                const declension = GreekDeclension.fromString(strDecl)
                                console.log(parsing)
                                const definition = {pos: '', translation: english}
                                definition.pos = declension.pos
                                const translation = english

                                return (
                                    <div class={{'verse-word': true, ['case-' + declension.case]: true, ['pos-' + definition.pos]: true, 'def-missing': !definition.translation}}>
                                        <div class='verse-word-text'>{word}</div>
                                        {
                                            declension &&
                                            [
                                                <div class='verse-word-translation'>
                                                    {translation}
                                                </div>,
                                                <div class='verse-word-declension'>
                                                    {definition && definition.pos && <div>{GreekInflectionUtils.shortenDeclensionString(definition.pos)}</div> }
                                                    <div v-show={definition && StringUtils.equalsSome(definition.pos, GreekGrammar.PARTS_OF_SPEECH.NOUN, GreekGrammar.PARTS_OF_SPEECH.PROPER_NOUN, GreekGrammar.PARTS_OF_SPEECH.ADJECTIVE)} class='column align-center'>
                                                        {StringUtils.trim(GreekInflectionUtils.shortenDeclensionString(`${declension.case || ''}-${declension.number || ''}-${declension.gender || ''}`), '-')}
                                                    </div>
                                                    <div v-show={definition && definition.pos == GreekGrammar.PARTS_OF_SPEECH.VERB} class='column align-center'>
                                                        <div>{StringUtils.trim(GreekInflectionUtils.shortenDeclensionString(`${declension.tense || ''}-${declension.voice || ''}-${declension.mood || ''}`), '-')}</div>
                                                        <div>{StringUtils.trim(GreekInflectionUtils.shortenDeclensionString(`${declension.person || declension.gender || ''}-${declension.number || ''}`), '-')}</div>
                                                    </div>
                                                    <div v-show={definition && definition.pos == GreekGrammar.PARTS_OF_SPEECH.ARTICLE} class='column align-center'>
                                                        <div>{StringUtils.trim(GreekInflectionUtils.shortenDeclensionString(`${declension.case || ''}-${declension.number || ''}-${declension.gender || ''}`), '-')}</div>
                                                    </div>
                                                    <div v-show={definition && definition.pos == GreekGrammar.PARTS_OF_SPEECH.PERSONAL_PRONOUN} class='column align-center'>
                                                        <div>{StringUtils.trim(GreekInflectionUtils.shortenDeclensionString(`${declension.person || ''} pers`), '-')}</div>
                                                        <div>{StringUtils.trim(GreekInflectionUtils.shortenDeclensionString(`${declension.case || ''}-${declension.number || ''}-${declension.gender || ''}`), '-')}</div>
                                                    </div>
                                                    <div v-show={definition && definition.pos == GreekGrammar.PARTS_OF_SPEECH.PRONOUN} class='column align-center'>
                                                        <div>{StringUtils.trim(GreekInflectionUtils.shortenDeclensionString(`${declension.case || ''}-${declension.number || ''}-${declension.gender || ''}`), '-')}</div>
                                                    </div>
                                                    <div v-show={definition && definition.pos == GreekGrammar.PARTS_OF_SPEECH.PREPOSITION} class='column align-center'>
                                                        <div>{StringUtils.trim(GreekInflectionUtils.shortenDeclensionString(`(+${declension.case || ''})`), '-')}</div>
                                                    </div>
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
            chapter: 1
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
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

#hardcoded-view
{
    padding: 40px;

    .verse
    {
        &:not(&:first-of-type)
        {
            margin-top: 50px;
        }

        .verse-translation
        {
            background-color: var(--theme-border-color-mega-light);
            border-radius: 10px;
            padding: 5px 10px;
            width: fit-content;
            color: var(--theme-border-color-extra-strong);
            margin-top: 10px;
        }

        .verse-text
        {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

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

                &.pos-verb
                {
                    background-color: var(--theme-verb-color);
                }
                &.def-missing
                {
                    background-color: var(--theme-missing-color);
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
                &.case-indeclinable
                {
                    background-color: var(--theme-indeclinable-color);
                }

                .verse-word-text
                {
                    font-family: 'Source Sans 3';
                }

                .verse-word-translation
                {
                    margin-top: 5px;
                    font-size: 80%;
                }

                .verse-word-declension
                {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size: 70%;
                    margin-top: 5px;
                    color: var(--theme-text-color-extra-light);
                    width: max-content;
                }
            }
        }
    }
}
</style>
