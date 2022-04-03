import GreekDeclension from '@/utils/GreekDeclension'
import GreekDictionary from '@/utils/GreekDictionary'

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
     * @type {GreekDictionary.Entry}
     */
    definition
    /**
     * @type {string}
     */
    translation

    constructor({ word = '', declension = new GreekDeclension(), definition = new GreekDictionary.Entry_Type(), translation = '' } = {})
    {
        this.word = word
        this.declension = declension
        this.definition = definition
        this.translation = translation
    }
}