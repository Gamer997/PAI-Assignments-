    var gcToken = '';

    function onSubmit(token) {
        gcToken = token;
    }

    var gtag_report_conversion_register = function(url) {
        var callback = function() {
            if (typeof(url) != 'undefined') {
                window.location = url;
            }
        };
        if (typeof gtag == 'function') {
            gtag('event', 'conversion', {
                'send_to': 'AW-1050857662/CMoBCPydlIIDEL6hi_UD',
                'event_callback': callback
            });
        }
        return false;
    };

    function submitRequest(data) {
        $.ajax({
            url: ajax_url + 'user/registerNew',
            type: 'POST',
            dataType: 'json',
            data: data,
        }).done(function(resp) {
            $("#signup_loader").addClass('d-none');
            $("#create_account").removeClass('d-none');
            if (resp.status == true) {
                fbq('trackCustom', 'register');
                gtag_report_conversion_register();
                //grecaptcha.reset(token);
                //$("#sign_up")[0].reset();
                // $('#alertDiv').removeClass();
                // $('#alertDiv').addClass('alert alert-success');
                // $('#alertDiv').html(resp.message);
                // $('#alertDiv').show();		

                var job_id = $('#modal_job_id').val();
                if (typeof sigup_flag !== 'undefined' && sigup_flag != '') {
                    getApplyLayers(job_id, resp.user_meta, 'Y', 'Y', false);
                    return false;
                }

                window.location.href = site_url + "dashboard/completeprofile";
                return false;
            } else {
                if (resp.rzTk !== undefined)
                    $('#rzTk').val(resp.rzTk);

                $('#alertDiv').removeClass();
                $('#alertDiv').addClass('alert alert-danger');
                $('#alertDiv').html(resp.message);
                $('#alertDiv').show();
                setTimeout(function() {
                    $("#alertDiv").hide();
                }, 5000);
                return false;
            }
        });
    }
    $(document).on('submit', "#sign_up", function(event) {
        event.preventDefault();
        $("#signup_loader").removeClass('d-none');
        $("#create_account").addClass('d-none');
        var that = $(this);
        var data = that.serialize();
        if (!that.valid()) {
            return false;
        }

        if (typeof current_page == 'undefined') {
            data += '&hearFrom=register';
        } else if (current_page == 'job-detail') {
            data += '&hearFrom=jobDetail';
        } else {
            data += '&hearFrom=jobSearch';
        }


        if (loadRecaptcha != false) {
            grecaptcha.ready(function() {
                grecaptcha.execute('6LfGorsZAAAAAEMBnF9gfMWXAYf4Md2ZRcUkK_DY', {
                    action: 'TestPage'
                }).then(function(token) {
                    //var captha = grecaptcha.getResponse();  
                    if (token == null) {
                        //grecaptcha.execute();
                        alert('please select a captcha');
                        return false;
                    }
                    //console.log(token);
                    data += '&userJetonRecaptcha=' + token;
                    submitRequest(data);
                    return false;
                });
            });
            return false;
        }
        submitRequest(data);
    });
    //};

    $(window).on('load', function() {
        //if (loadRecaptcha != false) {
        //  grecaptcha.execute();
        //}
    });

    $(document).ready(function($) {
        /*var onloadCallback = function () {
                 var wigdetId = grecaptcha.render("emplacementRecaptcha", {
                     "sitekey": "6LejuzkUAAAAAKKbUJjJXUbBS51OB7V2zH8RRSQS",
                     "badge": "inline",
                     "type": "image",
                     "size": "invisible",
                     "callback": onSubmit
                 });
             };*/
        var validate = false;
        $('#sign_up').validate({
            ignore: ':hidden:not([class~=selectized]),:hidden > .selectized, .selectize-control .selectize-input input',

            rules: {
                full_name: {
                    required: true,
                    maxlength: function() {
                        return 30;
                    }
                },
                email: {
                    required: true,
                    email: true
                },
                email_second: {
                    required: true,
                    email: true,
                    equalTo: email
                },
                mobileCode: {
                    required: true,
                    number: true
                },
                countryCode: {
                    required: true
                },
                mobile: {
                    required: true,
                    number: true,
                    minlength: function() {
                        return 7;
                    },
                    maxlength: function() {
                        return 20;
                    }
                }
            },
            messages: {},
            highlight: function(element) {
                var id = element.id;
                validate = true;
                if (id == "mobileCode" || id == "countryCode") {
                    var select = $("#" + id);
                    var parent = select.parent();
                    var selectize = parent.find('.selectize-input');
                    selectize.addClass('border border-danger');

                } else {
                    $(element).addClass('is-invalid');
                }
            },
            unhighlight: function(element) {
                var id = element.id;
                validate = false;
                if (id == "mobileCode" || id == "countryCode") {
                    var select = $("#" + id);
                    var parent = select.parent();
                    var selectize = parent.find('.selectize-input');
                    selectize.removeClass('border border-danger');

                } else {
                    $(element).removeClass('is-invalid');
                }

            },
            errorElement: 'span',
            errorClass: 'invalid-feedback',
            errorPlacement: function(error, element) {
                if (element.attr("id") == "mobileCode" || element.attr("id") == "countryCode") {
                    error.insertAfter(element.parent().find(".selectize-control"))
                } else if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else if (element.parent('.twince').length) {
                    error.insertAfter(element.parent('.twince').find(".errorc"));
                } else {
                    error.insertAfter(element);
                }
            }
        });
        $("select.selectize").on("change", function() {
            if (validate) {
                $("#sign_up").valid();
            }
        })

        //var onSubmit = function(event) {
        //event.preventDefault();
        $(document).on('focusout', '#email', function(event) {
            event.preventDefault();
            $("#signup_loader").removeClass('d-none');
            var params = {};
            var blk = $(this).parents(".form-group").find('.invalid-feedback');
            var email = $('#email').val();
            if (email == '') {
                $("#signup_loader").addClass('d-none');
                return false;
            }
            params.email = email;
            ajx('POST', params, 'user/emailExists', 'html', function(res) {
                $("#signup_loader").addClass('d-none');
                if (res != '') {
                    blk.html(res).show();
                    //$('#email_first').focus();
                }
            });
        });
    });

    function getMobileCodes() {
        $('#sign_up .loading').show();
        var params = {};
        var cCode = $('#countryCode').val();
        params.cCode = cCode;
        $.ajax({
            url: ajax_url + 'site/getMobileCodes',
            type: 'POST',
            data: params,
            dataType: 'json',
            headers: {
                //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(res) {
                $('#sign_up .loading').hide();

                if (res.mobileCodesCnt < 1) {
                    $('#mobCdDiv ').hide();
                    $('#mobileCode').find('option').remove();
                    $('#mobCdDiv select').attr("data-validate", "0");
                    $('#mobile').attr("maxlength", 20);
                    $('#mobile').attr("minlength", 7);

                } else {
                    var mcodes = '<select class="selectize" id="mobileCode" name="mobileCode"><option value="">Code</option>';
                    $.each(res.mobileCodes, function(index, el) {
                        var selected = "";
                        if (index === res.ad_role) {
                            selected = "selected";
                        }
                        mcodes += '<option value="' + el + '" ' + selected + '>' + el + '</option>';
                    });
                    mcodes += '</select>';

                    $('#mobCdDiv select').attr("data-validate", "1");
                    $('#ldMcDiv').html(mcodes);
                    $('#mobCdDiv').show();
                    $('#mobile').attr("maxlength", 7);
                    $('#mobile').attr("minlength", 7);
                    initSelectize();
                }
            },
            error: function(res) {
                $('#sign_up .loading').hide();
                log(res);
            }
        });
    }

    function initSelectize() {

        $("select.selectize").selectize({
            copyClassesToDropdown: false
        });
    }
    $(window).on("load", function() {
        initSelectize();

    });