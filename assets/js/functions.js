function scrollPercentage() {
    var winTop = $(window).scrollTop(),
        docHeight = $(document).height(),
        winHeight = $(window).height();

    return (winTop / (docHeight - winHeight)) * 100;
}

function scrollSteps(imagesNumber) {
    var steps = [];

    for (var i = 1; i < imagesNumber; i++) {
        steps[steps.length] = 100 / imagesNumber * i;
    }

    steps[steps.length] = 150;

    return steps;
}

$(document).ready(function () {
    var slidebars = new $.slidebars();
    var showingText = false;

    var menu = $('.sb-menu');
    var topbar = $('.topbar');
    var menuHeight = menu.height();
    var windowHeight = $(window).height() + 10;
    var Gallery = blueimp.Gallery;

    var fillerBlock = $('.filler-block');

    var menuLinks = $('.sb-menu a');
    var body = $('body');

    $(window).resize(function () {
        windowHeight = $(window).height() + 10;
        if (!showingText) {
            fillerBlock.height(windowHeight);
        }
    });

    if (body.scrollTop() > 0) {
        showingText = true;
        fillerBlock.height(200);
    } else {
        fillerBlock.height(windowHeight);
        if (menuLinks.length) {
            disableScroll();
        }
    }

    $('.close-post').click(function (event) {
        scrollToTop();
    });

    $('body').click(function (event) {
        if (showingText && (event.target.tagName === 'BODY' || event.target.className.indexOf('filler-block') > -1)) {
            scrollToTop(function() {slidebars.slidebars.close();});
        } else {
            slidebars.slidebars.close();
        }
    });

    $('#tekst a').attr('target', '_blank');


    function enableScroll() {
        $('html').css('overflow-y', 'auto');
        showingText = true;
    }

    function disableScroll() {
        $('html').css('overflow-y', 'hidden');
        showingText = false;
    }

    function scrollToTop(cb) {
        disableScroll();
        fillerBlock.animate({height: (windowHeight + body.scrollTop()) + 'px'}, {
            complete: function () {
                fillerBlock.height(windowHeight);
                body.scrollTop(0);
                if (cb) cb();
            }
        });
    }

    menuLinks.click(function (event) {
        var target = event.currentTarget.getAttribute('href');
        if (target === '#') {
            event.preventDefault();
            scrollToTop(function() {slidebars.slidebars.close();});
            return false;
        } else if (target === '#referanser') {
            scrollToTop(function() {slidebars.slidebars.close();});
            //slidebars.slidebars.close();
            $('#links a').first().trigger('click').trigger('click');
            return false;
        } else if (target === '#dokumentasjon') {
            scrollToTop(function() {slidebars.slidebars.close();});
            //slidebars.slidebars.close();
            $('#dokumentasjon a').first().trigger('click').trigger('click');
            return false;
        }
        enableScroll();
        slidebars.slidebars.close();
        return scrollToTarget(target);
    });

    function scrollToTarget(target) {
        var targetElm = $(target);
        if (targetElm.length) {
            body.animate({scrollTop: targetElm.offset().top - menuHeight}, {
                complete: function () {
                    fillerBlock.height(200);
                    body.scrollTop(targetElm.offset().top - menuHeight);
                }
            });
            return false;
        }
        return true;
    }


});
