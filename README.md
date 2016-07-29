# React.js簡易開発環境

## 概要
React.jsを自分のサーバー環境を使用して使いたい場合の環境構築です。

### ゴール
* クライアントサイドJSライブラリの管理 [bower](https://bower.io/)
* クライアントサイドJSライブラリの配置を自動化 [gulp-bower](https://www.npmjs.com/package/gulp-bower)
* Webサーバーでコンテンツを配信 [Gulp.js](http://gulpjs.com/)
* ライブリロード [Browersync](https://www.browsersync.io/)
* React.jsのクイックスタートコードが動く [React.js](https://facebook.github.io/react/index.html)


## 環境
* Linux （今回はCentOS7.0 on Vagrant on Windows7）
* Node.js 4.0

## 流れ
1. プロジェクト用フォルダを作成
2. 各種npmモジュール、必要なコマンドのインストール
3. 各種設定ファイル作成
4. 実行

## スーパークイックスタート

### プロジェクトフォルダを作成
```sh:bash
mkdir react-training
cd react-training/
```

### プロジェクトフォルダ初期化とインストール
```sh:bash
npm init
npm install -g bower
bower install --save react
npm install --save-dev gulp gulp-bower browser-sync
```

```sh:基本フォルダとファイルの作成
mkdir -p app/css
mkdir -p app/js
touch app/css/main.css
touch app/js/main.js
```

### Gulpの設定ファイルを作成

* bowerでインストールしたモジュールを公開フォルダにコピー
* Browsersyncでサーバーを実行、watchタスクで指定したファイルに変更があればブラウザをリロード

```sh:gulpfile.js
var gulp = require('gulp');
var browserSync = require('browser-sync');
var bower = require('gulp-bower');
var reload = browserSync.reload;

gulp.task('default', ['bower','serve']);

gulp.task('bower', function() {
  return bower().pipe(gulp.dest('app/js/lib/'))
});

// watch files for changes and reload
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        port: 3001,
        ui: {
            port: 3002,
            weinre: {
                port: 3003
            }
        }
    });

    gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {
        cwd: 'app'
    }, reload);
});
```


### index.htmlを作成

今回の構成にあわせて、ソース読み込みのパスを変更しています。
`/bower_components` -> `/js/lib`

```sh:app/index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello React!</title>
    <script src="/js/lib/react/react.js"></script>
    <script src="/js/lib/react/react-dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
    <script src='/js/main.js'></script>
    <link rel="stylesheet" href="/css/main.css" type="text/css" >
  </head>
  <body>
    <div id="example"></div>
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>
  </body>
</html>
```

### サーバーの実行
```sh:run!
gulp
```

### エラーの対処
rootユーザーで作業する場合、bowerコマンドではエラーが出る場合がある。

* Error: ENOTDIR: not a directory, open '/root/.config/configstore/bower-github.yml'
`/root/.config`が存在する場合、問題なければ一旦削除して以下の様に`--allow-root`オプションを加えて実行する

`bower install --save react --allow-root`


