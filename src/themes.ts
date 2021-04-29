import { capitalCase, paramCase } from "change-case"
import * as themes from 'react-syntax-highlighter/dist/esm/styles/hljs'
import storage from './common/storage'

const themeList = Object.keys(themes).map(k => ({
  id: paramCase(k),
  name: capitalCase(k),
  value: themes[k],
}))

const DEFAULT_THEME_KEY = "DEFAULT_THEME_KEY"
export const DEFAULT_THEME = "monokai-sublime"
export const getDefaultTheme = async () => {
  return (await storage.getItem(DEFAULT_THEME_KEY)) || DEFAULT_THEME
}

export const getTheme = (id: string) => {
  return themeList.find(t => {
    if (t.id === id) {
      return true
    }
  }) || themeList[0]
}

export const setDefaultTheme = async (k: string) => {
  await storage.setItem(DEFAULT_THEME_KEY, k)
}

export default themeList