//初期設定的
function eventCalendar() {
  return $('#calendar').fullCalendar({ });
};
//before_cacheタグからFullCalendarを削除する。
function clearCalendar() {
  $('#calendar').fullCalendar('delete');
  $('#calendar').html('');
};

$(document).on('turbolinks:load', function(){
  'use strict';
  var calendarEl = document.getElementById('calendar');
  var Calendar = FullCalendar.Calendar;
  $('#calendar').fullCalendar({
    titleFormat: 'YYYY年 M月',
    dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
    header: {
      right: 'month,agendaWeek,agendaDay,listMonth,  prev,next ',
      center: 'title',
      left: 'today'
    },
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
    timeFormat: 'HH:mm',
    timezone: 'Asia/Tokyo',
    eventColor: '#FE027E',//イベントの色
    eventTextColor: '#FFF', //イベント文字色
    eventLimit: true, // イベント増えた時にリンクボタン表示
    editable: true, //これtureにしないと一生動かないんだなフルカレンダー
    slotEventOverlap: true,
    minTime: '00:00:00',
    maxTime: '24:00:00',
    slotEventOverlap: true, //イベントを重ねるのか重ねないのか
    slotLabelFormat:'HH:mm',
    selectable: true,// カレンダー空白部分のドラッグおk
    selectHelper: true, // 範囲設定可能
    selectMinDistance: 1, //設定した間を超えたらドラッグイベントにするからよろしく！
    droppablr: true,

    events: {
      url: '/events',
      method: 'GET',
    },//これつけないと保存できなかった！(これも初期設定)

    select: function(start, end, ev) {
      console.log(
        '--select\n' +
        'start: ' + start.format() + '\n' +
        'end: ' + end.format()
      );
      if (ev) {
      }
    },

    dayClick: function(date, allDay, jsEvent, view) {
      var title = prompt('予定を入力してください:');
      $('#calendar').fullCalendar('addEventSource', [{
        id: date,
        title: title,
        start: date,
        // allDay: true, //これ何かよくわかってないあとで調べる
      }]);

      var data ={
        event:{
          id: date,
          title: title,
          start: date,
        }
      }
      var nowDate = moment(date._i).format();
      console.log(nowDate);
      console.log(data);
      $.ajax({
        type: 'POST',
        url: '/events',
        data: {
         event:{
          title: title,
          start:  nowDate,
          }
        },
        dataType: 'json'
      })
      .fail(function() {
        alert('文字を入力してね！');
        $(".form__submit").attr("disabled", false);
        });
    },


    eventClick: function(calEvent, jsEvent, view) {
      console.log(calEvent);
      var id = $('.button_x').attr({id: calEvent.id});
      var start = moment(event.start).format('Y-MM-DD HH:mm:ss');
      var title = $('#m_title').html(calEvent.title);
      $('#m_body').html(calEvent.event_body);
      },

    eventDrop: function(event, delta, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
      alert('移動しました');
      var id = event.id;
      var start = moment(event.start).format('Y-MM-DD HH:mm:ss');
      $.ajax({
        type: 'PATCH',
        url: '/events/'+ id,
        data: {
         event:{
          title: event.title,
          start: start,
          }
        },
        dataType: 'json'
      })
      }
    });

  $('#calendarModal').click('show.bs.modal', function(event){
    event.preventDefault();
    var x_btn = $(event.relatedTarget);
    var recipient = x_btn.data('whatever');
    var id = $('.button_x').attr('id');

    $.ajax({
      type: 'DELETE',
      url: '/events/'+ id,
      data: {
        id: id,
      }
    })
  });
});