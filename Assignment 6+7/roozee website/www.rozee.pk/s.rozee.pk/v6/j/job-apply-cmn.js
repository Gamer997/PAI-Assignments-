$(function() {
    $("body").on('click', '.go_back', function(event) {
        event.preventDefault();
        var form_id = $(this).data('redirect');
        var form = $("#" + form_id);
        var jid = form.find('.jid').val();
        var token = form.find('.token').val();
        var data = {
            jid: jid,
            token: token
        };
        load_content(redirectBack, false, '', data);
    });

    $("body").on('click', '.load_step', function(event) {
        event.preventDefault();
        var location = $(this).attr('href');

        var form_id = $(this).data('redirect');
        var form = $("#" + form_id);
        var jid = form.find('.jid').val();
        var token = form.find('.token').val();
        var backLink = form.find('.backLink').val();
        var data = {
            jid: jid,
            token: token,
            backLink: backLink
        };

        load_content(location, false, '', data);
    });

    $("body").on('submit', "#job_skills", function(event) {
        event.preventDefault();
        var that = $(this);
        var parent_row = that.find('.parent-skill-row.d-none');
        var skill_ids = [];
        var sendData = {};
        var divsArr = ['LeftSkillDrag', 'CenterSkillDrag', 'RightSkillDrag', 'RemoveSkills'];
        $.each(divsArr, function(index, item) {
            var blk = $("#" + item);
            var rate = blk.data('exp_rate');
            var liBlk = blk.find('div.list');

            $.each(liBlk, function(index1, item1) {
                var list = $(item1);
                var addthis = list.data('addthis');
                var skill_id = list.data('skill_id');
                var is_exist = list.data('is_exist');
                var skill_type = list.data('skill_type');

                skill_id = String(skill_id);
                skill_ids.push(skill_id);

                skill_id = skill_id.replace(/[^a-zA-z0-9]/gi, '_');
                sendData["is_exist_" + skill_id] = is_exist;
                sendData["skill_type_" + skill_id] = skill_type;
                sendData["addthis_" + skill_id] = addthis;
                sendData["workExp_" + skill_id] = rate;
            });
        });

        $.each(parent_row, function(index2, item2) {
            var parentblk = $(item2);
            var inputField = parentblk.find('.skill-text');

            var skillId = inputField.data('skill_id');
            var skillType = inputField.data('skill_type');

            var selectBlk = parentblk.find('select.skill-select');
            var selectVal = selectBlk.val();

            if (selectVal == '4') {
                sendData["is_exist_" + skillId] = 'N';
                sendData["skill_type_" + skillId] = skillType;
                sendData["addthis_" + skillId] = 'not_have';
                sendData["workExp_" + skillId] = selectVal;
                skill_ids.push(skillId);
            }
        });
        sendData["rztkn_skills"] = $("#rztkn_skills").val();
        sendData["jid"] = $("#jobId").val();
        sendData["skill_id"] = skill_ids;

        //console.log(sendData);
        var submit_button = that.find('.submit_button');
        var cloader_submit = that.find('.cloader_submit');
        showLoaderClassBased(submit_button, cloader_submit);
        var data = sendData; //that.serialize();
        var url = ajax_url + 'job/jobSkills';
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
        }).always(function(res) {
            hideLoaderClassBased(submit_button, cloader_submit);
            if (res.code != undefined && res.code == 401) {
                authenticate();
                return;
            }
            load_step3(redirect, that);
        });
    });

    $("body").on('click', '.add-skill', function(event) {
        event.preventDefault();
        var that = $(this);
        var input = that.data('input_type');
        var form = that.parents('#job_skills');
        var parent = that.parents('.parent-skill-row');
        var inputField = parent.find('.skill-text');
        var select = parent.find('select.skill-select');

        var skillRate = select.val();
        var skillType = inputField.data('skill_type');
        if (input == "checkbox") {
            var skillId = inputField.data('skill_id');
            var skillName = inputField.data('skill_name');
        } else {
            var skillId = inputField.val();
            var skillName = inputField.val();
        }
        var selected = select.find(':selected');
        var moveTo = selected.data('moveto');
        if (moveTo == 'RemoveSkills') {
            that.parents('.parent-skill-row').addClass('d-none');
            var allRow = form.find('.parent-row');
            var allRowhidden = form.find('.parent-row.d-none');
            if (allRow.length <= 0 || allRow.length == allRowhidden.length) {
                $(".skills-heading").addClass('d-none');
            }
            return false;
        }
        var moveToBlk = $("#" + moveTo);

        if (skillRate == "" || skillId == "" || skillName == "" || moveTo == "" || moveToBlk.length <= 0) {
            return false;
        }
        moveToBlk.find('.notfound').addClass('d-none');

        var html = '<div class="list" data-skill_id="' + skillId + '" data-is_exist="N" data-skill_type="' + skillType + '" data-addthis="add">\
                        <span class="handle"></span>\
                        ' + skillName + '\
                    </div>';
        moveToBlk.append(html);

        if (input == "checkbox") {
            parent.remove();
        } else {
            parent.addClass('d-none');
        }
        var allRow = form.find('.parent-row');
        var allRowhidden = form.find('.parent-row.d-none');
        if (allRow.length <= 0 || allRow.length == allRowhidden.length) {
            $(".skills-heading").addClass('d-none');
        }
    });
});

