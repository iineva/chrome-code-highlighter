

function setItem(key: string, value: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (chrome && chrome.storage) {
      chrome.storage.sync.set({[key]: value}, function() {
        resolve(undefined);
      });
    } else {
      window.localStorage.setItem(key, value)
      resolve(undefined);
    }
  })
}

function getItem(key: string): Promise<string|null> {
  return new Promise((resolve, reject) => {
    if (chrome && chrome.storage) {
      chrome.storage.sync.get([key], function(items) {
        resolve(items[key])
      });
    } else {
      resolve(window.localStorage.getItem(key))
    }
  })
}


export default {
  setItem,
  getItem,
}
