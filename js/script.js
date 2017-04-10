$(document).ready(function(){

  // Fix mobile viewport
  $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');

  // Collapse navbar
  $(".button-collapse").sideNav();

  // Smooth Scroll
  $('a').smoothScroll();

  // Materialize Modals
  $('.modal-trigger').leanModal();

  // Fade in home page
  setTimeout(function() {
    $("#developer").fadeIn(1200).removeClass("hide");
  }, 800);
  setTimeout(function() {
    $("#designer").fadeIn(1200).removeClass("hide");
  }, 1600);
  setTimeout(function() {
    $("#doer").fadeIn(1200).removeClass("hide");
  }, 2400);

  // Add home button to navbar when home page not displayed
  var headerHeight = $("header").height();
  var navHeight = $("nav").height();
  $(window).scroll(function() {
    var wScroll = $(window).scrollTop();
    if (wScroll >= headerHeight + navHeight) {
      $("a.brand-logo").fadeIn(500).removeClass("hide");
      $("nav").addClass("background");
    } else {
      $("a.brand-logo").fadeOut(350);
      $("nav").removeClass("background");
    }
  });

  // Change photo on hover
  $("#portrait").hover(function() {
    $(this).attr("src", "images/school.jpg");
  }, function() {
    $(this).attr("src", "images/GA_Headshot.jpg");
  });

  // Hide/show resume on page
  $("#showResume").on("click", function() {
    $(".resume").toggleClass("hide");
  });

  // Mobile Nav fix
  $('.side-nav').css('left', '0');
  $(".side-nav li").on('click', function() {
    setTimeout(function() {
        $("#sidenav-overlay").trigger('click');
    },10);
});
});
