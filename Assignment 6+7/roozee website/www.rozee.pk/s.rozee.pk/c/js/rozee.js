/* Download App */

var dApp = $("#download-dropdown");
$("#header-apps-link").parents("li").hover(function() {
    // alert();
    dApp.show();
}, function() {
    dApp.hide();
});
/* SEARCH SUGGETSER*/
var total, act;

function fblur(e) {

    setTimeout(function() {
        if ($("#sugDrp_autoComplete div.Sbtn.active").length == 0) {
            $("#sugDrp_autoComplete").hide();
        }
    }, 300);

}
$("body").click(function(event) {
    var target = event.target;
    /*if ($("#sugDrp_autoComplete").is(":visible")) {
     $("#sugDrp_autoComplete").hide();
     }*/
    if ($(".socSug").is(":visible")) {
        $(".socSug").hide();
    }
});

function fSugg(e) {

    if (e.keyCode == 40) {
        act = 0;
        total = $('.Sbtn').length;
        if ($("#sugDrp_autoComplete").is(":visible")) {
            $("input").blur();
            $("#sugDrp_autoComplete div.Sbtn").removeClass("active");
            $("#sugDrp_autoComplete div.Sbtn:first").focus().addClass("active");

        }
        return false;
    } else if (e.keyCode == 38) {
        total = $('.Sbtn').length;
        act = total;
        if ($("#sugDrp_autoComplete").is(":visible")) {
            $("input").blur();
            $("#sugDrp_autoComplete div.Sbtn").removeClass("active");
            $("#sugDrp_autoComplete div.Sbtn:last").focus().addClass("active");
        }
    }
}

