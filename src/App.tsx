import "./App.css";
import * as AssetsService from "./services/assets-service";
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useState, useEffect } from 'react';
import virtualizedRenderer from './virtualizedRenderer'; 
import Header from './Header';
import { getTheme } from './themes';
import { useHotkeys } from 'react-hotkeys-hook';

const isMacOS = navigator.platform.toLocaleLowerCase().indexOf('mac') !== -1

function App() {

  const pre = document.body.querySelector("pre")
  const [showRaw, setShowRaw] = useState(false)
  const [codeString, setCodeString] = useState(pre && pre.textContent)
  const [htmlOrgBg] = useState(document.querySelector("html")!.style.background)
  const [theme, setTheme] = useState('')
  const [language, setLanguage] = useState('')
  const [showLineNumbers, setShowLineNumbers] = useState(false)
  const [loadingSetting, setLoadingSetting] = useState(true)
  
  // const [searchText, setSearchText] = useState('')
  const [searchEnable, setSearchEnable] = useState(false)


  const handleFindShortcut = (e) => {
    // @ts-ignore
    setSearchEnable(true)
  }
  useHotkeys('ctrl+f', handleFindShortcut, { enabled: !isMacOS });
  useHotkeys('command+f', handleFindShortcut, { enabled: isMacOS });

  useEffect(() => {
    if (loadingSetting) {
      (async () => {
        setTheme(await Header.getDefaultTheme())
        setLanguage(await Header.getDefaultLanguage())
        setShowLineNumbers(await Header.getDefaultShowLineNumbers())
        setLoadingSetting(false)
      })();
    }
  }, [loadingSetting === true])

  const themeObj = getTheme(theme)
  useEffect(() => {
    if (pre) {
      pre.hidden = !showRaw
    }
    if (showRaw) {
      document.querySelector("html")!.style.background = htmlOrgBg
    } else {
      document.querySelector("html")!.style.background = themeObj.value.hljs.background
    }
    document.body.style.padding = "0";
    document.body.style.margin = "0";

    const observer = new MutationObserver(function(mutations){
      setCodeString(pre && pre.textContent)
    })
    observer.observe(pre!, { 
      childList: true,
      characterData: true,
      subtree: true, // needed if the node you're targeting is not the direct parent
    })
    return () => {
      observer.disconnect()
    }
  }, [showRaw, theme]);

  // when user search content, disable react-virtualized
  let renderer = null
  if (!searchEnable) {
    // @ts-ignore
    renderer = virtualizedRenderer({overscanRowCount: 100, autoFocus: true})
  }

  return (
    <div className="App">
      <Header
        codeString={codeString}
        theme={theme} onThemeChange={(t) => {
          setTheme(t)
        }}
        language={language} onLanguageChange={(l) => {
          setLanguage(l)
        }}
        showLineNumbers={showLineNumbers} onShowLineNumbersChange={(s) => {
          setShowLineNumbers(s)
        }}
      />
      <SyntaxHighlighter
        language={language}
        customStyle={{
          margin: 0,
          boxSizing: "border-box",
          flex: 1,
        }}
        lineNumberStyle={{minWidth: "2.5em"}}
        style={themeObj.value}
        showLineNumbers={showLineNumbers}
        showInlineLineNumbers={true}
        wrapLines={true}
        wrapLongLines={true}
        renderer={renderer}
      >
        {loadingSetting ? '' : codeString}
      </SyntaxHighlighter>
    </div>
  );
}

export default App;
