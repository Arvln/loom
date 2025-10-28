import USAppTranslations from '../locales/en-US.json'
import USFrontendTranslations from '../frontend/locales/en-US.json'

// TODO: Implement i18n
// Mock useTranslations hook until implement i18n.
export const useTranslations = () => {
  const translations = { ...USAppTranslations, ...USFrontendTranslations }
  const t = (key: string) =>
    (key.split('.').reduce((pre, v) => pre?.[v], translations as any) ??
      key) as string
  return { t }
}

// Mock getTranslations function until implement i18n
export const getTranslations = async () => {
  const { t } = useTranslations()
  return t
}
