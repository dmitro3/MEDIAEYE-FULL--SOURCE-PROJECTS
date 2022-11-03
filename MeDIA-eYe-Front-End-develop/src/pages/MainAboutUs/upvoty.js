// Always use the latest version of https://feedback.upvoty.com/javascript/upvoty.embed.js
export var upvoty = {
    debug: false,
    error: false,
    preventScrollEvent: false,
    boardHash: null,
    postHash: null,
    userHash: null,
    settings: {},
    iframe: null,
    counters: { send: 1, receive: 1 },

    init: function (type, settings) {
        if (type == 'identify') {
            try {
                upvoty.settings = this.setSettings(settings);

                var idfy = new XMLHttpRequest;
                idfy.open('POST', 'https://' + upvoty.settings.baseUrl + '/front/handleExternalLogin/', !0);
                idfy.withCredentials = !0;
                let formData = new FormData();
                formData.append('userData', JSON.stringify(settings));
                idfy.send(formData);
                idfy.onload = function () {
                    if (idfy.status != 200) {
                    }
                };
                idfy.onerror = function (e) {
                    e.preventDefault();
                };
            } catch (e) {
            }

        } else if (type == 'render') {
            upvoty.settings = this.setSettings(settings);
            if (upvoty.error) {
                return false;
            }
            var is_safari = navigator.userAgent.indexOf('Safari') > -1;
            var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
            if ((is_chrome) && (is_safari)) {
                is_safari = false;
            }
            if (is_safari) {
                if (!document.cookie.match(/^(.*;)?\s*fixed\s*=\s*[^;]+(.*)?$/)) {
                    document.cookie = 'fixed=fixed; expires=Tue, 19 Jan 2038 03:14:07 UTC; path=/';
                    window.location.replace('https://' + upvoty.settings.baseUrl + '/widget-fix-iframe-3rd.html');
                }
                window.addEventListener('touchstart', {});
                window.addEventListener('touchend', {});
            }
            var d = document.querySelectorAll('div[data-upvoty]')[0];
            upvoty.iframe = document.createElement('iframe');
            upvoty.iframe.name = 'ifr_upvoty';
            upvoty.iframe.width = '100%';
            upvoty.iframe.height = '800px';
            upvoty.iframe.id = 'upvoty-iframe';//+upvoty.settings.id;
            upvoty.iframe.allowtransparency = true;
            upvoty.iframe.style.border = '0';
            upvoty.settings.originHref = window.location.href;

            var fixedLayout = 'roadmap';

            if (upvoty.listeners()) {
                upvoty.iframe.referrerPolicy = 'origin';
                upvoty.iframe.sandbox = 'allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation allow-top-navigation-by-user-activation allow-modals';
                if (is_safari) {
                    upvoty.iframe.sandbox = 'allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation allow-top-navigation-by-user-activation allow-modals';
                }
                upvoty.iframe.src = 'https://' + upvoty.settings.baseUrl + '/front/iframe/';
                if (upvoty.settings.startPage == 'changelog') {
                    upvoty.iframe.src += 'changelog/';
                    fixedLayout = null;
                }
                if (upvoty.settings.startPage == 'roadmap') {
                    upvoty.iframe.src += 'roadmap/';
                }
                if (upvoty.settings.startPage == 'feedbackWidget') {
                    fixedLayout = 'widget';
                }
                if (upvoty.settings.boardHash !== undefined) {
                    upvoty.iframe.src += upvoty.settings.boardHash + '/';
                    fixedLayout = 'board';
                }

                if (fixedLayout != null) {
                    upvoty.iframe.src += '?fixedLayout=' + fixedLayout;
                }
                if (upvoty.settings.ssoToken != undefined && upvoty.settings.ssoToken != null) {
                    upvoty.iframe.src += '&loginMethod=sso';
                }
                if (upvoty.settings.extension != undefined && upvoty.settings.extension != null) {
                    upvoty.iframe.src += '&widgetExtension=' + upvoty.settings.extension;
                }

                if (window.location.search !== '') {
                    var url = new URL(window.location.href);
                    var loginToken = url.searchParams.get("__loginToken");
                    if (loginToken !== null) {
                        upvoty.iframe.src += '&loginToken=' + loginToken;
                    }
                }


                upvoty.bindEvent(upvoty.iframe, 'beforeunload', upvoty.destroy);
                upvoty.bindEvent(upvoty.iframe, 'unload', upvoty.destroy);
                d.appendChild(upvoty.iframe);
            }
        }
    },
    destroy: function () {
        try {
            upvoty.unbindEvent(window, 'message', upvoty.func_trigger_message);
            upvoty.unbindEvent(upvoty.iframe, 'load', upvoty.func_trigger_load);
            upvoty.unbindEvent(window, 'resize', upvoty.func_trigger_resize);
            upvoty.unbindEvent(upvoty.elmScrollTrigger, 'scroll', upvoty.func_trigger_scroll);
            upvoty.iframe.remove();
        } catch (e) {
        }
    },
    setSettings: function (settings) {
        if (settings.baseUrl == undefined) {
            upvoty.error = true;
        }
        if (settings.offsetTop == undefined) {
            settings.offsetTop = 100;
        }
        if (settings.offsetBottom == undefined) {
            settings.offsetBottom = 40;
        }
        if (settings.startPage == undefined) {
            settings.startPage = 'board';
        }
        if (settings.id == undefined) {
            settings.id = '1';
        }
        return settings;
    },

    sendMessage: function (inputData) {
        if (upvoty.debug) console.log(['PARENT-SEND:' + upvoty.counters.send++, inputData]);
        upvoty.iframe.contentWindow.postMessage(JSON.stringify(inputData), '*');
    },

    bindEvent: function (element, eventName, eventHandler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, eventHandler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, eventHandler);
        }
    },
    unbindEvent: function (element, eventName, eventHandler) {
        if (element.removeEventListener) {
            element.removeEventListener(eventName, eventHandler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + eventName, eventHandler);
        }
    },
    elmScrollTrigger: window,
    listeners: function () {
        try {
            upvoty.bindEvent(window, 'message', upvoty.func_trigger_message);
            var elem = null;
            if (elem = document.getElementById('feedback')) {
                var children = elem.childNodes;
                for (var i = 0; i < children.length; i++) {
                    if (children[i].className && children[i].className.split(' ').indexOf('section-body') >= 0) {
                        upvoty.elmScrollTrigger = children[i];
                        break;
                    }
                }
            }
            upvoty.bindEvent(upvoty.elmScrollTrigger, 'scroll', upvoty.func_trigger_scroll);
            upvoty.bindEvent(window, 'resize', upvoty.func_trigger_resize);
            upvoty.bindEvent(upvoty.iframe, 'load', upvoty.func_trigger_load);
            //
            return true;
        } catch (e) {
            console.log('Error Upvoty listeners: ' + e.message);
        }
        return false;
    },

    func_trigger_message: function (e) {
        if (e.data !== undefined) {
            var inputData = {};
            try {
                inputData = JSON.parse(e.data);
                if (upvoty.debug) console.log(['PARENT-RECIEVE:' + upvoty.counters.receive++, [inputData.method, inputData]]);
                if (inputData.method == 'init') {
                    var inputData = {
                        'method': 'settings',
                        data: upvoty.settings
                    };
                    upvoty.sendMessage(inputData);
                } else if (inputData.action == 'dimensions') {
                    upvoty.iframe.height = inputData.document.height + 4;
                } else if (inputData.action == 'resetScroll') {
                    if (!upvoty.preventScrollEvent) {
                        upvoty.preventScrollEvent = true;
                        if (window.scrollY > 0 && upvoty.iframe.getBoundingClientRect().top < 0) {
                            var gotoPos = ((window.scrollY > 0 && upvoty.iframe.getBoundingClientRect().top < 0) ? (upvoty.iframe.getBoundingClientRect().top + window.scrollY - upvoty.settings.offsetTop) : 0);
                            if (gotoPos > 0) {
                                window.scrollTo(0, gotoPos);
                            }
                        }
                        setTimeout(function () {
                            upvoty.preventScrollEvent = false;
                        }, 250);
                    }
                } else if (inputData.action == 'doScroll') {
                    if (!upvoty.preventScrollEvent) {
                        upvoty.preventScrollEvent = true;
                        var newTop = inputData.top;
                        if (window.scrollY > 0 && ((newTop + upvoty.iframe.getBoundingClientRect().top) != window.scrollY)) {
                            var gotoPos = newTop + ((window.scrollY > 0 && upvoty.iframe.getBoundingClientRect().top < 0) ? (upvoty.iframe.getBoundingClientRect().top + window.scrollY - upvoty.settings.offsetTop) : 0);
                            if (gotoPos > 0) {
                                window.scrollTo(0, gotoPos);
                            }
                        }
                        setTimeout(function () {
                            upvoty.preventScrollEvent = false;
                        }, 250);
                    }
                }
            } catch (x) {
            }
        }
    },
    func_trigger_scroll: function (e) {
        if (!upvoty.preventScrollEvent) {
            upvoty.sendMessage({
                event: 'scrolled',
                offsetWindow: window.scrollY,
                offsetElement: upvoty.iframe.getBoundingClientRect().top + window.pageYOffset,
                endOfPage: (upvoty.elmScrollTrigger == window && (document.body.scrollHeight - window.scrollY - upvoty.settings.offsetBottom) <= window.innerHeight) || ((upvoty.iframe.getBoundingClientRect().bottom - upvoty.settings.offsetBottom) <= window.innerHeight),
            });
        }
    },
    func_trigger_resize: function () {
        upvoty.sendMessage({ event: 'resized' });
    },
    func_trigger_load: function () {
        upvoty.sendMessage({ event: 'loaded' });
    }
};

export default upvoty;