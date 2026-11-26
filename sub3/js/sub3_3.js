// JavaScript Document

$(document).ready(function(){
    $('.tab_panel:eq(0)').show();              // 첫번째 탭 내용만 열어라
    $('.stock_tab a:eq(0)').addClass('active'); // 첫번째 탭메뉴 활성화

    $('.stock_tab a').click(function(e){
          e.preventDefault();   // <a> href="#" 값을 강제로 막는다

          var ind = $(this).index('.stock_tab a');  // 클릭시 해당 index를 뽑아준다

          $('.stock_tab a').removeClass('active'); // 모든 탭메뉴를 비활성화
          $(this).addClass('active');              // 클릭한 해당 탭메뉴만 활성화

          $('.tab_panel').hide();                  // 모든 탭내용을 안보이게
          $('.tab_panel:eq('+ind+')').show();      // 클릭한 해당 탭내용만 보여라
    });
});