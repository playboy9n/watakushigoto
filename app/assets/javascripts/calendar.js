
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

$(document).on('turbolinks:load', function(){
  'use strict';
  var calendarEl = document.getElementById('calendar');

  $('#calendar').fullCalendar({
    events: '/events.json',

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
        $('#m_title').html(calEvent.title);
        $('#m_body').html(calEvent.event_body);
        $('#m_calender').modal();
      },
      droppablr: true,
      events:[
        {
          title: "イベント",
          start: "2019-07-07",
        }
      ],
      dayClick: function(date, allDay, jsEvent, view) {
        var title = prompt('予定を入力してください:');
         
        $('#calendar').fullCalendar('addEventSource', [{
          id: date,      //datexが持つ日付
          title: title,
          start: date,　//日付
          allDay: true, //これ何かよくわかってないあとで調べる
          }]);
           
        },

      select: function(start, end) {
        // カレンダー空白部分をドラッグして範囲指定した時のイベント
        var pro = prompt('へーーーい！');
        alert(pro);
      },

      eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) {
        alert("移動しました");
        }

      });

          // 保存ボタンを押した時のイベント
      $( "#btn_save" ).click(function() {
      // 入力情報の取得
      var v_event_name=$("#dialog-form input#event_name").val();
      var v_event_day_from=$("#dialog-form input#event_day_from").val();

        $("#calendar").fullCalendar('addEventSource', [{
          title: v_event_name,
          start: v_event_day_from,
        }]);

        $("#dialog-form").modal('hide');

        });
});