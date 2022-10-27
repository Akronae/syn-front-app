import GreekDeclension from '@/utils/GreekDeclension'
import GreekDictionary, { GreekDictionaryEntry } from '@/utils/GreekDictionary'

export default class GreekParsedWord
{
    /**
     * @type {string}
     */
    word
    /**
     * @type {GreekDeclension}
     */
    declension
    /**
     * @type {GreekDictionaryEntry}
     */
    definition
    /**
     * @type {string}
     */
    translation
    /**
     * @type {GreekParsedWord}
     */
    verbObject

    /**
     * @param {Object} args 
     * @param {string} [args.word] 
     * @param {GreekDeclension} [args.declension] 
     * @param {GreekDictionaryEntry} [args.definition] 
     * @param {string} [args.translation] 
     * @param {GreekParsedWord} [args.verbObject] 
     */
    constructor({ word = '', declension = new GreekDeclension(), definition = new GreekDictionary.Entry_Type(), translation = '', verbObject = null } = {})
    {
        this.word = word
        this.declension = declension
        this.definition = definition
        this.translation = translation
        this.verbObject = verbObject
    }
}