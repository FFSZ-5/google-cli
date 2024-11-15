//网页环境
// const getTL = (target: any) => {
//   let position = "";
//   console.log("lfsz", target);

import { urlToFile } from "../popup/utils/tool";

//   if (window.getComputedStyle(target)?.position == "fixed") {
//     position = "fixed";
//   }
//   let parent = target?.offsetParent;
//   let top = target?.offsetTop;
//   let left = target?.offsetLeft;
//   while (parent !== null) {
//     console.log("lfsz parent", parent);

//     if (window.getComputedStyle(parent)?.position == "fixed") {
//       position = "fixed";
//     }
//     top += parent?.offsetTop ?? 0;
//     left += parent?.offsetLeft ?? 0;
//     parent = parent?.offsetParent;
//   }
//   return { top, left, position };
// };
// const addIframe = async (
//   pagePath: string,
//   id: string,
//   css: Record<string, string> = {}
// ) => {
//   const iframe = await document.createElement("iframe");
//   iframe.id = id;
//   const cssList = [];
//   for (const i in css) {
//     cssList.push(`${i}:${css[i]}`);
//   }
//   iframe.style.cssText = cssList.join(";");
//   const getContentPage = await chrome.runtime.getURL(pagePath);
//   iframe.src = getContentPage;
//   return iframe;
// };
// const init = () => {
//   const imgList = document.querySelectorAll("img");
//   if (imgList.length > 0) {
//     imgList.forEach(async (img, index) => {
//       const res = getTL(img);
//       //   let left = img.getBoundingClientRect().left;
//       //   let top = img.getBoundingClientRect().top;

//       const left = res.left;
//       const top = res.top;

//       const style = {
//         position: res.position ? "fixed" : "absolute",
//         height: `${img?.height}px`,
//         width: `${img?.width}px`,
//         inset: "0px",
//         "z-index": "10000002",
//         border: "none",
//         scrollX: left + "px",
//         screenY: top + "px",
//         overflow: "hidden",
//       };
//       const iframe = await addIframe(
//         "contentPage/index.html",
//         "img" + index,
//         style
//       );
//       await document.body.appendChild(iframe);
//     });
//   }
// };

const requestUrl = () => {
  switch (window.location.hostname) {
    case "mj-enhance.luluhero.com": {
      return { url: "https://mj-rmbg.luluhero.com:9443/" };
    }
    case "localhost": {
      return { url: "https://localhost:8080/api/" };
    }
    case "rmbg-enhance.luluhero.com": {
      return { url: "https://rmbg-server.luluhero.com/" };
    }
    case "avc.ai": {
      return { url: "https://api.avc.ai/" };
    }
    // case "https://enhance.avclabs.com/": {
    //   return { url: "https://api.avclabs.com/" };
    // }
  }
};
const domain = [
  "mj-enhance.luluhero.com",
  "localhost",
  "rmbg-enhance.luluhero.com",
  "avc.ai",
  //   "enhance.avclabs.com",
];

const initToken = async () => {
  if (domain.includes(window.location.hostname)) {
    const baseUrl = requestUrl() ?? { url: "" };
    const data = await chrome.storage.sync.get(["token", "stamp"]);
    if (data?.token && data?.stamp) {
      if (localStorage.token && localStorage.stamp) {
        chrome.storage.sync.set({
          token: localStorage?.token,
          stamp: localStorage?.stamp,
        });
      } else {
        const res = await fetch(
          `${baseUrl?.url}user/getInfo?sid=${data.token}`,
          {
            headers: { stamp: data.stamp },
            credentials: "include",
          }
        );
        if (res.status == 401) {
          chrome.storage.sync.remove(["token", "stamp"]);
        } else {
          localStorage.token = data.token;
          localStorage.stamp = data.stamp;
          location.reload();
        }
      }
    } else {
      chrome.storage.sync.set({
        token: localStorage?.token,
        stamp: localStorage?.stamp,
      });
    }
  }
};
//make image and video recognizable
const imgOrVideoHandle = () => {
  const observer = new MutationObserver(() => {
    setStyle();
  });
  observer.observe(document, {
    subtree: true,
    childList: true,
    characterData: true,
  });
  const setStyle = () => {
    const imgList = document.querySelectorAll("img");
    const videoList = document.querySelectorAll("video");
    const fn = (val: HTMLElement) => {
      const style = getComputedStyle(val);
      if (style.pointerEvents == "none") {
        val.style.pointerEvents = "all";
        return;
      }
      if (val.parentElement) {
        fn(val.parentElement);
      }
    };
    imgList.forEach((item) => {
      fn(item);
    });
    videoList.forEach((item) => {
      fn(item);
    });
  };
};
const injectCustomJs = () => {
  const jsPath = "js/inject.js";
  const temp = document.createElement("script");
  temp.setAttribute("type", "text/javascript");
  temp.src = chrome.runtime.getURL(jsPath);
  temp.onload = function () {
    document.head.removeChild(temp);
  };
  document.head.appendChild(temp);
};
chrome.runtime.onMessage.addListener((message) => {
  window.postMessage({ file: message?.test });
});
if (window.top === window.self) {
  //插入js
  injectCustomJs();
  //处理图片样式
  imgOrVideoHandle();
  setInterval(() => {
    //设置token
    initToken();
  }, 1000);
}
