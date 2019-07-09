$(document).on('turbolinks:load', function(){
$(function() {
"use strict";
  function buildHTML(task) {
    //セレクタの中身を新規に作るという意味
    var html = $('<li class="task" id="'+task.id+'">').append(task.task_body);
    return html;
  }
    //フォーム（js-from）が送信された時に処理
    $('.js-form').on('submit', function(e) {
      e.preventDefault(); //フォームが送信されフォームを送信するための通信がされてしまう.preventDefault()を使用してデフォルトのイベントを止めます。
      var textField = $('.js-form__text-field'); //js-form__text-fieldを代入
      var task = textField.val(); //js-form__text-fieldのフォームに入力された値を取得、代入
      //$.ajax関数→戻り値として XMLHttpRequestオブジェクトを返す。
      //情報の指定（dataに格納）、送信先、データの型（Json）
      $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
          task: {
            task_body: task,
            // limit_date: task
          }
        },
        dataType: 'json' //データをjson形式で飛
      })
      //↓フォームの送信に成功
      .done(function(data) {
        var html = buildHTML(data);
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
    //↓フォームの送信に失敗した場合の処理
    .fail(function() {
      alert('error');
    });
  });


  $(document).on('click', '.done-button', function(e) {
    e.preventDefault();  //aタグのリンクを中止
    $(this).remove();  //doneボタン削す
    var id = $(this).data('id');  //セットしたtask.idを取り出す
    $(`#${id}`).addClass('blue');  //青色に変更
    // doneの処理
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
});
