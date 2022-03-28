import GreekGrammar from './GreekGrammar';
import GreekInflectionUtils from './GreekInflectionUtils';
import GreekParsedWord from './GreekParsedWord';

export default class GreekSemantic
{
    /**
     * @param {GreekParsedWord[]} words 
     */
    static correct (words)
    {
        for (const word of words)
        {
            if (word.declension.case == 'dative' && words.every(w => w.definition.pos != 'verb'))
            {
                const inflected = GreekInflectionUtils.DICTIONARY_INFLECTED[word.declension.lemma]
                if (inflected[word.declension.number].dative[word.declension.gender] == inflected[word.declension.number].genitive[word.declension.gender])
                {
                    word.declension.case = 'genitive';
                }
            }
        }
    }
}