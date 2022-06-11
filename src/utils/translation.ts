import { TranslatedEntry } from '../types/types'
import { Language } from '../common/language'

export const getTranslation = (language: Language, entry: TranslatedEntry) => {
  if (!entry) {
    return ''
  }

  return entry.name[language] || entry.name[Language.PL]
}
