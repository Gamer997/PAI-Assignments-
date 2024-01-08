function linkedInLogin() {
    var ancho = 400;
    var alto = 585;
    var posicion_x;
    var posicion_y;
    posicion_x = (window.innerWidth / 2) - (ancho / 2);
    posicion_y = (window.innerHeight / 2) - (alto / 2);
    window.open(seeker_url + 'register/linkedinlogin?sigin_flag=1', 'theFrame', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=400, height=585, left=' + posicion_x + ', top=' + posicion_y);
}

function linkedInLoginSuccess(user_meta, is_register) {
    var job_id = $('#modal_job_id').val();
    if (sigin_flag != '') {
        getApplyLayers(job_id, user_meta, is_register, 'Y', true);
        return false;
    }
}

function linkedInSignUp(email, first_name, last_name) {
    var job_id = $('#modal_job_id').val();
    if (sigin_flag != '') {
        sigup_flag = '1';
        $('#full_name').val(first_name + ' ' + last_name);
        $('#email').val(email);
        $('#email_second').val(email);
        $('#register_div').show();
        $('#signin_div').hide();
    }
}