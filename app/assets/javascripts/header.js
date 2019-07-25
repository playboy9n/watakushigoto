$(document).on('click', '#watakushigoto', function() {
  let userLink = $('#mypage_li, #logout_li, #about_li');
  $('.dark').fadeIn('slow');
  userLink.fadeIn();

  $('#friend').fadeOut();

  userLink.mouseover(function(){
      console.log('test');
      $(this).css('opacity', '0.1');
  });
  userLink.mouseout(function(){
    $(this).css('opacity', '1');
  });


  $('.dark').click(function(){
   $(this).fadeOut('slow');
   userLink.hide();
   $('#friend').fadeIn();
  });

});
