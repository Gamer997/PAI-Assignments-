/**
 * http://github.com/valums/file-uploader
 * 
 * Multiple file upload component with progress-bar, drag-and-drop. 
 * Â© 2010 Andrew Valums ( andrew(at)valums.com ) 
 * 
 * Licensed under GNU GPL 2 or later and GNU LGPL 2 or later, see license.txt.
 */

//
// Helper functions
//
var t_typeError = "{file} has invalid extension. Only {extensions} are allowed.";
var t_sizeError = "{file} is too large, maximum file size is {sizeLimit}.";
var t_minSizeError = "{file} is too small, minimum file size is {minSizeLimit}.";
var t_emptyError = "{file} is empty, please select files again without it.";
var t_onLeave = "The files are being uploaded, if you leave now the upload will be cancelled.";
var t_maxUpFile1 = "You can only upload {maxUpFiles} more file(s)";
var t_maxUpFile2 = "You cannot upload any more files";
var t_dragFile = "Drop file here to upload";
var t_selectFile = "Select a file to Upload";
var t_cancel = "Cancel";
var t_uploaded = "Uploaded";
var t_failed = "Failed";
var t_removefile = "Are you sure you want to remove the uploaded file?";
var t_canupload = 'You can upload maximum {maxFiles} file(s)';
var t_maxsizupld = 'Maximum size of <span>{fileSize2Disp}</span> for a file.';
var t_allowedupld = 'Allowed Types : {allowedExtensions}';

if (siteLang == 'ar') {
    t_typeError = "Ø§Ù…ØªØ¯Ø§Ø¯ Ø§Ù„Ù…Ù„Ù? {file} ØºÙŠØ± ØµØ­ÙŠØ­. Ù?Ù‚Ø· Ø§Ù„Ø¥Ù…ØªØ¯Ø§Ø¯Ø§Øª Ø§Ù„ØªØ§Ù„ÙŠØ© {extensions} Ù…Ø³Ù…ÙˆØ­Ø©.";
    t_sizeError = "Ø­Ø¬Ù… Ø§Ù„Ù…Ù„Ù? {file} ÙƒØ¨ÙŠØ± Ø¬Ø¯Ø§Ù‹ØŒ Ø§Ù„Ø­Ø¬Ù… Ø§Ù„Ø£Ù‚ØµÙ‰ Ù„Ù„Ù…Ù„Ù? Ù‡Ùˆ {sizeLimit};";
    t_minSizeError = "Ø­Ø¬Ù… Ø§Ù„Ù…Ù„Ù? {file} ØµØºÙŠØ± Ø¬Ø¯Ø§Ù‹ØŒ Ø§Ù„Ø­Ø¬Ù… Ø§Ù„Ø£Ø¯Ù†Ù‰ Ù„Ù„Ù…Ù„Ù? Ù‡Ùˆ {minsizelimit};";
    t_emptyError = "Ø§Ù„Ù…Ù„Ù? {file} Ø®Ø§Ù„ÙŠØŒ ÙŠØ±Ø¬Ù‰ Ø¥Ø¹Ø§Ø¯Ø© Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ù…Ù„Ù?Ø§Øª Ø¨Ø¯ÙˆÙ†Ù‡.";
    t_onLeave = "Ø¬Ø§Ø±ÙŠ Ø±Ù?Ø¹ Ø§Ù„Ù…Ù„Ù?Ø§ØªØŒ Ù?ÙŠ Ø­Ø§Ù„ Ù…ØºØ§Ø¯Ø±ØªÙƒ Ù„Ù„ØµÙ?Ø­Ø© Ø³ÙŠØªÙ… Ø¥Ù„ØºØ§Ø¡ Ø§Ù„Ø¹Ù…Ù„ÙŠØ©.";
    t_maxUpFile1 = "ÙŠÙ…ÙƒÙ†Ùƒ Ù?Ù‚Ø· Ø±Ù?Ø¹ {maxUpFiles} Ù…Ù„Ù? Ø¥Ø¶Ø§Ù?ÙŠ.";
    t_maxUpFile2 = "Ù„Ø§ ÙŠÙ…ÙƒÙ†Ùƒ Ø±Ù?Ø¹ Ø§Ù„Ù…Ø²ÙŠØ¯ Ù…Ù† Ø§Ù„Ù…Ù„Ù?Ø§Øª";
    t_dragFile = "Ø§Ø³Ø­Ø¨ Ø§Ù„Ù…Ù„Ù? Ù‡Ù†Ø§ Ù„Ù„Ø±Ù?Ø¹";
    t_selectFile = "Ø§Ø®ØªØ± Ø§Ù„Ù…Ù„Ù? Ù„Ù„Ø±Ù?Ø¹";
    t_cancel = "Ø¥Ù„ØºØ§Ø¡";
    t_uploaded = "ØªÙ… Ø±Ù?Ø¹Ù‡";
    t_failed = "Ù„Ù… ÙŠØªÙ… Ø±Ù?Ø¹Ù‡";
    t_removefile = "Ù‡Ù„ Ù?Ø¹Ù„Ø§Ù‹ ØªÙˆØ¯ Ø­Ø°Ù? Ø§Ù„Ù…Ù„Ù? Ø§Ù„Ù…Ø±Ù?ÙˆØ¹ØŸ";
    t_canupload = 'ÙŠÙ…ÙƒÙ†Ùƒ Ø±Ù?Ø¹ {maxFiles} Ù…Ù„Ù? ÙƒØ­Ø¯ Ø£Ù‚ØµÙ‰';
    t_maxsizupld = 'Ø¨Ø­Ø¬Ù… Ù„Ø§ ÙŠØªØ¬Ø§ÙˆØ² <span>&lrm;{fileSize2Disp}&lrm;</span> Ù„Ù„Ù…Ù„Ù? Ø§Ù„ÙˆØ§Ø­Ø¯';
    t_allowedupld = '<span>&lrm;{allowedExtensions};</span> :Ø§Ù„Ø¥Ù…ØªØ¯Ø§Ø¯Ø§Øª Ø§Ù„Ù…Ø³Ù…ÙˆØ­Ø© ';
}
if (siteLang == 'ur') {
    t_typeError = "{file} Ú©ÛŒ Ø§ÛŒÚ©Ù¹ÛŒÙ†Ø´Ù† Ø¯Ø±Ø³Øª Ù†Û?ÛŒÚºÛ” ØµØ±Ù? {extensions} Ú©ÛŒØ§ Ø§Ø¬Ø§Ø²Øª Û?Û’Û”";
    t_sizeError = "{file} Ø¨Û?Øª Ø¨Ú‘ÛŒ Û?Û’Û” Ù?Ø§Ø¦Ù„ Ú©Ø§ Ø³Ø§Ø¦Ø² Ø²ÛŒØ§Ø¯Û? Ø³Û’ Ø²ÛŒØ§Ø¯Û? {sizeLimit} Û?Ùˆ Ø³Ú©ØªØ§ Û?Û’Û”";
    t_minSizeError = "{file} Ø¨Û?Øª Ú†Ú¾ÙˆÙ¹ÛŒ Û?Û’Û” Ù?Ø§Ø¦Ù„ Ú©Ø§ Ø³Ø§Ø¦Ø² Ú©Ù… Ø§Ø²Ú©Ù… {sizeLimit} Û?Ùˆ Ø³Ú©ØªØ§ Û?Û’Û”{file}";
    t_emptyError = "{file} Ø®Ø§Ù„ÛŒ Û?Û’Û” Ø¨Ø±Ø§Ø¦Û’ Ù…Û?Ø±Ø¨Ø§Ù†ÛŒ Ø§Ø³ Ù?Ø§Ø¦Ù„ Ú©Û’ Ø¹Ù„Ø§ÙˆÛ? Ù?Ø§Ø¦Ù„ÛŒÚº Ø¯ÙˆØ¨Ø§Ø±Û? Ù…Ù†ØªØ®Ø¨ Ú©Ø±ÛŒÚºÛ”";
    t_onLeave = "Ù?Ø§Ø¦Ù„ÛŒÚº Ø§Ù¾ Ù„ÙˆÚˆ Û?Ùˆ Ø±Û?ÛŒ Û?ÛŒÚºØŒ Ø§Ú¯Ø± Ø¢Ù¾ Ø§Ø¨ Ú†Ù„Û’ Ø¬Ø§Ø¦ÛŒÚº ØªÙˆ Ø§Ù¾ Ù„ÙˆÚˆ Ú©Ø§ Ø¹Ù…Ù„ Ù…Ù†Ø³ÙˆØ® Û?Ùˆ Ø¬Ø§Ø¦Û’ Ú¯Ø§Û”";
    t_maxUpFile1 = "Ø¢Ù¾ Ø²ÛŒØ§Ø¯Û? Ø³Û’ Ø²ÛŒØ§Ø¯Û? Ù…Ø²ÛŒØ¯ {maxUpFiles} Ù?Ø§Ø¦Ù„(ÛŒÚº) Ø§Ù¾ Ù„ÙˆÚˆ Ú©Ø±Ø³Ú©ØªÛ’ Û?ÛŒÚºÛ”";
    t_maxUpFile2 = "Ø¢Ù¾ Ù…Ø²ÛŒØ¯ Ú©ÙˆØ¦ÛŒ Ù?Ø§Ø¦Ù„ Ø§Ù¾ Ù„ÙˆÚˆ Ù†Û?ÛŒÚº Ú©Ø± Ø³Ú©ØªÛ’";
    t_dragFile = "Ø§Ù¾ Ù„ÙˆÚˆ Ú©Ø±Ù†Û’ Ú©Û’ Ù?Ø§Ø¦Ù„ÛŒÚº ÛŒÛ?Ø§Úº Ø±Ú©Ú¾ÛŒÚºÛ”";
    t_selectFile = "Ø§Ù¾ Ù„ÙˆÚˆ Ú©Ø±Ù†Û’ Ú©Û’ Ù„ÛŒÛ’ Ø§ÛŒÚ© Ù?Ø§Ø¦Ù„ Ù…Ù†ØªØ®Ø¨ Ú©Ø±ÛŒÚº";
    t_cancel = "Ù…Ù†Ø³ÙˆØ® Ú©Ø±ÛŒÚº";
    t_uploaded = "Ø§Ù¾ Ù„ÙˆÚˆ Û?Ùˆ Ú¯Ø¦ÛŒ(Úº)ÙŒ";
    t_failed = "Ø§Ù¾ Ù„ÙˆÚˆ Ù†Û?ÛŒÚº Û?Ùˆ Ø³Ú©ÛŒ(Úº)";
    t_removefile = "Ú©ÛŒØ§ Ø¢Ù¾ ÙˆØ§Ù‚Ø¹ÛŒ Ø§Ù¾ Ù„ÙˆÚˆ Ú©ÛŒ Ú¯Ø¦ÛŒ Ù?Ø§Ø¦Ù„ Ú©Ùˆ Û?Ù¹Ø§Ù†Ø§ Ú†Ø§Û?ØªÛ’ Û?ÛŒÚºØŸ";
    t_canupload = 'Ø¢Ù¾ Ø²ÛŒØ§Ø¯Û? Ø³Û’ Ø²ÛŒØ§Ø¯Û? {maxFiles} Ù?Ø§Ø¦Ù„(ÛŒÚº) Ø§Ù¾ Ù„ÙˆÚˆ Ú©Ø± Ø³Ú©ØªÛ’ Û?ÛŒÚº';
    t_maxsizupld = ' Û?Ùˆ Ø³Ú©ØªØ§ Û?Û’Û” ' + '<span>&lrm;{fileSize2Disp}</span>' + ' Ø§ÛŒÚ© Ù?Ø§Ø¦Ù„ Ú©Ø§ Ø²ÛŒØ§Ø¯Û? Ø³Û’ Ø²ÛŒØ§Ø¯Û? Ø³Ø§Ø¦Ø²';
    t_allowedupld = '<span>&lrm;{allowedExtensions};</span> :Ù‚Ø§Ø¨Ù„Ù? Ù‚Ø¨ÙˆÙ„ Ø§Ù‚Ø³Ø§Ù…';
}
var qqFileUploaderInstance = {};
var qq = qq || {};