$("#sugDrp_autoComplete li").keydown(function(e) {
    total = $('.Sbtn').length;
    if (e.keyCode == 40) {
        $("#sugDrp_autoComplete div.Sbtn").removeClass("active");
        if (act == total) {
            act = 0;
            //console.log(total+'---'+act);
            $("#sugDrp_autoComplete div.Sbtn").eq(act).focus().addClass("active");
        } else {
            $("#sugDrp_autoComplete div.Sbtn").eq(act + 1).focus().addClass("active");
            act = act + 1;
        }
        return false;
    } else if (e.keyCode == 38) {
        $("#sugDrp_autoComplete div.Sbtn").removeClass("active");
        if (act == 0) {
            act = total;
            //console.log(total+'---'+act);
            $("#sugDrp_autoComplete div.Sbtn").eq(act - 1).focus().addClass("active");
        } else {
            $("#sugDrp_autoComplete div.Sbtn").eq(act - 1).focus().addClass("active");
            act = act - 1;
        }
        return false;
    } else if (e.keyCode == 13) {

        $("#sugDrp_autoComplete .Sbtn.active").trigger("click");
    } else if (e.keyCode == 9) {
        $("#sugDrp_autoComplete").hide();

    }

});
$(document).ready(function() {
    if ($("#flexiselVid01").length) {
        $("#flexiselVid01").flexisel({
            visibleItems: 6,
            animationSpeed: 400,
            autoPlay: true,
            autoPlaySpeed: 2000,
            pauseOnHover: true,
            enableResponsiveBreakpoints: true,
            responsiveBreakpoints: {
                laptop: {
                    changePoint: 1366,
                    visibleItems: 6
                },
                small: {
                    changePoint: 1280,
                    visibleItems: 5
                },
                desktop: {
                    changePoint: 1024,
                    visibleItems: 4
                },
                portrait: {
                    changePoint: 480,
                    visibleItems: 2
                },
                landscape: {
                    changePoint: 640,
                    visibleItems: 2
                },
                tablet: {
                    changePoint: 768,
                    visibleItems: 3
                },
                mobile: {
                    changePoint: 375,
                    visibleItems: 1
                }
            }
        });
    }
    var bannerCount = $('#matchingJobs li').length;
    $('a[href="#"]').click(function(event) {
        event.preventDefault();
    });

    $(".pProfile .cwrapper .user-info .media .avatar").hover(function() {
        $(".pProfile .cwrapper .changec").addClass("hide");
    }, function() {
        $(".pProfile .cwrapper .changec").removeClass("hide");

    });


    //top job border	

    /*-------------------------------------------------*/
    /* =  SearchBar 
     /*-------------------------------------------------*/
    var Direction = $('html').attr("dir");
    var searchOpen = false;
    var searchTrigger = $(".open-search");
    var body = $('body');
    var searchBar = '.searchbar';
    var searchForm = $('#SearchForm');
    var searchField = $('.formcl');
    var dirc = (Direction == "rtl" ? "marginRight" : "marginLeft");
    body.click(function(event) {
        var target = event.target;
        if ($(target).parents(searchBar).length < 1 && searchOpen == true) {
            searchOpen = false;
            Slide("500px", $(searchField).find("input"), true);
            searchTrigger.removeClass("active");
        }
    });
    searchTrigger.click(function(event) {
        //alert(dirc);
        if (searchOpen) {
            searchForm.submit();
        } else {
            searchField.show();
            searchOpen = true;
            //$(searchField).find("input").focus();

            Slide("0px", $(searchField).find("input"), false);
            $(this).addClass("active");
            $('#homeSearch').focus();

        }
        event.preventDefault();
    });

    function Slide(width, selc, close) {
        if (Direction == "rtl") {
            selc.animate({
                marginRight: width
            }, 500, function() {
                if (close) {
                    searchField.hide();
                } else {
                    selc.focus();
                }
            });
        } else {

            selc.animate({
                marginLeft: width
            }, 500, function() {
                if (close) {
                    searchField.hide();
                } else {
                    selc.focus();
                }
            });
        }

    }

    /*-------------------------------------------------*/
    /* = Typeahead
     /*-------------------------------------------------*/

    var $tinput = $(".typeahead");
    $tinput.each(function() {
        $this = $(this);
        var $data = $.parseJSON($this.attr("data-value"));
        $this.typeahead({
            source: $data,
            autoSelect: true
        });
    });
    /*-------------------------------------------------*/
    /* =  Company Logo Slider
     /*-------------------------------------------------*/
    try {
        $("#flexiselDemo3").flexisel({
            visibleItems: 9,
            animationSpeed: 400,
            autoPlay: false,
            autoPlaySpeed: 2000,
            pauseOnHover: true,
            enableResponsiveBreakpoints: true,
            responsiveBreakpoints: {
                laptop: {
                    changePoint: 1366,
                    visibleItems: 8
                },
                small: {
                    changePoint: 1280,
                    visibleItems: 7
                },
                desktop: {
                    changePoint: 1024,
                    visibleItems: 4
                },
                portrait: {
                    changePoint: 480,
                    visibleItems: 2
                },
                landscape: {
                    changePoint: 640,
                    visibleItems: 3
                },
                tablet: {
                    changePoint: 768,
                    visibleItems: 4
                },
                mobile: {
                    changePoint: 375,
                    visibleItems: 1
                }
            }
        });
        $("#flexiselDemo03").flexisel({
            visibleItems: 5,
            animationSpeed: 400,
            autoPlay: true,
            autoPlaySpeed: 2000,
            pauseOnHover: true,
            enableResponsiveBreakpoints: true,
            responsiveBreakpoints: {
                laptop: {
                    changePoint: 1366,
                    visibleItems: 5
                },
                small: {
                    changePoint: 1280,
                    visibleItems: 5
                },
                desktop: {
                    changePoint: 1024,
                    visibleItems: 4
                },
                portrait: {
                    changePoint: 480,
                    visibleItems: 2
                },
                landscape: {
                    changePoint: 640,
                    visibleItems: 2
                },
                tablet: {
                    changePoint: 768,
                    visibleItems: 3
                },
                mobile: {
                    changePoint: 375,
                    visibleItems: 1
                }
            }
        });


        $(window).on('load', function() {
            $("#flexiselDemo4").flexisel({
                visibleItems: 4,
                animationSpeed: 500,
                autoPlay: true,
                autoPlaySpeed: 3000,
                pauseOnHover: true,
                enableResponsiveBreakpoints: true,
                responsiveBreakpoints: {
                    laptop: {
                        changePoint: 1366,
                        visibleItems: 4
                    },
                    small: {
                        changePoint: 1280,
                        visibleItems: 4
                    },
                    desktop: {
                        changePoint: 1024,
                        visibleItems: 3
                    },
                    portrait: {
                        changePoint: 481,
                        visibleItems: 1
                    },
                    landscape: {
                        changePoint: 640,
                        visibleItems: 2
                    },
                    tablet: {
                        changePoint: 768,
                        visibleItems: 2
                    },
                    mobile: {
                        changePoint: 375,
                        visibleItems: 1
                    }
                }
            });




            $('#flexiselDemo4 li').bind("DOMSubtreeModified", function() {
                $('[data-toggle="tooltip"]').tooltip({
                    html: true
                });
            });



        });

    } catch (e) {

    }

    /*-------------------------------------------------*/
    /* =  Home Page Form AutoComlete (Job Title, Location)
     /*-------------------------------------------------*/

    var jobTitle = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme"
    ];
    //    $("#job_title").autocomplete({
    //        source: jobTitle
    //    });
    //channels mobile tabls active class removal
    $(".dropdown-menu a ").click(function() {
        $(".dropdown-menu li.active").removeClass("active");
    });


    $(".selectpicker").each(function() {
        $(this).attr('style', 'display:none!important;');
        $(this).selectpicker({
            dropupAuto: false
        });
    });

    $(".textinput input").change(function() {
        if ($(this).val() != "") {
            $(this).addClass('filled');
        } else {
            $(this).removeClass('filled');
        }
    });

    /*-------------------------------------------------*/
    // Hiring Dashboard  Start
    /*-------------------------------------------------*/
    /*$(".dbnwappimgs img").click(function () {
     $(this).parent().find(".imgactive").removeClass("imgactive");
     $(this).addClass("imgactive");
     $(".dbnwapp_dtl").removeClass("hide");
     $(".dbnwaplinks").removeClass("hide");
     });
     
     $('[data-toggle="tooltip"]').tooltip();
     
     $(".cntshow_more").click(function () {
     $cntbxhght = $(this).parent().parent().find(".cntrow").length * 70;
     $(this).parent().parent().find(".cntrow").animate({"max-height": "1000px"}, 300, function () {
     $(this).parent().find(".cntshow_more").addClass("hide");
     $(this).parent().find(".cntshow_less").removeClass("hide");
     });
     });
     $(".cntshow_less").click(function () {
     $(this).parent().parent().find(".cntrow").animate({"max-height": "70"}, 300, function () {
     $(this).parent().find(".cntshow_less").addClass("hide");
     $(this).parent().find(".cntshow_more").removeClass("hide");
     });
     });
     
     $("#sndmsgbtn").submit(function () {
     $('#sendMessage').modal('hide');
     $(".dbsndmsgalrt").fadeIn(400).fadeOut(5000);
     return false;
     });
     
     $("#dbshrtlstlnk").click(function () {
     $("#dbshrtlstlnk").fadeOut(400);
     $("#dbshrtlstldr").fadeIn(400);
     $(".dbshrtlstmsg").fadeIn(400);
     $(".dbshrtlstmsg").fadeOut(5000);
     $("#dbshrtlstlnk").fadeIn(10000);
     });*/


    /*-------------------------------------------------*/
    // Hiring Dashboard  End
    /*-------------------------------------------------*/
});




