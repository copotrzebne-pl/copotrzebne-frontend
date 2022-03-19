import { useUserContext } from '../contexts/userContext'

type DictionaryEntry = {
  id?: string
  namePl: string
  nameUa?: string
  nameEn?: string
}

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

export default ({ entry }: { entry: DictionaryEntry }) => {
  const { language } = useUserContext()
  const languageFieldName =
    languageToFieldNameMap[language as keyof LanguageToField]

  if (!entry) return null

  return (
    <>{entry[languageFieldName as keyof DictionaryEntry] || entry.namePl}</>
  )
}
