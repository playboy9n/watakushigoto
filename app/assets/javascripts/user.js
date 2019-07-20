$(document).on('turbolinks:load', function(){
  "use strict";
  var meg1 = 'おはようございます！今日も1日がんばるぞい！';
  var msg2 = '朝日浴びると気持ちいいよ！';
  var msg3 = '今日も応援してるよ〜〜';
  var msg4 = '今日も空が綺麗だね〜〜！';
  var msg5 = '午後も楽しもうぞ〜〜';
  var msg6 = '１日も終盤じゃのう';
  var msg7 = '今日も1日お疲れ様じゃ〜！';
  var msg8 = 'おやすみだよ！ゆっくり休んでね！';

  var now = new Date();
  var hour = now.getHours();
    if(hour >= 5 && hour <= 6){
      $('#tom_speak').html(msg1);
    }else if(hour >= 7 && hour <= 8){
      $('#tom_speak').html(msg2);
    }else if(hour >= 9 && hour <= 11){
      $('#tom_speak').html(msg3);
    }else if(hour >= 12 && hour <= 13){
      $('#tom_speak').html(msg4);
    }else if(hour >=14 && hour <= 17){
      $('#tom_speak').html(msg5);
    }else if(hour >= 18 && hour <= 21){
      $('#tom_speak').html(msg6);
    }else if(hour >= 22 && hour <= 23){
      $('#tom_speak').html(msg7);
    }else{
      $('#tom_speak').html(msg8);
    }
});


