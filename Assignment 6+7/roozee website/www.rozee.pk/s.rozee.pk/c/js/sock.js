var sockPlugin = function(id, multi, cat, limit) {
    this.id = id;
    this.multi = multi;
    if (this.id == undefined) {
        console.log('undefined id');
        return false;
    }

    //document.write(getOptions(id, socTit, socComp, socSki, nosCompanies, schools));
    var html = getOptions(id, socTit, socComp, socSki, nosCompanies, schools);
    $('#' + id).parent().append(html);
    var selector = '.socSug' + id + ' > ul.Sdrop > ';
    $('#' + this.id).parent('div').addClass('suggest');
    $("#sugDrp_autoComplete" + id + " li").keydown(function(e) {
        total = $("#sugDrp_autoComplete" + id + ' div.Sbtn').length;
        if (e.keyCode == 40) {
            $("#sugDrp_autoComplete" + id + " div.Sbtn").removeClass("active");
            if (act == total) {
                act = 0;
                //console.log(total+'---'+act);
                $("#sugDrp_autoComplete" + id + " div.Sbtn").eq(act).focus().addClass("active");
            } else {
                $("#sugDrp_autoComplete" + id + " div.Sbtn").eq(act + 1).focus().addClass("active");
                act = act + 1;
            }
            return false;
        } else if (e.keyCode == 38) {
            $("#sugDrp_autoComplete" + id + " div.Sbtn").removeClass("active");
            if (act == 0) {
                act = total;
                //console.log(total+'---'+act);
                $("#sugDrp_autoComplete" + id + " div.Sbtn").eq(act - 1).focus().addClass("active");
            } else {
                $("#sugDrp_autoComplete" + id + " div.Sbtn").eq(act - 1).focus().addClass("active");
                act = act - 1;
            }
            return false;
        } else if (e.keyCode == 13) {
            $("#sugDrp_autoComplete" + id + " div.Sbtn.active").trigger("click");
        } else if (e.keyCode == 9) {
            $("#sugDrp_autoComplete" + id).hide();

        }

    });
    $('#' + this.id).keydown(function(e) {
        if (e.keyCode == 40) {
            act = 0;
            total = $("#sugDrp_autoComplete" + id + " div.Sbtn").length;
            if ($("#sugDrp_autoComplete" + id).is(":visible")) {
                $("input").blur();
                $("#sugDrp_autoComplete" + id + " div.Sbtn").removeClass("active");
                $("#sugDrp_autoComplete" + id + " div.Sbtn:first").focus().addClass("active");

            }
            return false;
        } else if (e.keyCode == 38) {
            total = $('.Sbtn').size();
            act = total;
            if ($("#sugDrp_autoComplete" + id).is(":visible")) {
                $("input").blur();
                $("#sugDrp_autoComplete" + id + " div.Sbtn").removeClass("active");
                $("#sugDrp_autoComplete" + id + " div.Sbtn:last").focus().addClass("active");
            }
        }
    });
    $('#' + this.id).blur(function() {
        setTimeout(function() {
            if ($("#sugDrp_autoComplete" + id + " div.Sbtn.active").length == 0) {
                $("#sugDrp_autoComplete" + id).hide();
            }
        }, 300);
    });
    $('#' + this.id).keyup(function() {
        sockSendMsg($('#' + this.id).val(), this.multi, cat, id, limit);
    });
    if (this.multi == 0) {
        $("#sugDrp_autoComplete" + id + ' .sugTouple').on('click', '.Sbtn', function() {
            $('#' + id).val($(this).text().replace(/,/g, ''));
            setTimeout(function() {
                $('#' + id).focus();
            }, 300);
            $('.socSug').hide();
        });
    } else {
        $("#sugDrp_autoComplete" + id + ' .sugTouple').on('click', '.Sbtn', function() {
            sockRmTypeKw(id, $(this).text());
            $('#' + id).focus();
            $('.socSug').hide();
        });
    }
}

/*$('#search,#searchKeywords').keyup(function () {
 sockSendMsg($('#'+this.id).val(),0);
 });*/
