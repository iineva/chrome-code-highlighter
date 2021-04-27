import "./App.css";
import * as AssetsService from "./services/assets-service";
import SyntaxHighlighter from 'react-syntax-highlighter';
import sublime from 'react-syntax-highlighter/dist/esm/styles/hljs/monokai-sublime';
import { checkLangs } from "./common/check-lang";
import { useState, useEffect } from 'react';
import virtualizedRenderer from 'react-syntax-highlighter-virtualized-renderer'; 

const langs = checkLangs(window.location.pathname)

function App() {

  console.log("render")

  const pre = document.body.querySelector("pre")
  const [showRaw, setShowRaw] = useState(false)
  const [codeString, setCodeString] = useState(pre && pre.textContent)
  const [htmlOrgBg] = useState(document.querySelector("html")!.style.background)

  useEffect(() => {
    if (pre) {
      pre.hidden = !showRaw
    }
    if (showRaw) {
      document.querySelector("html")!.style.background = htmlOrgBg
    } else {
      document.querySelector("html")!.style.background = sublime.hljs.background
    }
    document.body.style.padding = "0";
    document.body.style.margin = "0";

    const observer = new MutationObserver(function(mutations){
      console.log(mutations)
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
  }, [showRaw]);

  return (
    <>
      <SyntaxHighlighter
        language={langs[0]}
        customStyle={{margin: 0, height: "100vh", paddingRight: 0, boxSizing: "border-box"}}
        lineNumberStyle={{minWidth: "2.5em"}}
        style={sublime}
        showLineNumbers={true}
        showInlineLineNumbers={true}
        renderer={virtualizedRenderer()}
      >
        {codeString}
      </SyntaxHighlighter>
    </>
  );
}

export default App;
