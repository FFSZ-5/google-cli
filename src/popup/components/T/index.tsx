import { ReactNode, useEffect, useState } from "react";

import language from "../../../language";

export interface TType {
  children: ReactNode;
}

const T = (props: TType) => {
  const { children } = props;
  const [text, setText] = useState<string>(children + "");

  const init = async () => {
    // 创建一个 MutationObserver 对象
    const observer = new MutationObserver(
      async (mutationsList: MutationRecord[]) => {
        // 在属性变化时执行回调函数
        for (const mutation of mutationsList) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName == "lang"
          ) {
            const languageItem = await chrome.storage.sync.get("language");
            const lang = languageItem?.language ?? "en";
            setText(language?.[lang]?.[children + ""] ?? children);
          }
        }
      }
    );

    // 选择要监听的元素
    const targetElement = document.querySelector("html");

    // 配置 MutationObserver
    const config = { attributes: true };

    // 开始监听属性变化
    observer.observe(targetElement as Node, config);
    const languageItem = await chrome.storage.sync.get("language");
    const lang = languageItem?.language ?? "en";
    setText(language?.[lang]?.[children + ""] ?? children);
  };
  useEffect(() => {
    init();
  }, [props]);
  return <span>{text}</span>;
};
//set language
export const translate = async (lang: string) => {
  const html = document.querySelector("html");
  if (html) {
    await chrome.storage.sync.set({ language: lang });
    html.setAttribute("lang", lang);
  }
};
export default T;
