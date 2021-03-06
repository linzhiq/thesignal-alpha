// search modal
$('#searchmodal')
    .modal('attach events', '.ui.primary.search.item')
//   .modal('setting', 'transition', 'horizontal flip')
;

/*====================================================
  TABLE OF CONTENT
  1. function declearetion
  2. Initialization
====================================================*/
(function ($) {
    /*===========================
    1. function declearetion
    ===========================*/
    var themeApp = {
        setNavbar: function () {
            if (typeof fixed_navbar != "undefined" && fixed_navbar == true) {
                $('body').addClass('has-fixed-navbar');
                $('#main-navbar').addClass('fixed');
            }
        },
        responsiveIframe: function () {
            $('.main-content-area').fitVids();
        },
        highlighter: function () {
            $('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
        },
        mobileMenu: function () {
            $('#mobile-menu').html($('#main-menu').html());
            $('#nav-toggle-button').on('click', function (e) {
                e.preventDefault();
                $('body').toggleClass('mobile-menu-opened');
            });
            $('#backdrop').on('click', function () {
                $('body').toggleClass('mobile-menu-opened');
            });
            var li = $(".mobile-menu").find('li');
            $(li).has('ul').addClass('menu-item-has-children').prepend('<span class="submenu-toggle-button"><i class="fa fa-angle-down"></i></span>');
            $('.menu-item-has-children').find('.submenu-toggle-button').on('click', function () {
                $(this).toggleClass('opened');
                $(this).siblings('ul').slideToggle();
            });
        },
        siteSearch: function () {
            var searchInput = $('#search-input');
            var searchField = searchInput.ghostHunter({
                results: "#search-results",
                onComplete: function (results) {
                    $('#searchmodal').modal('refresh');
                },
                zeroResultsInfo: false,
                onKeyUp: true,
                onPageLoad: true,
                includepages: true,
                info_template: "<div class=\"search counter\">{{amount}} posts found</div>",
                result_template: "<div class=\"search result\"><a href='{{link}}'><div class=\"title\">{{title}}</div><div class=\"date\">{{pubDate}}</div></a></div>"
            });
            $('#searchmodal').on('hidden.bs.modal', function () {
                searchField.clear();
            });
        },
        backToTop: function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $('#back-to-top').fadeIn();
                } else {
                    $('#back-to-top').fadeOut();
                }
            });
            $('#back-to-top').on('click', function (e) {
                e.preventDefault();
                $('html, body').animate({scrollTop: 0}, 1000);
                return false;
            });
        },
        init: function () {
            themeApp.setNavbar();
            themeApp.responsiveIframe();
            themeApp.highlighter();
            themeApp.mobileMenu();
            themeApp.siteSearch();
            themeApp.backToTop();
        }
    };
    /*===========================
    2. Initialization
    ===========================*/
    $(document).ready(function () {
        window.SmartUnderline.init();

        // initialize sidebar properties

        $('.ui.sticky')
            .sticky({
                context: '#article-content'
            })
        ;

        var strong = $("#content h3");
        var sidebar = $('#sidebar');

        // tag anchor text and append anchor links to sidebar
        $(strong).each(function (index, element) {
            var strongSidebar = $("<strong>" + $(strong[index]).text() + "</strong>");
            $(strong[index]).wrapInner("<div class='anchor table-of-content' id='content-" + index + "'></div>");
            $(strongSidebar).wrapInner("<div class='sidebar-link' id='link-content-" + index + "'><a href='#content-" + index + "' class='anchor-link'></a></div>");
            $('.sidebar-link').css("padding-bottom", "5px");
            $(strongSidebar).appendTo(sidebar);
            return true;
        });

        // onclick listener for scrolling to anchors
        $('.anchor-link').click(function (event) {
            event.preventDefault();
            var target = $(this).attr('href');
            $('body, html').animate({scrollTop: $(target).offset().top}, '800');
        });

        themeApp.init();

        var $content = $(".table-of-content");

        if ($(".article").length) {
            $(document).scroll(function () {
                var diff = - 10000;
                var a;

                for (var i = 0; i < $content.length; i ++) {
                    var $anchor = $($content[i]);
                    var d = $anchor.offset().top - $(window).scrollTop();

                    if (d < 20 && d > diff) {
                        diff = d;
                        a = $anchor;
                    }
                }

                console.log(a);

                $(".sidebar-link").toggleClass('selected', false);
                if (a !== undefined) {
                    $("#link-" + a.attr('id')).toggleClass('selected', true);
                }
            });
        }
    });
}(jQuery));

        /*===================
        Mobile sidebar
         ===================*/
var toggleSidebar = function () {
    var sidebarContainer = document.getElementById("sidebar-container");
    if (sidebarContainer.style.display === "none") {
        sidebarContainer.style.display = "flex";
    } else {
        sidebarContainer.style.display = "none";
    }
};