var sockSendMsg = function(kw, multi, cat, id, limit) {
    if (kw == "") {
        $('.socSug').hide();
        $('#cvjbtitle [data-toggle="tooltip"]').tooltip(); // for cv search

        $('.skill').html('');
        return;
    }


    var msg = {

        message: (multi == 0 ? kw : sockGetKeyword(kw, limit)),
        webid: webId,
        type: 'job',
        cat: cat,
        id: id
    };
    if (websocket.readyState == 1) {
        websocket.send(JSON.stringify(msg));
    } else {
        ajxM(msg);
        setTimeout(function() {
            server();
        }, 1000);
    }
}
var build = function(data) {
    if (data != undefined && data != '') {
        var searches = ['title', 'company', 'skill', 'nosCompanies', 'school'];
        var msg = JSON.parse(data);
        var umsg = msg.message;
        var callingId = msg.id;
        var kwLen = 0;
        var selector = '#sugDrp_autoComplete' + callingId + ' > ul.Sdrop > ';
        if (msg.name != undefined && msg.name != '')
            var kwLen = msg.name.length;
        $('.socSug').hide();
        $.each(searches, function(key, val) {
            data = umsg[val];
            $(selector + 'li.jb_' + val).html('');

            if (data != undefined && data != '') {
                $(selector + 'li.cat_' + val).show();
                $.each(data, function(index, value) {
                    var searchedKw = value.substr(value.toLowerCase().indexOf(msg.name.toLowerCase()), kwLen);
                    var newVal = value.replace(searchedKw, '<strong>' + searchedKw + '</strong>');
                    var h = '<li class="sugTouple" title="' + value + '" onclick="suggestedValues(\'' + val + '\', \'' + value + '\');"><div tabindex="-1" class="Sbtn" style="width:100%">' + newVal + '</div></li>';
                    $('#sugDrp_autoComplete' + callingId + ' li.jb_' + val).append(h);
                });
                $('#sugDrp_autoComplete' + callingId).show();
                $('#cvjbtitle [data-toggle="tooltip"]').tooltip("destroy"); //for cv search
            } else {
                $(selector + 'li.cat_' + val).hide();
            }
        });
    }
};

var server = function() {
    //var wsUri = "wss://autoc.rozee.pk:443/Server.php";
    var wsUri;
    if (site_at == 'sailfish')
        wsUri = "ws://" + AUTOC_DOMAIN + ":" + AUTOC_PORT + "/Server.php";
    else
        wsUri = "wss://" + AUTOC_DOMAIN + ":" + AUTOC_PORT + "/Server.php";

    websocket = new WebSocket(wsUri);
    websocket.onopen = function(ev) {}
    websocket.onmessage = function(ev) {
        if (ev.data != undefined && ev.data != '')
            build(ev.data);
        websocket.onerror = function(ev) { //ev.data
        };
        websocket.onclose = function(ev) {
            server();
        };
    }
};
var ajxM = function(msg) {
    $.post(seeker_url + 'services/job/autoComp', msg, 'json').done(function(response) {
        build(response);
    }).fail(function() {
        //$('.m_'+id).toggle();
    });
};
/*$('.sugTouple').on('click','.Sbtn',function(){
 $('#searchKeywords').val($(this).text());
 $('#sugDrp_autoComplete').hide();
 
 $('#cvjbtitle [data-toggle="tooltip"]').tooltip(); //for cv search
 
 });*/
var sockGetSepar = function() {
    return ", ";
}
var sockRmTypeKw = function(id, selVal) {
    var kw = $("#" + id).val();
    var searches = kw.split(sockGetSepar());
    if (searches.length == 1) {
        $("#" + id).val(selVal + sockGetSepar());
    } else {
        searches[searches.length - 1] = selVal;
        $("#" + id).val(searches.join(sockGetSepar()) + sockGetSepar());
    }
}
var sockGetKeyword = function(kw) {
    var searches = kw.split(sockGetSepar());
    var kw2Send = kw;
    if (searches.length == 1)
        kw2Send = searches[0];
    else
        kw2Send = searches[searches.length - 1];
    return kw2Send;
}

var getOptions = function(id, tit, comp, ski, nosCompanies, schools) {
    return '<div class="sugCont  slideDown socSug" id="sugDrp_autoComplete' + id + '" ><ul class="Sdrop">' +
        '<li class="category cat_title">' + tit + '</li>' +
        '<li class="sugTouple jb_title"></li>' +
        '<li class="category cat_company">' + comp + '</li>' +
        '<li class="sugTouple jb_company"></li>' +
        '<li class="category cat_skill">' + ski + '</li>' +
        '<li class="sugTouple jb_skill"></li>' +
        '<li class="category cat_nosCompanies">' + nosCompanies + '</li>' +
        '<li class="sugTouple jb_nosCompanies"></li>' +
        '<li class="category cat_school">' + schools + '</li>' +
        '<li class="sugTouple jb_school"></li>' +
        '</ul>' +
        '</div>';
}

var suggestedValues = function(sugType, sugValue) {
    $('#suggested_type').val(sugType);
    $('#suggested_value').val(sugValue.replace(/,/g, ''));
}