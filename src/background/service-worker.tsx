//扩展环境

//获取当前 tab ID
// function getCurrentTabId() {
//   return new Promise((resolve) => {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       resolve(tabs.length ? tabs[0].id : null);
//     });
//   });
// }

const receiveMessage = async (req, sender, sendResponse) => {
  console.log("lfsz", req);
  const popup = chrome.extension.getViews({ type: "popup" })[0];

  console.log("lfsz up", popup);

  //   const tabId = (await getCurrentTabId()) as number;
  //   const data = await chrome.tabs.sendMessage(tabId, "444");
  //   console.log("lfsz", data);

  return true;
};
//页面通信
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log("lfsz", req);

  receiveMessage(req, sender, sendResponse);
  return true;
});

const menuList = [
  {
    id: "element-plus",
    title: "element-plus",
    onclick: function (e) {
      console.log("lfsz", e);
      chrome.tabs.create({
        url: "https://element-plus.gitee.io/zh-CN/component/table-v2.html",
      });
    },
  },
  {
    id: "vue-api",
    title: "vue-api",
    onclick: function () {
      chrome.tabs.create({
        url: "https://cn.vuejs.org/api/",
      });
    },
  },
];

chrome.runtime.onInstalled.addListener(function () {
  menuList.forEach((item) => {
    chrome.contextMenus.create({
      id: item.id,
      title: item.title,
      contexts: ["image", "video"],
    });
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  console.log("lfsz", info, tab);

  const selectItem = menuList.filter((item) => item.id === info.menuItemId)[0];
  if (selectItem) {
    // selectItem.onclick();
  }
});
