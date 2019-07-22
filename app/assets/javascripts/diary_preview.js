$(function() {
'use strict';
  $('.attach_filed').on('change', function(e) {
    const d_img = document.getElementById('d_img');
    for(let i = 0; i < e.target.files.length; i++ ){
        // ファイルのブラウザ上でのURLを取得する
    let file = e.target.files[i];
    let blobUrl = window.URL.createObjectURL(file);
    let img = document.createElement('img');
    img.setAttribute('src', blobUrl );
    d_img.appendChild(img);
    }
  });
});