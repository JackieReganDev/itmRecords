﻿/*
    Name: Mountain
    Description: Responsive Coming Soon 
    Version: 3.0
    Author: MountainTheme

    TABLE OF CONTENTS
    ---------------------------
     1. Loading
     2. Backstretch Image Background
        2.1 Backstretch Slideshow Background
     3. Countdown
     4. Contact form 
     5. Ajax mailchimp
     6. Video background
     7. Google map
*/

/* ================================= */
/* :::::::::: 1. Loading ::::::::::: */
/* ================================= */
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     $('#video').css({"opacity" : "0.0"});
  }



    $(".loader-icon").delay(500).fadeOut();
    $(".page-loader").delay(700).fadeOut("slow");

    setTimeout(function() {
        $(".logo").delay(1000).css({
            display: 'none'
        }).fadeIn(1000);
        $("h1").delay(1000).css({
            display: 'none'
        }).fadeIn(1000);
        $("p").delay(1000).css({
            display: 'none'
        }).fadeIn(1000);
        $(".countdown").delay(1000).css({
            display: 'none'
        }).fadeIn(1000);
        $(".mouse").delay(1000).css({
            display: 'none'
        }).fadeIn(1000);
    });





/* ================================= */
/* ::::::::: 2. Backstretch :::::::: */
/* ================================= */

/* Active Single Image Background  */

$("header").backstretch("images/background2.jpg");

// ==== SLIDESHOW BACKGROUND ====
// Set URLs to background images inside the array
// Each image must be on its own line, inbetween speech marks (" ") and with a comma at the end of the line
// Add / remove images by changing the number of lines below
// Variable fade = transition speed for fade animation, in milliseconds
// Variable duration = time each slide is shown for, in milliseconds


/* ↓ Remove comments if you want to use the slideshow  ↓  */

/*$("header").backstretch([
     "images/background1.jpg", 
     "images/background2.jpg", 
     "images/background3.jpg", 
     "images/background4.jpg"
 ],{duration: 3000, fade: 750});  */


/* ================================= */
/* :::::::::: 3. Countdown ::::::::: */
/* ================================= */


// To change date, simply edit: var endDate = "Dec 01, 2023 20:39:00";

$(function() {
    var endDate = "Jan 31, 2023 20:39:00";
    $('.countdown').countdown({
        date: endDate,
        render: function(data) {
            $(this.el).html("<div>" + this.leadingZeros(data.days, 3) + " <span>days</span></div><div>" + this.leadingZeros(data.hours, 2) + " <span>hours</span></div><div>" + this.leadingZeros(data.min, 2) + " <span>minutes</span></div><div>" + this.leadingZeros(data.sec, 2) + " <span>seconds</span></div>");
        }
    });
});

/* ================================= */
/* :::::::: 4. Contact form :::::::: */
/* ================================= */

$(function() {
    $('#submit').on("click", function() {
        // validate and process form here 
        $("#ajax-contact-form").validate({

            rules: {

                name: {
                    required: true,
                },

                email: {
                    required: true,
                    email: true,
                },

                msg: {
                    required: true,
                },
            },

            messages: {

                name: {
                    required: "<i class='fa fa-exclamation-triangle name'></i>",
                },

                email: {
                    required: "<i class='fa fa-exclamation-triangle email'></i>",
                    email: "<i class='fa fa-exclamation-triangle email'></i>",
                },

                msg: {
                    required: "<i class='fa fa-exclamation-triangle message'></i>",
                },

            },

            // JQuery's awesome submit handler.
            submitHandler: function(form) {

                // Create variables from the form
                var name = $('input#name').val();
                var email = $('input#email').val();
                var msg = $('textarea#msg').val();

                // Create variables that will be sent in a URL string to contact.php
                var dataString = '&name=' + name + '&email=' + email + '&msg=' + msg;

                $.ajax({
                    type: "POST",
                    url: "php/contact.php",
                    data: dataString,
                    success: function(data) {
                        if (data === 'OK') {
                            var result = '<div class="notification_ok"><i class="fa fa-check"></i> Your email was sent. Thanks!</div>';
                            $("#ajax-contact-form").find('input[type=text], input[type=email], textarea').val("");
              
                          } else {
                            result = data;
                          }
                          $('#note').html(result).fadeIn();
                          setTimeout(function () {
                            $('#note').html(result).fadeOut();
                          }, 4000);
                    }

                });
                return false;
            }
        });
    });
});


/* ================================= */
/* :::::::: 5. Ajax mailchimp :::::: */
/* ================================= */

// Example MailChimp url: http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
$('#ajaxChimp').ajaxChimp({
    language: 'eng',
    url: 'http://stevedogs.us9.list-manage.com/subscribe/post?u=df0aa2ea10f32337b29b342d4&id=41ddc569b4'
});

// Mailchimp translation
//
// Defaults:
//'submit': 'Submitting...',
//  0: 'We have sent you a confirmation email',
//  1: 'Please enter a value',
//  2: 'An email address must contain a single @',
//  3: 'The domain portion of the email address is invalid (the portion after the @: )',
//  4: 'The username portion of the email address is invalid (the portion before the @: )',
//  5: 'This email address looks fake or invalid. Please enter a real email address'

$.ajaxChimp.translations.eng = {
    'submit': 'Submitting...',
    0: '<i class="fa fa-check"></i> We will be in touch soon!',
    1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
    2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
    3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
    4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
    5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
}

