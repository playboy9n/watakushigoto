
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

    $('.tom_back').dblclick(function(){
      $(this).fadeOut();
    })



    const food = document.getElementById('food');
    const eatA = document.getElementById('eatA');
    const eatB = document.getElementById('eatB');
    const eatC = document.getElementById('eatC');
    const eatD = document.getElementById('eatD');
    let point = document.querySelector('#point_up');
    let currentDroppable = null;

    if (!food) return;
    //この方法だとこれの下に書くと下のも呼ばれなくなるから注意が必要！！

    food.onmousedown = function(event){
      let shiftX = event.clientX - food.getBoundingClientRect().left;
      let shiftY = event.clientY - food.getBoundingClientRect().top;
      food.style.position = 'absolute';
      food.style.zIndex = 1000;
      document.body.append(food);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY){
        food.style.left = pageX - shiftX + 'px';
        food.style.top = pageY - shiftY + 'px';
      }

     if( point.innerHTML >= 5 ){
        function onMouseMove(event) {

          moveAt(event.pageX, event.pageY);

          food.hidden = true;
          let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          food.hidden = false;

          if (!elemBelow) return;

          let droppableBelow = elemBelow.closest('.droppable');
          if (currentDroppable != droppableBelow){
            if(currentDroppable){
              leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
              if (currentDroppable){
                enterDroppable(currentDroppable);
              }
          }
        }
        document.addEventListener('mousemove', onMouseMove);

        food.onmouseup = function(){
          document.removeEventListener('mousemove',  onMouseMove);
          food.onmouseup = null;
        };
      };


    };

    function enterDroppable(elem){
      const idStr = document.querySelector(".current");
      let idNum = idStr.innerHTML;
      let id = parseInt(idNum);
      console.log(point.innerHTML);
      let pointNum = parseInt(point.innerHTML);
      console.log(pointNum);
      // pointNum = pointNum -5;
      food.classList.add('fadeOut');
        $.ajax({
          type: 'PATCH',
          url: '/user/'+ id + '/eat',
          dataType: 'json'
        })
     };

    function leaveDroppable(elem){
      window.setTimeout(mgmg, 10);
      window.setTimeout(mgm, 350);
      window.setTimeout(mg, 550);
      window.setTimeout(m, 650);

      food.style.display = "none";
      eatA.style.display = "block";

      function mgmg(){
        eatA.style.display="none";
        eatB.style.display = "block";
      };

      function mgm(){
        eatB.style.display ="none";
        eatC.style.display = "block";
      };

      function mg(){
        eatC.style.display = "none";
        eatD.style.display = "block";
      };

      function m(){
        eatD.style.display = "none";
      };
    };

    food.ondragstart = function(){
      return false;
    };


});











