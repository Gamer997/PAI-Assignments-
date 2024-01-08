function jsearchAppliedAct(jid) {
    if (typeof isFromJobSearch != 'undefined' && typeof jid != 'undefined') {
        window.gReact.saveApply(jid);
    }
}

var gtag_report_conversion_application = function(url) {
    var callback = function() {
        if (typeof(url) != 'undefined') {
            window.location = url;
        }
    };
    if (typeof gtag == 'function') {
        gtag('event', 'conversion', {
            'send_to': 'AW-1050857662/5T0bCOOIoIIDEL6hi_UD',
            'event_callback': callback
        });
    }
    return false;
};

function updateSkillSelect(val, select) {
    //alert();
    var btn = select.parents(".skill-dropdown").find('.add-skill');
    var valSkillSelect = select.val();
    if (val != "" && valSkillSelect != "") {
        btn.removeClass('btn-default');
        btn.addClass('btn-primary');
    } else {
        btn.removeClass('btn-primary');
        btn.addClass('btn-default');
    }
    return true;
}

var datepickerSettings = {
    format: 'yyyy-mm-dd',
    startDate: '-15y',
    endDate: '+0d',
    language: locale
};
if (locale == 'ur') {
    datepickerSettings = {
        format: 'yyyy-mm-dd',
        startDate: '-15y',
        endDate: '+0d',
        language: locale,
        rtl: true
    };
}