/**
 * Adds all missing properties from second obj to first obj
 */
qq.extend = function(first, second) {
    for (var prop in second) {
        first[prop] = second[prop];
    }
};

/**
 * Searches for a given element in the array, returns -1 if it is not present.
 * @param {Number} [from] The index at which to begin the search
 */
qq.indexOf = function(arr, elt, from) {
    if (arr.indexOf)
        return arr.indexOf(elt, from);

    from = from || 0;
    var len = arr.length;

    if (from < 0)
        from += len;

    for (; from < len; from++) {
        if (from in arr && arr[from] === elt) {
            return from;
        }
    }
    return -1;
};

qq.getUniqueId = (function() {
    var id = 0;
    return function() {
        return id++;
    };
})();
qq.qqConfirmWhileRemove = false;

//
// Events
qq.attach = function(element, type, fn) {
    if (element.addEventListener) {
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, fn);
    }
};
qq.detach = function(element, type, fn) {
    if (element.removeEventListener) {
        element.removeEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.detachEvent('on' + type, fn);
    }
};

qq.preventDefault = function(e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
};

//
// Node manipulations

/**
 * Insert node a before node b.
 */
qq.insertBefore = function(a, b) {
    b.parentNode.insertBefore(a, b);
};
qq.remove = function(element) {
    element.parentNode.removeChild(element);
};

qq.contains = function(parent, descendant) {
    // compareposition returns false in this case
    if (parent == descendant)
        return true;

    if (parent.contains) {
        return parent.contains(descendant);
    } else {
        return !!(descendant.compareDocumentPosition(parent) & 8);
    }
};

/**
 * Creates and returns element from html string
 * Uses innerHTML to create an element
 */
qq.toElement = (function() {
    var div = document.createElement('div');
    return function(html) {
        div.innerHTML = html;
        var element = div.firstChild;
        div.removeChild(element);
        return element;
    };
})();

//
// Node properties and attributes

/**
 * Sets styles for an element.
 * Fixes opacity in IE6-8.
 */
