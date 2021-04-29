import { useEffect } from 'react';
import { Space, Checkbox, Select, Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import themes, { getDefaultTheme, setDefaultTheme } from './themes';
import { checkLangs, DEFAULT_LANG } from "./common/check-lang";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useCopyToClipboard } from 'react-use';
import storage from './common/storage'

message.config({
  top: 100,
});


const { Option, OptGroup } = Select;

const langs = checkLangs(window.location.pathname)

const themeOptions = themes.map(t => ({value: t.id, label: t.name}))
const recommendThemes = ['monokai-sublime', 'idea', 'github', 'github-gist', 'googlecode', 'stackoverflow-light', 'stackoverflow-dark']
const themeGroupedOptions = [{
  label: 'Recommend',
  options: themeOptions.filter(t => recommendThemes.indexOf(t.value) !== -1),
}, {
  label: 'All',
  options: themeOptions.filter(t => recommendThemes.indexOf(t.value) === -1),
}]

const DEFAULT_LANGAUGE = "DEFAULT_LANGAUGE"
const getDefaultLanguageKey = () => `${DEFAULT_LANGAUGE}:${window.location.origin + window.location.pathname}`
async function setDefaultLangauge(lang: string) {
  return storage.setItem(getDefaultLanguageKey(), lang)
}
async function getDefaultLanguage() {
  return await storage.getItem(getDefaultLanguageKey()) || langs[0] || DEFAULT_LANG
}

const DEFAULT_SHOW_LINE_NUMBERS = "DEFAULT_SHOW_LINE_NUMBERS"
async function getDefaultShowLineNumbers() {
  return await storage.getItem(DEFAULT_SHOW_LINE_NUMBERS) === "true"
}
function setDefaultShowLineNumbers(show: boolean) {
  return storage.setItem(DEFAULT_SHOW_LINE_NUMBERS, show ? "true" : "false")
}


function Header({ codeString, theme, language, showLineNumbers, onThemeChange, onLanguageChange, onShowLineNumbersChange }) {
  const [state, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    if (state.error) {
      message.error(`Unable to copy value: ${state.error.message}`)
    } else if (state.value) {
      message.success('Copied')
    }
  }, [state])

  return (
    <header className="Header">
      <Space size={12}>
        🌈 
        <Select
          showSearch
          placeholder="Select Theme"
          value={theme}
          style={{ width: 200 }}
          onChange={(opt) => {
            setDefaultTheme(opt)
            onThemeChange && onThemeChange(opt)
          }}
        >
          {themeGroupedOptions.map((v, i) => (
            <OptGroup label={v.label} key={`theme-opt-${i}`}>
              {v.options.map((o, j) => (
                <Option value={o.value} key={`theme-opt-${i}-${j}`}>{o.label}</Option>
              ))}
            </OptGroup>
          ))}
        </Select>
        🌐 
        <Select
          showSearch
          placeholder="Select Language"
          value={language}
          style={{ width: 200 }}
          onChange={(opt) => {
            setDefaultLangauge(opt)
            onLanguageChange && onLanguageChange(opt)
          }}
        >
          <OptGroup label={"Recommend"}>
            {langs.map((o, j) => (
              <Option value={o} key={`lang-re-opt-${j}`}>{o}</Option>
            ))}
          </OptGroup>
          <OptGroup label={"All"}>
            {SyntaxHighlighter.supportedLanguages.filter(l => langs.indexOf(l) === -1).map((o, j) => (
              <Option value={o} key={`lang-all-opt-${j}`}>{o}</Option>
            ))}
          </OptGroup>
        </Select>
        <Checkbox checked={showLineNumbers} onChange={(e) => {
          const show = e.target.checked
          setDefaultShowLineNumbers(show)
          onShowLineNumbersChange && onShowLineNumbersChange(show)
        }}>Line Numbers</Checkbox>
        <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(codeString)}>Copy</Button>
      </Space>
    </header>
  )
}

Header.getDefaultLanguage = getDefaultLanguage
Header.getDefaultTheme = getDefaultTheme
Header.getDefaultShowLineNumbers = getDefaultShowLineNumbers

export default Header
