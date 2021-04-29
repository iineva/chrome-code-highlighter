import { capitalCase, paramCase } from "change-case"
import * as themes from 'react-syntax-highlighter/dist/esm/styles/hljs'

const themeList = Object.keys(themes).map(k => ({
  id: paramCase(k),
  name: capitalCase(k),
  value: themes[k],
}))

const DEFAULT_THEME_KEY = "DEFAULT_THEME_KEY"
export const getDefaultTheme = () => {
  const id = localStorage.getItem(DEFAULT_THEME_KEY) || "monokai-sublime"
  return getTheme(id)
}

export const getTheme = (id: string) => {
  return themeList.find(t => {
    if (t.id === id) {
      return true
    }
  })
}

export const setDefaultTheme = (k: string) => {
  localStorage.setItem(DEFAULT_THEME_KEY, k)
}


export default themeList