/* ================================= */
/* :::::: 6. Video background :::::  */
/* ================================= */

var video = $('#video').data('video');
var mute = $('#video').data('mute');

$('#video').YTPlayer({
  videoId: video,
  mute: mute,  
  fitToBackground: true,
});



/* ================================= */
/* :::::::: 7. Google Map :::::::::: */
/* ================================= */

//set your google maps parameters
var latitude = -37.8602828,
    longitude = 145.079616,
    map_zoom = 10;

//google map custom marker icon - .png fallback for IE11
var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
var marker_url = (is_internetExplorer11) ? 'images/icon-location.png' : 'images/icon-location.png';

//define the basic color of your map, plus a value for saturation and brightness
var main_color = '#2d313f',
    saturation_value = -20,
    brightness_value = 5;

//we define here the style of the map
var style = [{
        //set saturation for the labels on the map
        elementType: "labels",
        stylers: [{
            saturation: saturation_value
        }, ]
    }, { //poi stands for point of interest - don't show these lables on the map 
        featureType: "poi",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }, ]
    }, {
        //don't show highways lables on the map
        featureType: 'road.highway',
        elementType: 'labels',
        stylers: [{
            visibility: "off"
        }, ]
    }, {
        //don't show local road lables on the map
        featureType: "road.local",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }, ]
    }, {
        //don't show arterial road lables on the map
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }, ]
    }, {
        //don't show road lables on the map
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{
            visibility: "off"
        }, ]
    },
    //style different elements on the map
    {
        featureType: "transit",
        elementType: "geometry.fill",
        stylers: [{
            hue: main_color
        }, {
            visibility: "on"
        }, {
            lightness: brightness_value
        }, {
            saturation: saturation_value
        }, ]
    }, {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [{
            hue: main_color
        }, {
            visibility: "on"
        }, {
            lightness: brightness_value
        }, {
            saturation: saturation_value
        }, ]
    }, {
        featureType: "poi.government",
        elementType: "geometry.fill",
        stylers: [{
            hue: main_color
        }, {
            visibility: "on"
        }, {
            lightness: brightness_value
        }, {
            saturation: saturation_value
        }, ]
    }, {
        featureType: "poi.sport_complex",
        elementType: "geometry.fill",
        stylers: [{
            hue: main_color
        }, {
            visibility: "on"
        }, {
            lightness: brightness_value
        }, {
            saturation: saturation_value
        }, ]
    }, {
        featureType: "poi.attraction",
        elementType: "geometry.fill",
        stylers: [{
            hue: main_color
        }, {
            visibility: "on"
        }, {
            lightness: brightness_value
        }, {
            saturation: saturation_value
        }, ]
    }, {
        featureType: "poi.business",
        elementType: "geometry.fill",
        stylers: [{
            hue: main_color
        }, {
            visibility: "on"
        }, {
            lightness: brightness_value
        }, {
            saturation: saturation_value
        }, ]
    }, {
        featureType: "transit",
        elementType: "geometry.fill",
        stylers: [{
            hue: main_color
        }, {
            visibility: "on"
        }, {
            lightness: brightness_value
        }, {
            saturation: saturation_value
        }, ]
    }, {
        featureType: "transit.station",
        elementType: "geometry.fill",
        stylers: [{
            hue: main_color
        }, {
            visibility: "on"
        }, {
            lightness: brightness_value
        }, {
            saturation: saturation_value
        }, ]
    }, {
        featureType: "landscape",
        stylers: [{
            hue: main_color
        }, {
            visibility: "on"
        }, {
            lightness: brightness_value
        }, {
            saturation: saturation_value
        }, ]

    }, {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [{
            hue: main_color
        }, {
            visibility: "on"
        }, {
            lightness: brightness_value
        }, {
            saturation: saturation_value
        }, ]
    }, {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{
            hue: main_color
        }, {
            visibility: "on"
        }, {
            lightness: brightness_value
        }, {
            saturation: saturation_value
        }, ]
    }, {
        featureType: "water",
        elementType: "geometry",
        stylers: [{
            hue: main_color
        }, {
            visibility: "on"
        }, {
            lightness: brightness_value
        }, {
            saturation: saturation_value
        }, ]
    }
];

//set google map options
var map_options = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: map_zoom,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: style,
    }
    //inizialize the map
var map = new google.maps.Map(document.getElementById('google-container'), map_options);
//add a custom marker to the map        




var marker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    map: map,
    title: 'Melbourne, Australia',
    visible: true,
    icon: marker_url,
});



google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
});

//add custom buttons for the zoom-in/zoom-out on the map
function CustomZoomControl(controlDiv, map) {
    //grap the zoom elements from the DOM and insert them in the map 
    var controlUIzoomIn = document.getElementById('zoom-in'),
        controlUIzoomOut = document.getElementById('zoom-out');
    controlDiv.appendChild(controlUIzoomIn);
    controlDiv.appendChild(controlUIzoomOut);

    // Setup the click event listeners and zoom-in or out according to the clicked element
    google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
        map.setZoom(map.getZoom() + 1)
    });
    google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
        map.setZoom(map.getZoom() - 1)
    });
}

var zoomControlDiv = document.createElement('div');
var zoomControl = new CustomZoomControl(zoomControlDiv, map);

//insert the zoom div on the top left of the map
map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);