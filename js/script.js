$(document).ready(function(){
  // Collapse navbar
  $(".button-collapse").sideNav();

  // Run fullpage.js
  $('#fullpage').fullpage({
    menu: ".nav",
    autoScrolling: false,
    resize: true
  });

  // Fade in home page
  $("#developer").fadeIn(1000).delay(1000).removeClass("hide");
  $("#designer").fadeIn(1500).delay(1200).removeClass("hide");
  $("#doer").fadeIn(2000).delay(1500).removeClass("hide");

  // Add home button to navbar when home page not displayed
  var headerHeight = $("header").height();
  $(window).scroll(function() {
    var wScroll = $(window).scrollTop();
    if (wScroll >= headerHeight - 100) {
      $("a.brand-logo").fadeIn(350).removeClass("hide");
    } else {
      $("a.brand-logo").fadeOut(350).addClass("hide");
    }
  });
});

// var home = document.getElementById("home");
// var dimensions = home.getClientRects()[0];
// var pattern = Trianglify({
//     width: dimensions.innerWidth,
//     height: dimensions.innerHeight,
//     cell_size: 40, 
//     seed: 'ywn3w', 
//     x_colors: 'random'
// });

// home.appendChild(pattern.canvas());
