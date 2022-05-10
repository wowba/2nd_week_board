$(document).ready(function () {


    // Properties
    const submenu_animation_speed = 200;

    // Functions
    const appMenu = function () {

        if (!$('.app-sidebar').length) {
            return;
        }

        var select_sub_menus = $('.accordion-menu li:not(.open) ul'),
            active_page_sub_menu_link = $('.accordion-menu li.active-page > a');

        // Hide all sub-menus
        select_sub_menus.hide();

        var ps;

        if ($(".app.menu-hover").length && $(window).width() > 1199) {
            ps.destroy();
            ps = null;
        } else {
            var container = document.querySelector('.app-menu');
            ps = new PerfectScrollbar(container);
        }

        $(window).resize(function() {
            if ($(".app.menu-hover").length && $(window).width() > 1199 && !ps.length) {
                var container = document.querySelector('.app-menu');
                ps = new PerfectScrollbar(container);
            } else if (ps.length) {
                ps.destroy();
                ps = null;
            }
        });


        // Menu
        $('.accordion-menu li a').on('click', function (e) {


            var sub_menu = $(this).next('ul'),
                parent_list_el = $(this).parent('li'),
                active_list_element = $('.accordion-menu > li.open'),
                show_sub_menu = function () {
                    sub_menu.slideDown(submenu_animation_speed);
                    parent_list_el.addClass('open');
                    ps.update();
                },
                hide_sub_menu = function () {
                    sub_menu.slideUp(submenu_animation_speed);
                    parent_list_el.removeClass('open');
                    ps.update();
                },
                hide_active_menu = function () {
                    parent_list_el.parent().children('.open').children('ul').slideUp(submenu_animation_speed);
                    parent_list_el.parent().children('.open').removeClass('open');
                    ps.update();
                };

            if (sub_menu.length) {

                if ($('.app').hasClass('menu-hover') && $(window).width() > 1199) {
                    e.preventDefault();
                    return;
                }

                if (!parent_list_el.hasClass('open')) {
                    if (active_list_element.length) {
                        hide_active_menu();
                    };
                    show_sub_menu();
                } else {
                    hide_sub_menu();
                };

                return false;

            };


        });

        if (($('.active-page > ul').length)) {
            if(!($('.app').hasClass('menu-hover'))) {
                active_page_sub_menu_link.click();
            } else if ($(window).width() < 1199) {
                active_page_sub_menu_link.click();
            }
        };

        if (!$('.app').hasClass('menu-off-canvas')) {
            if ($(window).width() < 1199 && !$('.app').hasClass('sidebar-hidden')) {
                if(!$('.hide-app-sidebar-mobile').length) {
                    $('.app').append('<div class="hide-app-sidebar-mobile"></div>');
                }
                $('.hide-sidebar-toggle-button i').text('last_page');
            } else {
                $('.hide-sidebar-toggle-button i').text('first_page');
            }

            $( window ).resize(function() {
                if ($(window).width() < 1199 && !$('.app').hasClass('sidebar-hidden')) {
                    if(!$('.hide-app-sidebar-mobile').length) {
                        $('.app').append('<div class="hide-app-sidebar-mobile"></div>');
                    }
                    $('.hide-sidebar-toggle-button i').text('last_page');
                } else {
                    $('.hide-sidebar-toggle-button i').text('first_page');
                }
            });
        }

        $('.hide-sidebar-toggle-button').on('click', function (e) {
            e.preventDefault()
            toggleSidebar()
        });

        $('.hide-app-sidebar-mobile').on('click', function (e) {
            e.preventDefault()
            toggleSidebar()
        });

        function toggleSidebar() {
            if ($('.app').hasClass('menu-off-canvas')) {
                return false;
            }
            $('.app').toggleClass('sidebar-hidden');
            if ($('.app').hasClass('sidebar-hidden')) {
                setTimeout(function () {
                    $('.app-sidebar .logo').addClass('hidden-sidebar-logo');
                }, 200)
                if ($(window).width() > 1199) {
                    $('.hide-sidebar-toggle-button i').text('last_page');
                } else {
                    $('.hide-sidebar-toggle-button i').text('first_page');
                }
            } else {
                $('.app-sidebar .logo').removeClass('hidden-sidebar-logo');

                if ($(window).width() > 1199) {
                    $('.hide-sidebar-toggle-button i').text('first_page');
                } else {
                    $('.hide-sidebar-toggle-button i').text('last_page');
                }
            }
            return false;
        };


        $('.menu-off-canvas .hide-sidebar-toggle-button').on('click', function () {
            $('.app').toggleClass('menu-off-canvas-show');
            if ($('.app').hasClass('menu-off-canvas-show')) {
                $('.app-sidebar .logo').addClass('canvas-sidebar-hidden-logo');
            } else {
                setTimeout(function () {
                    $('.app-sidebar .logo').removeClass('canvas-sidebar-hidden-logo');
                }, 200)
            }
            return false;
        });

    };

    // Plugins
    const plugins = function () {
        $('[data-bs-toggle="popover"]').popover();
        $('[data-bs-toggle="tooltip"]').tooltip();
    };

    const sortable = () => {
        if ($('.listWithHandle').length) {
            const el = document.querySelector('.listWithHandle');
            new Sortable(el, {
                handle: '.category-handle',
                animation: 150
            });
        }
    }

    // Init Functions
    appMenu();
    plugins();
    sortable();
});

$(window).on("load", function () {
    setTimeout(function() {
    $('body').addClass('no-loader')}, 1000)
});