$(document).ready(function() {

    $("body").on('click', '.apply-here', function(event) {
        //event.preventDefault();
        var url_apply = ajax_url + 'job/apply';
        $.ajax({
            url: url_apply,
            type: 'POST',
            dataType: 'json',
            data: {
                jid: job_id,
                cv_id: cv_id,
                sourceFrom: 'externalApply'
            },
        }).always(function(res) {});
    });

    $("body").on('keyup', '#cnic_job', function(event) {
        event.preventDefault();
        var that = $(this);
        var val = that.val();

        if (val != "") {
            $(".cnic_date").removeClass('d-none');
        } else {
            $(".cnic_date").addClass('d-none');
        }
    });

    $("body").on('click', '#cnic_calendar', function(event) {
        event.preventDefault();
        $('#cnic_job_date').trigger('focus');
    });

    $("body").on('change', '.skill-select', function(event) {
        event.preventDefault();
        var that = $(this);
        var inputType = that.data('input_type');
        if (inputType == undefined || inputType == "mobile") {
            return;
        }
        var val = that.val();

        var valp = that.parents(".parent-skill-row").find(".skill-text");
        var valSkillName = valp.length > 0 ? valp.val() : "true";
        console.log(val);
        var skillname = $("#skillsName");
        var btn = that.parent(".skill-dropdown").find('.add-skill');

        if (val != "" && valSkillName != "") {
            btn.removeClass('btn-default');
            btn.addClass('btn-primary');
        } else {
            btn.removeClass('btn-primary');
            btn.addClass('btn-default');
        }
    });

    $("body").on('change', "#countryCode", function(event) {
        event.preventDefault();
        var val = $(this).val().trim();
        if (val == '+92') {
            $("#mobileCode").parents('.mcode').removeClass('d-none hidden');
        } else {
            $("#mobileCode").parents('.mcode').addClass('d-none hidden');
        }
    });

    $("body").on('click', ".add-more-skills", function(event) {
        event.preventDefault();
        var that = $(this);
        var parent = $('#addSkillBlk');
        var input = parent.find('.skill-text');
        var select = parent.find('.skill-select');
        var addBtn = parent.find('.add-skill');

        if (parent.hasClass('d-none')) {
            select.val('');
            input.val('');
            addBtn.addClass('btn-default');
            addBtn.removeClass('btn-primary');
            parent.removeClass('d-none');
        } else {
            parent.addClass('d-none');
        }

        if (!parent.hasClass('d-none') && !that.hasClass('init')) {
            var options = {
                url: function(phrase) {
                    return ajax_url + "dashboard/skillsSearch/?term=" + phrase;
                },
                getValue: "name"
            };
            $("#skillsName").easyAutocomplete(options);
            that.addClass('init');
        }
    });

    $("body").on('change', ".skill-checkbox", function(event) {
        event.preventDefault();
        var that = $(this);
        var checked = that.prop('checked');
        var parent = that.parents('.parent-skill-row');
        var select = parent.find('.skill-select');

        if (checked) {
            select.prop('required', true);
        } else {
            select.prop('required', false);
        }
    });

    $("body").on('change', '.skill-select', function(event) {
        event.preventDefault();
        var that = $(this);
        var parent = that.parents('.parent-skill-row');
        var chkbox = parent.find('.skill-checkbox');
        var button = parent.find('.add-skill');

        if (that.val() == '4') {
            chkbox.val('not_have')
            button.html('Save');
        } else {
            chkbox.val('add')
            button.html('Add');
        }
    });

    $("body").on('click', ".loadprofile", function(event) {
        event.preventDefault();
        var that = $(this);
        var redirect = that.attr('href');
        load_profile(redirect, "#applyjob");
    });

    $("body").on('click', ".gotoStepP", function(event) {
        event.preventDefault();
        var loc = $(this).attr('href');
        load_step1(loc, "#applyjob", false, 'Y');
    });

    $("body").on('click', "#goto_Step1, #goto_Step1_1, #goto_Step1_2", function(event) {
        event.preventDefault();
        var loc = $(this).attr('href');
        var disabled = $(this).attr('disabled');
        if (disabled) {
            return false;
        }
        load_step1(loc, "#applyjob", true);
    });

    var pushDataLayerJobDetail = function(type = 1, page = 'jobDetail') {
        let jd = $('#jid').val();
        if (typeof jd == undefined) {
            jd = job_id;
        }

        dataLayer.push({
            'pageCategory': page,
            'event': 'applyBtnClick-' + type,
            'jid': jd,
            'pageTitle': $('title').text(),
        });
        console.log({
            'pageCategory': page,
            'event': 'applyBtnClick-' + type,
            'jid': jd,
            'pageTitle': $('title').text(),
        });
    }

    $(document).on('click', '#applyforjob', function(e) {
        pushDataLayerJobDetail('final');
    });
    $(document).on('click', '.job-apply-btn', function(e) {
        pushDataLayerJobDetail();
    });

    jobApplyStep1Validation();

    $("body").on('submit', "#job_apply1", function(event) {
        event.preventDefault();
        if (redirect == 'loadprofile') {
            $(".loadprofile-edit").trigger("click");
            return false;
        } else if (redirect == 'loadpremium') {
            return false;
        } else if (redirect == 'javascript:;') {
            return false;
        }
        var that = $(this);
        var number = that.find('#mobile').val().trim();
        var alert = that.find('#notify').prop('checked');
        var submit_button = that.find('.submit_button');
        var cloader_submit = that.find('.cloader_submit');

        console.log(that.valid());

        if (that.valid()) {
            showLoaderClassBased(submit_button, cloader_submit);
            disableBackButton(that);
            var data = that.serialize();
            var url = ajax_url + 'job/apply1';
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: data,
            }).always(function(res) {
                if (res.code != undefined && res.code == 401) {
                    authenticate();
                    return;
                }

                if (res.apply != undefined && res.apply == 'Y') {
                    var url_apply = ajax_url + 'job/apply';
                    $.ajax({
                        url: url_apply,
                        type: 'POST',
                        dataType: 'json',
                        data: data,
                    }).always(function(res1) {
                        if (res1.success == true) {
                            var jidT = that.find("#jid").attr('value');
                            gtag_report_conversion_application();
                            jsearchAppliedAct(jidT);
                            load_step5(redirect, that, res1);

                            return;
                        } else {
                            enableBackButton(that);
                            hideLoaderClassBased(submit_button, cloader_submit);
                            $("#updateCVMessageExp").removeClass('d-none hidden');
                            $("#updateCVMessageExp").html(res1.message);
                            setTimeout(function() {
                                $("#updateCVMessageExp").addClass('d-none hidden');
                            }, 3000);
                        }
                    });
                } else {
                    load_step2(redirect, that);
                }
            });
        }
    });

    appJobValid();

    $("body").off('submit', "#apply_on_job");
    $("body").on('submit', "#apply_on_job", function(event) {
        event.preventDefault();
        var that = $(this);

        if (!that.valid()) {
            //console.log("not valid");
            return false;
        }

        $('.fnl_back_btn').attr('onClick', 'return false;');
        var submit_button = that.find('.submit_button');
        var cloader_submit = that.find('.cloader_submit');
        showLoaderClassBased(submit_button, cloader_submit);
        disableBackButton(that);
        var data = that.serialize();
        let customCv = $("#applyJobCvList").val();
        let cvSelectedType = $("#cvSelectedType").val();
        let uploadedCv = $("input[name=frmImages]").val();

        data = data + "&customCv=" + customCv;
        data = data + "&cvSelectedType=" + cvSelectedType;
        data = data + "&uploadedCv=" + uploadedCv;

        var url = ajax_url + 'job/apply';
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
        }).always(function(res) {
            if (res.success == true) {
                var jidT = that.find("#jid").attr('value');
                gtag_report_conversion_application();
                jsearchAppliedAct(jidT);
                load_step5(redirect, that, res);
                return;
            } else {
                enableBackButton(that);
                $('.fnl_back_btn').removeAttr('onClick');
                hideLoaderClassBased(submit_button, cloader_submit);
                $("#updateCVMessageExp").removeClass('d-none hidden');
                $("#updateCVMessageExp").html(res.message);
                setTimeout(function() {
                    $("#updateCVMessageExp").addClass('d-none hidden');
                }, 3000);
            }
        });
    });

    ApplyJobQuestionsForm();
});

