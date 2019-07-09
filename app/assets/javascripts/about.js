$(document).on('turbolinks:load', function(){
"use strict";
  $('#about-side').click(function(){
    console.log('あとでリンクの形変えないとあかんすw');
    $('li').remove();
    // removeじゃなくてゆっくり左に消える感じに変えるか、、、
  });
});