$(document).on('keyup', '#EmailFrndForm #from', function() {
    if (isEmail($(this).val())) {
        $(this).css('border-color', 'green');
    } else {
        $(this).css('border-color', 'red');
    }
});

$(document).on('keyup', '#EmailFrndForm #to', function() {
    var tos = $(this).val().split(/,\s*|;\s*/);
    if (tos.length > 0 && tos.length < 4) {
        for (i = 0; i < tos.length; i++) {
            if (isEmail(tos[i])) {
                $(this).css('border-color', 'green');
            } else {
                $(this).css('border-color', 'red');
            }
        }
    } else {
        $(this).css('border-color', 'red');
    }
});
$(document).on('keyup', '#EmailFrndForm #name, #EmailFrndForm #subject, #EmailFrndForm #message', function() {
    if ($(this).val().length > 1) {
        $(this).css('border-color', 'green');
        $('#EmailFrndForm').find('#validationFailed').hide();
    } else {
        $(this).css('border-color', 'red');
    }
});
$('#EmailFrndForm').on('submit', function(event) {
    event.preventDefault();
    $('#EmailFrndForm').find('#validationFailed').slideUp();
    var valid = true;
    var name = $(this).find('#name');
    var from = $(this).find('#from');
    var to = $(this).find('#to');
    var subject = $(this).find('#subject');
    var message = $(this).find('#message');
    var recaptcha = $(this).find('#g-recaptcha-response');
    var sendText = $(this).find('#submit.btn').text();

    if (name.val().length > 1) {
        name.css('border-color', 'green');
    } else {
        name.css('border-color', 'red');
        valid = false;
    }
    if (isEmail(from.val())) {
        from.css('border-color', 'green');
    } else {
        from.css('border-color', 'red');
        valid = false;
    }
    var tos = to.val().split(/,\s*|;\s*/);
    if (tos.length > 0 && tos.length < 4) {
        for (i = 0; i < tos.length; i++) {
            if (isEmail(tos[i])) {
                to.css('border-color', 'green');
            } else {
                to.css('border-color', 'red');
                valid = false;
            }
        }
    } else {
        to.css('border-color', 'red');
        valid = false;
    }

    if (subject.val().length > 1) {
        subject.css('border-color', 'green');
    } else {
        subject.css('border-color', 'red');
        valid = false;
    }
    if (message.val().length > 1) {
        message.css('border-color', 'green');
    } else {
        message.css('border-color', 'red');
        valid = false;
    }

    if (recaptcha.length > 0) {
        if (recaptcha.val().length > 1) {
            recaptcha.prev().css('border', '');
        } else {
            recaptcha.prev().css('border', '1px solid red');
            valid = false;
        }
    }
    if (valid) {
        var data = $(this).serialize();
        $(this).find('input, textarea, button').attr('disabled', true);
        $(this).find('#submit.btn').text('Sending...');
        $('#EmailFrndForm').find('.alert').slideUp();
        $.post(ajax_url + 'job/emailtofriend', data, 'json').done(function(response) {
            if (response.success) {
                $('#EmailFrndForm').find('#submit.btn').text(sent);
                $('#EmailFrndForm').find('#emailFrndSuccess').slideDown();
                setTimeout(function() {
                    $('#EmailFrndForm').find('input, textarea, button').attr('disabled', false);
                    $('#EmailFrndForm')[0].reset();
                    if (typeof grecaptcha == 'object') {
                        grecaptcha.reset();
                    }
                    $('#EmailFrnd').modal('hide');
                    $('#emailFrndSuccess').slideUp();
                }, 5000);
            } else {
                $('#EmailFrndForm').find('#emailFrndFailed').slideDown();
                $('#EmailFrndForm').find('#submit.btn').text(sendText);
                $('#EmailFrndForm').find('input, textarea, button').attr('disabled', false);
            }
        }).fail(function() {
            $('#EmailFrndForm').find('#emailFrndFailed').slideDown();
            $('#EmailFrndForm').find('#submit.btn').text(sendText);
            $('#EmailFrndForm').find('input, textarea, button').attr('disabled', false);
        });
    } else {
        $('#EmailFrndForm').find('#validationFailed').slideDown();
    }
    return false;
});

