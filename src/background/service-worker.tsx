//扩展环境

import config from "../env";
import language from "../language";
import type { languageItemType } from "../language";

const menuInit = async (isUpdate?: boolean) => {
  const languageItem = await chrome.storage.sync.get("language");
  console.log("lfsz language", languageItem?.language);

  const langDic = language[languageItem?.language ?? "en"] as languageItemType;
  if (isUpdate) {
    chrome.contextMenus.update("root", {
      title: langDic?.title,
      contexts: ["video", "image"],
    });
  } else {
    chrome.contextMenus.create({
      id: "root",
      title: langDic?.title,
      contexts: ["video", "image"],
    });
  }

  menuList.forEach((item) => {
    if (isUpdate) {
      console.log("lfsz langDic", langDic);

      chrome.contextMenus.update(item, {
        parentId: "root",
        title: langDic?.[item],
        contexts: item == "Enhance" ? ["video"] : ["image"],
      });
    } else {
      chrome.contextMenus.create({
        parentId: "root",
        id: item,
        title: langDic?.[item],
        contexts: item == "Enhance" ? ["video"] : ["image"],
      });
    }
  });
};
chrome.runtime.onMessage.addListener((message: string) => {
  switch (message) {
    case "language": {
      menuInit(true);
      break;
    }
  }
  return true;
});
const init = async () => {
  const languageItem = await chrome.storage.sync.get("language");
  if (languageItem?.language) return;
  await chrome.storage.sync.set({ language: "en" });
};
init();
const menuList = [
  "Upscale",
  "RemoveBG",
  "RemoveOBJ",
  "Colorize",
  "ColorCalibrate",
  "Denoise",
  "Enhance",
];

chrome.runtime.onInstalled.addListener(function () {
  menuInit();
});

chrome.contextMenus.onClicked.addListener(async function (info) {
  const selectItem = menuList.filter((item) => item === info.menuItemId)[0];
  if (selectItem) {
    chrome.tabs.create({
      url: config.webUrl + selectItem + "?file=" + info?.srcUrl,
    });
  }
});
const baseConfig: chrome.notifications.NotificationOptions = {
  type: "basic",

  iconUrl: "../icons/icon.png",

  appIconMaskUrl: "../icons/icon.png",

  title: "通知主标题",

  message: "通知副标题",

  contextMessage: "好开心呀，终于会使用谷歌扩展里面的API了！",

  //   buttons: [
  //     { title: "按钮1的标题", iconUrl: "icon3.png" },
  //     { title: "按钮2的标题", iconUrl: "icon4.png" },
  //   ],

  //   items: [
  //     { title: "消息1", message: "今天天气真好！" },
  //     { title: "消息2", message: "明天天气估计也不错！" },
  //   ],

  eventTime: Date.now() + 2000,
};
export const noticeFn = async (
  id: string,
  option: chrome.notifications.NotificationOptions
) => {
  chrome.notifications.getAll((res) => {
    if (Object.keys(res).includes(id)) {
      chrome.notifications.update(
        id, // id
        Object.assign(baseConfig, option)
      );
    } else {
      chrome.notifications.create(
        id, // id
        Object.assign(baseConfig, option)
      );
    }
  });
};
