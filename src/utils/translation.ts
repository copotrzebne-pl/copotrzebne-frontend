import { DictionaryEntry } from '../types/types'

type LanguageToField = {
  pl: string
  ua: string
  en: string
}

const languageToFieldNameMap: LanguageToField = {
  pl: 'namePl',
  ua: 'nameUa',
  en: 'nameEn'
}

export const getTranslation = (language: string, entry: DictionaryEntry) => {
  const languageFieldName =
    languageToFieldNameMap[language as keyof LanguageToField]

  if (!entry) return ''

  return entry[languageFieldName as keyof DictionaryEntry] || entry.namePl
}
