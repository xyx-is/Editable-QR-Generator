# Editable QR Generator
Editable and configurable offline QR Code generator Web extension addon.

[<img border="0" align="right" src="https://addons.cdn.mozilla.net/static/img/addons-buttons/AMO-button_2.png">](https://addons.mozilla.org/firefox/addon/editable-qr-generator/)

## Features
- Editable: can generate QR Code from any text.
- Configurable: can configure error correction level, size, and mask pattern etc.
- Offline: QR Code is generated offline.
- Minimal permissions: only requires "activeTab" permissions to get the URL and the title of the current page.
- Open Source: Source code is hosted at https://github.com/xyx-is/Editable-QR-Generator
- Support UTF-8 encoding. (Thanks to Project Nayuki)

## Usage
This addon creates a toolbar button with a popup page.
You can generate QR Code by entering any text in the textarea on the head of the popup.

### Insert the URL and the title of the current page
By clicking the links beside "Insert page", you can insert the URL and the title of the current page into the textarea.

### Configure QR Code setting
By changing form inputs in the fieldset middle of the popup, you can Configure QR Code setting.
You can check the description in the tooltips of the form inputs.

### Open QR Code in a new tab and save
By clicking the QR Code canvas, you can Open the QR Code image in a new tab.
You can save the QR Code in the new tab.

Also, if you are using Firefox, you can directly save the QR Code image by right clicking the the QR Code canvas.

## License
MIT License. See [LICENSE](LICENSE) file for the license of this project itself. Third-party libraries are listed below.

## Third-party libraries
This project uses following Third-party libraries.

- [QR Code generator library](https://www.nayuki.io/page/qr-code-generator-library) by Project Nayuki
	- This project retrieved JavaScript library [qrcodegen.js](qrcodegen.js) from https://github.com/nayuki/QR-Code-generator/blob/5a5626edb27ebe230792654a3cc5c6dddde9defc/javascript/qrcodegen.js
	- This library is licensed under MIT License and the copyright term is in the head of the file.

## Notice
QR Code is a registered trademark of DENSO WAVE INCORPORATED.