qq.css = function(element, styles) {
    if (styles.opacity != null) {
        if (typeof element.style.opacity != 'string' && typeof(element.filters) != 'undefined') {
            styles.filter = 'alpha(opacity=' + Math.round(100 * styles.opacity) + ')';
        }
    }
    qq.extend(element.style, styles);
};
qq.hasClass = function(element, name) {
    var re = new RegExp('(^| )' + name + '( |$)');
    return re.test(element.className);
};
qq.addClass = function(element, name) {
    if (!qq.hasClass(element, name)) {
        element.className += ' ' + name;
    }
};
qq.removeClass = function(element, name) {
    var re = new RegExp('(^| )' + name + '( |$)');
    element.className = element.className.replace(re, ' ').replace(/^\s+|\s+$/g, "");
};
qq.setText = function(element, text) {
    element.innerText = text;
    element.textContent = text;
};

//
// Selecting elements

qq.children = function(element) {
    var children = [],
        child = element.firstChild;

    while (child) {
        if (child.nodeType == 1) {
            children.push(child);
        }
        child = child.nextSibling;
    }

    return children;
};

qq.getByClass = function(element, className) {
    if (element.querySelectorAll) {
        return element.querySelectorAll('.' + className);
    }

    var result = [];
    var candidates = element.getElementsByTagName("*");
    var len = candidates.length;

    for (var i = 0; i < len; i++) {
        if (qq.hasClass(candidates[i], className)) {
            result.push(candidates[i]);
        }
    }
    return result;
};

/**
 * obj2url() takes a json-object as argument and generates
 * a querystring. pretty much like jQuery.param()
 * 
 * how to use:
 *
 *    `qq.obj2url({a:'b',c:'d'},'http://any.url/upload?otherParam=value');`
 *
 * will result in:
 *
 *    `http://any.url/upload?otherParam=value&a=b&c=d`
 *
 * @param  Object JSON-Object
 * @param  String current querystring-part
 * @return String encoded querystring
 */
qq.obj2url = function(obj, temp, prefixDone) {
    var uristrings = [],
        prefix = '&',
        add = function(nextObj, i) {
            var nextTemp = temp ?
                (/\[\]$/.test(temp)) // prevent double-encoding
                ?
                temp :
                temp + '[' + i + ']' :
                i;
            if ((nextTemp != 'undefined') && (i != 'undefined')) {
                uristrings.push(
                    (typeof nextObj === 'object') ?
                    qq.obj2url(nextObj, nextTemp, true) :
                    (Object.prototype.toString.call(nextObj) === '[object Function]') ?
                    encodeURIComponent(nextTemp) + '=' + encodeURIComponent(nextObj()) :
                    encodeURIComponent(nextTemp) + '=' + encodeURIComponent(nextObj)
                );
            }
        };

    if (!prefixDone && temp) {
        prefix = (/\?/.test(temp)) ? (/\?$/.test(temp)) ? '' : '&' : '?';
        uristrings.push(temp);
        uristrings.push(qq.obj2url(obj));
    } else if ((Object.prototype.toString.call(obj) === '[object Array]') && (typeof obj != 'undefined')) {
        // we wont use a for-in-loop on an array (performance)
        for (var i = 0, len = obj.length; i < len; ++i) {
            add(obj[i], i);
        }
    } else if ((typeof obj != 'undefined') && (obj !== null) && (typeof obj === "object")) {
        // for anything else but a scalar, we will use for-in-loop
        for (var i in obj) {
            add(obj[i], i);
        }
    } else {
        uristrings.push(encodeURIComponent(temp) + '=' + encodeURIComponent(obj));
    }

    return uristrings.join(prefix)
        .replace(/^&/, '')
        .replace(/%20/g, '+');
};

//
//
// Uploader Classes
//
//

var qq = qq || {};

