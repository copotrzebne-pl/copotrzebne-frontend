import { useUserContext } from '../contexts/userContext'
import { TranslatedEntry } from '../types/types'
import { getTranslation } from '../utils/translation'

export default ({
  entry,
  fallback = ''
}: {
  entry: TranslatedEntry | null | undefined
  fallback?: string
}) => {
  if (!entry) {
    return <>{fallback}</>
  }

  const { language } = useUserContext()

  const translation = getTranslation(language, entry)

  return <>{translation}</>
}
