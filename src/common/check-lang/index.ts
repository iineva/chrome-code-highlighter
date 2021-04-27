// https://github.com/github/linguist/blob/master/lib/linguist/languages.yml
import langData from './languages.yaml';
import SyntaxHighlighter from 'react-syntax-highlighter';

const keys = Object.keys(langData)
const popLangs = [{
    code: "objectivec",
    search: [".mm", ".m"]
}, {
    code: "makefile",
    search: ["makefile", ".mk"]
}, {
    code: "ini",
    search: [".conf"]
}, {
    code: "xml",
    search: [".xml", ".html"]
}]

function checkSyntaxHighlighter(path: string): string[] {

    const basename = path.split('/').pop()
    if (!basename) {
        return []
    }
    
    const ext = "." + basename.split('.').pop()!.toLowerCase()
    const list: string[] = []

    popLangs.forEach(lang => {
        if (
            lang.code === basename.toLowerCase() ||
            lang.search.indexOf(ext) !== -1 ||
            lang.search.indexOf(basename.toLowerCase()) !== -1
        ) {
            list.push(lang.code)
        }
    })

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const item = langData[key]
        if ((item.extensions || []).indexOf(ext) !== -1 || key.toLowerCase() === basename.toLowerCase()) {
            SyntaxHighlighter.supportedLanguages.forEach(code => {
                if ((item.aliases || []).indexOf(code) !== -1) {
                    list.push(code)
                    return
                }
                if ((item.extensions || []).indexOf("." + code) !== -1) {
                    list.push(code)
                    return
                }
                if (key.toLowerCase() === code) {
                    list.push(code)
                    return
                }
            });
        }
    }
    // 去重
    return list.filter(function(item, index) {
        //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
        return list.indexOf(item, 0) === index;
    })
}

export function checkLangs(path: string): string[] {
    const lang = checkSyntaxHighlighter(path)
    console.info(`Detection language: ${path} ==> ${lang.length ? lang : "ini[default]"}`)
    return lang.length ? lang : ["ini"]
}

export default checkLangs