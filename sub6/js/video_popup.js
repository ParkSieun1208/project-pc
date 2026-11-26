
  var video_src=[
    'https://www.youtube.com/embed/T4hXZnXMKaU', 
    'https://www.youtube.com/embed/KEWd0JitU8Y', 
    'https://www.youtube.com/embed/0RTG3GfgvPI', 
    'https://www.youtube.com/embed/JzE3fqVuXZc',
    'https://www.youtube.com/embed/NIOfMOrCgEk',
    'https://www.youtube.com/embed/xpaPoULJuVA'
  ];

 
  $('.video_grid .video_item a').click(function(e){   //각각의 메뉴를 클릭하면
      e.preventDefault();

      var ind = $(this).index('.video_grid .video_item a');  // 0 1 2 3
      $('.modal_box').fadeIn('fast');  //모달박스 연다

      $('.popup iframe').attr('src', video_src[ind]); //클릭한 메뉴에 해당하는 index+1 ->이미지 경로 변경

  });

  $('.modal_box').click(function(e){
      e.preventDefault();
      $('.modal_box').fadeOut('fast');
      $('.popup iframe').attr('src', ''); //모달팝업 닫을 때 영상의 경로 강제 제거!
  });