(function($) {
    /**
     * Creates upload button, validates upload, but doesn't create file list or dd. 
     */
    qq.FileUploaderBasic = function(o) {
        this._options = {
            // set to true to see the server response
            debug: false,
            action: '/server/upload',
            params: {},
            button: null,
            multiple: true,
            maxConnections: 3,
            maxUpFiles: '',
            frmImages: '',
            additionalData: '',
            callbackFunc: null,
            // validation        
            allowedExtensions: [],
            enabledropArea: 'Y',
            sizeLimit: 51200,
            buttonHTML: '',
            minSizeLimit: 0,
            // events
            // return false to cancel submit
            onSubmit: function(id, fileName) {},
            onProgress: function(id, fileName, loaded, total) {},
            onComplete: function(id, fileName, responseJSON) {},
            onCancel: function(id, fileName) {},
            // messages
            messages: {
                typeError: t_typeError,
                sizeError: t_sizeError,
                minSizeError: t_minSizeError,
                emptyError: t_emptyError,
                onLeave: t_onLeave
            },
            showMessage: function(message) {
                console.log('bahrain server');
                alert(message);
                if ($(".showCvBlock")[0]) {
                    showUploadCustomCv();
                }
            }
        };
        qq.extend(this._options, o);

        // number of files being uploaded
        this._filesInProgress = 0;
        this._handler = this._createUploadHandler();

        if (this._options.button) {
            this._button = this._createUploadButton(this._options.button);
        }

        this._preventLeaveInProgress();
    };

    qq.FileUploaderBasic.prototype = {
        setParams: function(params) {
            this._options.params = params;
        },
        getInProgress: function() {
            return this._filesInProgress;
        },
        _createUploadButton: function(element) {
            var self = this;

            return new qq.UploadButton({
                element: element,
                multiple: this._options.multiple && qq.UploadHandlerXhr.isSupported(),
                onChange: function(input) {
                    self._onInputChange(input);
                }
            });
        },
        _createUploadHandler: function() {
            var self = this,
                handlerClass;

            if (qq.UploadHandlerXhr.isSupported()) {
                handlerClass = 'UploadHandlerXhr';
            } else {
                handlerClass = 'UploadHandlerForm';
            }

            var handler = new qq[handlerClass]({
                debug: this._options.debug,
                action: this._options.action,
                maxConnections: this._options.maxConnections,
                onProgress: function(id, fileName, loaded, total) {
                    self._onProgress(id, fileName, loaded, total);
                    self._options.onProgress(id, fileName, loaded, total);
                },
                onComplete: function(id, fileName, result) {
                    self._onComplete(id, fileName, result);
                    self._options.onComplete(id, fileName, result);
                },
                onCancel: function(id, fileName) {
                    self._onCancel(id, fileName);
                    self._options.onCancel(id, fileName);
                }
            });

            return handler;
        },
        _preventLeaveInProgress: function() {
            var self = this;

            qq.attach(window, 'beforeunload', function(e) {
                if (!self._filesInProgress) {
                    return;
                }

                var e = e || window.event;
                // for ie, ff
                e.returnValue = self._options.messages.onLeave;
                // for webkit
                return self._options.messages.onLeave;
            });
        },
        _onSubmit: function(id, fileName) {
            this._filesInProgress++;

            //console.log(this._filesInProgress);
        },
        _onProgress: function(id, fileName, loaded, total) {},
        _onComplete: function(id, fileName, result) {
            this._filesInProgress--;
            if (result.error) {
                this._options.showMessage(result.error);
            } else if (result.success) {
                $(this._getItemByFileId(id)).find('.qq-upload-progress span').css('width', '100%');
            }

        },
        _onCancel: function(id, fileName) {
            this._filesInProgress--;
        },
        _onInputChange: function(input) {
            console.log(this._options.maxUpFiles);
            if (this._handler instanceof qq.UploadHandlerXhr) {
                this._uploadFileList(input.files);
            } else {
                if (this._validateFile(input.files[0])) {
                    this._uploadFile(input.files[0]);
                }
            }
            this._button.reset();
        },
        _uploadFileList: function(files) {

            if (files.length > $(this._options.maxUpFiles).val()) {
                if ($(".showCvBlock")[0]) {
                    showUploadCustomCv();
                }
                if ($(this._options.maxUpFiles).val() > 0) {
                    console.log('here');
                    alert(t_maxUpFile1.replace('{maxUpFiles}', $(this._options.maxUpFiles).val()));
                } else {
                    console.log('here1');
                    alert(t_maxUpFile2);
                }
                return;
            }
            for (var i = 0; i < files.length; i++) {
                if (!this._validateFile(files[i])) {
                    return;
                }
            }

            for (var i = 0; i < files.length; i++) {
                this._uploadFile(files[i]);
            }
        },
        _uploadFile: function(fileContainer) {
            var id = this._handler.add(fileContainer);
            var fileName = this._handler.getName(id);

            if (this._options.onSubmit(id, fileName) !== false) {
                this._onSubmit(id, fileName);
                this._handler.upload(id, this._options.params);
            }
        },
        _validateFile: function(file) {
            var name, size;

            if (file.value) {
                // it is a file input            
                // get input value and remove path to normalize
                name = file.value.replace(/.*(\/|\\)/, "");
            } else {
                // fix missing properties in Safari
                name = file.fileName != null ? file.fileName : file.name;
                size = file.fileSize != null ? file.fileSize : file.size;
            }

            if (!this._isAllowedExtension(name)) {
                this._error('typeError', name);
                return false;

            } else if (size === 0) {
                this._error('emptyError', name);
                return false;

            } else if (size && this._options.sizeLimit && size > this._options.sizeLimit) {
                console.log('here in the error block');
                console.log(size);
                console.log(this._options.sizeLimit);
                this._error('sizeError', name);
                return false;

            } else if (size && size < this._options.minSizeLimit) {
                this._error('minSizeError', name);
                return false;
            }

            return true;
        },
        _error: function(code, fileName) {
            alert('in the error block ');
            var message = this._options.messages[code];

            function r(name, replacement) {
                message = message.replace(name, replacement);
            }

            r('{file}', this._formatFileName(fileName));
            r('{extensions}', this._options.allowedExtensions.join(', '));
            r('{sizeLimit}', this._formatSize(this._options.sizeLimit));
            r('{minSizeLimit}', this._formatSize(this._options.minSizeLimit));
            console.log('checking the console option for upload .');
            this._options.showMessage(message);
        },
        _formatFileName: function(name) {
            if (name.length > 33) {
                name = name.slice(0, 19) + '...' + name.slice(-13);
            }
            return name;
        },
        _isAllowedExtension: function(fileName) {
            var ext = (-1 !== fileName.indexOf('.')) ? fileName.replace(/.*[.]/, '').toLowerCase() : '';
            var allowed = this._options.allowedExtensions;

            if (!allowed.length) {
                return true;
            }

            for (var i = 0; i < allowed.length; i++) {
                if (allowed[i].toLowerCase() == ext) {
                    return true;
                }
            }

            return false;
        },
        _formatSize: function(bytes) {
            var i = -1;
            do {
                bytes = bytes / 1024;
                i++;
            } while (bytes > 99);

            return Math.max(bytes, 0.1).toFixed(1) + ['kB', 'MB', 'GB', 'TB', 'PB', 'EB'][i];
        }
    };


    /**
     * Class that creates upload widget with drag-and-drop and file list
     * @inherits qq.FileUploaderBasic
     */
    qq.FileUploader = function(o) {
        // call parent constructor
        qq.FileUploaderBasic.apply(this, arguments);
        // additional options    
        qq.extend(this._options, {

            element: null,
            // if set, will be used instead of qq-upload-list in template
            listElement: null,
            // 
            template: '<div class="qq-uploader">' + '<div class="qq-upload-drop-area" ' + (this._options.enabledropArea != 'Y' ? 'style="display:none"' : '') + '><span>' + t_dragFile + '</span></div><div class="qq-upload-or-area">  </div>' +
                '<div class="qq-upload-button">' + t_selectFile + '</div>' +
                '<ul class="qq-upload-list"></ul>' +
                '</div>',

            // template for one item in file list
            fileTemplate: '<li>' +
                '<span class="qq-upload-preview"></span>' +
                '<span class="qq-upload-file"></span>' +
                '<span class="qq-upload-spinner"></span>' +
                '<span class="qq-upload-size"></span>' +
                '<a class="qq-upload-remove" href="javascript:;"><i class="rz-cross"></i></a>' +
                '<a class="qq-upload-cancel" href="#">' + t_cancel + '</a>' +
                '<span class="qq-upload-failed-text">' + t_failed + '</span>' +
                '<span class="qq-upload-success-text">' + t_uploaded + '</span>' +
                '<span class="qq-upload-progress" style="display:none"><span></span></span>' +
                '</li>',

            classes: {
                // used to get elements from templates
                button: 'qq-upload-button',
                drop: 'qq-upload-drop-area',
                dropActive: 'qq-upload-drop-area-active',
                list: 'qq-upload-list',

                file: 'qq-upload-file',
                spinner: 'qq-upload-spinner',
                size: 'qq-upload-size',
                cancel: 'qq-upload-cancel',
                progress: 'qq-upload-progress',

                // added to list item when upload completes
                // used in css to hide progress spinner
                success: 'qq-upload-success',
                fail: 'qq-upload-failed'
            }
        });
        // overwrite options with user supplied    
        qq.extend(this._options, o);
        //console.log(o);
        this._element = this._options.element;
        this._element.innerHTML = this._options.template;

        if (typeof(this._options.buttonHTML) != 'undefined')
            $(this._element).find('.qq-upload-button').html(this._options.buttonHTML);
        //	console.log(this._element.innerHTML);
        this._listElement = this._options.listElement || this._find(this._element, 'list');

        this._classes = this._options.classes;

        this._button = this._createUploadButton(this._find(this._element, 'button'));

        this._bindCancelEvent();
        this._setupDragDrop();
    };

    // inherit from Basic Uploader
    qq.extend(qq.FileUploader.prototype, qq.FileUploaderBasic.prototype);

    qq.extend(qq.FileUploader.prototype, {
        /**
         * Gets one of the elements listed in this._options.classes
         **/
        _find: function(parent, type) {

            var element = qq.getByClass(parent, this._options.classes[type])[0];
            if (!element) {
                throw new Error('element not found ' + type);
            }

            return element;
        },
        /**
         * Gets one of the elements listed in this._options.classes
         **/
        _bindremoveEvent: function(li, self, result) {

            $(li).find('a.qq-upload-remove').on('click', function(o) {
                if ($(".showCvBlock")[0]) {
                    showUploadCustomCv();
                }
                if (result.success) {

                    if (self.qqConfirmWhileRemove) {
                        if (!confirm(t_removefile)) {
                            return;
                        }
                    }

                    $(this).html('<span class="qq-upload-spinner"></span>');
                    jQuery.post(self._options.action, {
                        f: 'removeUpload',
                        fn: result.filename
                    }, function(r) {
                        var oldvals = $(self._options.frmImages).val();
                        var old_additionalData_vals = $(self._options.additionalData).val();
                        var newvals = oldvals.replace(',' + result.filename, '');
                        var new_additionalData_vals = old_additionalData_vals.replace(',' + JSON.stringify(result.additionalData), '');
                        $(self._options.frmImages).val(newvals);
                        $(self._options.additionalData).val(new_additionalData_vals);
                        $(self._options.maxUpFiles).val($(self._options.maxUpFiles).val() + 1);

                        $(li).remove();

                        if ($(self._options.maxUpFiles).val() > 0 && self._options.enabledropArea == 'Y') {
                            $(self.elementId).find('.qq-upload-drop-area').show();
                        } else {
                            $(self.elementId).find('.qq-upload-drop-area').hide();
                        }
                        //console.log(self._options.callbackFunc);
                        if (self._options.callbackFunc != null)
                            self._options.callbackFunc('', result.filename, r, 'delete');

                    });
                } else
                    $(li).remove();

            });
        },
        _setupDragDrop: function() {
            var self = this,
                dropArea = this._find(this._element, 'drop');

            var dz = new qq.UploadDropZone({
                element: dropArea,
                onEnter: function(e) {
                    qq.addClass(dropArea, self._classes.dropActive);
                    e.stopPropagation();
                },
                onLeave: function(e) {
                    e.stopPropagation();
                },
                onLeaveNotDescendants: function(e) {
                    qq.removeClass(dropArea, self._classes.dropActive);
                },
                onDrop: function(e) {
                    dropArea.style.display = 'none';
                    qq.removeClass(dropArea, self._classes.dropActive);
                    self._uploadFileList(e.dataTransfer.files);
                }
            });
            // to disable drop area from the start        
            //dropArea.style.display = 'none';

            qq.attach(document, 'dragenter', function(e) {
                if (!dz._isValidFileDrag(e))
                    return;

                dropArea.style.display = 'block';
            });
            qq.attach(document, 'dragleave', function(e) {
                if (!dz._isValidFileDrag(e))
                    return;

                var relatedTarget = document.elementFromPoint(e.clientX, e.clientY);
                // only fire when leaving document out
                if (!relatedTarget || relatedTarget.nodeName == "HTML") {
                    dropArea.style.display = 'none';
                }
            });
        },
        _onSubmit: function(id, fileName) {
            // console.log($(".showCvBlock"));
            $(this._element).find('.qq-upload-button').hide();
            if ($(".showCvBlock")[0]) {
                hideUploadCustomCv();
            }


            $(this._element).find('.qq-upload-drop-area').hide();
            qq.FileUploaderBasic.prototype._onSubmit.apply(this, arguments);
            this._addToList(id, fileName);
        },
        _onProgress: function(id, fileName, loaded, total) {
            try {
                fileUploadingProgress();
            } catch (e) {
                console.warn('onCom: Warning! ', e);
            }
            qq.FileUploaderBasic.prototype._onProgress.apply(this, arguments);

            var item = this._getItemByFileId(id);
            var size = this._find(item, 'size');
            size.style.display = 'inline';

            var text;
            if (loaded != total) {
                size.style.width = '100%';
                size.classList.add("pb-1");
                var percent = loaded / total * 100;
                text = '(' + Math.round(percent) + '% from ' + this._formatSize(total) + ')';

                $(this._getItemByFileId(id)).find('.qq-upload-progress').show()
                $(this._getItemByFileId(id)).find('.qq-upload-progress span').css('width', percent + '%');
            } else {
                text = '(' + this._formatSize(total) + ')';
                size.style.width = 'auto';
                size.classList.remove("pb-1");
            }

            qq.setText(size, text);
        },
        _onComplete: function(id, fileName, result) {
            try {
                fileUploadingDone(result);
            } catch (e) {
                console.warn('onCom: Warning! ', e);
            }

            qq.FileUploaderBasic.prototype._onComplete.apply(this, arguments);

            // mark completed
            var item = this._getItemByFileId(id);
            qq.remove(this._find(item, 'cancel'));
            qq.remove(this._find(item, 'spinner'));
            qq.remove(this._find(item, 'progress'));

            $(this._element).find('.qq-upload-button').show();
            if ($("#applyforjob")[0]) {
                applyenable();
            }
            if (result.success) {
                qq.addClass(item, this._classes.success);
                $(this._element).find('.qq-upload-button').hide();
            } else {
                qq.addClass(item, this._classes.fail);
            }
            this._bindremoveEvent(item, this, result);

            dropArea = this._find(this._element, 'drop');
            dropArea.style.display = 'block';


            //Arfan Raza: Hide listing of images details
            //$('.qq-upload-list').hide();
        },
        _addToList: function(id, fileName) {
            var item = qq.toElement(this._options.fileTemplate);
            item.qqFileId = id;

            var fileElement = this._find(item, 'file');
            qq.setText(fileElement, this._formatFileName(fileName));
            this._find(item, 'size').style.display = 'none';

            var ext = (-1 !== fileName.indexOf('.')) ? fileName.replace(/.*[.]/, '').toLowerCase() : '';

            if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'gif') {
                var inputItemElement = $(this._element).find('.qq-upload-button input[type="file"]');

                $(inputItemElement).change(function() {
                    var input = this;
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            $(item).find('.qq-upload-preview').html('<img height="100px" src="' + e.target.result + '" />');
                        }
                        reader.readAsDataURL(input.files[0]);
                    }
                });
                $(inputItemElement).change();
            }
            this._listElement.appendChild(item);

        },
        _getItemByFileId: function(id) {
            var item = this._listElement.firstChild;

            // there can't be txt nodes in dynamically created list
            // and we can  use nextSibling
            while (item) {
                if (item.qqFileId == id)
                    return item;
                item = item.nextSibling;
            }
        },
        /**
         * delegate click event for cancel link 
         **/
        _bindCancelEvent: function() {
            var self = this,
                list = this._listElement;

            qq.attach(list, 'click', function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;

                if (qq.hasClass(target, self._classes.cancel)) {
                    qq.preventDefault(e);

                    var item = target.parentNode;
                    self._handler.cancel(item.qqFileId);
                    qq.remove(item);
                }
            });
        }
    });

    function fileUploadingDone(result) {
        //console.log('Custom File Upload Complete Function ');
        return;

    }

    function fileUploadingProgress() {

    }

    qq.UploadDropZone = function(o) {
        this._options = {
            element: null,
            onEnter: function(e) {},
            onLeave: function(e) {},
            // is not fired when leaving element by hovering descendants   
            onLeaveNotDescendants: function(e) {},
            onDrop: function(e) {}
        };
        qq.extend(this._options, o);

        this._element = this._options.element;

        this._disableDropOutside();
        this._attachEvents();
    };

    qq.UploadDropZone.prototype = {
        _disableDropOutside: function(e) {
            // run only once for all instances
            if (!qq.UploadDropZone.dropOutsideDisabled) {

                qq.attach(document, 'dragover', function(e) {
                    if (e.dataTransfer) {
                        e.dataTransfer.dropEffect = 'none';
                        e.preventDefault();
                    }
                });

                qq.UploadDropZone.dropOutsideDisabled = true;
            }
        },
        _attachEvents: function() {
            var self = this;

            qq.attach(self._element, 'dragover', function(e) {
                if (!self._isValidFileDrag(e))
                    return;

                var effect = e.dataTransfer.effectAllowed;
                if (effect == 'move' || effect == 'linkMove') {
                    e.dataTransfer.dropEffect = 'move'; // for FF (only move allowed)    
                } else {
                    e.dataTransfer.dropEffect = 'copy'; // for Chrome
                }

                e.stopPropagation();
                e.preventDefault();
            });

            qq.attach(self._element, 'dragenter', function(e) {
                if (!self._isValidFileDrag(e))
                    return;

                self._options.onEnter(e);
            });

            qq.attach(self._element, 'dragleave', function(e) {
                if (!self._isValidFileDrag(e))
                    return;

                self._options.onLeave(e);

                var relatedTarget = document.elementFromPoint(e.clientX, e.clientY);
                // do not fire when moving a mouse over a descendant
                if (qq.contains(this, relatedTarget))
                    return;

                self._options.onLeaveNotDescendants(e);
            });

            qq.attach(self._element, 'drop', function(e) {
                if (!self._isValidFileDrag(e))
                    return;

                e.preventDefault();
                self._options.onDrop(e);
            });
        },
        _isValidFileDrag: function(e) {
            var dt = e.dataTransfer,
                // do not check dt.types.contains in webkit, because it crashes safari 4            
                isWebkit = navigator.userAgent.indexOf("AppleWebKit") > -1;

            // dt.effectAllowed is none in Safari 5
            // dt.types.contains check is for firefox            
            return dt && dt.effectAllowed != 'none' &&
                (dt.files || (!isWebkit && dt.types.contains && dt.types.contains('Files')));

        }
    };

    qq.UploadButton = function(o) {
        this._options = {
            element: null,
            // if set to true adds multiple attribute to file input      
            multiple: false,
            // name attribute of file input
            name: 'file',
            onChange: function(input) {},
            hoverClass: 'qq-upload-button-hover',
            focusClass: 'qq-upload-button-focus'
        };

        qq.extend(this._options, o);

        this._element = this._options.element;

        // make button suitable container for input
        qq.css(this._element, {
            position: 'relative',
            overflow: 'hidden',
            // Make sure browse button is in the right side
            // in Internet Explorer
            direction: 'ltr'
        });

        this._input = this._createInput();
    };

    qq.UploadButton.prototype = {
        /* returns file input element */
        getInput: function() {
            return this._input;
        },
        /* cleans/recreates the file input */
        reset: function() {
            if (this._input.parentNode) {
                qq.remove(this._input);
            }

            qq.removeClass(this._element, this._options.focusClass);
            this._input = this._createInput();
        },
        _createInput: function() {
            var input = document.createElement("input");

            if (this._options.multiple) {
                input.setAttribute("multiple", "multiple");
            }

            input.setAttribute("type", "file");
            input.setAttribute("name", this._options.name);


            qq.css(input, {
                position: 'absolute',
                // in Opera only 'browse' button
                // is clickable and it is located at
                // the right side of the input
                left: 0,
                top: 0,
                fontFamily: 'Arial',
                // 4 persons reported this, the max values that worked for them were 243, 236, 236, 118
                fontSize: '118px',
                margin: 0,
                padding: 0,
                cursor: 'pointer',
                opacity: 0,
                width: '100%'
            });

            this._element.appendChild(input);

            var self = this;
            qq.attach(input, 'change', function() {
                self._options.onChange(input);
            });

            qq.attach(input, 'mouseover', function() {
                qq.addClass(self._element, self._options.hoverClass);
            });
            qq.attach(input, 'mouseout', function() {
                qq.removeClass(self._element, self._options.hoverClass);
            });
            qq.attach(input, 'focus', function() {
                qq.addClass(self._element, self._options.focusClass);
            });
            qq.attach(input, 'blur', function() {
                qq.removeClass(self._element, self._options.focusClass);
            });

            // IE and Opera, unfortunately have 2 tab stops on file input
            // which is unacceptable in our case, disable keyboard access
            if (window.attachEvent) {
                // it is IE or Opera
                input.setAttribute('tabIndex', "-1");
            }

            return input;
        }
    };

    /**
     * Class for uploading files, uploading itself is handled by child classes
     */
    qq.UploadHandlerAbstract = function(o) {
        this._options = {
            debug: false,
            action: '/upload.php',
            // maximum number of concurrent uploads        
            maxConnections: 999,
            onProgress: function(id, fileName, loaded, total) {},
            onComplete: function(id, fileName, response) {},
            onCancel: function(id, fileName) {}
        };
        qq.extend(this._options, o);

        this._queue = [];
        // params for files in queue
        this._params = [];
    };
    qq.UploadHandlerAbstract.prototype = {
        log: function(str) {
            if (this._options.debug && window.console)
                console.log('[uploader] ' + str);
        },
        /**
         * Adds file or file input to the queue
         * @returns id
         **/
        add: function(file) {},
        /**
         * Sends the file identified by id and additional query params to the server
         */
        upload: function(id, params) {
            var len = this._queue.push(id);

            var copy = {};
            qq.extend(copy, params);
            this._params[id] = copy;

            // if too many active uploads, wait...
            if (len <= this._options.maxConnections) {
                this._upload(id, this._params[id]);
            }
        },
        /**
         * Cancels file upload by id
         */
        cancel: function(id) {
            this._cancel(id);
            this._dequeue(id);
        },
        /**
         * Cancells all uploads
         */
        cancelAll: function() {
            for (var i = 0; i < this._queue.length; i++) {
                this._cancel(this._queue[i]);
            }
            this._queue = [];
        },
        /**
         * Returns name of the file identified by id
         */
        getName: function(id) {},
        /**
         * Returns size of the file identified by id
         */
        getSize: function(id) {},
        /**
         * Returns id of files being uploaded or
         * waiting for their turn
         */
        getQueue: function() {
            return this._queue;
        },
        /**
         * Actual upload method
         */
        _upload: function(id) {},
        /**
         * Actual cancel method
         */
        _cancel: function(id) {},
        /**
         * Removes element from queue, starts upload of next
         */
        _dequeue: function(id) {
            var i = qq.indexOf(this._queue, id);
            this._queue.splice(i, 1);

            var max = this._options.maxConnections;

            if (this._queue.length >= max && i < max) {
                var nextId = this._queue[max - 1];
                this._upload(nextId, this._params[nextId]);
            }
        }
    };

    /**
     * Class for uploading files using form and iframe
     * @inherits qq.UploadHandlerAbstract
     */
    qq.UploadHandlerForm = function(o) {
        qq.UploadHandlerAbstract.apply(this, arguments);

        this._inputs = {};
    };
    // @inherits qq.UploadHandlerAbstract
    qq.extend(qq.UploadHandlerForm.prototype, qq.UploadHandlerAbstract.prototype);

    qq.extend(qq.UploadHandlerForm.prototype, {
        add: function(fileInput) {
            fileInput.setAttribute('name', 'qqfile');
            var id = 'qq-upload-handler-iframe' + qq.getUniqueId();

            this._inputs[id] = fileInput;

            // remove file input from DOM
            if (fileInput.parentNode) {
                qq.remove(fileInput);
            }

            return id;
        },
        getName: function(id) {
            // get input value and remove path to normalize
            return this._inputs[id].value.replace(/.*(\/|\\)/, "");
        },
        _cancel: function(id) {
            this._options.onCancel(id, this.getName(id));

            delete this._inputs[id];

            var iframe = document.getElementById(id);
            if (iframe) {
                // to cancel request set src to something else
                // we use src="javascript:false;" because it doesn't
                // trigger ie6 prompt on https
                iframe.setAttribute('src', 'javascript:false;');

                qq.remove(iframe);
            }
        },
        _upload: function(id, params) {
            var input = this._inputs[id];

            if (!input) {
                throw new Error('file with passed id was not added, or already uploaded or cancelled');
            }

            var fileName = this.getName(id);

            var iframe = this._createIframe(id);
            var form = this._createForm(iframe, params);
            form.appendChild(input);

            var self = this;
            this._attachLoadEvent(iframe, function() {
                self.log('iframe loaded');

                var response = self._getIframeContentJSON(iframe);

                self._options.onComplete(id, fileName, response);
                self._dequeue(id);

                delete self._inputs[id];
                // timeout added to fix busy state in FF3.6
                setTimeout(function() {
                    qq.remove(iframe);
                }, 1);
            });

            form.submit();
            qq.remove(form);

            return id;
        },
        _attachLoadEvent: function(iframe, callback) {
            qq.attach(iframe, 'load', function() {
                // when we remove iframe from dom
                // the request stops, but in IE load
                // event fires
                if (!iframe.parentNode) {
                    return;
                }

                // fixing Opera 10.53
                if (iframe.contentDocument &&
                    iframe.contentDocument.body &&
                    iframe.contentDocument.body.innerHTML == "false") {
                    // In Opera event is fired second time
                    // when body.innerHTML changed from false
                    // to server response approx. after 1 sec
                    // when we upload file with iframe
                    return;
                }

                callback();
            });
        },
        /**
         * Returns json object received by iframe from server.
         */
        _getIframeContentJSON: function(iframe) {
            // iframe.contentWindow.document - for IE<7
            var doc = iframe.contentDocument ? iframe.contentDocument : iframe.contentWindow.document,
                response;

            this.log("converting iframe's innerHTML to JSON");
            this.log("innerHTML = " + doc.body.innerHTML);

            try {
                response = eval("(" + doc.body.innerHTML + ")");
            } catch (err) {
                response = {};
            }

            return response;
        },
        /**
         * Creates iframe with unique name
         */
        _createIframe: function(id) {
            // We can't use following code as the name attribute
            // won't be properly registered in IE6, and new window
            // on form submit will open
            // var iframe = document.createElement('iframe');
            // iframe.setAttribute('name', id);

            var iframe = qq.toElement('<iframe src="javascript:false;" name="' + id + '" />');
            // src="javascript:false;" removes ie6 prompt on https

            iframe.setAttribute('id', id);

            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            return iframe;
        },
        /**
         * Creates form, that will be submitted to iframe
         */
        _createForm: function(iframe, params) {
            // We can't use the following code in IE6
            // var form = document.createElement('form');
            // form.setAttribute('method', 'post');
            // form.setAttribute('enctype', 'multipart/form-data');
            // Because in this case file won't be attached to request
            var form = qq.toElement('<form method="post" enctype="multipart/form-data"></form>');

            var queryString = qq.obj2url(params, this._options.action);

            form.setAttribute('action', queryString);
            form.setAttribute('target', iframe.name);
            form.style.display = 'none';
            document.body.appendChild(form);

            return form;
        }
    });

    /**
     * Class for uploading files using xhr
     * @inherits qq.UploadHandlerAbstract
     */
    qq.UploadHandlerXhr = function(o) {
        qq.UploadHandlerAbstract.apply(this, arguments);

        this._files = [];
        this._xhrs = [];

        // current loaded size in bytes for each file 
        this._loaded = [];
    };

    // static method
    qq.UploadHandlerXhr.isSupported = function() {
        var input = document.createElement('input');
        input.type = 'file';

        return (
            'multiple' in input &&
            typeof File != "undefined" &&
            typeof(new XMLHttpRequest()).upload != "undefined");
    };

    // @inherits qq.UploadHandlerAbstract
    qq.extend(qq.UploadHandlerXhr.prototype, qq.UploadHandlerAbstract.prototype)

    qq.extend(qq.UploadHandlerXhr.prototype, {
        /**
         * Adds file to the queue
         * Returns id to use with upload, cancel
         **/
        add: function(file) {
            if (!(file instanceof File)) {
                throw new Error('Passed obj in not a File (in qq.UploadHandlerXhr)');
            }

            return this._files.push(file) - 1;
        },
        getName: function(id) {
            var file = this._files[id];
            // fix missing name in Safari 4
            return file.fileName != null ? file.fileName : file.name;
        },
        getSize: function(id) {
            var file = this._files[id];
            return file.fileSize != null ? file.fileSize : file.size;
        },
        /**
         * Returns uploaded bytes for file identified by id 
         */
        getLoaded: function(id) {
            return this._loaded[id] || 0;
        },
        /**
         * Sends the file identified by id and additional query params to the server
         * @param {Object} params name-value string pairs
         */
        _upload: function(id, params) {
            var file = this._files[id],
                name = this.getName(id),
                size = this.getSize(id);

            this._loaded[id] = 0;

            var xhr = this._xhrs[id] = new XMLHttpRequest();
            var self = this;

            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    self._loaded[id] = e.loaded;
                    self._options.onProgress(id, name, e.loaded, e.total);
                }
            };

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    self._onComplete(id, xhr);
                }
            };

            // build query string
            params = params || {};
            params['qqfile'] = name;
            var queryString = qq.obj2url(params, this._options.action);

            xhr.open("POST", queryString, true);
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.setRequestHeader("X-File-Name", encodeURIComponent(name));
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.send(file);
        },
        _onComplete: function(id, xhr) {
            // the request was aborted/cancelled
            if (!this._files[id])
                return;

            var name = this.getName(id);
            var size = this.getSize(id);

            this._options.onProgress(id, name, size, size);

            if (xhr.status == 200) {
                this.log("xhr - server response received");
                this.log("responseText = " + xhr.responseText);

                var response;

                try {
                    response = eval("(" + xhr.responseText + ")");
                } catch (err) {
                    response = {};
                }

                this._options.onComplete(id, name, response);

            } else {
                this._options.onComplete(id, name, {});
            }

            this._files[id] = null;
            this._xhrs[id] = null;
            this._dequeue(id);
        },
        _cancel: function(id) {
            this._options.onCancel(id, this.getName(id));

            this._files[id] = null;

            if (this._xhrs[id]) {
                this._xhrs[id].abort();
                this._xhrs[id] = null;
            }
        }
    });

})(jQuery);


