import logo from "./logo.svg";
import "./App.css";
import * as AssetsService from "./services/assets-service";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { checkLangs } from "./common/check-lang";

import sublime from 'react-syntax-highlighter/dist/esm/styles/hljs/monokai-sublime';

const codeString = document.body.textContent
const codeYaml = `
shadowsocks_com: UGm55bFRyJgoUdI7Q6RTBNUnx8hwqub8OFZ1oOLoadG2G9cH+zyYWxTe421ww/1VPt+4z+V9TMfjd+DvzkNvIKDTOAjvz485E26+aYEtcHSHhv7OHWGcXkVstUZ9m0uTajtlED1XgUZ/VAaCSJSImQ==
neofeed_net: dqybKG4fnrKHEf9K/cQOI6L+WSsXsPn4mo/yuQx7HNEFiJIyk4YxiFWp3mPY2CG+nvO7ScKv6dBM4WPsIkDbUrzjD+MZgQDIXvQpzDdaTfY=
custom_sub:
- name: 🇭🇰 TencentCloudHK
  type: ss
  data: n4A2I7EToLz6Ge9BPlRe12bk9hSOHd0U6Tw7FhWJdAdTb7LJS9Ojt+eENDSl+CYUXN9NQSf4FqGTopBmLnIBzPtdrGQwaWs94qqWRuloozWTbyVNRCqzUzcOW0UDfkNGdozyM8O1MB6UhqretBWaDxs3vuROmQ3gcRo8uGckxqERHGUlj3x00mlzqkKZyfa4
- name: 🇺🇸 ineva-v2ray
  type: vmess
  data: p9CMb6zdpLp11LwFe79VmpzFpYN152w/r70hcTeyQ4q9rIGkatPma3oHZVyGeognDie7qrphmvd1aduMLdPDuLdgl60MsOr2QO/llkWUmt+MtURuoEObZ2nTCxtiOKcr7QpHRpTLnHk5IqZTIXWzhd/s7CAPYP5rIT0YXxiqrYO0MVl0XBQpViHp1nD7H6CsSdaBvCXCqE2uNyb6gFWR8D5FTQIqGcD0n5OTodEpX8ZcAU5ljSlK9yvj0bJk2TK/wzavcJGrnFg1cbFam1DQGmPlpIMVPh+HilpQUX1PA3F7HxgIXvwn/HqkrqVG6rekw3wC/8luixW3/qzjY30rKMY8bQ3AI9Gg+9Whvia4Z04hPLO+A5NR1Arhmx9mLqcMct5LanohwqNulZalsqjd5BVEvist1jnMh15O3Gvps4OicQI+WF9UUbCjbAi2whRM
`

const codeJS = `
function createStyleObject(classNames, style) {
  return classNames.reduce((styleObject, className) => {
    return {...styleObject, ...style[className]};
  }, {});
}

function createClassNameString(classNames) {
  return classNames.join(' ');
}
`

const codeJson = `
[
  {
    "name": "ABAP",
    "type": "programming",
    "extensions": [
      ".abap"
    ]
  }
]
`

document.querySelector("html")!.style.background = sublime.hljs.background
if (process.env.REACT_APP_BUILD_TARGET === "extension") {
  const pre = document.body.querySelector("pre")
  if (pre) {
    pre.innerHTML = ""
  }
} else {
  checkLangs("master/Makefile")
  checkLangs("master/xxx.h")
  checkLangs("master/xxx.c")
  checkLangs("master/xxx.m")
  checkLangs("master/xxx.mm")
  checkLangs("master/xxx.go")
  checkLangs("master/xxx.py")
  checkLangs("master/xxx.http")
}

function App() {
  const langs = checkLangs(window.location.pathname)
  return (
    <>
      <SyntaxHighlighter
        language={langs[0]}
        customStyle={{margin: 0}}
        style={sublime}
        showLineNumbers={false}
      >
        {process.env.REACT_APP_BUILD_TARGET === "extension" ? codeString : codeJS}
      </SyntaxHighlighter>
    </>
  );
}

export default App;