function split(val) {
    return val.split(/,\s*/);
}

function extractLast(term) {
    return split(term).pop();
}
/*-------------------------------------------------*/
/* =  TVC
 /*-------------------------------------------------*/
function showTVC(a, s) {

    if (a == 's') {
        jQuery('#tvcoverlay').show();
        jQuery('#tvcvideoCnt').html(VideoCodeUnique);
    } else {
        if (s == '1') {
            jQuery('#tvcvideoCnt1').html('');
            jQuery('#tvcoverlay1').hide();

        } else {
            jQuery('#tvcvideoCnt').html('');
            jQuery('#tvcoverlay').hide();
        }
    }
}

function showVideo(a, b, c, d, controls) {
    //console.log(a);
    //console.log(b);
    //console.log(c);
    var controls = controls * 1 || 0;
    if (c !== undefined)
        var video2show = '<iframe width="580" height="380" frameborder="0" src="' + c + '?autoplay=1&amp;loop=0&amp;rel=0&amp;title=0&amp;byline=0&amp;portrait=0&amp;like-button=0&amp;likeO=0&controls=' + controls + '&showinfo=0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    else
        return false;

    //console.log(video2show);

    jQuery('#tvcoverlay').show();
    jQuery('#tvcvideoCnt').html(video2show);

    var params = {};

    params.site = a;
    params.type = b;
    params.url = c;
    params.where = d;

    var url = ajax_url + 'site/setVideoStats';
    xhrRequest(url, 'post', params, function(resp) {
        if (resp.status == true) {
            //console.log("record saved");
        } else {
            //console.log("something going wrong");
        }
    });


}
/*-------------------------------------------------*/
/* =  OverLay
 /*-------------------------------------------------*/

