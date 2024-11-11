import "./index.less";

import { Button } from "antd";
import { GetInfo } from "../../services";
import config from "../../env";
import { useEffect } from "react";
import useStore from "../store";

function App() {
  const clickhandle = () => {
    mess();

    GetInfo.get();
  };
  const mess = async () => {
    const tabId = (await getCurrentTabId()) as number;
    const connect = chrome.tabs.connect(tabId, { name: "myConnect" });
    connect.postMessage("这里是弹出框页面，你是谁？");
    connect.onMessage.addListener((mess) => {
      console.log(mess);
    });
  };
  /**
   * 获取当前 tab ID
   */
  function getCurrentTabId() {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        resolve(tabs.length ? tabs[0].id : null);
      });
    });
  }
  useEffect(() => {
    chrome.tabs.query({}, async function async(tabs) {
      tabs.forEach(async (item: chrome.tabs.Tab) => {
        const domain = item?.url?.match(
          /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\\/\n?]+)/im
        )?.[1];
        if (config.domain === domain) {
          const a = await chrome.scripting.executeScript({
            target: { tabId: item.id ?? 0, allFrames: true },
            func: () => {
              return JSON.stringify(localStorage);
            },
          });
          console.log("lfsz", a);
        }
      });
    });
  });
  return (
    <div className='popup'>
      {}
      <Button onClick={clickhandle}>1234</Button>
    </div>
  );
}

export default App;
