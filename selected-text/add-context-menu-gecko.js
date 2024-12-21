


browser.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");
  browser.contextMenus.create({
    id: "textLength",
    title: "کپی تاریخ شمسی(میلادی)",
    contexts: ["selection"]
  });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "textLength") {
    browser.scripting.executeScript({
      target: { tabId: tab.id },
      func:function(e){ 
        try {
          importScripts(
            "js/jalaali.min.js",
            "js/jalaali-core.js",
            "selected-text/script.js"
          )
        }
        catch (err) {
          console.error(err)
        }
        CopyConvertedDate(e);},
      args: [info.selectionText]
    });
  }
});