function createAjaxUploader(objparams) {

    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        $('[rel="browserCheckUploader"]').show();
    }


    var elementId = objparams.eid;
    var fileuploadURL = (typeof(objparams.URL) != 'undefined' && objparams.URL != '' ? objparams.URL : 'j/fileuploader/fileupload.php');
    var maxFilesTxt = (typeof(objparams.maxfilestxt) != 'undefined' ? objparams.maxfilestxt : 'maxFiles');
    var fileTypes = (typeof(objparams.filetypes) != 'undefined' ? objparams.filetypes : 1);
    var maxfilesize = (typeof(objparams.maxfilesize) != 'undefined' ? objparams.maxfilesize : 4194304);
    var extensions = (typeof(objparams.exts) != 'undefined' ? objparams.exts : 'all');
    var enabledropArea = (typeof(objparams.droparea) != 'undefined' ? objparams.droparea : 'Y');
    var callback = (typeof(objparams.callback) != 'undefined' && objparams.callback != '' ? objparams.callback : null);
    var allowedExtensions = ['jpg', 'jpeg', 'gif', 'png', 'pdf', 'docx', 'doc', 'txt', 'xls', 'xlsx', 'csv'];
    var applyExtBr = (typeof(objparams.applyExtBr) != 'undefined' && objparams.applyExtBr != '' ? objparams.applyExtBr : 'Y');
    applyExtBr = applyExtBr == 'Y' ? '<br />' : '';
    if (extensions == 'pic')
        allowedExtensions = ['jpg', 'jpeg', 'gif', 'png'];
    else if (extensions == 'cv')
        allowedExtensions = ['pdf', 'docx', 'doc'];
    else if (extensions == 'csv')
        allowedExtensions = ['csv'];
    else if (extensions == 'quespic')
        allowedExtensions = ['jpg', 'jpeg', 'gif', 'png', 'mp3', 'wav'];
    else if (extensions == 'imageNfile')
        allowedExtensions = ['jpg', 'jpeg', 'gif', 'png', 'pdf', 'doc', 'docx'];
    else if (extensions == 'doc')
        allowedExtensions = ['pdf', 'docx', 'doc', 'txt', 'xls', 'xlsx'];
    else if (extensions == 'video')
        allowedExtensions = ['webm', 'mp4'];
    else if (extensions == 'vidpic')
        allowedExtensions = ['webm', 'mp4', 'jpg', 'jpeg', 'gif', 'png'];

    var maxUpFiles = jQuery(elementId).siblings('input[rel="' + maxFilesTxt + '"]');
    var maxFiles = (jQuery(maxUpFiles).val() != '' ? jQuery(maxUpFiles).val() : 1);
    var frmImages = jQuery(elementId).siblings('input[rel="frmImages"]');
    var additionalData = jQuery(elementId).siblings('input[rel="additionalData"]');
    var i = -1;

    var maxSize = maxfilesize;
    do {
        maxSize = maxSize / 1024;
        i++;
    } while (maxSize > 99);

    var fileSize2Disp = Math.max(maxSize, 0.1).toFixed(1) + ['kB', 'MB', 'GB', 'TB', 'PB', 'EB'][i];

    var uploader = new qq.FileUploader({
        element: jQuery(elementId)[0],
        action: fileuploadURL + '/' + maxfilesize + '/' + extensions,
        params: {},
        buttonHTML: '<img src="' + cdnURL + '">' + applyExtBr + '<span class="sml">' + (maxFiles > 1 ? t_canupload.replace('{maxFiles}', maxFiles) + applyExtBr : '') + t_maxsizupld.replace('{fileSize2Disp}', fileSize2Disp) + '&rlm;<br />' + t_allowedupld.replace('{allowedExtensions}', allowedExtensions.join(', ')) + '</span>',
        maxUpFiles: maxUpFiles,
        frmImages: frmImages,
        additionalData: additionalData,
        callbackFunc: callback,
        sizeLimit: maxfilesize,
        allowedExtensions: allowedExtensions,
        enabledropArea: enabledropArea,
        debug: false,
        onComplete: function(id, f, r) {
            var sClass = '';

            if (typeof(r.success) != 'undefined') {
                jQuery(additionalData).val(jQuery(additionalData).val() + ', ' + JSON.stringify(r.additionalData));
                jQuery(frmImages).val(jQuery(frmImages).val() + ',' + r.filename);
                jQuery(maxUpFiles).val((jQuery(maxUpFiles).val() - 1));
                if (jQuery(elementId + '_u').length)
                    jQuery(elementId + '_u').remove();
            }
            if (jQuery(maxUpFiles).val() > 0 && enabledropArea == 'Y') {
                jQuery(elementId).find('.qq-upload-drop-area').show();
            } else {
                jQuery(elementId).find('.qq-upload-drop-area').hide();
            }

            if (typeof(callback) != 'undefined' && callback != null)
                callback(id, f, r);

        },
        onSubmit: function(id, f) {}
    });
    qqFileUploaderInstance = uploader;
}

