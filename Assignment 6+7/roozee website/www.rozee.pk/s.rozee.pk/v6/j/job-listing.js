function lockScroll() {
    $html = $('html');
    $body = $('body');
    var initWidth = $body.outerWidth();
    var initHeight = $body.outerHeight();

    var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    ];
    $html.data('scroll-position', scrollPosition);
    $html.data('previous-overflow', $html.css('overflow'));
    $html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    var marginR = $body.outerWidth() - initWidth;
    var marginB = $body.outerHeight() - initHeight;
    $body.css({
        'margin-right': marginR,
        'margin-bottom': marginB
    });
}

function unlockScroll() {
    $html = $('html');
    $body = $('body');
    $html.css('overflow', $html.data('previous-overflow'));
    var scrollPosition = $html.data('scroll-position');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    $body.css({
        'margin-right': 0,
        'margin-bottom': 0
    });
}

function JobDetailFloat() {
    $elem = $("#job-detail");
    if ($elem.length > 0) {
        $navHeight = $("header nav").height();


        //$(window).width()<=1600 ? $margin=20 : $margin=30 ;
        $margin = 20;
        $offset = $navHeight + $margin;
        $topbarHeight = $("#searchbar").height() + $navHeight + $margin;
        $toScroll = $(window).scrollTop();
        $minheight = $topbarHeight - $toScroll;
        $fHeight = $('footer').offset().top;
        $foffset = $fHeight - $offset - $margin;
        $elemOffset = $elem.offset().top + $elem.height();
        $winHeight = $(window).height() - 105;

        if ($minheight > $offset) {

            $elem.css("top", $minheight);
            $elem.css("margin-top", "0px");
            $elem.css("height", "calc(100% - " + ($minheight + $margin) + "px)");
        } else {

            if ($elemOffset >= $foffset) {
                //console.log("loaded--2");
                //console.log($winHeight);   

                $elem.css("height", $winHeight + "px");
                $elem.css("top", "auto");
                $elem.css("bottom", "0px");
                $elem.css("position", "absolute");
                $elem.css("width", "calc(100% - 40px)");
            }
            if ($toScroll + window.innerHeight < $fHeight) {
                //console.log($elem);   
                $elem.css("position", "fixed");
                $elem.css("top", "-1px");
                $elem.css("bottom", "-1px");
                $elem.css("width", "");
                $elem.css("height", "calc(100% - " + ($offset + $margin) + "px)");

            }
            $elem.css("margin-top", $offset + "px");

        }
    } else {
        //console.log("not loaded");
    }
}

function SetLayout() {
    JobDetailFloat();
    // searchBtnFix();
    //console.log("working");
    $("div[data-toggle='tooltip'],img[data-toggle='tooltip'],i[data-toggle='tooltip'],span[data-toggle='tooltip']").tooltip();
    $("#job-detail #job-content").scrollTop(0);
    $("#job-detail #job-content").hover(function() {}, function() {
        //$("body").removeClass("noScroll")
    }).on("scroll", function() {
        0 < $(this).scrollTop() ? $("#job-detail #job-header").addClass("shadow") : $("#job-detail #job-header").removeClass("shadow")
    })
}
$(window).scroll(function() {
    JobDetailFloat();
    searchBtnFix();

}).resize(function() {
    JobDetailFloat();
    // searchBtnFix();

});
$(document).ready(function() {
    JobDetailFloat();
    //  searchBtnFix();


});
var Direction = $('html').attr("dir");
$twidth = $(".umenu.bx").width();
//console.log($tHeight.top);

searchOpen = false;
$(window).scroll(function() {
    searchBtnFix();
}).load(function() {
    searchBtnFix();
}).resize(function() {
    // searchBtnFix();
});
$('.selectPicker').selectpicker();

$(".show-more").click(function() {
    $cheight = $(this).parent().find(".panel-body .chbxs .chbx").size() * 40;
    $(this).parent().find(".panel-body").animate({
        "max-height": $cheight
    }, 500, function() {
        $(this).parent().find(".show-more").addClass("hide");
        $(this).parent().find(".show-less").removeClass("hide");
    });
    searchBtnFix();
});
$(".show-less").click(function() {
    $(this).parent().find(".panel-body").animate({
        "max-height": 225
    }, 500, function() {
        $(this).parent().find(".show-less").addClass("hide");
        $(this).parent().find(".show-more").removeClass("hide");
    });
    searchBtnFix();
});

function searchBtnFix() {
    if ($(".umenu .search-wrapper").length > 0) {
        $winHeight = $(window).height() - 40;
        $tHeight = $(".umenu .search-wrapper").offset().top - $winHeight;
        $toScroll = $(window).scrollTop();
        //console.log($tHeight);
        //alert($toScroll);
        $twidth = $(".umenu .search-wrapper").width() + 19;
        //$(".umenu .search-btn").width($twidth);

        // console.log($twidth);
        $toScroll < $tHeight ? $(".umenu .search-btn").addClass("fixed").width($twidth) : $(".umenu .search-btn").removeClass("fixed").width($twidth)
    }
}