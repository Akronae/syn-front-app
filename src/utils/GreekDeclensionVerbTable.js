import { Cases, Genders, Moods, Numbers, Persons, Tenses, Themes, Voices } from './GreekGrammar';

/**
 * @template T
 * @extends Moods<T, Voices<Themes<string[]>>, Voices<Themes<Numbers<Cases<Genders<string[]>>>>>>
 */
 export class GreekDeclensionTableVerbMoods extends Moods
 {
     
 }
 
 
 /**
  * @extends Tenses<GreekDeclensionTableVerbMoods<Voices<Themes<Numbers<Persons<string[]>>>>>>
  */
 export default class GreekDeclensionVerbTable extends Tenses
 {
 }