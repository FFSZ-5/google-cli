export interface ConfigType {
  url: string;
  domain: string;
  webUrl: string;
}
let config: ConfigType = { url: "", domain: "", webUrl: "" };
switch (import.meta.env.MODE) {
  case "loc": {
    config = {
      //接口
      url: "https://localhost:8080/api",
      //域名
      domain: "localhost",
      //网址
      webUrl: "https://localhost:8080/",
    };
    break;
  }
  //   开发服
  case "dev": {
    config = {
      url: "https://mj-rmbg.luluhero.com:9443/",
      domain: "mj-enhance.luluhero.com",
      webUrl: "https://mj-enhance.luluhero.com:9443/",
    };
    break;
  }
  //测试服
  case "test": {
    config = {
      url: "https://rmbg-server.luluhero.com/",
      domain: "rmbg-enhance.luluhero.com",
      webUrl: "https://rmbg-enhance.luluhero.com/",
    };
    break;
  } //avc
  case "prod": {
    config = {
      url: "https://api.avc.ai/",
      domain: "avc.ai",
      webUrl: "https://avc.ai/",
    };
    break;
  }
}
export default config;
