"use strict";
$(document).on('turbolinks:load', function(){
  let msg1 = new Array(
    'おはようございます！今日も1日がんばるぞい！'.split(''),
    'しっかり寝れましたか？'.split(''),
    '今日の目標はなんですか！！！'.split(''),
    '二度寝もたまには良いですね^_^'.split(''),
    '朝ごはんが楽しみですね~^'.split(''));

  let msg2 = new Array(
   '朝日浴びると気持ちいいよ！',
   '朝ごはんはなんでしたか？私はいつもパンです！',
   '早起きはいいですね〜〜〜',
   '今日もバッチリですね^^');

  let msg3 = new Array(
   '今日も応援してるよ〜〜',
   'どんどんタスクを達成しちゃいましょう！！',
   '水分をしっかりとってね~^',
   '悩んだらスキップしてみて〜〜！');

  let msg4 = new Array(
   '今日も空が綺麗だね〜〜！',
   'お昼ご飯は食べましたか？？',
   '今日はお昼寝する？',
   '元気一杯午後も応援してます！');

  let msg5 = new Array(
    '午後も楽しもうぞ〜〜',
    'おやつは食べましたか？お菓子最高っす！',
    '夕方は何しようか！',
    '夜まで全力だ〜〜〜',
    '1本満足？');

  let msg6 = new Array(
    '１日も終盤じゃのう',
    'もう暗くなってきたね！夜も満喫じゃ〜〜！',
    '一生懸命でえらい！！！！',
    'ちゃんと休憩とってね＾_＾!',
    '1日１膳以上完璧ですね！！');

  let msg7 = new Array(
    '今日も1日お疲れ様じゃ〜！',
    '大丈夫！私が味方です^_＾',
    '星は見えますか？',
    '好きな飲み物でも飲んでリラックスしましょう！',
    'ほかほか布団が待ってる！');

  let msg8 = new Array(
   'おやすみだよ！ゆっくり休んでね！',
   '遅くまで起きてちゃダメだよ〜〜！',
   'もしかしてもう起きたのですか！！',
   '今日も楽しいこと見つけちゃおうぜ！',
   'いい夢みれた？');

  let now = new Date();
  let hour = now.getHours();

  let i = 0;


    if(hour >= 5 && hour <= 6){
    let Rnd1 = Math.floor( Math.random() * msg1.length );
      $('#tom_speak').html(msg1[Rnd1]);

    }else if(hour >= 7 && hour <= 8){
    let Rnd2 = Math.floor( Math.random() * msg2.length );
      $('#tom_speak').html(Array.from(msg2[Rnd2]));

    }else if(hour >= 9 && hour <= 11){
    let Rnd3 = Math.floor( Math.random() * msg3.length );
      $('#tom_speak').html(msg3[Rnd3]);

    }else if(hour >= 12 && hour <= 13){
    let Rnd4 = Math.floor( Math.random() * msg4.length );
      $('#tom_speak').html(msg4[Rnd4]);

    }else if(hour >=14 && hour <= 17){
    let Rnd5 = Math.floor( Math.random() * msg5.length );
      $('#tom_speak').html(msg5[Rnd5]);

    }else if(hour >= 18 && hour <= 21){
    let Rnd6 = Math.floor( Math.random() * msg6.length );
      $('#tom_speak').html(msg6[Rnd6]);

    }else if(hour >= 22 && hour <= 23){
    let Rnd7 = Math.floor( Math.random() * msg7.length );
      $('#tom_speak').html(msg7[Rnd7]);

    }else{
    let Rnd8 = Math.floor( Math.random() * msg8.length );
      $('#tom_speak').html(msg8[Rnd8]);
    }

});


