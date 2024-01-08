window.fbAsyncInit = function() {
    if (typeof FB == 'object') {
        FB.init({
            appId: FB_APPID, // Rozee Official App Id
            xfbml: true,
            version: 'v2.5'
        });
    }
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk/xfbml.save.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/////////////////////////////////////////////////////////////////////////////////////////////////

function getUserData(response) {
    var job_id = $('#modal_job_id').val();
    var tempData = response;
    var accessToken = response.authResponse.accessToken;
    var expiresIn = response.authResponse.expiresIn;
    var userId = response.authResponse.userID;
    var fEmail = '';
    if (typeof FB == 'object') {
        FB.api('/me', {
            fields: 'name, first_name, last_name, age_range, link, email, gender, locale, picture.width(999), timezone, updated_time, location, education, work, birthday'
        }, function(response) {
            if ('email' in response) {
                pData = {
                    user_id: userId,
                    access_token: accessToken,
                    email: response.email
                };
            } else {
                pData = {
                    user_id: userId,
                    access_token: accessToken
                };
            }

            if (typeof tempData.goAheadCall !== 'undefined') {
                pData.goAheadCall = tempData.goAheadCall;
            }

            $.ajax({
                url: site_url + 'fb/token',
                data: pData,
                type: 'POST',
                success: function(result) {
                    jResult = JSON.parse(result);
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
                                    tempData.goAheadCall = 'Y';
                                    console.log('NEW: ', tempData);
                                    getUserData(tempData);
                                } else {
                                    $('#login-form .loading').hide();
                                    $('.btn-default').show();
                                }
                            }
                        });
                        return;
                    }
                    if (jResult.status == 'success') {
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
                        if (jResult.email != 'None') {
                            $('#email').val(jResult.email);
                            $('#pwd').val('');
                        }
                        if (jResult.action == 'createNewEmail' && jResult.fRedirect == 'Yes') {
                            // FB Sign Up flow
                            var params = {};
                            params.fbData = response;
                            params.accessToken = accessToken;
                            ajx('POST', params, 'site/convertFbObjectJson', '', function(resp) {
                                if (resp.status === true) {
                                    if (sigin_flag != '') {
                                        sigup_flag = '1';
                                        $('#full_name').val(jResult.first_name + ' ' + jResult.last_name);
                                        $('#email').val(jResult.email);
                                        $('#email_second').val(jResult.email);
                                        $('#register_div').show();
                                        $('#signin_div').hide();
                                    } else {
                                        window.location.href = site_url + 'register/fbProfile/?utm_campaign=FACEBOOK_REGISTER&utm_source=register&utm_medium=website';
                                    }
                                } else if (resp.status == 'login') {
                                    window.location.href = site_url + 'dashboard/?utm_campaign=FACEBOOK_DASHBOARD&utm_source=register&utm_medium=website';
                                } else if (resp.status == 'emailFound') {
                                    commonAlert('danger', resp.msg, 'no-hide');
                                } else {
                                    window.location.href = site_url + 'register';
                                }
                            });
                            //////////////////
                        }
                    }
                }
            });
        });
    }
}

function fbLogin() {
    commonAlert('info', FbLogin_3, 'no-hide');
    if (site_at != 'sailfish' && typeof __gaTracker == 'function') {
        __gaTracker('send', 'pageview', '/fbLogin');
    }
    if (typeof FB == 'object') {
        FB.login(function(response) {
            console.log(response);
            if (response.status === 'connected') {
                commonAlert('info', FbLogin_2, 'no-hide');
                getUserData(response);
            } else {
                commonAlert('danger', FbLogin_1, 'no-hide');
            }
        }, {
            scope: 'email,public_profile,user_location,user_birthday'
        });
    }
}