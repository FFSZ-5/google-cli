//网页环境
// const getTL = (target: any) => {
//   let position = "";
//   console.log("lfsz", target);

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

if (window.top === window.self) {
  //向background发送消息
  chrome.runtime.sendMessage({
    info: localStorage?.token ?? 0,
  });
  // 接收消息
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log(request, sender, sendResponse);
    //@ts-expect-error 忽略此行的类型错误，因为暂时无法修改第三方库的类型定义
    sendResponse(1234);
    return true;
  });
  //接收弹窗信息
  chrome.runtime.onConnect.addListener((res) => {
    console.log("contentjs中的 chrome.runtime.onConnect：", res);
    if (res.name === "myConnect") {
      res.onMessage.addListener((mess) => {
        console.log("contentjs中的 res.onMessage.addListener：", mess);
        res.postMessage(localStorage);
      });
    }
  });
}
