$(document).on('turbolinks:load', function(){
"use strict";
  $('.about-head').click(function(e){
    e.preventDefault();
    $('#about-side').animate( { width: 'toggle' }, '300' );
    $('.about_li').fadeToggle() ;
  });

  $('a[href^="#"]').click(function(e){
    e.preventDefault();

    let speed =  700;
    let  href = $(this).attr('href');
    let target = $(href === "#" || href === "" ? 'html' : href );
    let position = target.offset().top;
    $("html,body").animate({scrollTop:position}, speed, 'swing');
  });

});

