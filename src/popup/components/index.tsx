import "./index.less";

import { useEffect, useRef } from "react";

import { Button } from "antd";
import config from "../../env";
import { noticeFn } from "../../background/service-worker";

export interface InfoType {
  token: string;
  stamp: string;
}
function App() {
  const { current: infoRef } = useRef<InfoType>({ token: "", stamp: "" });
  const clickHandle = () => {
    chrome.notifications.create(
      "123", // id
      {
        type: "list",

        iconUrl: "../../icons//icon.png",

        appIconMaskUrl: "../../icons//icon.png",

        title: "通知主标题",
        // progress: 50,

        message: "通知副标题",

        contextMessage: "好开心呀，终于会使用谷歌扩展里面的API了！",

        buttons: [
          // { title: "按钮1的标题", iconUrl: "icon3.png" },
          // { title: "按钮2的标题", iconUrl: "icon4.png" },
        ],

        items: [
          { title: "消息1", message: "今天天气真好！" },
          { title: "消息2", message: "明天天气估计也不错！" },
        ],

        eventTime: Date.now() + 2000,
      },
      (id) => {
        console.log("lfsz", id);
      }
    );
    console.log("lfsz", infoRef?.token, infoRef?.stamp);
  };
  const getToken = () => {
    chrome.tabs.query({}, async function async(tabs) {
      tabs.forEach(async (item: chrome.tabs.Tab) => {
        const domain = item?.url?.match(
          /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\\/\n?]+)/im
        )?.[1];
        if (config.domain === domain) {
          const data = await chrome.storage.sync.get(["token", "stamp"]);
          infoRef.token = data?.token;
          infoRef.stamp = data?.stamp;
        }
      });
    });
  };
  useEffect(() => {
    setInterval(() => {
      getToken();
    }, 1000);
  }, []);
  return (
    <div className='popup'>
      {}
      <Button onClick={clickHandle}>1234</Button>
    </div>
  );
}

export default App;
