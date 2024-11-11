//扩展环境

import config from "../env";

//获取当前 tab ID
// function getCurrentTabId() {
//   return new Promise((resolve) => {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       resolve(tabs.length ? tabs[0].id : null);
//     });
//   });
// }
console.log("lfsz", config);

interface ReceiveMessageTypes {
  req: { type: string; info: Record<string, unknown> };
  sender: chrome.runtime.MessageSender;
  sendResponse: () => void;
}
const receiveMessage = async (props: ReceiveMessageTypes) => {
  return true;
};
//页面通信
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  receiveMessage({ req, sender, sendResponse });
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
  const selectItem = menuList.filter((item) => item.id === info.menuItemId)[0];
  if (selectItem) {
    // selectItem.onclick();
  }
});
export const noticeFn = (
  id: string,
  option: chrome.notifications.NotificationOptions
) => {
  chrome.notifications.create(
    id, // id
    {
      type: "progress",

      iconUrl: "../icons/icon.png",

      appIconMaskUrl: "../icons/icon.png",

      title: "通知主标题",
      progress: 50,

      message: "通知副标题",

      contextMessage: "好开心呀，终于会使用谷歌扩展里面的API了！",

      buttons: [
        // { title: "按钮1的标题", iconUrl: "icon3.png" },
        // { title: "按钮2的标题", iconUrl: "icon4.png" },
      ],

      //   items: [
      //     { title: "消息1", message: "今天天气真好！" },
      //     { title: "消息2", message: "明天天气估计也不错！" },
      //   ],

      eventTime: Date.now() + 2000,
    }
  );
};
// chrome.notifications.create(
//   "123", // id
//   {
//     type: "list",

//     iconUrl: "../icons/icon.png",

//     appIconMaskUrl: "../icons/icon.png",

//     title: "通知主标题",
//     // progress: 50,

//     message: "通知副标题",

//     contextMessage: "好开心呀，终于会使用谷歌扩展里面的API了！",

//     buttons: [
//       // { title: "按钮1的标题", iconUrl: "icon3.png" },
//       // { title: "按钮2的标题", iconUrl: "icon4.png" },
//     ],

//     items: [
//       { title: "消息1", message: "今天天气真好！" },
//       { title: "消息2", message: "明天天气估计也不错！" },
//     ],

//     eventTime: Date.now() + 2000,
//   },
//   (id) => {
//     console.log("lfsz", id);
//   }
// );
