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
    var menuHeight = 50;
    var windowHeight = $(window).height() + 10;
    var Gallery = blueimp.Gallery;

    var fillerBlock = $('.filler-block');

    var menuLinks = $('.sb-menu a');

    $(window).resize(function () {
        windowHeight = $(window).height() + 10;
        if (!showingText) {
            fillerBlock.height(windowHeight);
        }
    });

    if (window.location.hash) {
        if (window.location.hash === '#referanser') {
            clickReferanser();
        } else if (window.location.hash === '#dokumentasjon') {
            clickDokumentasjon();
        } else {
            showingText = true;
            fillerBlock.height(200);
        }
    } else {
        fillerBlock.height(windowHeight);
        $('body').scrollTop(0);
        if (menuLinks.length) {
            disableScroll();
        }
    }

    $('.close-post').click(function (event) {
        scrollToTop();
    });

    $('body').click(function (event) {
        if (showingText && (event.target.tagName === 'BODY' || event.target.className.indexOf('filler-block') > -1)) {
            scrollToTop(function () {
                slidebars.slidebars.close();
            });
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
        fillerBlock.animate({height: (windowHeight + $('body').scrollTop()) + 'px'}, {
            complete: function () {
                $('body').scrollTop(0);
                fillerBlock.height(windowHeight);
                if (cb) cb();
            }
        });
    }

    function clickReferanser() {
        scrollToTop(function () {
            slidebars.slidebars.close();
        });
        $('#links a').first().trigger('click').trigger('click');
    }

    function clickDokumentasjon() {
        scrollToTop(function () {
            slidebars.slidebars.close();
        });
        $('#dokumentasjon a').first().trigger('click').trigger('click');
    }

    menuLinks.click(function (event) {
        var target = event.currentTarget.getAttribute('href');
        window.location.hash = target;
        if (target === '#') {
            event.preventDefault();
            scrollToTop(function () {
                slidebars.slidebars.close();
            });
            return false;
        } else if (target === '#referanser') {
            clickReferanser();
            return false;
        } else if (target === '#dokumentasjon') {
            clickDokumentasjon();
            return false;
        }
        enableScroll();
        slidebars.slidebars.close();
        return scrollToTarget(target);
    });

    function scrollToTarget(target) {
        var targetElm = $(target);
        if (targetElm.length) {
            var body = $('body');
            body.css('padding-bottom', (windowHeight - 200 - $('#sb-site').outerHeight())  + 'px');
            body.animate({scrollTop: targetElm.offset().top - menuHeight}, {
                complete: function () {
                    fillerBlock.height(200);
                    $('body').scrollTop(targetElm.offset().top - menuHeight);
                    body.css('padding-bottom', '');
                }
            });
            return false;
        }
        return true;
    }


});

$(document).load(function() {
    $('body').scrollTop(0);
});