function appJobValid() {
    $("#apply_on_job").validate({
        rules: {
            'willToRel': {
                required: '#willToRel:visible'
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
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
}


function ApplyJobQuestionsForm() {
    $('#ApplyJobQuestionsForm').validate({
        rules: {},
        invalidHandler: function(form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                validator.errorList[0].element.focus();
            }
            $(".job_questions").each(function(index, el) {
                if ($(this).data('isrequired') == 'Y' && $(this).val().length < 1) {
                    $(this).addClass('is-invalid');
                    $(this).parents(".form-group").append('<span class="invalid-feedback">This field is required.</span>').show();
                } else {
                    $(this).removeClass('is-invalid');
                    $(this).parents(".form-group").find('invalid-feedback').html('');
                }
            });
        },
        submitHandler: function(form) {
            var isValid = true;
            $(".job_questions").each(function(index, el) {
                if ($(this).data('isrequired') == 'Y' && $(this).val().length < 1) {
                    $(this).addClass('is-invalid');
                    var blkss = $(this).parents(".form-group").find('.invalid-feedback');
                    if (blkss) {
                        var i = 0;
                        $(this).parents(".form-group").find('.invalid-feedback').each(function(index, el) {
                            $(this).remove();
                            i++;
                        });

                    } else {
                        $(this).parents(".form-group").append('<span class="invalid-feedback">This field is required.</span>').show();
                    }
                    $(this).parents(".form-group").append('<span class="invalid-feedback">This field is required.</span>').show();
                    isValid = false;
                } else {
                    $(this).removeClass('is-invalid');
                    $(this).parents(".form-group").find('invalid-feedback').html('');
                }
            });

            if (isValid) {
                var that = $("#ApplyJobQuestionsForm");
                $("#questions_loader").removeClass('d-none hidden');

                if (!that.valid()) {
                    return false;
                }

                var formData = new FormData(document.querySelector('#ApplyJobQuestionsForm'));
                $.ajax({
                    url: ajax_url + 'job/applyJobQuickQuestions',
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    dataType: 'json',
                    success: function(resp) {
                        $("#questions_loader").addClass('d-none hidden');
                        if (resp.status == true) {
                            load_step4(redirect, that);
                            return;
                        } else {
                            $('#alertDiv').addClass('alert alert-danger');
                            $('#alertDiv').html(resp.message);
                            $('#alertDiv').show();
                            setTimeout(function() {
                                $("#alertDiv").hide();
                            }, 5000);
                            return false;
                        }
                    },
                    error: function() {
                        console.log('Upload error');
                    }
                });
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
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
}

function jobApplyStep1Validation() {
    $("#job_apply1").validate({
        rules: {
            mobile: {
                required: true,
                digits: true,
                minlength: 7,
                maxlength: function(element) {
                    var cc = $('#countryCode').val().trim();
                    if (cc == "+92") {
                        return 7;
                    } else {
                        return 11;
                    }
                }
            },
            mobileCode: {
                required: function(element) {
                    var number = $('#mobile').val().trim();
                    var cc = $('#countryCode').val().trim();
                    if (number != "" && cc == '+92') {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            'jobCity': {
                required: '#jobCity:visible'
            },
            'cnic_job': {
                digits: true,
                required: '#cnic_job:visible',
                minlength: 13,
                maxlength: 13
            },
            'cnic_job_date': {
                required: '#cnic_job_date:visible'
            }
        },
        highlight: function(element) {
            $(element).addClass('is-invalid');
            $(element).parents('.form-group ').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).removeClass('is-invalid');
            $(element).parents('.form-group ').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'invalid-feedback',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
}

function authenticate_new(jid, backUrl) {
    var currentUrl = window.location.href;
    var redirectTo = seeker_url + 'login?jid=' + jid;
    var data = {};
    if (typeof backUrl == "undefined") {
        data.redirectUrl = window.location.href;
    } else {
        data.redirectUrl = backUrl;
    }

    data.jid = jid;
    localStorage.setItem('lastUrl', data.redirectUrl);
    var isMobile = false;

    if (typeof isMobileFlag !== "undefined") {
        if (isMobileFlag == 'Y')
            isMobile = true;
    }

    if (current_page == 'job-detail' && isMobile == false) {
        $('#modal_job_id').val(jid);
        $('#register-signin-modal').modal('show');
        return false;
    }
    if (typeof sigin_flag == 'undefined') { // for mobile view
        var successCallback = function(res, statusText, jqXHR) {
            if (res.code === 200) {
                window.location = redirectTo;
            }
        };

        var url = ajax_url + 'site/saveLastURL';
        xhrRequest(url, 'POST', data, successCallback);
    }

}

function disableBackButton(that) {
    if (typeof canApply != "undefined" && canApply == "Y") {
        var parent = that.parents('form');
        var bckbtn = that.find('#bckbtn');
        bckbtn.addClass('d-none');
    }
}

function enableBackButton(that) {
    if (typeof canApply != "undefined" && canApply == "Y") {
        var parent = that.parents('form');
        var bckbtn = that.find('#bckbtn');
        bckbtn.removeClass('d-none');
    }
}

function changeStatus(qid) {
    if ($("#" + qid + "").val() == "" && $("#" + qid + "").val().length < 1) {
        $("#" + qid + "").addClass('is-invalid');
        $("#" + qid + "").parents(".form-group").find('.invalid-feedback').html('');
        var blks = $("#" + qid + "").parents(".form-group").find('.invalid-feedback');
        if (blks) {
            $("#" + qid + "").parents(".form-group").find('.invalid-feedback').each(function(index, el) {
                $(this).remove();
            });
            $("#" + qid + "").parents(".form-group").append('<span class="invalid-feedback">This field is required.</span>').show();
        } else {
            $("#" + qid + "").parents(".form-group").append('<span class="invalid-feedback">This field is required.</span>').show();
        }

    } else {
        $("#" + qid + "").removeClass('is-invalid');
        $("#" + qid + "").parents(".form-group").find('invalid-feedback').html('');
    }
}

var hideUploadCustomCv = function() {
    $(".showCvBlock").addClass("d-none");
    $("#applyforjob").addClass("disable");
}
var showUploadCustomCv = function() {
    $(".showCvBlock").removeClass("d-none");
    if ($(".uploadCVCcaption").hasClass("d-none")) {} else {
        $(".uploadCVCcaption").addClass("d-none");
    }
}
var applyenable = function() {
    $("#applyforjob").removeClass("disable");
    if ($(".uploadCVCcaption").hasClass("d-none")) {
        $(".uploadCVCcaption").removeClass("d-none");
    }
}
$(document).on("click", ".showUploadCustomCv", function() {
    $(".uploadBlockCustomCv input[type=file]").trigger('click');
    $(".uploadBlockCustomCv").removeClass("d-none");
    $('.qq-upload-button').addClass("d-none");
    $("#cvSelectedType").val("upload");
});