// cropper backword compatibility code 
! function(t) {
    "use strict";
    var e = t.HTMLCanvasElement && t.HTMLCanvasElement.prototype,
        o = t.Blob && function() {
            try {
                return Boolean(new Blob)
            } catch (t) {
                return !1
            }
        }(),
        n = o && t.Uint8Array && function() {
            try {
                return 100 === new Blob([new Uint8Array(100)]).size
            } catch (t) {
                return !1
            }
        }(),
        r = t.BlobBuilder || t.WebKitBlobBuilder || t.MozBlobBuilder || t.MSBlobBuilder,
        a = /^data:((.*?)(;charset=.*?)?)(;base64)?,/,
        i = (o || r) && t.atob && t.ArrayBuffer && t.Uint8Array && function(t) {
            var e, i, l, u, c, f, b, d, B;
            if (!(e = t.match(a)))
                throw new Error("invalid data URI");
            for (i = e[2] ? e[1] : "text/plain" + (e[3] || ";charset=US-ASCII"), l = !!e[4], u = t.slice(e[0].length), c = l ? atob(u) : decodeURIComponent(u), f = new ArrayBuffer(c.length), b = new Uint8Array(f), d = 0; d < c.length; d += 1)
                b[d] = c.charCodeAt(d);
            return o ? new Blob([n ? b : f], {
                type: i
            }) : ((B = new r).append(f), B.getBlob(i))
        };
    t.HTMLCanvasElement && !e.toBlob && (e.mozGetAsFile ? e.toBlob = function(t, o, n) {
        var r = this;
        setTimeout(function() {
            t(n && e.toDataURL && i ? i(r.toDataURL(o, n)) : r.mozGetAsFile("blob", o))
        })
    } : e.toDataURL && i && (e.toBlob = function(t, e, o) {
        var n = this;
        setTimeout(function() {
            t(i(n.toDataURL(e, o)))
        })
    })), "function" == typeof define && define.amd ? define(function() {
        return i
    }) : "object" == typeof module && module.exports ? module.exports = i : t.dataURLtoBlob = i
}(window);