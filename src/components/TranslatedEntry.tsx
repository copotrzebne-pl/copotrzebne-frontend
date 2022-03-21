import { useUserContext } from '../contexts/userContext'
import { DictionaryEntry } from '../types/types'
import { getTranslation } from '../utils/translation'

export default ({ entry }: { entry: DictionaryEntry }) => {
  const { language } = useUserContext()

  if (!entry) return null
  const translation = getTranslation(language, entry)

  return <>{translation}</>
}
