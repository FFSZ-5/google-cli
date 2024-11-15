import "./index.less";

import { Button, Form, Input, Spin, message } from "antd";
import { GetInfo, Login } from "../../services";
import T, { translate } from "../../components/T";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import config from "../../../env";
import { encodePassword } from "../../utils/encode";
import { increment } from "../../store/action";

export interface InfoType {
  token: string;
  stamp: string;
}
type FieldType = {
  username?: string;
  password?: string;
};
function App() {
  const count = useSelector((state) => state.reducer.value);
  const dispatch = useDispatch();
  console.log("lfsz", count);

  //token信息
  const [info, setInfo] = useState<InfoType>({ token: "", stamp: "" });
  //页面loading
  const [loading, setLoading] = useState<boolean>(true);
  //登录loading
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const clickHandle = async (val: string) => {
    await translate(val);
    chrome.runtime.sendMessage("language");
  };
  //获取token
  const getToken = () => {
    console.log("lfsz loading", loading);

    chrome.tabs.query({}, async function (tabs) {
      for await (const item of tabs) {
        const domain = item?.url?.match(
          /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\\/\n?]+)/im
        )?.[1];
        console.log("lfsz domain", domain);

        if (config.domain === domain) {
          const tokenInfo = await chrome.storage.sync.get(["token", "stamp"]);
          localStorage.stamp = tokenInfo?.stamp;
          localStorage.token = tokenInfo?.token;
          const { data } = await GetInfo.get({ sid: tokenInfo?.token });
          console.log("lfsz-----------------------");

          if (data) {
            setInfo({ token: tokenInfo?.token, stamp: tokenInfo?.stamp });
          } else {
            setInfo({ token: "", stamp: "" });
          }
          setLoading(false);
          return;
        }
      }
      setLoading(false);
    });
  };
  //登录
  const onFinish = async (formData: FieldType) => {
    const { password, username } = formData;
    const { password: hasEncodePassword, stamp } = await encodePassword(
      password ?? ""
    );
    if (!hasEncodePassword) {
      setLoginLoading(false);
      return;
    }
    const { data } = await Login.post({
      password: hasEncodePassword,
      username: username,
    });
    if (data) {
      console.log("lfsz", data?.UID, stamp);

      await chrome.storage.sync.set({ token: data?.UID, stamp });
      setInfo({ token: data?.UID, stamp });
      message.success("success");
      localStorage.stamp = stamp;
      localStorage.token = data?.UID;
      GetInfo.get({ sid: data?.UID });
    } else {
      message.error("wrong");
    }
    setLoginLoading(false);
  };
  const onFinishFailed = (e) => {
    console.log("lfsz fail", e);
  };
  //render function
  const renderDom = () => {
    console.log("lfsz info", info, loading);

    if (info.token) {
      return <div>登录成功{count}</div>;
    } else {
      return (
        <div>
          <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item<FieldType>
              label={<T>username</T>}
              name='username'
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={<T>password</T>}
              name='password'
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button loading={loginLoading} type='primary' htmlType='submit'>
                <T>submit</T>
              </Button>
            </Form.Item>
          </Form>
          <Button onClick={() => clickHandle("en")}>en</Button>
          <Button onClick={() => clickHandle("zh")}>zh</Button>
        </div>
      );
    }
  };
  //page init
  const init = async () => {
    getToken();
  };
  useEffect(() => {
    console.log("lfsz init");

    init();
  }, []);
  return <div className='popup'>{loading ? <Spin /> : renderDom()}</div>;
}

export default App;
