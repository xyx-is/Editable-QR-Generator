# Editable QR Generator
好きな文字列からQRコードをオフラインで生成できるWeb extensionのアドオンです。

[<img border="0" align="right" src="https://addons.cdn.mozilla.net/static/img/addons-buttons/AMO-button_2.png">](https://addons.mozilla.org/firefox/addon/editable-qr-generator/)

## 特徴
- 編集可能: 好きな文字列からQRコードを生成できます。
- 設定可能: 誤り訂正レベル、サイズ、マスクパターンなど、各種パラメータを設定可能です。
- オフライン: 一切外部との通信を行わず、ローカルのJavaScriptで動作します。
- 最小限の権限: "activeTab"権限(パーミッション)を、開いたページのURLとタイトルの取得のためのみに使用しています。
- Open Source: ソースコードはこちら https://github.com/xyx-is/Editable-QR-Generator
- UTF-8 エンコーディングをサポートしています。

## 使い方
このアドオンをインストールすると、ツールバーボタンが追加されます。
ツールバーボタンをクリックするとポップアップが表示されるので、テキストボックスに文字列を入力してQRコードを生成してください。

### 現在のページのURLやタイトルを挿入する
「テキスト挿入」欄のリンクをクリックすることで、テキストエリアに現在のページのURLやタイトルを挿入することができます。

### QRコード生成の設定
ポップアップのフォーム枠内の各種入力欄を設定することで、QRコード生成の設定をすることができます。
各設定欄の内容は、マウスオーバーしてツールチップを表示することで説明が表示されます。

### QRコードの画像を新しいタブで開く
生成されたQRコードの画像をクリックすることで、新しいタブでQRコードの画像を開くことができます。
新しいタブに表示されたQRコードの画像を右クリックすれば、画像を保存することが可能です。
Firefoxの場合は、ポップアップ内のQRコードの画像を右クリックすることで、直接画像を保存することも可能です。

### ポップアップを新しいタブで開く
ポップアップ画面のままではテキストエリアで編集が難しいことがあります。
「このページを新しいタブで開く」リンクをクリックすることで、現在開いているポップアップが新しいタブで表示されます。

## License
このプロジェクトのライセンスはMIT Licenseです。[LICENSE](LICENSE) ファイルを確認してください。第三者ライブラリは下記を確認してください。

## 第三者ライブラリ
このプロジェクトは以下の第三者ライブラリを使用しています。

- [QR Code generator library](https://www.nayuki.io/page/qr-code-generator-library) by Project Nayuki
	- このプロジェクトは JavaScript library [qrcodegen.js](qrcodegen.js) を以下からコピーしています: https://github.com/nayuki/QR-Code-generator/blob/5a5626edb27ebe230792654a3cc5c6dddde9defc/javascript/qrcodegen.js
	- このファイルは MIT License でライセンスされています。Copyright term は上記ファイルの先頭に記載されています。

## Notice
「QRコード」は(株)デンソーウェーブの登録商標です。

