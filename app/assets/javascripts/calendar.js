
{
  //初期設定的
  function eventCalendar() {
          return $('#calendar').fullCalendar({ });
   };
  //before_cacheタグからFullCalendarを削除する。
  function clearCalendar() {
    $('#calendar').fullCalendar('delete');
    $('#calendar').html('');
  };
}

$(document).on('turbolinks:load', function(){
  'use strict';
  var calendarEl = document.getElementById('calendar');

  $('#calendar').fullCalendar({
    // events: '/events.json',

    titleFormat: 'YYYY年 M月',
    dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
    header: {
        right: 'month,agendaWeek,agendaDay,listMonth, today prev,next ',
        center: 'title',
        left: 'addEventSource'
        // このlistのとこに達成したタスクかけたら最高なんだけどできる？
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
      eventColor: '#63ceef',//イベントの色
      eventTextColor: '#000000', //イベント文字色
      eventLimit: true, // イベント増えた時にリンクボタン表示
      editable: true, //これtureにしないと一生動かないんだなフルカレンダー
      slotEventOverlap: true,
      minTime: '00:00:00',
      maxTime: '24:00:00',
      slotEventOverlap: true, //イベントを重ねるのか重ねないのか
      slotLabelFormat:'HH:mm',
      selectable: true,// カレンダー空白部分のドラッグおk
      selectHelper: true, // trueでと範囲設定可能
      selectMinDistance: 1, //設定した間を超えたらドラッグイベントにするからよろしく！
      droppablr: true,

      events: {
        url: '/events',
        method: 'GET',
      },//これつけないと保存できなかった(これも初期設定)

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
        var nowDate = moment(date._i).format()
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
        },

  eventClick: function(calEvent, jsEvent, view) {

        console.log(calEvent);
        console.log(calEvent.id);
        $('.button_x').attr({id: calEvent.id})
        $('#m_title').html(calEvent.title);
        $('#m_body').html(calEvent.event_body);

        // $('#calendar').fullCalendar('removeEvents', calEvent._id);
         //↑消えるだけでリロードすると戻る
         // if(title && title !=''){
         //  event.title = title;
         //  calendar.fullCalendar('updateEvent', event);
         // }else{
         //  carendar.fullCarendar('removeEvents', event.id);
         // }

      },

      select: function(start, end) {
       // カレンダー空白部分をドラッグして範囲指定した時のイベント
        var pro = prompt('へーーーい！');
        alert(pro);
      },
       eventRecieve: function(event){
        let event_id = event.id
        console.log(event_id);
        var now = $(modal).val();
      },

      eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) {
        alert('移動しました');
        }
      });

    $('#calendarModal').click('show.bs.modal', function(event){
      event.preventDefault();

      console.log($('.button_x').attr('id'));
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