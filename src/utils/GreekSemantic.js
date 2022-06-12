import GreekDeclensionNounTables from '@/utils/GreekDeclensionNounTables';
import GreekGrammar, { Cases } from '@/utils/GreekGrammar';
import GreekInflectionUtils from '@/utils/GreekInflectionUtils';
import GreekParsedWord from '@/utils/GreekParsedWord';
import GreekWord from './GreekWord';
import StringUtils from './StringUtils';

export default class GreekSemantic
{
    /**
     * @param {GreekParsedWord[]} words 
     */
    static correct (words)
    {
        var i = -1;
        for (const word of words)
        {
            i++

            if (i > 0 && word.declension.isNoun)
            {
                const table = GreekInflectionUtils.inflect(word.declension.lemma)
                const w = table[word.declension.number][word.declension.case][word.declension.gender][word.declension.variation]

                if (words[i - 1].declension.case == GreekGrammar.CASES.GENITIVE && Object.values(table[word.declension.number][GreekGrammar.CASES.GENITIVE][word.declension.gender]).includes(w))
                {
                    word.declension.case = GreekGrammar.CASES.GENITIVE;
                }
                if (words[i - 1].declension.case == GreekGrammar.CASES.ACCUSATIVE && Object.values(table[word.declension.number][GreekGrammar.CASES.ACCUSATIVE][word.declension.gender]).includes(w))
                {
                    word.declension.case = GreekGrammar.CASES.ACCUSATIVE;
                }
                if (StringUtils.includesSome(words[i - 1].word, '.', ',') && Object.values(table[word.declension.number][GreekGrammar.CASES.NOMINATIVE][word.declension.gender]).includes(w))
                {
                    word.declension.case = GreekGrammar.CASES.NOMINATIVE;
                }
            }

            if (word.definition.pos == GreekGrammar.PARTS_OF_SPEECH.VERB && !word.verbObject)
            {
                var potentialObjects = words
                    .filter(w => w.declension.isNoun || w.declension.mood == GreekGrammar.MOODS.PARTICIPLE)
                    .sort((a, b) => Math.abs(words.indexOf(a) - i) - Math.abs(words.indexOf(b) - i))
                
                const wordCase = word.declension.case || GreekGrammar.CASES.NOMINATIVE
                potentialObjects = potentialObjects.filter(w => w.declension.case == wordCase)
                if (potentialObjects.length > 0)
                    word.verbObject = potentialObjects[0] // taking the closest noun as verb object
            }

            if (word.definition.pos == GreekGrammar.PARTS_OF_SPEECH.VERB && GreekInflectionUtils.getDeclensions(word.word).length > 1 && word.verbObject)
            {
                const declensions = GreekInflectionUtils.getDeclensions(word.word)
                const accorded = declensions.find(d => d.number == word.verbObject.declension.number && d.person == word.verbObject.declension.person)
                if (accorded) word.declension = accorded
            }

            if (word.definition.translation instanceof Cases)
            {
                for (let j = i; j < words.length; j++)
                { 
                    const c = words[j].declension.case
                    if (c && word.definition.translation[c])
                    {
                        word.declension.case = c
                        break
                    }
                }
                // @ts-ignore
                if (!word.declension.case) word.declension.case = Object.keys(word.definition.translation)[0]
            }
        }
    }
}