$('.modalc').click(function() {
    var target = $(this).attr("data-target");
    openOverlay(target);
});
//$(document).keyup(function (e) {
//    if (e.keyCode == 27) { // escape key maps to keycode `27`
//        closeOverlay('.moverlay');
//    }
//});
function closeOverlay(target) {
    $(target).html("").fadeOut();
    $('body').removeClass("blur");
    $(window).scrollTop("0px");
}

function openOverlay(target, req) {
    if (req == undefined) {
        req = true;
    }
    //  alert(target);
    closeOverlay('.moverlay');
    $("#OverlayFl").fadeIn();
    $('body').addClass("blur");
    //$("#OverlayFl").html("<div class='spinner-wrapper-gray overLoading center-block'><div class='spinner'></div></div>");

    if (req) {
        $.get(target, function(data) {

            var tg = "'.moverlay'";
            $("#OverlayFl").html('  <div class="mclose" onclick="closeOverlay(' + tg + ');"><a class="cbtn" href="#" > </a></div>' + data);
            //alert( "Load was performed." );
        });
    } else {
        var tg = "'.moverlay'";
        $("#OverlayFl").html('  <div class="mclose" onclick="closeOverlay(' + tg + ');"><a class="cbtn" href="#" > </a></div>' + target);
        //alert( "Load was performed." );
    }
    return false;
}


/////Email validation


function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);

}

/*$("#jobSkills").autocomplete({
 
 //    appendTo: $('#jobSkills').parent(),
 source: function (request, response) {
 $.getJSON(ajax_url + 'site/jskills', {
 skillName: extractLast(request.term)
 }, response);
 }
 //   ,
 //    select: function (event, ui) {
 //        var terms = split(this.value);
 //        var ids = split($('#degreeMajorID').val());
 //        // remove the current input
 //        terms.pop();
 //        ids.pop();
 //        // add the selected item
 //        terms.push(ui.item.value);
 //        ids.push(ui.item.id);
 //        // add placeholder to get the comma-and-space at the end
 //        terms.push('');
 //        ids.push('');
 //        this.value = terms.join(', ');
 //        $('#degreeMajorID').val(ids.join(', '));
 //        return false;
 //}
 });*/


/*-------------------------------------------------*/
/* =  FitText
 /*-------------------------------------------------*/





$(function() {
    // Trigger Tooltip
    $('[data-toggle="tooltip"]').tooltip({
        html: true
    });

    //Trigger Popovero
    $('[data-toggle="popover"]').popover({
        html: true,
        placement: "auto"
    });

});


/*-------------------------------------------------*/
/* =  Hiring Signup Form
 /*-------------------------------------------------*/




var popUpWin = pwmkm = 0;

