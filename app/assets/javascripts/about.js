$(document).on('turbolinks:load', function(){
"use strict";
  $('.about-head').click(function(e){
    e.preventDefault();
    $('#about-side').animate( { width: 'toggle' }, 'slow' );
  });
});