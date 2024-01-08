function initDargula(containers, dropcontainers) {
    var dark = dragula({
        containers: dropcontainers,
        revertOnSpill: true,
        //direction: 'vertical',
        // moves: function (el, container, handle) {

        //     return handle.classList.contains('handle');
        // },
        accepts: function(el, target, source, sibling) {
            $(target).find('.notfound').addClass("d-none");
            return true;
        }
    });
    dark.on('drop', function(el, target, source, sibling) {
        notFoundHandle();
        mark_skills_changed();
    }).on('cancel', function(el, target, source, sibling) {
        notFoundHandle();
    });


}

function notFoundHandle() {

    var skillsboxes = $(".skillboxes .lists");
    var i;

    for (i = 0; i < skillsboxes.length; i++) {
        var target = skillsboxes[i];
        if ($(target).find(".list").length > 0) {
            $(target).find('.notfound').addClass("d-none");
        } else {
            $(target).find('.notfound').removeClass("d-none");
        }
    }

    return true;

}

function initSkillsSet() {
    var sparent;
    $("body").off('click', '.skillboxes .lists .list');
    $("body").on('click', '.skillboxes .lists .list', function() {
        var tparent = $(this).parent().attr("id");
        var aparent = $(this).parents(".skillboxes").find("#" + sparent);
        var lists = aparent.find(".list");
        if (tparent != sparent) {
            lists.removeClass("active");
            sparent = tparent;
        }
        $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active");


    });

    $("body").off('click', '.skillboxes .lists .list > a');
    $("body").on('click', '.skillboxes .lists .list > a', function(event) {
        event.preventDefault();
        $(this).parent().remove();
        if ($('.allSkills').length < 1) {
            if ($('.skill_set').length > 0) {
                $('.skill_set').addClass('hidden');
            }
        }
    });

    $("body").off('click', '.skillboxes .swap');
    $("body").on('click', '.skillboxes .swap', function() {
        var alists = $(this).parents(".skillboxes").find(".list.active");
        var target = alists.parents(".lists").data("target");
        var target2 = alists.parents(".lists").data("target2");
        $(this).hasClass("two") ? alists.appendTo(target2) : alists.appendTo(target);
        alists.removeClass("active");
        if (alists.length > 0) {
            notFoundHandle();
            mark_skills_changed();
        }
    });

    $(".skillScrollbar").mCustomScrollbar();
}

$(window).on("load", function() {
    initSkillsSet();
});

function drgulaCallback() {
    var dropcontainers = [
        document.querySelector("#LeftSkillDrag"),
        document.querySelector("#CenterSkillDrag"),
        document.querySelector("#RightSkillDrag")
    ];
    var container = document.querySelector("#LeftSkillDrag");
    initDargula(container, dropcontainers);
}

function mark_skills_changed() {
    if ($('#load_jdSkills').length > 0) {
        $('#load_jdSkills').val('N');
    }
    if ($('#load_tSkills').length > 0) {
        $('#load_tSkills').val('N');
    }
    return true;
}