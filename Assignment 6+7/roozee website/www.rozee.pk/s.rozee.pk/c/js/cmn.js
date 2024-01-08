var spinner = '<div class="spinner"></div>';
var spin = '<div class="spinner-wrapper-gray loading center-block spinner_loader spnSeeMore" id="spinChngeUsr">' +
    spinner; +
'</div>';
// Central Spinner HTML
var spinnerHTML = '<div style="text-align:center;  margin-bottom:20px;">' +
    '<div class="spinner-wrapper-gray loading center-block spinner_loader spnSeeMore" id="spinChngeUsr">' +
    '<div class="spinner"></div>' +
    '</div></div>';

function trackAdwordsConv(google_conversion_id, google_conversion_label) {
    var image = new Image(1, 1);
    image.src = "//www.googleadservices.com/pagead/conversion/" + google_conversion_id + "/?label=" + google_conversion_label;
}

function ajx(method, param, path, dataType, cb) {

    if (dataType == '')
        dataType = 'json';
    $.ajax({
        url: ajax_url + path,
        async: true,
        type: method,
        data: param,
        dataType: dataType,
        headers: {
            //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: cb,
        error: function(resp) {
            log(resp);
        }

    });
}

function log(obj) {
    console.log(obj);
}

function selOpt(oln, ListVal) {
    for (i = 0; i < oln.length; i++) {
        if (oln.options[i].value == ListVal) {
            oln.selectedIndex = i;
            break;
        }
    }
}

function verifyEmail() {

    var field = $("#email");
    var spinner = $("#emailSpiner");
    var params = {};
    params.email = field.val();
    spinner.attr("style", "display:block!important");
    ajx('POST', params, 'user/verifyemail', '', function(resp) {
        //alert(resp.response);
        spinner.attr("style", "");
        if (resp.response == 11) {
            p_screen();
            return true;
        } else {
            $('.merror').text(resp.response);
            field.addClass("merror");
            return false;
        }
    });
}

function loadCaptcha(fromPage) {
    var captchaContainer = null;
    captchaContainer = grecaptcha.render('captchaContainer', {
        'sitekey': '6LdTBRUTAAAAAJfuZIS-4yMBHOgaY0yu-VigaxY3',
        'callback': function(response) {
            if (fromPage == 'signIn') {
                $('#googleCaptcha').val(response);
                return;
            }
            if (fromPage == 'savePAQueryData') {
                $('#googleCaptchaQueryData').val(response);
                $('.captchaModal').modal('toggle');
                savePAQueryData();
            }
            if (fromPage == 'savePACallData') {
                $('#googleCaptchaCallData').val(response);
                $('.captchaModal').modal('toggle');
                savePACallData();
            }
        },
    });
}

function refreshRzTkn() {
    var params = {};
    ajx('GET', params, 'user/refreshtkn', '', function(resp) {
        log(resp);
        if (typeof resp.rzTkn !== 'undefined') {
            $('#rzTkn').val(resp.rzTkn);
        }
    });
}

function signIn(confirm) { // from mihnati
    var validator = $('#login-form').validate();
    var validation = validator.form();
    if (validation === false) {
        //return Notify.info(msg_form_warning,{displayDuration:10000});
        return commonAlert('warning', msg_form_warning, '', 'message');
    }
    $('#login-form .loading').show();
    $('#messageContainer').html('');
    $('#login-form .btn-default').hide();
    //commonAlert('warning', msg_plz_wait);
    // Notify.info(msg_plz_wait,{displayDuration:0});
    var params = {};
    let email = $('#login-form #_email').val();
    if (typeof email == 'undefined') {
        email = $("#login-form #email").val();
    }
    params.email = email;
    params.pwd = $('#login-form #pwd').val();
    params.rzTkn = $('#rzTkn').val();
    var gCaptcha = $('#googleCaptcha').val();
    if (gCaptcha != null && gCaptcha != '') {
        params.gCaptcha = gCaptcha;
    }
    if (typeof confirm !== 'undefined') {
        params.goAheadCall = confirm;
        params.token = $('#token').val();
    }
    $.ajax({
        url: ajax_url + 'user/login',
        type: 'POST',
        data: params,
        dataType: 'json',
        headers: {
            //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(resp) {
            //console.log('========> '+typeof resp, resp);
            if (typeof resp.status !== 'undefined' && resp.status === false) {
                commonAlert('danger', resp.response, '', 'messageContainer');
            }
            if (typeof resp.captcha !== 'undefined') {
                if (resp.captcha == 'loadCaptcha') {
                    $('#captchaContainer').html('');
                    $('#login-form .loading').hide();
                    $('.btn-default').show();
                    try {
                        loadCaptcha('signIn');
                    } catch (err) {
                        grecaptcha.reset();
                    }
                }
            }
            if (typeof resp.code !== 'undefined' && resp.code === 121) {
                $('#token').val(resp.token);
                $('#rzTkn').val(resp.rzTkn);
                bootbox.confirm({
                    title: msg_duplicateLogin,
                    message: "<h5>" + resp.message + "</h5>",
                    //className: 'confirmLoginProceed',
                    buttons: {
                        confirm: {
                            label: msg_continuelogin_btn,
                            className: 'btn-success'
                        },
                        cancel: {
                            label: msg_cancel_btn,
                            className: 'btn-danger'
                        }
                    },
                    callback: function(result) {
                        //console.log('This was logged in the callback: ' + result);
                        if (result) {
                            signIn('Y');
                        } else {
                            $('#login-form .loading').hide();
                            $('.btn-default').show();
                        }
                    }
                });
                return;
            }
            if (typeof resp.data !== 'undefined') {
                window.location.href = (typeof resp.url === 'undefined') ? site_url + 'dashboard' : resp.url;
                return;
            }
            if (resp.response == 11) {
                window.location.href = site_url + 'dashboard';
            } else if (resp.response == 'TknMisMatch') {
                $('#rzTkn').val(resp.rzTkn);
                //  Notify.info('Sorry, Token mismatch. Please try again.',{displayDuration:10000});
                $('#login-form .loading').hide();
                $('.btn-default').show();
                commonAlert('danger', 'Something went wrong. Please try again.', '', 'messageContainer');
                return false;
            } else if (resp.response == 'N') {
                window.location.href = site_url + 'register/verifyregister/?email=' + resp.email;
            } else {
                // Notify.info(resp.response,{displayDuration:10000});
                $('#login-form .loading').hide();
                $('.btn-default').show();
                commonAlert('danger', resp.response, '', 'messageContainer');
                $('#rzTkn').val(resp.rzTkn);
                $('.merror').text(resp.response);
                return false;
            }
        },
        error: function(resp) {
            log(resp);
        }

    });
}

function register(token) {

    $('#btnContinue').hide();
    $('#wait').css("display", "block");

    var params = {};
    params = $('#registerFrom').serialize();
    params += '&userJetonRecaptcha=' + token;

    ajx('POST', params, 'user/register', '', function(res) {


        if (res.msg == "") {
            if (typeof fbq == 'function') { // if fbq is defined i.e. fbevents is loaded
                fbq('track', 'CompleteRegistration', {
                    RegisterStep: 1
                });
            }
            var response = "register/signupquestions";
            window.location.href = site_url + response;
        }
        //        else if (res.msg == "CV exists") {
        //            $('.fieldc:last').find('ul.merror').remove();
        //            $('#btnContinue').show();
        //            $('#wait').css("display", "none");
        //            alert(res.response);
        //            return false;
        //        }
        else {
            $('#btnContinue').show();
            $('#wait').css("display", "none");

            $('.fieldc:last').find('ul.merror').remove();
            var ul = $('.fieldc:last').append('<ul class="merror mt10 s-24"></ul>').find('ul.merror');
            if (res.status === false) {
                $.each(res.response, function(field, message) {
                    ul.append('<li>' + message + '</li>');
                });
            } else {
                ul.append('<li>' + res.response + '</li>');
            }
            setTimeout(function() {
                $('.fieldc:last').find('ul.merror').remove();
            }, 5000);
        }
        if (typeof grecaptcha == 'object') { // if grecaptcha is defined i.e. recaptcha is loaded
            grecaptcha.reset();
        }
    });
}

function saveDropCv() {

    var redirectTo = seeker_url + 'dashboard';
    $('#dropCvBtn').hide();
    $('#wait').show();
    var params = {};

    var formData = $("#dropCvForm").serialize();
    var params = {
        formData: formData
    };

    ajx('POST', params, 'job/dropcv1', '', function(res) {
        if (res.status === true) {
            $('.alertdiv').show();
            $('.alertdiv').html(res.message);
            $('#wait').hide();
            setTimeout(function() {
                window.location = redirectTo;
            }, 10000);
        } else {
            $('.alertdiv').show();
            $('.alertdiv').html(res.message);
            $('#wait').hide();
            setTimeout(function() {
                window.location = redirectTo;
            }, 10000);
        }

    });
}



function registerStep2() {
    $('#btnFinish').hide();
    $('#wait').css("display", "block");
    var params = {};
    params = $('#registerFrom2').serialize();
    ajx('POST', params, 'user/registerstep2', '', function(res) {
        if (res.status == true) {
            if (typeof fbq == 'function') { // if fbq is defined i.e. fbevents is loaded
                fbq('track', 'CompleteRegistration', {
                    RegisterStep: 2
                });
            }
            //window.location.href = site_url + "home/verifyregister/?email=" + res.email + "&linkedin=" + res.linkedin;
            window.location.href = site_url + "register/verifyregister";

        } else if (res.status == false) {
            $('#btnFinish').show();
            $('#wait').css("display", "none");
            $('.fieldc:last').find('ul.merror').remove();
            var ul = $('.fieldc:last').append('<ul class="merror mt10 s-24"></ul>').find('ul.merror');
            $.each(res.response, function(field, message) {
                ul.append('<li>' + message + '</li>');
            });

            setTimeout(function() {
                $('.fieldc:last').find('ul.merror').remove();
            }, 5000);
            return false;
            // alert(res.msg);
            //return false;
        } else {
            window.location.href = site_url + "login/";
        }

    });
}

function emailExist() {

    $("#emailSp").attr("style", "display:block !important");
    var params = {};
    params.email = $('#email').val();
    ajx('POST', params, 'user/emailExists', 'html', function(res) {

        $("#emailSp").attr("style", "");
        if (res != '') {
            $("#sign-up #your_email").find("div.merror").text(res);
            $('#email').focus();
            return true;
        } else {
            MovetoNext(true);
        }
    });
}

function mobCode() {

    var params = {};
    params.cCode = $('#countryCode').val();
    ajx('POST', params, 'site/mobileCodes', 'html', function(res) {
        console.log(res);
        if (res == '') {
            $('#mobCdDiv ').hide();
            $('#mobileCode').find('option').remove();
            $('#mobCdDiv select').attr("data-validate", "0");
            $('#mobile').attr("maxlength", 10);
            $(".merror").html("");
        } else {
            $('#mobCdDiv select').attr("data-validate", "1");
            $('#ldMcDiv').html(res);
            $('#mobCdDiv').show();
            $('#mobileCode').selectpicker();

            $('#mobile').attr("maxlength", 7);
            $(".merror").html("");
        }
    });
}

function forgetPwdEmail(token) {
    var validator = $('#login-form').validate();
    var validation = validator.form();
    //console.log('test', validation);
    if (validation === false) {
        return; //commonAlert('warning', msg_form_warning);
    }
    var params = {};
    params.emailAddress = $('#email').val();
    if (typeof grecaptcha == 'object') { // if grecaptcha is defined i.e. recaptcha is loaded
        params.userJetonRecaptcha = token;
    }
    ajx('POST', params, 'user/forgetpwd', '', function(resp) {
        commonAlert('info', resp.response);
        $('.mdt').text(resp.response);
        $('#email').val('');
        return false;
    });
}

$(document).ready(function() {
    // Open Login Model Window
    var hashValue = window.location.hash;
    if (hashValue == "#login") {
        //console.log('test');
        $('#login').trigger('click');
    }
    // Open Signup Model Window
    if (hashValue == "#register") {
        $('#signup').trigger('click');
    }
});

function xhrRequest(url, type, data, successCallback, returnType = '') {
    if (typeof rzTkn != 'undefined') {
        data.rzTkn = rzTkn;
    }
    $.ajax({
            url: url,
            type: type,
            data: data,
            headers: {
                //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        })
        .done(function(response) {
            if (returnType == 'jsosn') {
                response = JSON.parse(response);
            }
            return successCallback(response);
        })
        .fail(function(res) {

            try {
                if (typeof grecaptcha == 'object') { // if grecaptcha is defined i.e. recaptcha is loaded
                    grecaptcha.reset();
                }
            } catch (e) {

            }

        });
}


$(document).delegate('#s4', 'click', function() {
    if (this.checked) {
        $('#showMobArea').css('display', 'block');
    } else {
        $('#showMobArea').css('display', 'none');
    }
});
$(document).delegate('#searchFacetBtn', 'click', function() {
    var checked_facets = new Array();
    var facets_keys = new Array();
    var facets_values = new Array();
    var q = $('#search_keyword').val();
    if (typeof q === "undefined" || q === null || q === "") {
        q = 'all';
    }
    var search_url;
    if (typeof searchUrl !== 'undefined' && searchUrl !== '') {
        search_url = site_url + searchUrl + '/q/' + q;
    } else {
        search_url = site_url + 'job/jsearch/q/' + q;
    }
    //    var fcn = $('#facet_company').val();
    //    if (typeof fcn !== "undefined" && fcn !== '' && fcn !== null) {
    //        search_url += '/fcn/' + fcn;
    //    }
    //console.log(' FCO : ', fcn);
    var fp = $('#facet_package').val();
    if (typeof fp !== "undefined" && fp !== '' && fp !== null) {
        search_url += '/fp/' + fp;
    }
    var fs = $('#salary_facet').val();
    //console.log(' FS : ', fs);
    if (typeof fs !== "undefined" && fs !== '' && fs !== null) {
        search_url += '/fs/' + fs;
    }
    var current_page_url = $('#current_page_url').val();
    var channel_facet = $('#channel_facet').val();
    $('input:checkbox[class=jobFacets]:checked').each(function() {
        var params = {};
        params.facet_value = $(this).data('fid');
        params.facet_id = $(this).attr('id');
        params.facet_key = $(this).data('fkey');
        checked_facets.push(params);
    });
    //console.log('checkedFacets: ', checked_facets);
    if (typeof channel_facet !== "undefined" && channel_facet !== "") {
        for (var i in checked_facets) {
            if (checked_facets[i].facet_key !== 'fch' && checked_facets[i].facet_value !== channel_facet) {
                checked_facets.push({
                    'facet_key': 'fch',
                    'facet_value': channel_facet,
                    'facet_id': 'fch_' + channel_facet
                })
            }
        }
    }
    //console.log('Checked Facets: ', channel_facet);
    //console.log('Checked Facets: ', checked_facets);

    for (var i in checked_facets) {
        if ($.inArray(checked_facets[i].facet_key, facets_keys) !== -1) {
            //console.log('found ', checked_facets[i].facet_key);
            //find fecet key and concatinate value
            for (var j in facets_values) {
                if (facets_values[j].key === checked_facets[i].facet_key) {
                    //console.log('concat value: ', checked_facets[i].facet_value);
                    facets_values[j].value += ":" + checked_facets[i].facet_value;
                }
            }
        } else { //not found
            //console.log('Not found ', checked_facets[i].facet_key);
            facets_keys.push(checked_facets[i].facet_key);
            facets_values.push({
                'key': checked_facets[i].facet_key,
                'value': checked_facets[i].facet_value
            });
        }
    }
    //console.log('FacetsKey : ', facets_keys);
    //console.log('FacetsValues : ', facets_values);
    //finalizing url
    for (var i in facets_values) {
        search_url += "/" + facets_values[i].key + "/" + facets_values[i].value;
    }
    //console.log('New Url: ', search_url);
    clean_url = search_url.replace(/([^:]\/)\/+/g, "$1");
    window.location = search_url;
});

function getCheckedFacetsData(json) {
    json = (typeof json !== 'undefined') ? json : false; //serialized in default
    var checked_facets = new Array();
    var facets_keys = new Array();
    var facets_values = new Array();
    $('input:checkbox[class=jobFacets]:checked').each(function() {
        var params = {};
        params.facet_value = $(this).data('fid');
        params.facet_id = $(this).attr('id');
        params.facet_key = $(this).data('fkey');
        checked_facets.push(params);
    });
    for (var i in checked_facets) {
        if ($.inArray(checked_facets[i].facet_key, facets_keys) !== -1) {
            //console.log('found ', checked_facets[i].facet_key);
            //find fecet key and concatinate value
            for (var j in facets_values) {
                if (facets_values[j].key === checked_facets[i].facet_key) {
                    //console.log('concat value: ', checked_facets[i].facet_value);
                    facets_values[j].value += ":" + checked_facets[i].facet_value;
                }
            }
        } else { //not found
            //console.log('Not found ', checked_facets[i].facet_key);
            facets_keys.push(checked_facets[i].facet_key);
            facets_values.push({
                'key': checked_facets[i].facet_key,
                'value': checked_facets[i].facet_value
            });
        }
    }
    //console.log('FacetsKey : ', facets_keys);
    //console.log('FacetsValues : ', facets_values);

    var q = $('input[name=keyword]').val();
    q = (typeof q !== 'undefined' && q !== null) ? q : '';
    if ($('.advancedSearch').attr('aria-expanded') === "true") {
        q = (typeof $('input[name=q]').val() !== 'undefined') ? $('input[name=q]').val() : '';
    }

    var postData = 'q=' + q;
    var jsonData = {
        'q': q
    };
    if (facets_values.length > 0) {
        for (var i in facets_values) {
            //console.log('=> ', facets_values[i]);
            postData += '&' + facets_values[i].key + '=' + facets_values[i].value;
            jsonData[facets_values[i].key] = facets_values[i].value;
        }
    }
    var fDate = $('input[name=fDate]').val() || '';
    var tDate = $('input[name=tDate]').val() || '';
    if ((typeof fDate !== 'undefined' && fDate !== '') || (typeof tDate !== 'undefined' && tDate !== '')) {
        postData += '&fDate=' + fDate + '&tDate=' + tDate;
        jsonData['fDate'] = fDate;
        jsonData['tDate'] = tDate;
    }
    if (q !== '' || fDate !== '' || tDate !== '' || facets_values.length > 0) {
        //facets applied save in localstorage
        postData += '&searchSolr=Y';
        localStorage.setItem('searchSolr', 'Y');
        jsonData['searchSolr'] = 'Y';
    }
    //console.log('POST DATA: ', postData);
    //console.log('POST DATA JSON: ', jsonData);
    if (json === true) {
        return jsonData;
    }
    return postData;
}


function checkFacetStatus(facetvalues, key, value) {
    //console.log('checkFcets: ', facetvalues);
    for (var i in facetvalues) {
        facetValue = facetvalues[i].value;
        if (facetValue === null || facetValue === 'undefined') {
            continue;
        }

        if (typeof facetValue !== 'undefined') {
            facetValue = facetValue.toString();
        }
        if (typeof value !== 'undefined') {
            value = value.toString();
        }
        try {
            var valuesArr = facetValue.split(":");
        } catch (e) {
            //console.warn('Error: ', e);
        }
        //        console.log(' value in array: ' + value, valuesArr);
        //        console.log(' Key : ' + key, facetvalues[i].key);
        //        console.log('In Array: => ', $.inArray(value, valuesArr));
        if ($.inArray(value, valuesArr) !== -1 && key === facetvalues[i].key) {
            return 'checked';
        }
    }
    return '';

}

$(document).delegate('#resetFacetBtn', 'click', function() {
    window.location = site_url + 'job/jsearch/q/all';
});

function authenticate(backUrl) {
    var redirectTo = seeker_url + 'login';
    var data = {};
    if (typeof backUrl === "undefined") {
        data.redirectUrl = location.href;
    } else {
        data.redirectUrl = backUrl;
    }
    localStorage.setItem('lastUrl', data.redirectUrl);
    var successCallback = function(res, statusText, jqXHR) {
        if (res.code === 200) {
            window.location = redirectTo;
        }
    };
    var url = ajax_url + 'site/saveLastURL';
    xhrRequest(url, 'POST', data, successCallback);
}

function saveJobStartup(jobId, compId, source) {
    //console.log($('.btn_'+jobId).text());
    //changeState('.btn_' + jobId, msg_saving, true);
    $("#savejob_loader").removeClass('d-none');
    $("#save_job").addClass('d-none');
    $('.btn_' + jobId).attr('disabled', 'disabled');
    var data = {};
    data.jobId = jobId;
    data.sourcePage = source;
    data.companyId = compId;
    var successCallback = function(res, statusText, jqXHR) {
        //console.log('Response: ', jqXHR);
        $("#savejob_loader").addClass('d-none');
        var response = $.parseJSON(res);
        try {
            if (response.code == 200) {
                //$("#save_job").addClass('d-none');
                $("#save_job").parents(".save-job").append('<a href="javascript:void(0)" class="btn btn-secondary mt10 btn-block" id="saved_job">Saved</a>');
                $('.btn_' + jobId).addClass('active').removeAttr('disabled').attr('title', msg_saved);
                $('.btn_' + jobId).removeAttr('onclick');
                if (source == 'jobdetail') {
                    $('.btn_' + jobId).addClass('disabled');
                    $('.btn_' + jobId).addClass(msg_saved);
                }
                $('.btn_' + jobId).attr('disabled', 'disabled');
                $('#saveJobSuccess').slideDown();
                setTimeout(function() {
                    $('#saveJobSuccess').slideUp();
                }, 10000);
            } else if (response.code === 401) {
                console.log('res: ', response);
                authenticate();
                console.log('res =>: ', response.code);
                //var url = $('#login').data('target');
                //openOverlay(url);
            } else {
                $("#save_job").removeClass('d-none');
                changeState('.btn_' + jobId, msg_save, false);
                $('#saveJobFailed').slideDown();
                setTimeout(function() {
                    $('#saveJobSuccess').slideUp();
                }, 10000);
            }
        } catch (e) {
            $("#savejob_loader").addClass('d-none');
            $("#save_job").removeClass('d-none');
            //console.error('Error: ', res);
            $('.btn_' + jobId).addClass(msg_save);
            $('.btn_' + jobId).removeClass('disabled');
            $('#saveJobFailed').slideDown();
            //$('.btn_' + jobId).text('Error');
        }
    };
    var url = ajax_url + 'job/saveJob';
    xhrRequest(url, 'POST', data, successCallback);
}

function saveJob(jobId, compId, source) {
    //console.log($('.btn_'+jobId).text());
    //changeState('.btn_' + jobId, msg_saving, true);
    $("#savejob_loader").removeClass('d-none');
    $("#save_job").addClass('d-none');
    $('.btn_' + jobId).attr('disabled', 'disabled');
    var data = {};
    data.jobId = jobId;
    data.sourcePage = source;
    data.companyId = compId;
    var successCallback = function(res, statusText, jqXHR) {
        //console.log('Response: ', jqXHR);
        $("#savejob_loader").addClass('d-none');
        var response = $.parseJSON(res);
        try {
            if (response.code == 200) {
                //$("#save_job").addClass('d-none');
                $("#save_job").parents(".save-job").append('<a href="javascript:void(0)" class="btn btn-secondary mt10 btn-block" id="saved_job">Saved</a>');
                $('.btn_' + jobId).addClass('active').removeAttr('disabled').attr('title', msg_saved);
                $('.btn_' + jobId).removeAttr('onclick');
                if (source == 'jobdetail') {
                    $('.btn_' + jobId).addClass('disabled');
                    $('.btn_' + jobId).html(msg_saved);
                }
                $('.btn_' + jobId).attr('disabled', 'disabled');
                $('#saveJobSuccess').slideDown();
                setTimeout(function() {
                    $('#saveJobSuccess').slideUp();
                }, 10000);
            } else if (response.code === 401) {
                console.log('res: ', response);
                authenticate();
                console.log('res =>: ', response.code);
                //var url = $('#login').data('target');
                //openOverlay(url);
            } else {
                $("#save_job").removeClass('d-none');
                changeState('.btn_' + jobId, msg_save, false);
                $('#saveJobFailed').slideDown();
                setTimeout(function() {
                    $('#saveJobSuccess').slideUp();
                }, 10000);
            }
        } catch (e) {
            $("#savejob_loader").addClass('d-none');
            $("#save_job").removeClass('d-none');
            //console.error('Error: ', res);
            $('.btn_' + jobId).text(msg_save);
            $('.btn_' + jobId).removeClass('disabled');
            $('#saveJobFailed').slideDown();
            //$('.btn_' + jobId).text('Error');
        }
    };
    var url = ajax_url + 'job/saveJob';
    xhrRequest(url, 'POST', data, successCallback);
}

function showMessages(type, msg) {
    $('#alertMessages').find('span').html(msg);
    $('#alertMessages').addClass('alert-' + type);
    $('#alertMessages').show();
    setTimeout(function() {
        $('#alertMessages').hide();
    }, 15000);
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
}

function commonAlert(type, msg, noHide, msgDiv) {

    noHide = (typeof noHide === "undefined") ? 'hide' : noHide;
    type = (typeof type === "undefined") ? 'success' : type;
    msgDiv = (typeof msgDiv === "undefined") ? 'messageContainer' : msgDiv;

    var alertMsg = '<div class="alert alert-' + type + ' alert-dismissable" role="alert" style="position:relative;"> <p>' + msg + '  <i class="rz-cross cstm pull-right" data-dismiss="alert" style="position:absolute; top:18px; right:10px; z-index:111;" onClick="$(this).parents(\'.alert\').hide()"></i></p> </div> </div>';
    if (msgDiv.includes('.')) {
        $(msgDiv).html(alertMsg);
    } else {
        $('#' + msgDiv).html(alertMsg);
    }
    if (noHide == 'hide') {
        setTimeout(function() {
            $('#' + msgDiv).html('');
        }, 10000);
    }
}

function navigateMSG(id) {
    id = (typeof id !== 'undefined') ? id : 'messageContainer';
    $('body, html').animate({
        scrollTop: $('#' + id).offset().top - 100
    }, 600);
}

function changeState(element, text, isLoading) {
    if (text !== null && text !== false) {
        $(element).html(text);
    }
    if (isLoading === true) {
        $(element).addClass('disabled');
        $(element).attr('disabled', 'disabled');
    } else {
        $(element).removeClass('disabled');
        $(element).removeAttr('disabled');
        $(element).prop('disabled', false);
    }
}

$(document).delegate('.followCompany', 'click', function() {
    var data = {};
    data.company_name = $(this).data('cname');
    data.company_id = $(this).data('cid');
    // var id = $(this).data('id');
    var id = $(this).attr('id');
    changeState('#' + id, msg_following + '..', true);
    var successCallback = function(response, statusText, jqXHR) {
        if (response.code === 200) {
            $('#' + id).addClass('unfollowedCompany');
            $('#' + id).removeClass('followCompany');
            changeState('#' + id, msg_unfollow, false);
            if ($('.fCount') != undefined) {
                $('.fCount').html(response.tf);
            }
        } else if (response.code === 401) {
            var url = $('#login').data('target');
            openOverlay(url);
        } else {
            changeState('#' + id, msg_follow, false);
            $('#' + id).removeClass('unfollowedCompany');
            $('#' + id).removeClass('disabled');
            showMessages('danger', response.message);
        }
    };
    var url = ajax_url + 'company/follow';
    xhrRequest(url, 'POST', data, successCallback);
});
//unfollowedCompany
$(document).delegate('.unfollowedCompany', 'click', function() {
    var data = {};
    data.company_name = $(this).data('cname');
    data.company_id = $(this).data('cid');
    // var id = $(this).data('id');
    var id = $(this).attr('id');
    changeState('#' + id, msg_unfollowing + '...', true);
    var successCallback = function(response, statusText, jqXHR) {
        if (response.code === 200) {
            changeState('#' + id, msg_follow, false);
            $('#' + id).removeClass('unfollowedCompany');
            $('#' + id).addClass('followCompany');
            if ($('.fCount') != undefined) {
                $('.fCount').html(response.tf);
            }
        } else if (response.code === 401) {
            var url = $('#login').data('target');
            openOverlay(url);
        } else {
            changeState('#' + id, msg_unfollow, false);
            $('#' + id).removeClass('followCompany');
            showMessages('danger', response.message);
        }
    };
    var url = ajax_url + 'company/unfollow';
    xhrRequest(url, 'POST', data, successCallback);
});

$(document).delegate('.followCompany1', 'click', function() {
    var data = {};
    data.company_name = $(this).data('cname');
    data.company_id = $(this).data('cid');
    var id = $(this).data('id');

    // var id = $(this).attr('id');
    changeState('.' + id, msg_following + '..', true);
    var successCallback = function(response, statusText, jqXHR) {
        if (response.code === 200) {
            $('.' + id).addClass('unfollowedCompany1');
            $('.' + id).removeClass('followCompany1');
            changeState('.' + id, msg_unfollow, false);
            if ($('.fCount') != undefined) {
                $('.fCount').html(response.tf);
            }
        } else if (response.code === 401) {
            var url = $('#login').data('target');
            openOverlay(url);
        } else {
            changeState('.' + id, msg_follow, false);
            $('.' + id).removeClass('unfollowedCompany1');
            $('.' + id).removeClass('disabled');
            showMessages('danger', response.message);
        }
    };
    var url = ajax_url + 'company/follow';
    xhrRequest(url, 'POST', data, successCallback);
});
//unfollowedCompany
$(document).delegate('.unfollowedCompany1', 'click', function() {
    var data = {};
    data.company_name = $(this).data('cname');
    data.company_id = $(this).data('cid');
    var id = $(this).data('id');
    // var id = $(this).attr('id');
    changeState('.' + id, msg_unfollowing + '...', true);
    var successCallback = function(response, statusText, jqXHR) {
        if (response.code === 200) {
            changeState('.' + id, msg_follow, false);
            $('.' + id).removeClass('unfollowedCompany1');
            $('.' + id).addClass('followCompany1');
            if ($('.fCount') != undefined) {
                $('.fCount').html(response.tf);
            }
        } else if (response.code === 401) {
            var url = $('#login').data('target');
            openOverlay(url);
        } else {
            changeState('.' + id, msg_unfollow, false);
            $('.' + id).removeClass('followCompany1');
            showMessages('danger', response.message);
        }
    };
    var url = ajax_url + 'company/unfollow';
    xhrRequest(url, 'POST', data, successCallback);
});

function jobAlertModel() {
    var validator = $('#saveJobAlert-form').validate();
    validator.resetForm();
    validator.reset();
    $('#messageContainer').html();

    $('.has-error').each(function() {
        $(this).removeClass('has-error');
    });

    $('#SaveJob').modal({
        show: 'true'
    });
}

function emailToFriendModal(jid, title, permaLink) {
    $('#jobId').val(jid);
    $('#subject').val(title);
    $('#message').text(permaLink);
    $('#EmailFrnd').modal({
        show: 'true'
    });
}

function saveJobAlert() {

    if ($('input[name=keyword_search_in]:checked').length == 0) {
        $('input[name=keyword_search_in]').closest('.form-group').addClass('has-error');
        $('.keyword-error').next().remove();
        requiredMessage = $('#requiredMessage').val();
        $('.keyword_search_in').after('<div class="keyword-error clearfix"></div><span for="keyword_search_in" class="keyword-search-error help-block">' + requiredMessage + '</span>');
        changeState('#saveJobAlert_btn', msg_save, false);
        var flag = true;
    } else {
        $('input[name=keyword_search_in]').closest('.form-group').removeClass('has-error');
        $('.keyword-error').next().remove();
        $('input[name=keyword_search_in]').closest('.keyword-error').remove();
        var flag = false;
        changeState('#saveJobAlert_btn', msg_save, false);
    }

    var validator = $('#saveJobAlert-form').validate();
    var validation = validator.form();
    if (validation === false || flag) {
        if (flag) {
            $('.keyword-search-error').show();
        }

        return commonAlert('warning', msg_form_validation_warning);
    }

    changeState('#saveJobAlert_btn', msg_saving, true);
    var data = {};
    data.keyword_search_in = '';


    $('input[name=keyword_search_in]:checked').each(function(i) {
        data.keyword_search_in += $(this).val();
    });

    //console.log(data);
    data.gender = $('select[name=gender]').val();
    data.careerLevel = $('select[name=careerLevel]').val();
    data.minExperience = $('select[name=minExperience]').val();
    data.expSalary = $('select[name=expSalary]').val();
    data.city = $('#userCity').val();
    //console.log('city: ', data.city);
    data.email = $('input[name=email]').val();
    //console.log('email: ', data.email);

    data.countryCode = $('select[name=countryCode]').val();
    data.mobileCode = $('select[name=mobileCode]').val();
    data.mobileNumber = $('input[name=mobileNumber]').val();
    data.searchAlert = $('input[name=searchAlert]').val();
    data.currentJobURL = $('input[name=currentJobURL]').val();
    data.keywords = $('input[name=keywords]').val();

    data.rzTkn = $("input[name=rzTkn]").val();
    if (typeof $('input[name=currentJobAlertID]').val() !== 'undefined') {
        data.alertID = $('input[name=currentJobAlertID]').val();
    }
    //console.log('Data: ', data);
    var successCallback = function(jqXHR) {
        changeState('#saveJobAlert_btn', msg_save, false);
        if (jqXHR.status === true) {
            var response = jqXHR;
            if (response.code === 200) {
                $('#saveJobAlert-form')[0].reset();
                //console.log('messages: ', response.message);
                if (response.message instanceof Array) {
                    for (var i in response.message) {
                        //console.log(response.message[i]);
                        commonAlert('success', response.message[i]);
                    }
                } else {
                    var type = (typeof response.type === "undefined") ? 'success' : response.type;
                    var user = (typeof response.user === "undefined") ? '' : response.user;
                    if (type === 'success') {
                        showMessages(type, response.message);
                        commonAlert(
                            "success",
                            response.message
                        );
                        setTimeout(function() {
                            $('#SaveJob').modal('hide');
                        }, 2000);
                        setTimeout(function() {
                            if (typeof alert_id !== 'undefined') {
                                location = site_url + 'my-job-alerts';
                                commonAlert('success', msg_alert_updated);
                            } else if (user != 'guest') {
                                //window.open(site_url + 'my-job-alerts', '_blank');
                                window.location = site_url + 'my-job-alerts';
                            }
                        }, 3500);
                        return;
                    } else {
                        commonAlert(type, response.message);
                    }
                }
            } else if (response.code === 401) {
                return authenticate();
            } else {
                return commonAlert('danger', response.message);
            }
        } else {
            console.error("Error: ", jqXHR);
            return commonAlert(
                "danger",
                "An Error Occured! "
            );
        }
    };
    var url = ajax_url + 'job/saveJobAlert';
    xhrRequest(url, 'POST', data, successCallback, 'jsosn');
}

function resendRegCode() {
    var params = {};
    params.email = $('#userEmail').val();
    ajx('POST', params, 'user/resendregcode', '', function(resp) {
        $('.incorCode').hide();
        commonAlert('success', resp.response);

    });
}

function setintPA(jid, sc) {

    $("#paCallLd").show();
    var params = {};
    params.jid = jid;
    params.score = sc;
    ajx('POST', params, 'job/expertCall', 'html', function(res) {

        $("#paCallLd").hide();
        $("#paCallImg").show();
        if (res == 'SUC')
            $("#paCallMsg").show();
    });
}



//===================== FORMATE CURRENCY ==================
function addCommas(str) {
    var parts = (str + "").split("."),
        main = parts[0],
        len = main.length,
        output = "",
        i = len - 1;
    while (i >= 0) {
        output = main.charAt(i) + output;
        if ((len - i) % 3 === 0 && i > 0) {
            output = "," + output;
        }
        --i;
    }
    // put decimal part back
    if (parts.length > 1) {
        output += "." + parts[1];
    }
    return output;
}

function savePACallData() {
    var formId = "#callPA-form";
    var validator = $(formId).validate();
    if (validator.form() === false) {
        return;
    }
    commonAlert('info', msg_plz_wait);
    var data = $(formId).serialize();
    //console.log('f1 data: ', data);
    var successCallback = function(res, statusText, jqXHR) {

        if (jqXHR.status == 200) {
            resp = $.parseJSON(res);
            commonAlert(resp.type, resp.message);
            if (res.status == 200) {
                $(formId)[0].reset();
            }
        } else {
            console.error('Error: ', res);
        }
    };
    var url = ajax_url + 'site/savePAquery';
    xhrRequest(url, 'POST', data, successCallback);
}

function captchaModal(fromPage) {
    var formId = '';
    if (fromPage == 'savePAQueryData') {
        formId = '#queryPA-form';
    }
    if (fromPage == 'savePACallData') {
        formId = '#callPA-form';
    }
    var validator = $(formId).validate();
    if (validator.form() === false) {
        return;
    }
    $('.captchaModal').modal();
    if (typeof grecaptcha == 'object') { // if grecaptcha is defined i.e. recaptcha is loaded
        container = $('#captchaContainer').html();
        if (container == '') {
            loadCaptcha(fromPage);
        } else {
            grecaptcha.reset();
        }
    }
}

function savePAQueryData() {
    var formId = "#queryPA-form";
    var validator = $(formId).validate();
    if (validator.form() === false) {
        return;
    }
    var data = $(formId).serialize();
    commonAlert('info', msg_plz_wait);
    var successCallback = function(res, statusText, jqXHR) {
        if (jqXHR.status == 200) {
            resp = $.parseJSON(res);
            commonAlert(resp.type, resp.message);
            if (res.status == 200) {
                $(formId)[0].reset();
            }
        } else {
            console.error('Error: ', res);
        }
    };
    var url = ajax_url + 'site/savePAquery';
    xhrRequest(url, 'POST', data, successCallback);
}

/*
 * Adding CV Write Packages
 */
$(document).delegate('.addCartPackagesCV', 'click', function() {
    changeState(this, msg_plz_wait, true);
    var checked_packages = [];
    var data = {};
    $('input[name="chk_executive"]:checked').each(function() {
        var params = {};
        params.spID = $(this).val();
        params.totalPrice = $(this).data('price');
        params.itemId = $(this).attr('id');
        params.pack_code = $(this).data('pack_code');
        checked_packages.push(params);
    });
    if (checked_packages.length > 0) {
        data.packages = checked_packages;
        data.rztkn_product_purchase = rztkn_product_purchase;
        var successCallback = function(res, statusText, jqXHR) {
            //console.log('Response: '+ typeof jqXHR, jqXHR);
            //console.log('Response: '+ typeof res, res);
            if (res != undefined && res.code != undefined) {
                if (res.code == 401) {
                    authenticate();
                    return false;
                }
                commonAlert(res.type, res.message);
                if (res.code === 200) {
                    //alert(res.url);
                    window.location = res.url;
                }
            } else {
                console.error('Error: ', res);
                changeState(this, msg_add_cart, false);
            }
        };
        var url = ajax_url + 'site/saveCVpackages';
        console.log(data);
        xhrRequest(url, 'POST', data, successCallback);
    } else {
        changeState(this, msg_add_cart, false);
        commonAlert('warning', msg_no_pkg_select);
    }
});

$(document).delegate('.pkgTab', 'click', function() {
    $('input:checkbox[name="chk_executive"]').prop('checked', false);
});

if ($('.job_title').length > 0) {
    jobSearchMS = $('.job_title').magicSuggest({
        data: ajax_url + 'job/keywordSuggestion/',
        queryParam: 'term',
        hideTrigger: true,
        //dataUrlParams: true,
        //resultAsString: true,
        //resultAsStringDelimeter: ', ',
        //allowFreeEntries: false,
        //strictSuggest: true,
        maxSelection: 2,
        useCommaKey: true,
        valueField: 'name',
        renderer: function(data) {
            //console.log('=> DATA: ', data);
            //$titleData =[];
            html = '';
            if (data.index == 0) {
                title = data.id;
                html = '<div class="head"><strong> SUGGESTION FOR: ' + title.toUpperCase() + '</strong></div>';
            }
            html += '<div class="' + data.id + '" data-heading=" SUGGESTION FOR: ' + data.id + '"> <p>' + data.name + '</p><div>';
            return html;

        },
        resultAsString: true
    });
    var jobTitleHide = $('#jobTitleH').val();
    if (typeof jobTitleHide !== "undefined") {
        var titlesArr = jobTitleHide.split(',');
        var keywords = [];
        titlesArr.forEach(function(title) {
            keywords.push({
                'name': title
            });
        });
        jobSearchMS.addToSelection(keywords);
    }
}


// Hiring Dashbaord: Update Default Company
$(document).delegate('#defaultCompany', 'change', function() {
    //waiting state
    var element = this;
    changeState(element, null, true);
    var successCallback = function(res, statusText, jqXHR) {
        //console.log('Response: '+ typeof jqXHR, jqXHR);
        //console.log('Response: '+ typeof res, res);
        changeState(element, null, false);

        //if (jqXHR.status === 200) {
        if (res.code === 200) {
            location.reload();
            //commonAlert(res.type, res.message);
        } else {
            if (res.code === 401) {
                authenticate();
            }
            console.error('Error: ', res);
        }
    };
    var url = ajax_url + 'dashboard/updateDefaultCompany';
    xhrRequest(url, 'POST', {
        'id': $(this).val()
    }, successCallback);
});

// Handle Broken Images
$(function() {
    $('img').on('error', function() {
        imageError(this);
    });
});

function getCitiesList(country, citySel, cityTxt) {
    citySel = (typeof citySel === "undefined" || citySel === "" ? 'citySrchAdv' : citySel);
    cityTxt = (typeof cityTxt === "undefined" || cityTxt === "" ? 'cityTxt' : cityTxt);

    if (country == '114' || country == '116') { // USA OR Canada
        $('#' + cityTxt).val('');
        $('#' + cityTxt).removeClass('hide');
        $('#' + citySel).addClass('hide');
        $('#' + citySel).selectpicker('hide');

        return;
    } else if (country == '') {
        $('#' + citySel).val('');
        $('#' + citySel).selectpicker('refresh');
        $('#' + citySel).prop('disabled', 'disabled');

        return;
    } else {
        $('#' + citySel).removeClass('hide');
        $('#' + citySel).show();
        $('#' + citySel).selectpicker('show');
        $('#' + citySel).prop('disabled', false);
        $('#' + citySel).selectpicker('refresh');
        $('#' + cityTxt).addClass('hide');
        $('#' + cityTxt).val('');
    }

    $.getJSON(site_url + 'services/site/getcitieslist/?country_id=' + country, function(response) {
        if (response.success) {
            //$('#' + citySel).find('option').not(':first').remove();
            $('#' + citySel).find('option').remove();
            $.each(response.cities, function(index, item) {
                $('#' + citySel).append($('<option></option>').attr('value', item.cityID).data('city', item.city).text(item.city));

            });

            $('#' + citySel).selectpicker('refresh');
        }
    });
} // get cities list

function saveAgayBarhoSubscribe() {
    var validator = $('#agayBarhoSubForm').validate();
    var validation = validator.form();
    if (validation === false) {
        return false;
    }
    $('#btnDiv').hide();
    $('#agayBarhoWait').show();
    var params = $('#agayBarhoSubForm').serialize();
    var callback = function(resp) {
        if (resp.status === false) {
            $('#btnDiv').show();
            $('#agayBarhoWait').hide();
            $('#errorMsg').find('ul.merror').remove();
            $('#errorMsg').removeClass('hide');
            $('#errorMsg').addClass('alert-success');
            var ul = $('#errorMsg:last').append('<ul class="merror mt10 s-24"></ul>').find('ul.merror');;
            $.each(resp.response, function(field, message) {
                ul.append('<li>' + message + '</li>');
            });
            setTimeout(function() {
                $('#errorMsg:last').find('ul.merror').remove();
                $('#errorMsg').removeClass('alert-success');
                $('#errorMsg').addClass('hide');

            }, 8000);
            return false;
        } else {

            //$('#agayBarhoWait').addClass('hide');
            // $('#success').removeClass('hide');
            window.location.href = resp.url;

        }
    };
    ajx('POST', params, 'site/saveAgayBarhoSubscribe', '', callback);
}

function getCityByCountry() {

    var params = {};
    var countryData = $('#country_id').val();
    var countryArr = countryData.split(",");
    var country;
    params.country_id = country = countryArr[0];
    if (countryArr[2] == '+92' || countryArr[2] == '+966') {

        getMobileCodeByCountryCode(countryArr[2]);
        $('#mobCdDiv').show();
        $("#badm").hide();
        $("#badm").parent(".col-md-12").removeClass("col-md-12").addClass("col-md-9");
        $('#mobileCode option:selected').removeAttr('selected');
        $('#mobile').attr("maxlength", 7);
        $('#mobile').val('');
    } else {
        $('#mobCdDiv').hide();
        $("#badm").show();
        $("#badm").parent(".col-md-9").removeClass("col-md-9").addClass("col-md-12");
        $('#mobileCode option:selected').removeAttr('selected');
        $('#mobile').attr("maxlength", 20);
        $('#mobile').val('');
    }
    if (country == '') {
        return;
    } else if (country == '114' || country == '116') {
        $('#city_id').find('option').remove();
        $('.cityDD').hide();
        $('#cityDiv').append('<input type="text" class="form-control s-18 cityField" name="city_id" id="cityField"  placeholder="Please enter the city name">');
        return;
    }
    var callback = function(resp) {
        if (resp.success === true) {
            $('#cityDiv').show();
            $('#cityField').remove();
            $('#city_id').find('option').remove();
            $('.cityDD').show();
            $('#city_id').append('<option value="" id="cityLbl">' + cityLabel + '</option>');
            $.each(resp.cities, function(index, item) {
                $('#city_id').append($('<option></option>').attr('value', item.cityID).data('city', item.city).text(item.city));
            });
        } else {
            $('#city_id').find('option').remove();
            $('#cityDiv').hide();
        }
    };
    ajx('GET', params, 'site/getCities', '', callback);

}

function validateQty(event) {

    var key = window.event ? event.keyCode : event.which;
    // 110 for decimal point
    if (event.keyCode == 8 || event.keyCode == 9 ||
        event.keyCode == 37 || event.keyCode == 39) {
        return true;
    } else if (key < 48 || key > 57) {
        return false;
    } else
        return true;
}

function getMobileCodeByCountryCode(cntryCode) {
    if (cntryCode !== '' && cntryCode !== 'undefined') {
        var params = {};
        params.cCode = cntryCode;
        if (cntryCode == '+966') {
            $('#mobile').attr("maxlength", 10);
        }
        var callback = function(resp) {
            if (resp.status === true) {
                $('#mobile').val("");
                $('#mobileCode').find('option').remove();
                $('#mobileCode').append('<option  value="">Choose Code</option>');
                var html = '';
                $.each(resp.response, function(index, item) {
                    html += '<option value=' + item + '>' + item + '</option>';
                });

                $('#mobileCode').append(html);
            }
        };
        ajx('POST', params, 'site/getMobileCodesByCountryCode', '', callback);
    }
}

function getMobileCodeByCountryCodeForApp(cntryCode, form) {
    if (cntryCode !== '' && cntryCode !== 'undefined') {
        var params = {};
        params.cCode = cntryCode;
        if (cntryCode == '+966') {
            $('#' + form + '#mobile').attr("maxlength", 10);
        }
        var callback = function(resp) {
            log(resp);
            if (resp.status === true) {
                $('#' + form + ' #mobile').val("");
                $('#' + form + ' #mobileCode').find('option').remove();
                var html = '';
                $.each(resp.response, function(index, item) {
                    html += '<option value=' + item + '>' + convertToArabic(item) + '</option>';
                });
                $('#' + form + ' #mobCdDiv').show();
                $('#' + form + ' #mobileCode').append(html);
            } else {
                $('#' + form + ' #mobileCode').find('option').remove();
                $('#' + form + ' #mobCdDiv').hide();
                $('#' + form + ' #mobile').attr("maxlength", 20);
            }
        };
        ajx('POST', params, 'site/getMobileCodesByCountryCode', '', callback);
    }
}

function checkDate() {

    $("#dobSp").attr("style", "display:block !important");
    var params = {};
    params.day = $('#day').val();
    params.month = $('#month').val();
    params.year = $('#year').val();
    ajx('POST', params, 'site/checkValidDate', '', function(res) {

        $("#dobSp").attr("style", "");
        if (res.status == false)
            $("#sign-up #your_dob").find("div.merror").text(res.response);
        else
            MovetoNext(true);
    });
}

function changePassword() {
    $('#alertDiv').hide();
    $('#alertDiv').removeClass();

    var oldPassword = $('#oldPassword').val();
    var newPassword1 = $('#newPassword1').val();
    var newPassword2 = $('#newPassword2').val();
    if (oldPassword == '' || newPassword1 == '' || newPassword2 == '') {
        $('#alertDiv').removeClass();
        $('#alertDiv').addClass('alert alert-danger');
        $('#alertDiv').html(site170);
        $('#alertDiv').show();
        return;
    }
    if (newPassword1 !== newPassword2) {
        $('#alertDiv').removeClass();
        $('#alertDiv').addClass('alert alert-danger');
        $('#alertDiv').html(site169);
        $('#alertDiv').show();
        return;
    }
    if (newPassword1.length <= 7) {
        $('#alertDiv').removeClass();
        $('#alertDiv').addClass('alert alert-danger');
        $('#alertDiv').html(UCCheckAllowed ? site166 : site261);
        $('#alertDiv').show();
        return;
    }
    var passMatch = (/\d/.test(newPassword1) && /[a-z]/.test(newPassword1) && (UCCheckAllowed ? (/[A-Z]/.test(newPassword1)) : true));
    if (!passMatch) {
        $('#alertDiv').removeClass();
        $('#alertDiv').addClass('alert alert-danger');
        $('#alertDiv').html(UCCheckAllowed ? site166 : site261);
        $('#alertDiv').show();
        return;
    }
    $('.loading').show();
    $('.btnPass').addClass('disabled');
    var params = {};
    params.oldPassword = oldPassword;
    params.newPassword1 = newPassword1;
    params.newPassword2 = newPassword2;
    ajx('POST', params, 'user/changepassword', '', function(res) {
        $('.loading').hide();
        $('.btnPass').removeClass('disabled');
        if (typeof res.status !== 'undefined' && typeof res.msg !== 'undefined') {
            $('#alertDiv').removeClass();
            $('#alertDiv').addClass('alert alert-' + res.status);
            $('#alertDiv').html(res.msg);
            $('#alertDiv').show();
            $('.passIP').val('');
            setTimeout(function() {
                $('#alertDiv').hide();
            }, 5000);
            if (typeof res.url !== 'undefined') {
                setTimeout(function() {
                    location = res.url;
                }, 3000);
            }
            return;
        }
    });
    return;
}

function changeEmail() {
    $('#alertDiv').hide();
    $('#alertDiv').removeClass();

    var new_email = $('#new_email').val();
    var rz_password = $('#rz_password').val();
    if (new_email === '' || rz_password === '') {
        $('#alertDiv').removeClass();
        $('#alertDiv').addClass('alert alert-danger');
        $('#alertDiv').html(site170);
        $('#alertDiv').show();
        return;
    }
    if (!isValidEmail(new_email)) {
        $('#alertDiv').removeClass();
        $('#alertDiv').addClass('alert alert-danger');
        $('#alertDiv').html(site4);
        $('#alertDiv').show();
        return;
    }
    $('.loading').show();
    $('.btnEmail').addClass('disabled');
    var params = {};
    params.new_email = new_email;
    params.rz_password = rz_password;
    ajx('POST', params, 'user/changeemail', '', function(res) {
        $('.loading').hide();
        $('.btnPass').removeClass('disabled');
        if (typeof res.code !== 'undefined' && res.code === 401) {
            window.location.href = site_url + 'login';
            return;
        }
        if (typeof res.status !== 'undefined' && typeof res.msg !== 'undefined') {
            $('#alertDiv').removeClass();
            $('#alertDiv').addClass('alert alert-' + res.status);
            $('#alertDiv').html(res.msg);
            $('#alertDiv').show();
            $('.passIP').val('');
            setTimeout(function() {
                $('#alertDiv').hide();
            }, 5000);
            return;
        }
    });
    return;
}

function setPassword() {
    $('#alertDiv').hide();
    $('#alertDiv').removeClass();

    var newPassword1 = $('#newPassword1').val();
    var newPassword2 = $('#newPassword2').val();
    if (newPassword1 == '' || newPassword2 == '') {
        $('#alertDiv').removeClass();
        $('#alertDiv').addClass('alert alert-danger');
        $('#alertDiv').html(site170);
        $('#alertDiv').show();
        return;
    }
    if (newPassword1 !== newPassword2) {
        $('#alertDiv').removeClass();
        $('#alertDiv').addClass('alert alert-danger');
        $('#alertDiv').html(site169);
        $('#alertDiv').show();
        return;
    }
    if (newPassword1.length <= 7) {
        $('#alertDiv').removeClass();
        $('#alertDiv').addClass('alert alert-danger');
        $('#alertDiv').html(UCCheckAllowed ? site166 : site261);
        $('#alertDiv').show();
        return;
    }
    var passMatch = (/\d/.test(newPassword1) && /[a-z]/.test(newPassword1) && (UCCheckAllowed ? (/[A-Z]/.test(newPassword1)) : true));
    if (!passMatch) {
        $('#alertDiv').removeClass();
        $('#alertDiv').addClass('alert alert-danger');
        $('#alertDiv').html(UCCheckAllowed ? site166 : site261);
        $('#alertDiv').show();
        return;
    }
    $('.loading').show();
    var params = {};
    params.newPassword1 = newPassword1;
    params.newPassword2 = newPassword2;
    ajx('POST', params, 'user/setPassword', '', function(res) {
        $('.loading').hide();
        if (typeof res.status !== 'undefined' && typeof res.msg !== 'undefined') {
            $('#alertDiv').removeClass();
            $('#alertDiv').addClass('alert alert-' + res.status);
            $('#alertDiv').html(res.msg);
            $('#alertDiv').show();
            $('#newPassword1,#newPassword2').val('');
            if (typeof res.url !== 'undefined') {
                setTimeout(function() {
                    location = res.url;
                }, 1000);
            }
            return;
        }
    });
    return;
}


String.prototype.replaceArray = function(findArr, replaceArr) {

    var replaceString = this;
    var regex;
    for (var i = 0; i < findArr.length; i++) {
        regex = new RegExp(findArr[i], "g");
        replaceString = replaceString.replace(regex, replaceArr[i]);
    }
    return replaceString;
};

function getmobCode() {

    var params = {};
    params.cCode = $('#countryCode').val();
    var url = ajax_url + 'site/mobileCodesJson'
    xhrRequest(url, 'post', params, function(res) {

        if (res.status == true) {
            var html = '';
            $('#mobileCode').find('option').remove();
            html += '<option value="">Code</option>';
            for (var i = 0; i < res.data.length; i++) {
                html += '<option value="' + res.data[i] + '">' + res.data[i] + '</option>';
            }
            $('#mobileCode').html(html);
            $('#mobCdDiv').show();
            $('#mobile').attr("maxlength", 7);
            $(".merror").html("");
        } else {
            $('#mobCdDiv ').hide();
            $('#mobileCode').find('option').remove();
            $('#mobile').attr("maxlength", 10);
            $(".merror").html("");
        }
    });
}

function AppLoader(hide) {

    if (hide == "undefined") {
        hide = false;
    }
    if (hide == true) {
        $(".AppLoader").hide();
    } else {
        $(".AppLoader").show();
    }
    return true;
}

function setProfDataForAuthHome(val) {
    console.log('value: ', val);
    if (val != '') {
        localStorage.setItem('profileLink', val);
    }
    var topProfUrl = seeker_url + 'top-professionals';
    authenticate(topProfUrl);
}

function showTooltip() {
    setTimeout(function() {
        $('[data-toggle="tooltip"]').tooltip({
            html: true
        });

    }, 500);
}

function objLength(obj) {
    if (typeof obj !== 'object') {
        return 0;
    }
    var arr = Object.keys(obj);
    return arr.length;
}

$(document).delegate('.rzCollapse', 'click', function() {
    var divId = $('#' + $(this).data('href') + '.collapse');
    if ($(this).attr('aria-expanded') == 'true') {
        $(divId).collapse('hide');
        $(this).addClass('collapsed');
        $(this).attr('aria-expanded', false);
    } else {
        $(divId).collapse('show');
        $(this).removeClass('collapsed');
        $(this).attr('aria-expanded', true);
    }
})

function sendNotificationToPA(userId, cvId, emailSubject, viewSource) {

    var params = {};
    params.user_id = userId;
    params.cv_id = cvId;
    params.emailSubject = emailSubject;
    params.viewSource = typeof viewSource === 'undefined' ? '' : viewSource;
    var url = ajax_url + 'cv/sendNotificationToPA';
    xhrRequest(url, 'post', params, function(resp) {
        if (resp.status == true) {
            console.log("notification sent");
        } else {
            console.log("something going wrong");
        }
    });
}
/***     Report issue regarding image or profile ***/
$(document).ready(function() {
    $('#reportProfileForm [name="comments"]').on('change', function() {
        if ($(this).val() === "Other") {
            $('#reportProfileForm #other_comments').collapse('show')
        } else {
            $('#reportProfileForm #other_comments').collapse('hide')
        }
    });

    $('#reportImageForm [name="comments"]').on('change', function() {
        if ($(this).val() === "Other") {
            $('#reportImageForm #other_comments').collapse('show')
        } else {
            $('#reportImageForm #other_comments').collapse('hide')
        }
    });

    $('.reportForm [name="comments"]').on('change', function() {
        if ($(this).val() === 'Other') {
            $('.reportForm #other_comments').collapse('show');
        } else {
            $('.reportForm #other_comments').collapse('hide');
        }
    });
});

function openProfileReportModal(image_id, seeker_user_id, source) {

    $('#reportProfileForm .msgDiv').addClass('hide');
    $('#reportProfileForm #image_id').val(image_id);
    $('#reportProfileForm #seeker_user_id').val(seeker_user_id);
    $('#reportProfileForm #source').val(source);
    $('#report_profile').modal('show');
}

function openImageReportModal(image_id, seeker_user_id, source) {
    $('#reportImageForm .msgDiv').addClass('hide');
    $('#reportImageForm #image_id').val(image_id);
    $('#reportImageForm #seeker_user_id').val(seeker_user_id);
    $('#reportImageForm #source').val(source);
    $('#report_image').modal('show');
}

function issueReport(form) {
    var msgContainerTarget = "reportMsgContainer";

    if (form == 'reportImageForm')
        msgContainerTarget = "reportMsgContainerImage";
    $("#" + form + " .msgDiv").removeClass("hide").html('');
    $("#jreport_loader").removeClass('d-none');
    var size = $('#' + form + ' [name=comments]:checked').length;
    if (size === 0) {
        //        $('#' + form + ' .msgDiv').removeClass('hide');
        //        $('#' + form + ' .msg').html('Please choose atleast one option');
        //        setTimeout(function () {
        //            $('#' + form + ' .msgDiv').addClass('hide');
        //        }, 5000);
        commonAlert('danger', 'Please choose atleast one option', 'hide', msgContainerTarget);
        $("#jreport_loader").addClass('d-none');
        return false;
    }
    var cmnts = $('#' + form + ' #otherReason').val();
    if ((cmnts.trim() == "Type Reason" || cmnts.trim() == "") && $('input[name=comments]:checked').val() == "Other") {
        commonAlert('danger', 'Please type your comments', 'hide', msgContainerTarget);
        $("#jreport_loader").addClass('d-none');
        return false;
    }
    $('#' + form + ' .reportBtn').attr('disabled', true);
    var BtnTxt = $('#' + form).find('button.btn-primary').text();
    $('#' + form).find('button.btn-primary').html(spinner);
    var params = {};
    params = $('#' + form).serialize();
    var url = ajax_url + 'site/issueReport';
    xhrRequest(url, 'post', params, function(resp) {
        $('#' + form).find('button.btn-primary').text(BtnTxt);
        if (resp.status === true) {
            $("#jreport_loader").addClass('d-none');
            commonAlert('success', resp.message, 'hide', msgContainerTarget);
            /*$('#' + form + ' .msgDiv').removeClass('hide');
             $('#' + form + ' .reportBtn').attr('disabled', false);
             $('#' + form + ' .msg').html(resp.message);*/
            setTimeout(function() {
                $('#reportJob').modal('toggle');
            }, 3000);
        } else {
            $("#jreport_loader").addClass('d-none');
            if (typeof resp.code !== 'undefined' && resp.code === 401) {
                authenticate();
            }

            commonAlert('danger', resp.message, 'hide', msgContainerTarget);
            /*console.log('ERR: ', resp.message);
             $('#' + form + ' .msgDiv').removeClass('hide');
             $('#' + form + ' .msg').html(resp.message);*/
        }
        setTimeout(function() {
            $('#' + form + ' #other_comments').removeClass('in');
            $('#' + form + ' #otherReason').val('');
            $('#' + form + ' input:radio').attr('checked', false);
            var clsBtn = $('.modal.in').find('button.close');
            $(clsBtn).trigger('click');
            $('#' + form + ' .reportBtn').attr('disabled', false);
        }, 2000);
        /*setTimeout(function () {
         $('#' + form + ' .msgDiv').addClass('hide');
         }, 8000);*/
    });
}


$(document).ready(function() {
    /* custom-select starts */
    if ($(".selectPicker").length) {
        $(".selectPicker").load(function() {
            if (this.value != '') {
                $(this).parent().addClass("active");
            } else {
                $(this).parent().removeClass("active");
                console.log('not selected');
            }
        }).load();
        $(".selectPicker").change(function() {
            if (this.value != '') {
                $(this).parent().addClass("active");
            } else {
                $(this).parent().removeClass("active");
                console.log('not selected');
            }
        }).change();
    }

    var flag_hec = false;

    $('#HECLogin-form').validate({
        ignore: '',
        rules: {
            hec_email: {
                required: true,
                email: true
            },
            hec_mobile: {
                required: true,
                minlength: function() {
                    return 13;
                },
                maxlength: function() {
                    return 13;
                }
            }
        },
        messages: {},
        highlight: function(element) {
            $(element).parent().addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).parent().removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else if (element.parent('.twince').length) {
                error.insertAfter(element.parent('.twince').find(".errorc"));
            } else {
                error.insertAfter(element);
            }
        }
    });

    $('body').on('submit', "#HECLogin-form", function(event) {
        event.preventDefault();
        if (flag_hec) {
            return false;
        }
        flag_hec = true;
        var that = $(this);
        var data = that.serialize();
        var message = that.find('#messageContainer');
        var alert = message.find('.alert');

        $.ajax({
                url: ajax_url + 'dashboard/hec',
                type: 'POST',
                dataType: 'json',
                data: data,
            })
            .done(function(res) {
                if (res.code == 2) {
                    alert.removeClass('alert-danger');
                    alert.addClass('alert-success');
                    alert.html(res.msg);
                    message.removeClass('hidden');
                    that[0].reset();
                } else if (res.code == 1) {
                    window.location = res.msg;
                } else {
                    alert.removeClass('alert-success');
                    alert.addClass('alert-danger');
                    alert.html(res.msg);
                    message.removeClass('hidden');
                    setTimeout(function() {
                        message.addClass('hidden');
                    }, 2000);
                }
            })
            .always(function() {
                flag_hec = false;
            });

    });
    /* custom-select ends */
});

function verifyCodeCaptcha(token) {
    $('#verify_code_captcha .loading').show();
    $('#messageContainer').html('');
    var params = {};
    params = $('#verify_code_captcha').serialize();
    params += '&userJetonRecaptcha=' + token;

    $.ajax({
        url: ajax_url + 'user/verifyregistercode',
        type: 'POST',
        data: params,
        dataType: 'json',
        headers: {
            //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(resp) {
            $('#verify_code_captcha .loading').hide();
            console.log(resp);
            if (resp.status == true && resp.code == 11) {
                window.location.href = resp.url;
                //commonAlert('success', resp.message);
                return false;
            } else {
                commonAlert('danger', resp.message);
                return false;
            }
        },
        error: function(resp) {
            log(resp);
        }

    });
}

function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);

}

function userAuthenticate() {
    var email;
    var data = {};
    email = document.getElementById('email').value;
    data.email = email;
    //                                              
    $.ajax({
            url: ajax_url + 'user/userData',
            type: 'POST',
            dataType: 'json',
            data: data,
        })
        .done(function(res) {
            if (res.code === 200) {
                $('.emailalert').show();
                $('.emailalertmsg').html(res.message);
            } else {
                $('.emailalert').hide();
            }
        })

}