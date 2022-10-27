<script>
import GreekGrammar from '@/utils/GreekGrammar'
import GreekInflectionUtils from '@/utils/GreekInflectionUtils'
import StringUtils from '@/utils/StringUtils'
import GreekDeclension from '@/utils/GreekDeclension'
import LocalStorageUtils from '@/utils/LocalStorageUtils'
import Button from '@/components/Button'
import DialogUtils from '@/utils/dialogUtils'
import WalletUtils from '@/utils/walletUtils'
import axios, { Axios } from 'axios'
import EventsUtils from '@/utils/eventsUtils'
import VueUtils from '@/utils/vueUtils'
import AsyncUtils from '@/utils/AsyncUtils'

export default
{
    name: 'hardcoded',

    async created()
    {
        const res = await axios.get(`/static/hardcoded/manifest.json`)
        this.manifest = res.data
        this.collection = this.$route.params.collection || LocalStorageUtils.collection
        this.book = this.$route.params.book || LocalStorageUtils.book
        this.chapter = parseInt(this.$route.params.chapter) || LocalStorageUtils.chapter
        this.verse = LocalStorageUtils.verse
    },

    beforeRouteLeave (to, from, next)
    {
        VueUtils.removeEventListeners(this)
        next()
    },

    beforeRouteEnter (to, from, next)
    {
        next(async vm =>
        {
            setTimeout(() => {
                vm.scrollToLastVerse()
                setTimeout(() => {
                    VueUtils.addEventListener(vm, 'scroll', vm.onScroll, {debounce: 500})
                }, 3000);
            }, 500);
        })
    },

    render () 
    {
        if (!this.parsed || !this.manifest) return

        return (
            <div id='hardcoded-view'>
                <div class='title'>{this.book}</div>
                <div class='books'>{
                    Object.keys(this.manifest[this.collection]).map(bookName =>
                        bookName != this.book && <Button type='text' class='select-book-btn' text={bookName} on-click={() => this.selectBook(bookName)}/>)
                }</div>
                {
                    this.parsed.map(verse => (
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
                                const definition = {pos: '', translation: english}
                                definition.pos = declension.pos
                                const translation = english

                                return (
                                    <div class={{'verse-word': true, ['case-' + declension.case]: true, ['pos-' + definition.pos]: true, 'def-missing': !definition.translation}}
                                        on-click={() => this.onWordClicked(word)}>
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
                <div class='row extend space-between footer-actions'>
                {
                     this.chapter > this.manifest[this.collection][this.book][0] && 
                        <Button type='text' text='Previous' icon={require('@/assets/img/back.svg')} on-click={() => this.chapter -= 1} />
                }
                {
                    this.chapter < this.manifest[this.collection][this.book][1] && 
                        <Button type='text' text='Next' icon={require('@/assets/img/back.svg')} icon-on-right={true} class='next-btn' on-click={() => this.chapter += 1} />
                }
                </div>
            </div>
        )
    },

    data () 
    {
        return {
            collection: 'NT',
            book: null,
            chapter: null,
            verse: null,
            parsed: null,
            manifest: null,
        }
    },

    watch:
    {
        async book (newBook)
        {
            LocalStorageUtils.book = newBook
            this.chapter = this.manifest[this.collection][this.book][0]
            await this.fetchVerses()
        },
        async chapter (newChapter, oldChapter)
        {
            LocalStorageUtils.chapter = newChapter
            await this.fetchVerses()
            if (oldChapter) this.verse = 0
        },
    },

    computed:
    {
        versesElements ()
        {
            return Array.from(document.querySelectorAll('.verse'))
        }
    },

    methods:
    {
        getVersesElements ()
        {
            return Array.from(this.$el.querySelectorAll('.verse'))
        },
        scrollToLastVerse ()
        {
            console.log('scrolling to verse', this.verse)
            const focusVerse = this.getVersesElements()[this.verse]
            focusVerse.scrollIntoView({ behavior: 'smooth' })
        },
        async fetchVerses ()
        {
            const res = await axios.get(`/static/hardcoded/${this.collection}/${this.book}/${this.chapter}.json`)
            this.parsed = res.data.versesParsed
            this.$router.push({name: 'Hardcoded', params: {collection: this.collection, book: this.book, chapter: this.chapter} });
        },
        selectBook (book)
        {
            this.book = book
            this.chapter = 1
        },

        onScroll ()
        {
            console.log('setting scroll position', this)
            const topVerse = this.versesElements.find(e => e.getBoundingClientRect().y >= 0)
            if (!topVerse) return
            LocalStorageUtils.verse = this.versesElements.indexOf(topVerse)
        },

        async onWordClicked (word)
        {
            window.open(`https://lexicon.katabiblon.com/index.php?search=${word}`, '_blank')
        }
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

    .books
    {
        display: flex;
        flex-direction: row;

        .button
        {
            margin-right: 10px;
        }
    }

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

    .footer-actions
    {
        margin-top: 30px;

        .next-btn
        {
            svg
            {
                transform: rotate(180deg);
            }
        }
    }
}
</style>
