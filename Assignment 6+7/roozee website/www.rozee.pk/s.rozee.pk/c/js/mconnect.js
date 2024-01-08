function mconnectDiscover() {
    if (site_at != 'sailfish') {
        __gaTracker('send', 'pageview', '/mconnect/discover');
    }
    var ancho = 400;
    var alto = 585;
    var posicion_x;
    var posicion_y;
    posicion_x = (window.innerWidth / 2) - (ancho / 2);
    posicion_y = (window.innerHeight / 2) - (alto / 2);
    if (typeof sigin_flag !== 'undefined') {
        if (sigin_flag != '') {
            window.open(seeker_url + 'mconnect/discover/?sigin_flag=1', 'theFrame', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=400, height=585, left=' + posicion_x + ', top=' + posicion_y);
        } else {
            window.open(seeker_url + 'mconnect/discover', 'theFrame', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=400, height=585, left=' + posicion_x + ', top=' + posicion_y);
        }
    } else {
        window.open(seeker_url + 'mconnect/discover', 'theFrame', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=400, height=585, left=' + posicion_x + ', top=' + posicion_y);
    }
}

function mConnectModalLoginSuccess(user_meta) {
    var job_id = $('#modal_job_id').val();
    if (typeof sigin_flag !== 'undefined') {
        if (sigin_flag != '') {
            getApplyLayers(job_id, user_meta);
            return false;
        }
    }
}