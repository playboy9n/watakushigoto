$(function() {
  $('.attach_filed').on('change', function(e) {
    let file = e.target.files[0];

    // ファイルのブラウザ上でのURLを取得する
    let blobUrl = window.URL.createObjectURL(file);

    // img要素に表示
    $('.preview_cicle').attr('src', blobUrl);
  });
});
