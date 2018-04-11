/**
 * @fileoverview Create QR Code from input values.
 */
(function (qrcodegen) {
    'use strict';

    /* ---- Util functions ---- */

    /**
     * Convert array to readable string.
     * @param {Array.<string>} array array to convert to string
     * @return {string} converted string
     */
    function arrayToStr(array) {
        return '[' + array.join(', ') + ']';
    }

    /* ---- DOM util functions ---- */

    /**
     * Clear all elements in an element.
     * @param {Element} element outer element to clear
     */
    function clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    /**
     * Get the value of the checked input in radio inputs.
     * @param {NodeList} elements radio inputs
     * @param {string} defaultValue default value
     * @return {string} the value of the checked input
     */
    function getRadioValue(elements, defaultValue) {
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].checked) {
                return elements[i].value;
            }
        }
        return defaultValue;
    }

    /* ---- QR Code related util functions ---- */

    /**
     * Convert 'LMQH' Error correction string to qrcodegen.QrCode.Ecc object.
     * @param {string} eccStr 'LMQH' Error correction string to convert
     * @return {Ecc} converted qrcodegen.QrCode.Ecc level
     */
    function convStrToQrEcc(eccStr) {
        if (eccStr === 'L') {
            return qrcodegen.QrCode.Ecc.LOW;
        } else if (eccStr === 'M') {
            return qrcodegen.QrCode.Ecc.MEDIUM;
        } else if (eccStr === 'Q') {
            return qrcodegen.QrCode.Ecc.QUARTILE;
        } else if (eccStr === 'H') {
            return qrcodegen.QrCode.Ecc.HIGH;
        } else {
            // default
            return qrcodegen.QrCode.Ecc.LOW;
        }
    }

    /**
     * Convert qrcodegen.QrCode.Ecc object to 'LMQH' Error correction string.
     * @param {Ecc} ecc qrcodegen.QrCode.Ecc level
     * @return {string} converted 'LMQH' Error correction string
     */
    function convQrEccToStr(ecc) {
        return ['L', 'M', 'Q', 'H'][ecc.ordinal];
    }

    /**
     * Convert qrcodegen.QrSegment.Mode object to string.
     * @param {Mode} mode qrcodegen.QrSegment.Mode object
     * @return {string} converted string
     */
    function convQrModeToStr(mode) {
        if (mode === qrcodegen.QrSegment.Mode.NUMERIC) {
            return 'NUMERIC';
        } else if (mode === qrcodegen.QrSegment.Mode.ALPHANUMERIC) {
            return 'ALPHANUMERIC';
        } else if (mode === qrcodegen.QrSegment.Mode.BYTE) {
            return 'BYTE';
        } else if (mode === qrcodegen.QrSegment.Mode.KANJI) {
            return 'KANJI';
        } else {
            return 'unknown';
        }
    }

    /**
     * Get cell size from version.
     * @param {number} version version
     * @return {number} converted cell size
     */
    function getCellSizeOfVersion(version) {
        // version 1: 21 cells
        // 4 cells increase per version
        return version * 4 + 17;
    }

    /* ---- Get input values ---- */

    /**
     * Get input values from the from in the HTML.
     * @return {Object} input values
     */
    function getInputValues() {
        var inputForm = document.querySelector('form#input');

        var result = {};
        result.inputText = inputForm.querySelector('[name=inputText]').value;
        result.eccAuto = inputForm.querySelector('[name=eccAuto]').checked;
        result.ecc = convStrToQrEcc(getRadioValue(inputForm.querySelectorAll('[name=ecc]'), null));
        result.margin = parseInt(inputForm.querySelector('[name=margin]').value, 10);
        result.scale = parseInt(inputForm.querySelector('[name=scale]').value, 10);
        result.minVersion = parseInt(inputForm.querySelector('[name=minVersion]').value, 10);
        result.mask = parseInt(inputForm.querySelector('[name=mask]').value, 10);
        return result;
    }

    /* ---- Generate QR Code ---- */

    /**
     * set div#stat.
     * @param {Element} statDiv stat Div to set
     * @param {HTMLCanvasElement} canvas canvas to draw QR Code
     * @param {Object} input input values
     * @param {Array.<qrcodegen.QrSegment>} segs QrSegment object
     * @param {Array.<qrcodegen.QrCode>} qr QrCode object
     */
    function setStats(statDiv, canvas, input, segs, qr) {
        var cellSize = getCellSizeOfVersion(qr.version);

        var versionSpan = document.createElement('span');
        versionSpan.innerText = 'Version: ' + qr.version + ', ';
        versionSpan.title = '' + cellSize + 'cells';
        statDiv.appendChild(versionSpan);

        var sizeSpan = document.createElement('span');
        sizeSpan.innerText = 'Size: ' + cellSize + ' cells = ' + canvas.width + ' px';
        sizeSpan.title = '(' + cellSize + ' cells + 2 * ' + input.margin + ' margins cells) * ' + input.scale + ' px/cell';
        statDiv.appendChild(sizeSpan);

        statDiv.appendChild(document.createElement('br'));

        var miscSpan = document.createElement('span');
        miscSpan.innerText =
            'Mask: Pattern ' + qr.mask + ', ' +
            'Ecc: ' + convQrEccToStr(qr.errorCorrectionLevel) + ', ' +
            'Mode: ' + arrayToStr(segs.map(function (seg) { return convQrModeToStr(seg.mode); }));
        statDiv.appendChild(miscSpan);
    }

    /**
     * Generate QR Code to canvas.
     */
    function generateQr() {
        var canvas = document.querySelector('canvas#qrcode');
        var statDiv = document.querySelector('#stat');
        var input = getInputValues();

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        clearElement(statDiv);
        statDiv.classList.remove('Error');

        try {
            var segs = qrcodegen.QrSegment.makeSegments(input.inputText);
            var qr = qrcodegen.QrCode.encodeSegments(segs, input.ecc, input.minVersion, qrcodegen.QrCode.MAX_VERSION, input.mask, input.eccAuto);
            qr.drawCanvas(input.scale, input.margin, canvas);
            setStats(statDiv, canvas, input, segs, qr);
        } catch (e) {
            // reset canvas
            canvas.width = canvas.height = 100;
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

            // set statDiv the error message
            statDiv.innerText = 'Error: ' + e;
            statDiv.classList.add('Error');
        }

    }

    /* ---- Insert text event ---- */

    /**
     * Event listener for inserting text to inputText textarea.
     * @this {HTMLAnchorElement} clicked <a> element which must have data-insert-value attribute
     */
    function insertText() {
        var insertTextLink = this;
        var insertedText = insertTextLink.getAttribute('data-insert-value');

        var inputTextarea = document.querySelector('form#input [name=inputText]');
        inputTextarea.value += insertedText;

        generateQr();
    }

    /**
     * Event listener for opening QR Code in new tab.
     */
    function openQr() {
        var canvas = document.querySelector('canvas#qrcode');

        var newWindow = window.open();
        var newImg = newWindow.document.createElement('img');
        newImg.src = canvas.toDataURL();
        newWindow.document.body.appendChild(newImg);
    }

    /* ---- Set events ---- */

    window.addEventListener('load', function () {
        var inputForm = document.querySelector('form#input');

        // generateQr
        ['propertychange', 'change', 'keyup', 'paste', 'input'].forEach(function (event) {
            inputForm.querySelector('[name=inputText]').addEventListener(event, generateQr);
            inputForm.querySelector('[name=margin]').addEventListener(event, generateQr);
            inputForm.querySelector('[name=scale]').addEventListener(event, generateQr);
            inputForm.querySelector('[name=minVersion]').addEventListener(event, generateQr);
        });
        ['propertychange', 'click', 'change'].forEach(function (event) {
            inputForm.querySelector('[name=eccAuto]').addEventListener(event, generateQr);
            var elements = inputForm.querySelectorAll('[name=ecc]');
            for (var i = 0; i < elements.length; i++) {
                elements[i].addEventListener(event, generateQr);
            }
        });
        ['propertychange', 'change', 'keyup', 'click'].forEach(function (event) {
            inputForm.querySelector('[name=mask]').addEventListener(event, generateQr);
        });

        // insert text event
        ['click'].forEach(function (event) {
            var elements = inputForm.querySelectorAll('.insert-text');
            for (var i = 0; i < elements.length; i++) {
                elements[i].addEventListener(event, insertText);
            }
        });

        // open QR Code in new tab
        document.querySelector('.open-qrcode').addEventListener('click', openQr);

        // Initial load
        generateQr();
    });

})(qrcodegen);
