$(document).ready(function() {
    $('.custom-form .form-control').blur(function() {
        if (!$(this).val()) {
            $(this).addClass('empty');
        } else {
            $(this).removeClass('empty');
        }
    });

    $('.custom-form .form-control').each(function(index) {
        if (!$(this).val()) {
            $(this).addClass('empty');
        } else {
            $(this).removeClass('empty');
        }
    });

    $('.jobRef .thClose').click(function() {
        $("body").removeClass("jobRef-active");
    });

    $('#login-form .show-password').click(function() {
        $(this).text(function(i, text) {
            txtShow = $(this).attr('data-txtShow');
            txtHide = $(this).attr('data-txtHide');
            return text === txtShow ? txtHide : txtShow;
        });
        $('#login-form #pwd').attr('type', function(index, attr) {
            return attr == 'password' ? 'text' : 'password';
        });
    });

    $('body').on('click', "#chngType", function(event) {
        event.preventDefault();
        var that = $(this);
        var password = $("#pwd");
        var pType = password.attr('type');
        var type = (pType == 'text' ? 'password' : 'text');
        password.attr('type', type);

    });

    $('#login-form').validate({
        rules: {
            username_or_email: {
                required: true,
                validUsernameOrEmail: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        highlight: function(element) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function(element) {
            $(element).removeClass('is-invalid');
        },
        errorElement: 'span',
        errorClass: 'invalid-feedback',
        errorPlacement: function(error, element) {
            error.insertAfter(element.siblings('.theLabel'));
        },
        submitHandler: function(form) {
            signIn_layer();
        }
    });

    $('body').on('click', "#gpluslogin", function(event) {
        event.preventDefault();
        var params = {
            client_id: client_id,
            cookiepolicy: 'single_host_origin',
            //'callback' : 'GplusLogin'
            //'approvalprompt':'force',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
        };
        gapi.load('client:auth2', function() {
            gapi.auth2.init(params).then(function() {
                gapi.auth2.getAuthInstance().signIn().then(GplusLogin).catch(gPlusLoginError);
            });
        });
    });

    $.validator.addMethod('validUsernameOrEmail', function(value, element) {
        var emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        var userNameRegex = /^[0-9a-zA-Z_]+$/;
        // Vendor Specific login case    
        if (value.indexOf('|#|') > 0) {
            var emails = value.split('|#|');
            if (emails.length === 2) {
                for (var i in emails) {
                    val = emails[i];
                    if (val.indexOf('@') > 0) {
                        if (emailRegex.test(val) === false) {
                            return false;
                        }
                    } else {
                        if (userNameRegex.test(val) === false) {
                            return false;
                        }
                    }
                }
                return true;
            }
            return false;
        } else if (value.indexOf('@') > 0) {
            return this.optional(element) || emailRegex.test(value);
        } else {
            return this.optional(element) || userNameRegex.test(value);
        }
    }, 'Enter valid email');

});


function gPlusLoginError(error) {
    if (error.error == 'popup_blocked_by_browser') {
        alert("Please Allow popups");
    }
}

var captchaOnloadCallback = function() {
    if ($('#googleCaptcha').length) {
        grecaptcha.render('googleCaptcha', {
            'sitekey': '6LdTBRUTAAAAAJfuZIS-4yMBHOgaY0yu-VigaxY3',
            'callback': function(response) {
                $('#googleCaptcha').val(response);
            }
        });
    }
};

function signIn_layer(confirm) { // from rozee
    $('#login-form .loading').show();
    $('#messageContainer').html('');
    $('#login-form .btn-default').hide();
    $('#login-form .btn-primary').hide();
    showLoader("#submit_button", ".cloader");
    var params = {};
    params.email = $('#login-form #_email').val();
    params.pwd = $('#login-form #pwd').val();
    params.rzTkn = $('#rzTkn').val();
    if ($('#sourcFrom').length > 0) {
        params.sourcFrom = $('#sourcFrom').val();
    } else {
        params.sourcFrom = 'Login';
    }
    var gCaptcha = $('#googleCaptcha').val();
    if (gCaptcha != null && gCaptcha != '') {
        params.gCaptcha = gCaptcha;
    }
    if (typeof confirm !== 'undefined') {
        params.goAheadCall = confirm;
        params.token = $('#token').val();
    }

    if (typeof otp_flag !== 'undefined') {
        if (otp_flag != '') {
            params.otp_flag = otp_flag;
        }
    } else {
        params.otp_flag = 'N';
    }

    var alertDivIdClass = 'message';

    $.ajax({
            url: ajax_url + 'user/login',
            type: 'POST',
            data: params,
            dataType: 'json',
        })
        .done(function(resp) {

            if (typeof sigin_flag !== 'undefined') {
                if (sigin_flag != '') {
                    alertDivIdClass = '.alertMessage';
                }
            }
            //console.log('========> '+typeof resp, resp);
            if (typeof resp.status !== 'undefined' && resp.status === false) {
                commonAlert('danger', resp.response, '', alertDivIdClass);
            }
            if (typeof resp.captcha !== 'undefined' && params.sourcFrom != 'Layer') {
                if (resp.captcha == 'loadCaptcha') {
                    var captchaHtml = $('#captchaContainer').html().trim();
                    $('#login-form .loading').hide();
                    $('.btn-default').show();
                    commonAlert('danger', resp.response, '', alertDivIdClass);
                    if (captchaHtml == '') {
                        $('#captchaContainer').html('');
                        try {
                            loadCaptcha('signIn');
                        } catch (err) {
                            grecaptcha.reset();
                        }
                    } else {
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
                    //closeButton: true,
                    buttons: {
                        confirm: {
                            label: msg_continuelogin_btn,
                            className: 'btn-success'
                        },
                        cancel: {
                            label: msg_cancel_btn,
                            className: 'btn-danger d-block'
                        }
                    },
                    callback: function(result) {
                        //console.log('This was logged in the callback: ' + result);
                        if (result) {
                            signIn_layer('Y');
                        } else {
                            $('#login-form .loading').hide();
                            $('.btn-default, .btn-primary').show();
                        }
                    }
                });
                return;
            }

            if (typeof resp.data !== 'undefined') {
                if (typeof sigin_flag !== 'undefined') {
                    if (sigin_flag != '') {
                        getApplyLayers("", resp.user_meta);
                        $("#submit_button").show();
                        return false;
                    }
                }

                window.location.href = (typeof resp.url === 'undefined') ? site_url + 'dashboard' : resp.url;
                return;
            }
            if (resp.response == 11) {
                window.location.href = site_url + 'dashboard';
            } else if (resp.response == 'TknMisMatch') {
                $('#rzTkn').val(resp.rzTkn);
                $('#login-form .loading').hide();
                $('.btn-default, .btn-primary').show();
                commonAlert('danger', 'Something went wrong. Please try again.', '', alertDivIdClass);
                return false;
            } else if (resp.response == 'N') {
                window.location.href = site_url + 'register/verifyregister/?email=' + resp.email;
            } else {
                $('#login-form .loading').hide();
                $('.btn-default, .btn-primary').show();
                commonAlert('danger', resp.response, '', alertDivIdClass);
                $('#rzTkn').val(resp.rzTkn);
                $('.merror').text(resp.response);
                return false;
            }
        })
        .always(function() {
            hideLoader("#submit_button", ".cloader");
        });
}

function GplusLogin(googleUser) {
    if (is_empty_obj(googleUser) || googleUser == {}) {
        return false;
    }

    var id_token = googleUser.getAuthResponse().id_token;
    var gplusName = googleUser.getBasicProfile().getName();
    var gplusImage = googleUser.getBasicProfile().getImageUrl();
    var gplusEmail = googleUser.getBasicProfile().getEmail();

    var data = {
        token: id_token,
        name: gplusName,
        email: gplusEmail
    }
    /*console.log(data);
    return false;*/

    if (typeof googleUser.goAheadCall !== 'undefined') {
        data.goAheadCall = googleUser.goAheadCall;
    }

    $.ajax({
            url: site_url + 'gplus/token',
            type: 'POST',
            dataType: 'json',
            data: data,
        })
        .done(function(jResult) {
            if (typeof jResult.code !== 'undefined' && jResult.code === 121) {
                bootbox.confirm({
                    title: msg_duplicateLogin,
                    message: "<h5>" + jResult.message + "</h5>",
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
                            googleUser.goAheadCall = 'Y';
                            console.log('NEW: ', googleUser);
                            GplusLogin(googleUser);
                        } else {
                            $('#login-form .loading').hide();
                            $('.btn-default').show();
                        }
                    }
                });
                return;
            }

            if (jResult.status == 'success') {

                var job_id = $('#modal_job_id').val();

                if (typeof sigin_flag !== 'undefined') {
                    if (sigin_flag != '') {
                        getApplyLayers(job_id, jResult.user_meta);
                        return false;
                    }
                }

                commonAlert('success', jResult.msg, 'no-hide');
                var redirectTo = localStorage.getItem('lastUrl');
                localStorage.setItem('lastUrl', null);
                if (redirectTo != null && redirectTo != 'null') {
                    setTimeout(window.location = redirectTo, 1500);
                } else {
                    setTimeout(window.location = jResult.rUrl + 'dashboard', 1500);
                }
                return;
            } else if (jResult.status == 'danger') {
                commonAlert('danger', jResult.msg, 'no-hide');
            } else if (jResult.status == 'info') {
                commonAlert('info', jResult.msg, 'no-hide');
                if (jResult.action == 'createNewEmail' && jResult.fRedirect == 'Yes') {
                    if (sigin_flag != '') {
                        if (typeof jResult.socialEmail !== 'undefined' && typeof jResult.fullname !== 'undefined') {
                            sigup_flag = '1';
                            $('#full_name').val(jResult.fullname);
                            $('#email').val(jResult.socialEmail);
                            $('#email_second').val(jResult.socialEmail);
                            $('#register_div').show();
                            $('#signin_div').hide();
                        } else {
                            getApplyLayers(job_id, jResult.user_meta);
                        }
                    } else {
                        setTimeout(window.location = site_url + 'register/indexNew/?utm_campaign=GPLUS_REGISTER&utm_source=register&utm_medium=website', 1500);
                    }
                }
            } else if (jResult.status == "setpass") {
                setTimeout(
                    (window.location = site_url + "user/setPassword"),
                    1500
                );
            }

            console.log(res);
        })
        .always(function(jResult) {
            if (typeof jResult.code !== 'undefined' && jResult.code === 121) {} else {
                logoutGplus();
            }
            console.log("complete");
        });
}

function GplusLoginError(error) {
    console.log(JSON.stringify(error, undefined, 2));
}

function logoutGplus() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
}

function is_empty_obj(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function showLoader(argument1, loader) {
    var load = $(loader);
    $(argument1).addClass('d-none');
    $(loader).removeClass('d-none');
}

function hideLoader(argument1, loader) {
    $(loader).addClass('d-none');
    $(argument1).removeClass('d-none');
}

function showLoaderClassBased(argument1, loader) {
    var load = $(loader);
    argument1.addClass('d-none');
    loader.removeClass('d-none');
}

function hideLoaderClassBased(argument1, loader) {
    loader.addClass('d-none');
    argument1.removeClass('d-none');
}