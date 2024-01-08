function getApplyLayers(job_id, user_meta, is_register, loadMeta, loadLayer) {

    loadHeader(current_page);

    if (typeof is_register == 'undefined') {
        is_register = 'N';
    }

    if (typeof loadMeta == 'undefined') {
        loadMeta = 'Y';
    }

    if (typeof loadLayer == 'undefined') {
        loadLayer = true;
    }

    if (is_register == 'Y') {
        if (current_page != 'job-detail') {
            userM = user_meta.userMeta;
            rz_uid = user_meta.user_id;
            if (currJob.jid !== undefined) {
                window.gReact.jobDetailGet(currJob.jid);
            }
        }
        $('#register-signin-modal').modal('hide');
        $("#load_content").html('');
        var complete_profile = site_url + 'dashboard/completeprofile';
        if (typeof currJob !== "undefined") {
            if (currJob.jid !== undefined) {
                job_id = currJob.jid;
            }
        }
        var data = {
            is_layer: 'Y',
            jid: job_id
        };
        load_content(complete_profile, 'Y', 'loadCompleteProfile', data);
        return;
    }

    var loc = site_url + 'job/applyJobStep1';
    $('#register-signin-modal').modal('hide');

    if (is_external == 'Y') {
        //location.reload();
        //return;
    }

    if (current_page == 'job-detail') {
        $('.job-apply-btn').attr('href', loc);
        $('.job-apply-btn').attr('id', 'goto_Step1');
        load_step1(loc, "#applyjob", loadLayer);
        return false;
    } else {
        if (is_register != 'Y') {
            if (loadMeta == 'Y') {
                userM = user_meta.userMeta;
                rz_uid = user_meta.user_id;
            }
            if (currJob.jid !== undefined) {
                window.gReact.jobDetailGet(currJob.jid);
                if (loginActType == 0) {
                    jobApplyRender(currJob.jid);
                }

                return false;
            }
        }
    }
}

function loadHeader(current_page) {
    $.ajax({
        url: ajax_url + 'user/loadHeader',
        type: 'POST',
        dataType: 'html',
        data: {
            current_page: current_page
        },
        success: function(response) {
            $('#header-override').html(response);
        }
    });

}