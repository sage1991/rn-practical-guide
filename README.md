## Expo + Monorepo 환경 구성 방법

**준비물:** `yarn`, `lerna`, `expo-cli`

-----------------------------------------------------------------------

### Monorepo 프로젝트 생성

1. monorepo로 관리 할 directory 생성
```shell
$ mkdir <monorepo-name>
$ cd <monorepo-name>
```

2. `lerna init` 으로 boilerplate 생성
```shell
$ lerna init
$ ll
drwxr-xr-x    11 harry  staff     352 Nov 13 17:30 .
drwxr-xr-x    20 harry  staff     640 Nov 13 16:02 ..
drwxr-xr-x    15 harry  staff     480 Nov 13 17:21 .git
-rw-r--r--     1 harry  staff     322 Oct 26 23:47 .gitignore
-rw-r--r--     1 harry  staff     111 Nov 13 15:39 lerna.json
-rw-r--r--     1 harry  staff     146 Nov 13 15:45 package.json
drwxr-xr-x     3 harry  staff      96 Nov 13 15:48 packages
```

3. lerna.json 수정
```json
{
  "npmClient": "yarn",
  "useWorkspaces": true,
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0"
}
```

4. package.json 수정
```json
{
  "name": "project-name",
  "private": true,
  "workspaces": [ "packages/*" ],
  "version": "1.0.0",
  "devDependencies": {
    "lerna": "^4.0.0"
  }
}
```

### monorepo 에 expo package 추가

1. monorepo 외부에 react-native project 생성
```shell
# out side of monorepo directory
$ expo init <project-name>
```

2. monorepo 내부로 package import
```shell
$ cd /path/to/monorepo
$ lerna import /path/to/expo/project
```

3. expo package 의 package.json 수정 (name 및 main 수정)
```json
{
  "name": "<project-name>",
  "main": ".expo/AppEntry.js",
  "version": "1.0.0"
}
```

4. expo-yarn-workspaces 설치 및 package.json 수정
```shell
# inside of monorepo directory
$ cd packages/<project-name>
$ yarn workspaces add expo-yarn-workspaces -D
```
아래를 script에 추가
```json
{
  "script": {
    "postinstall": "expo-yarn-workspaces postinstall"
  }
}
```

5. metro.config.js 파일 생성
```js
const { createMetroConfiguration } = require("expo-yarn-workspaces")
module.exports = createMetroConfiguration(__dirname)
```

6. `yarn install` 실행
