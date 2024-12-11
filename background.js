try {
    importScripts(
      "jalaali-core.js",
      "jalaali.min.js"
    )
  }
  catch (err) {
    console.error(err)
  }

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed.");
    chrome.contextMenus.create({
        id: "textLength",
        title: "کپی تاریخ شمسی(میلادی)",
        contexts: ["selection"]
    });
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "textLength") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: CopyConvertedDate,
            args: [info.selectionText]
        });
    }
});

