
{
//初期設定的な？
function eventCalendar() {
        return $('#calendar').fullCalendar({ });
      };
//before_cacheタグからFullCalendarを削除します。
      function clearCalendar() {
        $('#calendar').fullCalendar('delete');
        $('#calendar').html('');
      };
}


 // let eventLists = []

$(document).on('turbolinks:load', function(){
  'use strict';
  var calendarEl = document.getElementById('calendar');

      //  var aaa = [
      //   {
      //     title: "イベント",
      //     start: "2019-07-07",
      //   },
      //      {
      //     title: "イベント2",
      //     start: "2019-07-08",
      //   }
      // ]


  $('#calendar').fullCalendar({
    // events: '/events.json',

    titleFormat: 'YYYY年 M月',
    dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
    header: {
        right: 'month,agendaWeek,agendaDay,listMonth, today prev,next ',
        center: 'title',
        left: 'addEventSource'
        // このlistのとこに達成したタスクかけたらいいな？
      },
       //終了時刻がないイベントの表示
      defaultTimedEventDuration: '03:00:00',
      buttonText: {
          prev: '前',
          next: '次',
          prevYear: '前年',
          nextYear: '翌年',
          today: '今日',
          month: '月',
          week: '週',
          day: '日'
      },

      //イベントの時間表示 24h
      timeFormat: "HH:mm",
      timezone: 'Asia/Tokyo',
      eventColor: '#63ceef',//イベントの色変える
      eventTextColor: '#000000', //イベント文字色
      eventLimit: true, // イベント増えた時にリンクボタン表示
      editable: true, //tureにしないと一生動かないんだなフルカレンダー
      slotEventOverlap: true,
      minTime: "00:00:00",
      maxTime: "24:00:00",
      eventLimit: true,
      editable: true,
      slotEventOverlap: true, //イベントの見た目おを重ねるのか重ねないのか
      slotLabelFormat:"HH:mm",
      selectable: true,// カレンダー空白部分のドラッグおk
      selectHelper: true, // trueでと範囲設定可能
      selectMinDistance: 1, //設定した間を超えたらドラッグイベントにするからよろしく！

      // events: function(start, end, timezone, callback) {
      // // ページロード時に表示するカレンダーデータ取得イベント
      // },



      eventClick: function(calEvent, jsEvent, view) {
        // var modal =
         // '<a role="button" class="close" data-whatever="modal">閉じる</a>';
        $('#m_title').html(calEvent.title);
        $('#m_body').html(calEvent.event_body);
        // $('#calendarModal').modal();
      },
      droppablr: true,


      events: {
        url: '/events',
        method: 'GET',
      },
      dayClick: function(date, allDay, jsEvent, view) {
        var title = prompt('予定を入力してください:');
         
        $('#calendar').fullCalendar('addEventSource', [{
          id: date,      //datexが持つ日付
          title: title,
          start: date,　//日付
          // allDay: true, //これ何かよくわかってないあとで調べる
          }]);
        var data ={
          event:{
            id: date,      //datexが持つ日付
          title: title,
          start: date,
          }
        }


       var nowDate = moment(date._i).format()

        console.log(nowDate);


        $.ajax({
          type: "POST",
          url: "/events",
          data: {
           event:{
              title: title,
              start:  nowDate,
            }
          },
          dataType: 'json'
        })



        },

      select: function(start, end) {
       // カレンダー空白部分をドラッグして範囲指定した時のイベント
        var pro = prompt('へーーーい！');
        alert(pro);
      },
       eventRecieve: function(event){
        let event_id = event.id
        // 何らかの処理
      console.log(event_id);
      // var update_url = "/events/"+ id;
      // var v_event_name=$("#dialog-form input#event_name").val();
      // var v_event_day_from=$("#dialog-form input#event_day_from").val();
      var now = $('modal').val();
      // var data ={
      //   event: {
      //     title: event.title,
      //     allday: false
      //     // now: now
      //   }
      // }

      // var data = html(calEvent.title).val();
      console.log(id);
      // $.ajax({
      //   type: "POST",
      //   url: "/events/",
      //   title: {
      //     event:{
      //       title: title,
      //       start: date,
      //     }
      //   },
      //   dataType: 'json'
      // })


      },

      eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) {
        alert("移動しました");
        }
      });

// ここでフルカレンダーのidを取得する必要があるんだわな
        // var id = $(this).attr('id');
      //   console.log(event_id);
      // // var update_url = "/events/"+ id;
      // var event_id ={
      //   event: {
      //     title: event.title,
      //     allday: false
      //   }
      // }
      // console.log(id);
      // $.ajax({
      //   type: "POST",
      //   url: "/events/",
      //   data: {
      //     event:{
      //       event_title: event
      //     }
      //   },
      //   dataType: 'json'
      // })





      //  // 保存ボタンを押した時のイベント
      // $( "#btn_save" ).click(function() {
      // // 入力情報の取得
      // var v_event_name=$("#dialog-form input#event_name").val();
      // var v_event_day_from=$("#dialog-form input#event_day_from").val();

      //   $("#calendar").fullCalendar('addEventSource', [{
      //     title: v_event_name,
      //     start: v_event_day_from,
      //   }]);

      //   $("#dialog-form").modal('hide');

      //   });

      $('.button_x').click(function(e){
        e.preventDefault();

        var id = $(this).attr('id');
        console.log(id);
//id取得まで行けてるんだけど空なんだな。そりゃそうだわ、、だって保存できてないもんな^_^;;;;;

        $.ajax({
          type: 'DELETE',
          url: '/events/'+ id,
          data: {
            id: id,
          }
        })
        .fail(function(data){
          alert('error!')
        });
      });







});