# angular2 with server

技术：angular2 + ngrx + express + mysql

描述：前后端分离的简单示例（如果只需要todomvc前端实现，请转到[angular2-ngrx-todomvc](https://github.com/wang12124468/angular2-todomvc)）

## 运行

### 1、启动后端服务器

- 进入todomvc-server文件，下载依赖 `npm install`
- 配置数据库 todomvc-server > routes > todos.js

        var db = require('mysql').createConnection({
            host: 'localhost',  // 数据库host
            user: 'root',       // 数据库用户名
            password: '123456', // 数据库密码
            database: 'angular2_todomvc' // 数据库名字
        });

- 启动后端服务器 `npm start`

### 2、启动前端服务器

- 进入todomvc文件， 下载依赖 `npm install`
- 启动前端服务器 `npm start` 或者 `ng serve --proxy-config proxy.conf.json --host 0.0.0.0 --port 4200`


注意：如果启动失败了，可能是angular-cli的问题。