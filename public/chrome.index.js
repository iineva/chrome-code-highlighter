if (document.body) {
    setupApp()
} else {
    // wait body load
    const observer = new MutationObserver(function(mutations) {
        const m = mutations.find(row => {
            if (row.target.nodeName.toLocaleLowerCase() === "body") {
                return true
            }
            return false
        })
        if (m) {
            observer.disconnect()
            setupApp()
        }
    })
    observer.observe(document, {
        childList: true,
        subtree: true, // needed if the node you're targeting is not the direct parent
    })
}

function setupApp() {
    const isPlanTextContent =
        document.head.innerHTML === "" &&
        document.body.querySelectorAll("pre").length === 1 &&
        document.body.querySelector("pre").innerHTML == ""

    if (isPlanTextContent) {
        // inject css
        const cssURL = chrome.runtime.getURL("main.css");
        const link = document.createElement('link');
        link.type = "text/css";
        link.rel = 'stylesheet';
        link.href = cssURL;
        (document.head || document.documentElement).appendChild(link);

        // inject js
        fetch(chrome.runtime.getURL('main.js')).then(j => j.text()).then(js => {
            eval(js)
        }).catch(err => {
            console.log(err)
        })

    } else {
        // console.info("chrome-extension-highlighter: skip render")
    }
}