import "./App.less";

import { Link, useRoutes } from "react-router-dom";
//扩展环境
import { memo, useState } from "react";

import routes from "./router/routes";

function App() {
  const RouterView = memo(() => useRoutes(routes));
  const [height, setHeight] = useState<string>("600px");
  const [width, setWidth] = useState<string>("800px");
  return (
    <div id='app' style={{ height, width }}>
      <nav>
        <Link to='/login'>登录</Link>
        <Link to='/'>首页</Link>
      </nav>
      <RouterView></RouterView>
    </div>
  );
}

export default App;
