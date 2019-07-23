// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require bootstrap-sprockets
//= require_tree .
//= require jquery
//= require jquery_ujs

$(document).on('click', '#watakushigoto', function(e) {
  e.preventDefault();
  var user_link = $('#mypage_li, #logout_li, #about_li');
  $('.dark').fadeIn('slow');
  user_link.fadeIn();

  user_link.mouseover(function(){
      $(this).css('opacity', '.1').animate({'opacity': '1'}, '1');
  });

  $('.dark').click(function(){
   $(this).fadeOut('slow');
   user_link.hide();
  });

});
