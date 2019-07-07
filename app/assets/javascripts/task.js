

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
          task_body: task
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
      var x_btn  = $(`<a href="" class="x-button">`).append('x');
      // $('.task').append(button);
      // ↑にlastをつけることで最後の要素にdoneを追加している。
      $('.task').last().append(button,x_btn);
      textField.val('');

  })
    //↓フォームの送信に失敗した場合の処理
    .fail(function() {
      alert('error');
    });
  });
  $(document).on('click', '.done-button', function(e) {
    e.preventDefault();  //aタグのリンクを中止
    $(this).remove();  //doneボタンを削除
    var id = $(this).data('id');  //セットしたtask.idを取り出す
    $(`#${id}`).addClass('blue');  //青色に変更
  })

  $('.x-button').click(function(){
    // removeData( [task] );
    var x_btn = $(`<a href="" clsass="done-button" data-id=${data.id} >`).append(data);
    (x_btn).removeData(".task");
// こうやったら消えると思ったけど違うのかな！！！！？？
    $.ajax({
          type: 'delete',
          url: '/tasks',
          data: {
            task: {
              task_body: task
              // limit_date: task
            }
          },
          dataType: 'json'
        })

    });
});
