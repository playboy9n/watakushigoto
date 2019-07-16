$(document).on('turbolinks:load', function(){
$(function() {
"use strict";
// moment.locale('ja');
// var today = moment().format("YYYY-MM-DD HH:mm:SS");

  function buildHTML(task) {
    //セレクタの中身を新規に作るという意味
    var html = $('<li class="task" id="'+task.id+'">').append(task.task_body);
    return html;
  }
    //フォーム（js-from）が送信された時に処理
    $('.js-form').on('submit', function(e) {
      e.preventDefault();
      var textField = $('#task2'); //js-form__text-fieldを代入
      var task = textField.val();
      var task_limit = $('#task1').val()//js-form__text-fieldのフォームに入力された値を取得、代入
      //$.ajax関数→戻り値として XMLHttpRequestオブジェクトを返す。
      //情報の指定（dataに格納）、送信先、データの型（Json）
      console.log(task);
      console.log(task_limit);
      $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
          task: {
            task_body: task,
            limit_date: task_limit ,
          }
        },
        dataType: 'json' //データをjson形式で飛
      })
      //↓フォームの送信に成功
      .done(function(data) {
        var html = buildHTML(data);
        console.log(data);
        $('.tasks').append(html); //$.append関数、操作後DOMに要素が追加された状態になる。
        //tasksに引数で指定したdataのHTML要素を追加。
        console.log(data.id);

        $(".form__submit").attr("disabled", false); //これでボタンをもう一度押せるようにしてる
        var button = $(`<a href="" class="done-button" data-id=${data.id}>`).append('done');
        // var button = $(`<a href="" class="done-button" data-id=${data.id}>`).addClass('x-button');
        // $('.task').append(button);
        // .lastをつけることで最後の要素にdoneを追加している。
        $('.task').last().append(button);
        textField.val('');
      })
      .fail(function() {
        alert('error');
        });
      });


  $(document).on('click', '.done-button', function(e) {
    e.preventDefault();
    $(this).remove();  //doneボタン削す
    var id = $(this).data('id');  //task.idを取り出す
    $(`#${id}`).addClass('blue');  //青色に変更
    console.log(id);
    $.ajax({
      type: 'PATCH',
      url: '/tasks/'+ id,
      data: {
        task: {
          done: true,
        }
      },
        dataType: 'json'
      })
  })
 $('.done-b').click(function(e){
    e.preventDefault();
    var id = $(this).parent().attr('id');
    $(this).remove();
    $(`#${id}`).addClass('blue');
    console.log(id);

 $.ajax({
      type: 'PATCH',
      url: '/tasks/'+ id,
      data: {
        task: {
          done: true,
        }
      },
        dataType: 'json'
      })
  })

  $('.x-button').click(function(e){
    e.preventDefault();
    var id = $(this).parent().attr('id'); //親要素のidをとった
    console.log(id);

    $.ajax({
          type: 'DELETE',
          url: '/tasks/'+ id, //この書き方でid渡せる
          data: {
            id: id, //消すだけだからidだけ渡せればいい
          }
        })

    .fail(function(data) {
      alert('error!');
      });
    });
  });

  $(document).on('click', '.done-b , .done-button' ,function(e){
  e.preventDefault();
   var point = Number($('#point_up').html())
      console.log(point);
      point += 1;
      $('#point_up').html(point);
  });
});
