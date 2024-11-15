# Architecture reference document
https://blog.csdn.net/guoqiankunmiss/article/details/135967318

# command
```js
//debugging popup and contentPage
npm run start
```
# manifest.json
https://www.cnblogs.com/xinxihua/articles/18164765
```json
{
    // extension name
    "name": "MyExtension",
    "version": "3.0",
    "manifest_version": 2,
    //description within 132 character
    "description": "",
    //extension icon recommend size:16，48，128
    "icons": {
      "16": "image/icon-16.png",
      "48": "image/icon-48.png",
      "128": "image/icon-128.png"
    },
    // language
    "default_locale": "en",
    // icon management on the right side of address bar，includes icon and popup page setting
    // it is recommend to keep at lease one setting,otherwise the extension icon will be dark
    "browser_action": {
      "default_icon": "image/icon-128.png",
      "default_title": "My Message",
      "default_popup": "html/browser.html"
    },
    // 地址栏最后附加图标。含图标及行为等
    "page_action": {
      "default_icon": "image/icon-48.png",
      "default_title": "My Test",
      "default_popup": "html/page.html"
    },
  
    // 主题，用于更改整个浏览器的外观
    "theme": {},
  
    // 指定扩展需要跳转到的URL
    "app": {},
  
    // 指定扩展进程的background运行环境及运行脚本
    "background": {
      "scripts": [
        "lib/jquery-3.3.1.min.js",
        "js/background.js"
      ],
      "page":"html/background.html"
    },
  
    // 替换页面
    "chrome_url_overrides": {
      "pageToOverride": "html/overrides.html"
    },
  
    // 指定在web页面运行的脚本/插入的css及运行/插入时机
    "content_scripts": [{
      "matches": ["https://www.baidu.com/*"],
      "css": ["css/mystyles.css"],
      "js": ["lib/jquery-3.3.1.min.js", "js/content.js"],
      "run_at": "document_idle"
    }],
  
    // 安全策略
    "content_security_policy": ",
  
    "file_browser_handlers": [],
  
    // 扩展的官方主页
    "homepage_url": "http://xxx",
  
    // 插件在隐私模式下的配置
    "incognito": "spanning",
  
    // 用户操作意图描述
    "intents": {},
  
    // 扩展唯一标识。不需要人为指定
    "key": ",
  
    // 扩展所需chrome的最小版本
    "minimum_chrome_version": "1.0",
  
    // 消息与本地处理模块映射
    "nacl_modules": [],
  
    // 是否允许脱机运行
    "offline_enabled": true,
  
    // ominbox即地址栏。用于响应地址栏的输入事件
    "omnibox": {
      "keyword": "myKey"
    },
  
    // 选项页。用于在扩展管理页面跳转到选项设置
    "options_page": "aFile.html",
  
    // 申请权限
    "permissions": [
      "https://www.baidu.com/*",
      "background",
      "tabs"
    ],
  
    // 扩展。可调用第三方扩展
    "plugins": [{
      "path": "extension_plugin.dll",
      "public": true
    }],
  
    // 指定所需要的特殊技术。目前只支持"3D"
    "requirements": {},
  
    // 自动升级
    "update_url": "http://path/to/updateInfo.xml",
  
    // 指定资源路径，为String数组
    "web_accessible_resources": []
  }
```