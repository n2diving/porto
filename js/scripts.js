
jQuery(document).ready(function($) {
    "use strict";

    /*==============================
        Mobile check
    ==============================*/
    function mobilecheck() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return false;
        }
        return true;
    }

    function msieversion() {

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
        //else                 // If another browser, return 0
            //alert('otherbrowser');

       return false;
    }

    $(window).load(function () {

        /*==============================
            Preloader
        ==============================*/
        $(".preloader").animate({
            left: '100%'
        }, 1000, 'easeInOutExpo');

        /*==============================
            Text rotator
        ==============================*/
        
        if ($(".head-title .rotate").length) {
            var _trAnimation = "flipCube",
                _trSpeed = 4000;
            if (msieversion() == 9) {
                _trAnimation = "fade";
                _trSpeed = 2000;
            }
            if (msieversion() == 10) {
                _trAnimation = "fade";
            }
            $(".head-title .rotate").textrotator({
                animation: _trAnimation,
                speed: _trSpeed
            });
        }

        /*==============================
            Animation
        ==============================*/
        if (mobilecheck()) {
            $('.home #header').addClass('header-anim');
            $('.home .navigation').addClass('nav-anim');
            $('.home .nav-open').addClass('nav-open-anim');
            $('.home .page-right-nav').addClass('page-right-nav-anim');
        };

        /*==============================
            Work
        ==============================*/
        var container = $('#work-wrap');
        container.isotope();

        $('#filters a').click(function(){
            $('.select-filter').removeClass('select-filter');
            $(this).parent('li').addClass('select-filter');
            var selector = $(this).attr('data-filter');
            $('#work-wrap').isotope({ filter: selector });
            return false;
        });
        $(window).resize(function() {
            container.isotope();
        });

        $('#all').click();
    });




    /*==============================
        Google map
    ==============================*/
    var MY_MAPTYPE_ID = 'custom_style';
    var featureOpts = [

        {    featureType: 'all',  stylers: [{saturation: -100},{gamma: 0.50}  ]}
    ];
    var latlng = new google.maps.LatLng(34.0218628,-118.48042065);
    var settings = {
        zoom: 13,
        center: latlng,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
        },
        mapTypeControl: false,
        mapTypeId: MY_MAPTYPE_ID,
        scrollwheel: false,
        draggable: true,
    };

    var map = new google.maps.Map(document.getElementById("map"), settings);
    var styledMapOptions = {
        name: 'Custom Style'
    };
    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

    google.maps.event.addDomListener(window, "resize", function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h3 id="firstHeading" class="firstHeading">Cross square</h3>' +
        '<div id="bodyContent">' +
        '<p>Come here and drink a coffee!</p>' +
        '</div>' +
        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var companyImage = new google.maps.MarkerImage('images/icon-location.png',
        new google.maps.Size(26, 41),
        new google.maps.Point(0, 0),
        new google.maps.Point(35, 20)
    );
    var companyPos = new google.maps.LatLng(45.738028, 21.224535);
    var companyMarker = new google.maps.Marker({
        position: companyPos,
        map: map,
        icon: companyImage,
        title: "Cross square",
        zIndex: 3
    });
    google.maps.event.addListener(companyMarker, 'click', function () {
        infowindow.open(map, companyMarker);
    });


    /*==============================
        Banner
    ==============================*/

    // full height screen and fix menu
    function setBanner() {
        var heightWindow = $(window).height();
        var widthWindow = $(window).width();
        var menuPage = $('.navigation .nav');
        $('#banner, #header .container').css('height', heightWindow + 'px');
        var heightBanner = $('#banner').find('.bg-parallax').height();
        $('#header, #banner').css({
            height: heightBanner + 'px'
        });
        
    };
    function setNav() {
        var heightWindow = $(window).height();
        var setTopNav = (heightWindow - $('.nav').height() - 40) / 2;
        if (heightWindow > $('.nav').height()) {
            $('.nav').css('top', setTopNav + 'px');
            $('.logo-nav').css('height', setTopNav + 'px');
        } else {
            $('.nav').css('top', '0');
        }
    };
    function fixScrollNavbar() {
        if ($(window).height() < $('.nav').height()) {
            $('.navigation').css('overflow-y', 'scroll');
        } else {
            $('.navigation').css('overflow-y', 'visible');
        }
    };
    function setlogoNav() {
        if ($('.logo-nav').height() <= 140) {
            $('.logo-nav').hide();
        } else {
            $('.logo-nav').show();
        }
    };
    $(window).resize(function () {
        setNav();
        setBanner();
        fixScrollNavbar();
        setlogoNav();
    }).trigger('resize');




    /*==============================
        Menu
    ==============================*/

    var navigation = $('.navigation');
    $('#page-wrap').prepend('<span class="nav-open"></span>');
    navigation.prepend('<span class="nav-close"></span>');
    var navOpen = $('.nav-open');
    var navClose = $('.nav-close');
    navOpen.on('click', function(event) {
        navigation.addClass('nav-open-add');
        $(this).css('opacity', '0');
        event.stopPropagation();
    });
    navClose.on('click', function() {
        navigation.removeClass('nav-open-add');
        navOpen.css('opacity', '1');
    });

    $('.nav li a').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 800, 'easeInOutExpo');
        navigation.removeClass('nav-open-add');
        navOpen.css('opacity', '1');
        event.preventDefault();
    });
    $('html').on('click', function() {
        navigation.removeClass('nav-open-add');
        navOpen.css('opacity', '1');
    });
    navigation.on('click', function(event) {
        event.stopPropagation();
    });
    //Scroll team
    $(".cs-scroll").click(function(){
        $("html,body").animate({
            scrollTop:$("#about").offset().top
        }, 800, 'easeInOutExpo');
        return false;
    });


    
    /*==============================
        Andmore
    ==============================*/

    $('.andmore-content .item').height($(this).width());
    $(window).resize(function () {
        $('.andmore-content .item').height($(this).width());
    });

    function heightHiringTeam() {
        var hiringHeight = $('.team-content .item').find('img').height()-1;
        $('.team-content .item').find('.hiring').height(hiringHeight); 
    }
    $(window).on('load', function () {
        heightHiringTeam();
    });
    $(window).on('resize', function () {
        heightHiringTeam();
    }).trigger('resize');

    if ($('.andmore-content').length) {
        $('.andmore-content .item p').appear(function () {
            var count_element = $('.countup', this).html();
            $(".countup", this).countTo({
                from: 0,
                to: count_element,
                speed: 2000,
                refreshInterval: 50,
            });
        });
    }


    /*==============================
        Funfact slider
    ==============================*/
    $('.funfact-slider').owlCarousel({
        navigation: true,
        slideSpeed: 1000,
        transitionStyle: 'fadeUp',
        singleItem:true,
        pagination: false,
        navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right "></i>']
    });


    /*==============================
        Blog
    ==============================*/

    $(".blog-time-slider").owlCarousel({
        autoPlay: 10000,
        items: 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [992,2],
        itemsTablet: [767,2],
        itemsTabletSmall: [600,1],
        slideSpeed: 600,
        navigation: true,
        pagination: false
    });

    function setBlog() {
        var windowWidth = $(window).width();
        var heightSidebar = $('.blog-page').height();
        var minHeight = $('.sidebar').children().height() + 120;
        $('.sidebar').css({
            height: heightSidebar,
            minHeight: minHeight,
        });
        $('#page-wrap').css('minHeight', minHeight);

        if (windowWidth >= 1700) {
            var calWidthSidebar = (windowWidth - $('.container').width()) / 2 - 30;
            $('.sidebar').css({
                width: calWidthSidebar + 'px'
            });
        }
        else {
            var widthSidebar = $('.sidebar').parent('[class^="col-"]').width();
            $('.sidebar').width(widthSidebar);
        }
    };
    $(window).bind('resize load', function () {
        setBlog();
    }).trigger('resize');


    /*==============================
        Single slider
    ==============================*/
    $(".single-slider").owlCarousel({
        autoPlay: 10000,
        items: 4,
        itemsDesktop : [1700,3],
        itemsDesktopSmall : [1199,2],
        itemsTablet: [992,2],
        itemsTabletSmall: [600,1],
        slideSpeed: 600,
        navigation: true,
        pagination: false,
        navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right "></i>']
    });
    var textTitle = $('.post-content-slider h4.title-slider').text();
    $('.post-content-slider .owl-buttons').prepend('<h4 class="title-slider">' + textTitle + '</h4>');



    /*==============================
        Contact
    ==============================*/

    $('.pp-contact').prepend('<span class="close-contact"></span>');

    $('.open-pp-contact').on('click', function() {
        $('.pp-contact').addClass('open-contact-add');
    });
    $('.close-contact').on('click', function() {
        $('.pp-contact').removeClass('open-contact-add');
    });
    $('html').on('click', function() {
        $('.pp-contact').removeClass('open-contact-add');
    });
    $('.page-right-nav').on('click', function(event) {
        event.stopPropagation();
    });
    function scrollContact() {
        var windowHeight = $(window).height();
        var heightScroll = $(window).height() + 1;
        if (windowHeight < $('.pp-contact .inner').height()) {
            $('.pp-contact').css({
                overflowY: 'scroll',
                height: heightScroll
            });
            $('.open-pp-contact').click(function() {
                $('html').css('overflow', 'hidden');
            });
            $('.close-contact').click(function() {
                $('html').css('overflow', 'visible');
            });
        } else {
            $('.pp-contact').css({
                overflowY: 'hidden',
                height: 'auto'
            });
            $('.open-pp-contact').click(function() {
                $('html').css('overflow', 'visible');
            });
            $('.close-contact').click(function() {
                $('html').css('overflow', 'visible');
            });
        }
    };
    $(window).bind('resize load', function () {
        scrollContact();
    }).trigger('resize');


    /*==============================
        Ajax popup
    ==============================*/
    if ($('.ajax-popup-link').length) {
        $('.ajax-popup-link').magnificPopup({
            type: 'ajax',
            callbacks: {
                close: function() {
                    $('.pp-sidebar p').getNiceScroll().remove();
                }
            },
        });
    }


    /*==============================
        Ajax contact form
    ==============================*/
    if($("#send-message-form").length > 0){
      // Validate the contact form
      $('#send-message-form').validate({
        // Add requirements to each of the fields
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          email: {
            required: true,
            email: true
          },
          message: {
            required: true,
            minlength: 10
          }
        },

        // Specify what error messages to display
        // when the user does something horrid
        messages: {
          name: {
            required: "Please enter your first name.",
            minlength: $.format("At least {0} characters required.")
          },
          email: {
            required: "Please enter your email.",
            email: "Please enter a valid email."
          },
          message: {
            required: "Please enter a message.",
            minlength: $.format("At least {0} characters required.")
          }
        },

        // Use Ajax to send everything to processForm.php
        submitHandler: function(form) {
          $("#submit-contact").html("Sending...");
          $(form).ajaxSubmit({
            success: function(responseText, statusText, xhr, $form) {
              $("#contact-content").slideUp(600, function() {
                $("#contact-content").html(responseText).slideDown(600);
              });
            }
          });
          return false;
        }
      });
    }
    


    
    /*==============================
        Parallax background
    ==============================*/
    function parallaxInit() {
        $('#banner .bg-parallax').parallax("50%", 0.3);
        $('.about .bg-parallax').parallax("50%", 0.3);
        $('.client .bg-parallax').parallax("50%", 0.3);
        $('.work .bg-parallax').parallax("50%", 0.3);
        $('.andmore .bg-parallax').parallax("50%", 0.3);
        $('.service .bg-parallax').parallax("50%", 0.3);
        $('.team .bg-parallax').parallax("50%", 0.3);
        $('.funfact .bg-parallax').parallax("50%", 0.3);
        $('.blog-time .bg-parallax').parallax("50%", 0.3);
        $('.footer .bg-parallax').parallax("50%", 0.3);
    }
    if (mobilecheck()) {
        parallaxInit();
    }
    $(window).bind('load', function () {
        parallaxInit();                       
    });


});
