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

    let negi = $('#negi');
    let negimg = $('#negimg');

    negi.mouseover(function(){
      negimg.show()
      $('#about_info').css('cursor', 'pointer')
    });

    $('#about_info').dblclick(function(){
      negimg.fadeOut(2000);
      $('#about_info').css('cursor', 'default')
    })

});
