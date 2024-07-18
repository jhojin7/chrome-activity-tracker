function logTabInfo(tabId, changeInfo, tab) {
  console.log(JSON.stringify(tab));
  const time = new Date().toISOString();

  // let logs = []
  chrome.storage.local.get(['timeLogs']).then((result)=> {
    console.log(result.timeLogs)
    let logs = JSON.parse(result.timeLogs) || []
    logs.push(tab);
    chrome.storage.local.set({'timeLogs': JSON.stringify(logs)});
  }); 
  // logs.push(tab);
  // chrome.storage.local.set({'timeLogs': JSON.stringify(logs)});
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    logTabInfo(activeInfo.tabId, {}, tab);
  })
})

// Listen for tab updates (including refreshes)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    logTabInfo(tabId, changeInfo, tab);
  }
});