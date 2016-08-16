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
    //window.onhashchange = function (){
    //    console.log('BLABLABL' + window.location.hash);
    //    if(window.location.hash == '#referanser') {
    //        clickReferanser()
    //    }
    //};
    var slidebars = new $.slidebars();
    var showingText = false;

    var menu = $('.sb-menu');
    var topbar = $('.topbar');
    var menuHeight = 50;
    var windowHeight = $(window).height() + 10;
    var Gallery = blueimp.Gallery([], {carousel: true, continuous: true});
    Gallery.carousel = true;

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
        location.replace("#");

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
        if(this.hash) {
            event.preventDefault();
        } else {
            return true;
        }
        var target = event.currentTarget.getAttribute('href');
        if (target === '#') {
            scrollToTop(function () {
                slidebars.slidebars.close();
                //window.location.hash = target;
                location.replace(target);
            });
            return false;
        } else if (target === '#referanser') {
            var scrollmem = $('html,body').scrollTop();
            //window.location.hash = target;
            location.replace(target);
            $('html,body').scrollTop(scrollmem);
            return false;
        } else if (target === '#dokumentasjon') {
            clickDokumentasjon();
            var scrollmem = $('html,body').scrollTop();
            //window.location.hash = target;
            location.replace(target);
            $('html,body').scrollTop(scrollmem);
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
            var newBottomPadding = (windowHeight - 200 - $('#sb-site').outerHeight());
            if (newBottomPadding > parseInt(body.css('padding-bottom'))) {
                body.css('padding-bottom', newBottomPadding + 'px');
            }
            body.animate({scrollTop: targetElm.offset().top - menuHeight}, {
                complete: function () {
                    fillerBlock.height(200);
                    location.replace(target);
                    $('body').scrollTop(targetElm.offset().top - menuHeight);
                    body.css('padding-bottom', '');
                }
            });
            return false;
        }

        location.replace(target);
        return true;
    }


});

$(document).load(function() {
    $('body').scrollTop(0);
});
