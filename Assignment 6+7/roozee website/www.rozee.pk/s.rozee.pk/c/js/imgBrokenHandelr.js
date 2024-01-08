function imageError(image) {
    if ($(image).attr('data-imgType') === 'user') {
        $(image).attr("src", assets_url + "c/i/maleSil.gif");
        $(image).attr("lowsrc", assets_url + "c/i/maleSil.gif");
    } else if ($(image).attr('data-imgType') === 'company') {
        $(image).attr("src", assets_url + "c/i/building.svg");
    }
}