function puWin(URLStr, left, top, width, height) {
    if (URLStr == '') {
        console.warn('Given URL is empty');
        return;
    }
    if (popUpWin) {
        if (!popUpWin.closed)
            popUpWin.close();
    }
    popUpWin = open(URLStr, 'popUpWin', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars,resizable=yes,copyhistory=yes,width=' + width + ',height=' + height + ',left=' + left + ', top=' + top + ',screenX=' + left + ',screenY=' + top);
    return popUpWin;
}

function puWinCenter(URLStr, left, top, width, height) {
    if (popUpWin) {
        if (!popUpWin.closed)
            popUpWin.close();
    }
    left = (screen.width / 2) - (755 / 2);
    popUpWin = open(URLStr, 'popUpWin', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars,resizable=yes,copyhistory=yes,width=' + width + ',height=' + height + ',left=' + left + ', top=' + top + ',screenX=' + left + ',screenY=' + top);

}


/*-------------------------------------------------*/
/* =  Job Analytics Start
 /*-------------------------------------------------*/
$(document).ready(function() {

    $(".jareadFull").click(function() {
        $(this).parent().find(".jareadFull").addClass("hide");
        $(this).parent().find(".jareadLess").removeClass("hide");
        $(this).parent().find(".jobdetail").animate({
            "max-height": "1000px"
        }, 300, function() {

        });
        event.preventDefault();
    });
    $(".jareadLess").click(function() {
        $(this).parent().find(".jareadLess").addClass("hide");
        $(this).parent().find(".jareadFull").removeClass("hide");
        $(this).parent().find(".jobdetail").animate({
            "max-height": "60px"
        }, 300, function() {

        });
        event.preventDefault();
    });

    $addcomp_counter = 0;
    $(".add_comp_1").click(function() {
        $(".salsrc_1, .vwsallink_1, .delcomp_1").removeClass("hide");
        $(".add_comp_1, .add_comp_2").addClass("hide");
    });

    $(".vwsallink_1").click(function() {
        $(".scndrw, .delcomp_1").removeClass("hide");
    });

    $(".delcomp_1").click(function() {
        $(".scndrw, .vwsallink_1, .salsrc_1, .add_comp_2").addClass("hide");
        $(".add_comp_1").removeClass("hide");
    });

    $('.helptooltip').tooltip();
    $('[data-toggle="tooltip"]').tooltip();



    $(".fakeFile").each(function() {
        var $this = $(this),
            $browse = $this.children(".browse"),
            $file = $this.prev("input");
        if ( /*@cc_on!@*/ false) {
            $file
                .parent().addClass("isIE")
                .end()
                .bind({
                    click: function(e) {
                        $(this).blur();
                    },
                    mousedown: function() {
                        $browse.addClass("active");
                    },
                    mouseup: function() {
                        $browse.removeClass("active");
                    },
                    mouseover: function() {
                        $browse.addClass("hover");
                    },
                    mouseout: function() {
                        $browse.removeClass("hover active");
                    },
                    change: function() {
                        $(this).next().children(".text").text($(this).val());
                    }
                });
        } else {
            $this.bind({
                click: function(e) {
                    $file.trigger("click");
                },
                mousedown: function() {
                    $browse.addClass("active");
                },
                mouseup: function() {
                    $browse.removeClass("active");
                },
                mouseover: function() {
                    $browse.addClass("hover");
                },
                mouseout: function() {
                    $browse.removeClass("hover active");
                }
            });
            $file.change(function() {
                $this.children(".text").text($(this).val());
            });
        }
    });

    $(".upldform").click(function() {
        $(".jacanfrm").fadeIn();
    });

    $("#crtcand").submit(function() {
        $('#crtcand').fadeOut("fast");
        $(".crtcanmsg").fadeIn(400).fadeOut(5000);
        return false;
    });

});

/*function htmlEntities(str) {
 return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
 }
 
 var oJQHTML = $.fn.html;
 $.fn.html = function(){
 arguments[0] = '<strong>'+arguments[0]+'</strong>';
 console.log(arguments);
 arguments[0] = htmlEntities(arguments[0]);
 console.log(arguments);
 oJQHTML.apply(this,arguments);
 }*/
function strip_tags(input, allowed) {
    allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    var response = input.replace(commentsAndPhpTags, '').replace(/&nbsp;/gi, " ").replace(/&middot;/gi, ".").replace(tags, function($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
    return response;
}
/*-------------------------------------------------*/
/* =  Job Analytics End
 /*-------------------------------------------------*/

/*-------------------------------------------------*/
/* =  Job Analytics Start
 /*-------------------------------------------------*/
$(document).ready(function() {

    $('.tempcarousel').carousel({
        pause: true,
        interval: false
    });

    //    $("#usetemp").click(function () {
    //        $(".usetempcont").fadeIn();
    //        $("#usetemp").fadeOut();
    //    });

    $("#tempcls").click(function() {
        $(".usetempcont").fadeOut();
        $("#usetemp").fadeIn();
    });

    $(".tempsel").click(function() {
        $seldtemptxt = $(this).parents(".usetempcont").find(".active").find("[name=jobTpl]").html();
        $oritxt = $(".jbdescfld").val();
        $(".jbdescfld").val($seldtemptxt);
        $(".usetempcont").fadeOut();
        $("#usetemp").fadeIn();
    });

    $("#pstdjb_title").focusout(function() {
        $(".mtcproffnnd").removeClass("hide");
    });

    $('.collapse').on('shown.bs.collapse', function() {
        $(this).parent().find(".tbplusicon").removeClass("tbplusicon").addClass("tbminusicon");
    }).on('hidden.bs.collapse', function() {
        $(this).parent().find(".tbminusicon").removeClass("tbminusicon").addClass("tbplusicon");
    });

    $(".rpboxpdg .tab-content .panel-body").each(function() {
        $(this).find(".cvpckgchkbx").first().prop("checked", true);
    });
    if ($('#recentSearches').length > 0) {
        updateRecentSearchesCount();
    } else {
        showRecentSearches();
    }
});



/*-------------------------------------------------*/
/* =  Job Analytics End
 /*-------------------------------------------------*/

function saveRecentSearch(keyword, count) {
    var completeurl = window.location.toString();
    var queryStringF;
    var queryString;
    var qryS;
    if (completeurl.includes('job/jsearch/'))
        queryString = completeurl.split(site_url + 'job/jsearch/');
    else
        queryString = completeurl.split(site_url + 'search/');

    qryS = queryString[1];
    if (qryS.includes('?')) {
        queryStringF = qryS.split('?')[0];
    } else {
        queryStringF = qryS;
    }

    var currentSearch = {
        'keyword': keyword,
        'queryString': queryStringF,
        'count': count
    };
    var searchParams = queryStringF.split('/');
    if (searchParams.length > 2) { // if any facets are set other than q
        for (var i = 0; i < searchParams.length; i++) {
            currentSearch[searchParams[i++]] = searchParams[i];
        }
    }

    var recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    if (Array.isArray(recentSearches)) {
        recentSearches = recentSearches.slice(0, 9); // limit to 10 items
    }
    var i = 0;
    for (var item of recentSearches) {
        if (item.keyword.toLowerCase() == keyword.toLowerCase()) { // remove if keyword already exists in the array
            recentSearches.splice(i, 1);
        }
        i++;
    }
    recentSearches.unshift(currentSearch); // push keyword at the beginning of the array
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
}

function showRecentSearches() {
    var recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    if (recentSearches.length > 0) {
        var list = $('#recentSearches').empty(); // list khali karo...
        for (var item of recentSearches) {
            var queryString = item.queryString || 'q/' + escape(item.keyword.toLowerCase());
            var link = site_url + 'job/jsearch/' + queryString;
            var li = $('<li/>').appendTo(list);
            var a = $('<a/>')
                .text(item.keyword)
                .attr('href', link)
                .appendTo(li);
            var count = $('<a/>')
                .text('- ' + item.count + ' ' + (item.count > 1 ? txtJobs : txtJob))
                .attr('href', link)
                .appendTo(li);
        }
        $('.rSrchBx').removeClass('inActive');
    }
}

function updateRecentSearchesCount() {
    var recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    if (Array.isArray(recentSearches)) {
        recentSearches = recentSearches.slice(0, 9); // limit to 10 items
    }

    $.post(ajax_url + 'job/getJobsCount', {
        'searches': recentSearches
    }, 'json').done(function(response) {
        if (response.success) {
            var searches = response.searches;
            var searchedRemaped = [];
            $.each(searches, function(index, value) {
                searchedRemaped.push(value);
            });

            localStorage.setItem(
                "recentSearches",
                JSON.stringify(searchedRemaped)
            );
            showRecentSearches();
        }
    });
}