function load_profile(redirect, modal) {
    $("#load_content").html('');
    $("#applyLoader").removeClass('hide');
    $("#applyLoader").removeClass('d-none');
    $("#load_content").load(redirect, function() {
        $("#applyLoader").addClass('hide');
        $("#applyLoader").addClass('d-none');
    });
}

function load_step1(redirect, modal, flag, hasform) {
    if (typeof hasform != 'undefined' && hasform == 'Y') {
        var form = $("#profile_back_step");
        var jid = form.find('.jid').val();
        var token = form.find('.token').val();
        var data = {
            jid: jid,
            token: token
        };
        load_content(redirect, flag, '', data);
    } else {
        $("#load_content").html('');
        load_content(redirect, flag, 'step1');
    }
}

function load_step2(redirect, form) {
    $("#load_content").html('');
    load_content(redirect, false, 'step2');
}

function load_step3(redirect, form) {
    $("#load_content").html('');
    load_content(redirect, false, 'step3');
}

function load_step4(redirect, form) {
    $("#load_content").html('');
    load_content(redirect, false, 'step4');
}

function load_step5(redirect, form, response) {
    $("#load_content").html('');
    load_content(redirect, false, 'step5', undefined, response);
}



function load_content(redirect, flag, step, rData, response) {
    var data = {};

    /*if (step == 'loadCompleteProfile') {
        $("#load_content").html('');
        $("#applyLoader").removeClass('hide');
        $("#applyLoader").removeClass('d-none');
        $("#load_content").load(redirect, rData, function() {
            $("#applyLoader").addClass('hide');
            $("#applyLoader").addClass('d-none');
            $("#applyjob").modal('show');
        });
        return;
    }*/
    var addclass = true;
    if (step == 'step2') {
        addclass = false;
        $("#applyjob").addClass('skill-open');
    } else {
        $("#applyjob").removeClass('skill-open');
    }

    if (step == 'step1') {
        data = {
            jid: stepParamsJid1,
            token: stepParamsToken1
        };
    } else if (typeof rData != 'undefined' && rData != undefined) {
        data = rData;
    } else {
        data = {
            jid: stepParamsJid,
            token: stepParamsToken
        };
    }

    var testRequired = 'N';
    if (step == 'step5') {
        if (response.code == 1) {
            var testRequired = 'Y';
        }
        data.testRequired = testRequired;
    }


    $("#applyLoader").removeClass('hide');
    $("#applyLoader").removeClass('d-none');

    if (flag) {
        $("#applyjob").modal('show');
    }

    $.ajax({
            url: redirect,
            type: 'POST',
            data: data
        })
        .always(function(res) {
            if (typeof res == 'object') {
                if (res.applyAction == 1 || res.applyAction == 2) {
                    $("#applyjob").modal("toggle");
                    window.location = res.jobUrl;
                    return false;
                }
            }

            if (res == '0') {
                $("#applyjob").modal('hide');
                location.reload();
            } else if (res == '40') {
                $("#applyjob").modal('hide');
                window.location = site_url + 'login';
            } else {
                $("#load_content").html(res);
                var backLinkStep = $("#load_content").find('.go_back').data('redirect');
                if (backLinkStep == "step2_back" && addclass) {
                    $("#applyjob").addClass('skill-open');
                }
                $("body").addClass("modal-open");
            }

            $("#applyLoader").addClass('hide');
            $("#applyLoader").addClass('d-none');

            if (step == 'step4') {
                appJobValid();
            }

            if (step == 'step5') {
                $("#goto_Step1, #goto_Step1_1, #goto_Step1_2").html('Applied');
                $("#goto_Step1, #goto_Step1_1, #goto_Step1_2").attr('disabled', true);
                $("#goto_Step1, #goto_Step1_1, #goto_Step1_2").attr('href', 'javascript:;');
                $("#goto_Step1, #goto_Step1_1, #goto_Step1_2").attr('id', '');
            }
            jobApplyStep1Validation();
            ApplyJobQuestionsForm();
        });
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