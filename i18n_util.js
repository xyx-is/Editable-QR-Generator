/**
 * @fileoverview Util for i18n.
 */

var i18nUtil = (function (qrcodegen, browser) {
    'use strict';

    /**
     * Mock of i18n.getMessage
     * @param {string} messageName messageName for i18n.getMessage
     * @param {string|Array.<string>} substitutions substitutions for i18n.getMessage
     * @return {string} mock strings
     */
    function getMessageMock(messageName, substitutions) {
        var substitutionsArray = Array.isArray(substitutions) ? substitutions : [substitutions];
        return messageName + '(' + substitutionsArray.slice(1).join(',') + ')';
    }

    /**
     * Mock of i18n.getUILanguage
     * @return {string} 'en'
     */
    function getUILanguageMock() {
        return 'en';
    }

    /**
     * Get i18n module
     * @return {Object} i18n object
     */
    function getI18n() {
        if (typeof (browser) !== 'undefined') {
            return browser.i18n;
        } else if (typeof (chrome) !== 'undefined') {
            return chrome.i18n;
        } else {
            return {
                getMessage: getMessageMock,
                getUILanguage: getUILanguageMock,
            };
        }
    }

    var i18n = getI18n();

    /**
     * Replace '__MSG_messagename__' in str by i18n.getMessage(messagename).
     * @param {string} str string includes '__MSG_messagename__'
     * @return {string} replaced string
     */
    function substituteMsg(str) {
        return str.replace(/\_\_MSG\_([\w\@]+)\_\_/g, function (match, messageName) {
            return i18n.getMessage(messageName);
        });
    }

    /**
     * Substitute attributes with '__MSG_messagename__' by i18n to set attribute * as 
     * @param {Element} element element to substitute
     */
    function substituteAttributesOfElement(element) {
        var attributes = element.attributes;
        for (var i = 0; i < attributes.length; i++) {
            element.setAttribute(attributes[i].name, substituteMsg(attributes[i].value));
        }
    }

    /**
     * Substitute '__MSG_messagename__' text by i18n as i18n.getMessage(messagename).
     * @param {Element} textNode text node to substitute
     */
    function substituteTextInTextNode(textNode) {
        textNode.nodeValue = substituteMsg(textNode.nodeValue);
    }

    /**
     * Substitute html tag lang attribute.
     */
    function substituteHtmlLang() {
        document.documentElement.lang = i18n.getUILanguage();
    }

    /**
     * Substitute for all elements and text nodes.
     * @param {Element} root root
     */
    function substituteAllElementsAndTextNodes(root) {
        substituteHtmlLang();

        var treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
        while (treeWalker.nextNode()) {
            substituteAttributesOfElement(treeWalker.currentNode);
        }

        treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        while (treeWalker.nextNode()) {
            substituteTextInTextNode(treeWalker.currentNode);
        }
    }

    return {
        i18n: i18n,
        substituteAttributesOfElement: substituteAttributesOfElement,
        substituteTextInTextNode: substituteTextInTextNode,
        substituteAllElementsAndTextNodes: substituteAllElementsAndTextNodes,
    };
})();
