String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function convertToArabic(str) {
    var en = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri",
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "am", "pm", "at"
    ];
    var ar = ["ہفتہ", "اتوار", "پير", "منگل", "بدھ", "جمعرات", "جمعه",
        "جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر",
        '۰', '۱', '۲', '۳', '۴', '۵', '٦', '۷', '۸', '۹', "am", "pm", "-"
    ];
    if (typeof str === 'undefined') {
        return '';
    }
    str = str.toString();
    if (locale === 'ar') {
        for (var i = 0; i < en.length; i++) {
            str = str.replaceAll(en[i], ar[i]);
        }
    }
    return str;
}

function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function popupWindow(url, title, win, w, h) {
    const y = win.top.outerHeight / 2 + win.top.screenY - (h / 2);
    const x = win.top.outerWidth / 2 + win.top.screenX - (w / 2);
    return win.open(url, title, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
}

function fbShareJs(surl) {
    var link = 'https://www.facebook.com/sharer.php?u=' + surl + "?utm_source=facebook&utm_medium=website&utm_campaign=facebook";
    popupWindow(link, 'Share on Facebook', window, 500, 500);
}

/*  SORT OBJECT OF OBJECTS BY PROPETY ASC/DESC
 *  ::1- OBJECT ::2- COUNT ::3- TRUE/FALSE ::4- TRUE/FALSE  
 */
function sortProperties(obj, sortedBy, isNumericSort, reverse) {
    sortedBy = sortedBy || 1; // by default first key
    isNumericSort = isNumericSort || false; // by default text sort
    reverse = reverse || false; // by default no reverse

    var reversed = (reverse) ? -1 : 1;

    var sortable = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            sortable.push([key, obj[key]]);
        }
    }
    if (isNumericSort)
        sortable.sort(function(a, b) {
            return reversed * (a[1][sortedBy] - b[1][sortedBy]);
        });
    else
        sortable.sort(function(a, b) {
            var x = a[1][sortedBy].toLowerCase(),
                y = b[1][sortedBy].toLowerCase();
            return x < y ? reversed * -1 : x > y ? reversed : 0;
        });
    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

function currencyFormat(price) {
    const pieces = parseFloat(price).toFixed(2).split('');
    let ii = pieces.length - 3;
    while ((ii -= 3) > 0) {
        pieces.splice(ii, 0, ',');
    }
    return pieces.join('');
}