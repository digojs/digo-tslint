# digo-tslint
[digo](https://github.com/digojs/digo) 插件：使用 [TSLint](https://palantir.github.io/tslint/) 检查 TypeScript 代码。

## 安装
```bash
npm install digo-tslint -g
```

## 用法
### 检查 TypeScript 代码
```js
digo.src("*.ts", "*.tsx").pipe("digo-tslint");
```

## 选项
```js
digo.src("*.ts", "*.tsx").pipe("digo-tslint", {
    level: "error",                 // 报错等级。可以是 "error" 或 "warning"。
    configuration: "tslint.json",   // 规则文件。详见 https://palantir.github.io/tslint/usage/configuration/
    program: null,                  // 如果需要启动类型检查，则指定 tsconfig.json 路径或 ts.Program 对象。
    rulesDirectory: null,           // 规则文件夹。
    cwd: null                       // 根文件夹。
});
```

另参考 https://palantir.github.io/tslint/rules/。
