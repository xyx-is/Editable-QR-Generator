/**
 * @fileoverview set current page URL and title to inserting text links
 */
(function () {
    'use strict';

    function setInsertValue(tabs) {
        var tab = tabs[0];

        // set page URL
        var pageUrl = tab.url;
        var insertUrlTextLink = document.querySelector('.insert-text[data-insert-type=url]');
        insertUrlTextLink.setAttribute('data-insert-value', pageUrl);
        insertUrlTextLink.setAttribute('title', pageUrl);

        // set page title
        var pageTitle = tab.title;
        var insertTitleTextLink = document.querySelector('.insert-text[data-insert-type=title]');
        insertTitleTextLink.setAttribute('data-insert-value', pageTitle);
        insertTitleTextLink.setAttribute('title', pageTitle);
    }

    if (typeof (browser) !== 'undefined') {
        browser.tabs.query({ currentWindow: true, active: true }).then(setInsertValue);
    } else if (typeof (chrome) !== 'undefined') {
        chrome.tabs.query({ currentWindow: true, active: true }, setInsertValue);
    } else {
        return false;
    }

})();
