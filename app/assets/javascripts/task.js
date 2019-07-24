$(document).on('turbolinks:load', function(){
$(function() {
"use strict";
  //セレクタの中身を新規に作る作業
  function buildHTML(task) {
    var html = $('<li class="task" id="'+task.id+'">').append(task.task_body);
    return html;
  }

    $('.js-form').on('submit', function(e) {
      e.preventDefault();

      var textField = $('#task2');
      var task = textField.val();
      if (!task) {
        alert('タスクが空！だよ！');
        (this).disabled = 'false';
        return;
      }
      var task_limit = $('#task1').val()
      //js-formに入力された値を取得しつつ代入
      //$.ajax関数→戻り値として XMLHttpRequestオブジェクトを返す。
      //情報の指定（dataに格納）
      //送信先,データの型Json
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
        dataType: 'json'
      })

      .done(function(data) {
        var html = buildHTML(data);
        console.log(data);
        // $(this).css(.task_table);
        $('.tasks').append(html).addClass('task_table');
        //$.append関数、操作後DOMに要素が追加された状態になる。
        //tasksに引数で指定したdataのHTML要素を追加。
        console.log(data.id);

        $('.form__submit').attr('disabled', false);
        //('disabled', false);でボタンをもう一度押せるようにしている。
        var button = $(`<a href="" class="done-button" data-id=${data.id}>`).append('done');
        // var btn = $(`<a href="" class="x-button" data-id=${data.id}>`).append('x');
        // $('.task').last().append(btn);
        $('.task').last().append(button);
        // .lastをつけることで最後の要素のみにdoneを追加。
        textField.val('');
      })
      .fail(function() {
        alert('タスクがつくれないよ！');
        $('.form__submit').attr('disabled', false);
        });
      });

  $(document).on('click', '.done-button', function(e) {
    e.preventDefault();
    $(this).remove();
    //removeでdoneリンクを消す。
    var id = $(this).data('id');
    //↑task.idを取り出す。
    //↓青色にする。
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
    var id = $(this).parent().attr('id');
    //parent()をつけることで親要素のidをとれる。
    console.log(id);

    $.ajax({
          type: 'DELETE',
          url: '/tasks/'+ id,
          data: {
            id: id, //消すだけだからidだけ渡せればおk。
          }
        })

    .fail(function(data) {
      alert('うまく消せませんでした；');
      });
    });
  });

  $(document).on('click', '.done-b , .done-button' ,function(e){
    e.preventDefault();
    let point = Number($('#point_up').html())
      console.log(point);
      point += 1;
      $('#point_up').html(point);

    // reloadじゃなくて下でうまく渡せるなら下で渡したいです。。。
      location.reload();
    // const exp_up = $('#exp_up');
    // let exp = exp_up.attr('value');
    // let exp_box = exp_up.attr('max');
    // let level = $('.lv_up').data('level');
    // console.log(level);
    // console.log(exp);
    // console.log(exp_box);
    // exp += 5;
    // $('progress').html('value=' , 'exp');


    if(exp > exp_box){
      level += 1;
      $('.lv_up').html(level);
    }

  });

 $('.top-form').on('click', '.top-submit', function(e){
    e.preventDefault();
    var top = $('#task0').val()
    console.log(top);

    $.ajax({
      type: 'POST',
      url: '/tasks/top',
      data: {
         task: {
          top_task: top,
        }
      },
      dataType: 'json'
    })

  .done(function(data) {
    console.log(data);
    location.reload();

    $('.to').html(top);
      })
  .fail(function() {
    alert('わはは^__^');
    $(".top-submit").attr("disabled", false);
    });
  });

  $('#top_done').click(function(e){
    e.preventDefault();
    let id = $(this).data('id');
    $(this).remove();
    $(`#${id}`).addClass('blue');
    console.log(id);

  $.ajax({
    type: 'PATCH',
    url: '/tasks/'+ id + '/top',
    data: {
      task:{
        top_btn: true,
      }
    },
    dataType: 'json'
  })
 });

});