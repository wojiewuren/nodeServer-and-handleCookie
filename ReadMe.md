## demo说明
1. node简单web服务搭建 <./server.js>
    - 本地node： v7.4.0, npm: 4.0.5
2. 运行服务及访问
    - 启动服务：F:\node_local_server>node server.js
    - 浏览器访问：localhost:8889/assets/index.html
2. 操作cookie插件 <./plugin/cookies.js>
    - handleCookie.set({key:value}) // 设置cookie
    - handleCookie.get(key) // 获取cookie
    - handleCookie.remove(key) // 清除一条cookie
    - handleCookie.clear() // 清除所有cookie
    