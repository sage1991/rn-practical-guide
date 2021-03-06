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

1. packages 폴더 내부에 react-native project 생성
```shell
# inside of packages directory
$ expo init <project-name>
```

2. expo package 의 package.json 수정 (name 및 main 수정)
```json
{
  "name": "<project-name>",
  "main": ".expo/AppEntry.js",
  "version": "1.0.0"
}
```

3. expo-yarn-workspaces 설치 및 package.json 수정
```shell
$ yarn add expo-yarn-workspaces -D
```
아래를 script에 추가
```json
{
  "script": {
    "postinstall": "expo-yarn-workspaces postinstall"
  }
}
```
`expo-yarn-workspaces`에 대한 자세한 정보는 [여기](https://github.com/expo/expo/tree/master/packages/expo-yarn-workspaces) 를 참고

4. metro.config.js 파일 생성
```js
const { createMetroConfiguration } = require("expo-yarn-workspaces")
module.exports = createMetroConfiguration(__dirname)
```

5. `yarn install` 실행




## babel을 이용한 환경 변수 세팅

**준비물:** `babel-plugin-inline-dotenv`

-----------------------------------------------------------------------

expo document 에서 소개하는 [React Native 앱에 환경변수를 설정 하는 방법](https://docs.expo.dev/guides/environment-variables/) 은 
3가지가 있는데 그 중 dotenv file 을 이용한 방법을 사용

1. `babel-plugin-inline-dotenv` 설치
```shell
$ yarn add babel-plugin-inline-dotenv -D
```

2. babel.config.js 에서 .env 파일의 경로를 지정
```javascript
const path = require("path")

module.exports = function (api) {
  api.cache(true)
  return {
    presets: [ "babel-preset-expo" ],
    plugins: [
      [
        "inline-dotenv",
        {
          path: path.resolve("path/to/.env")
        }
      ]
    ]
  }
}
```

3. 필요 할 경우 상황에 따라 다른 .env 파일을 로드하도록 설정

