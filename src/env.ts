export interface ConfigType {
  url: string;
  domain: string;
}
let config: ConfigType = { url: "", domain: "" };
switch (import.meta.env.MODE) {
  case "dev": {
    config = {
      url: "https://mj-rmbg.luluhero.com:9443/",
      domain: "mj-enhance.luluhero.com",
    };
    break;
  }
}
export default config;
