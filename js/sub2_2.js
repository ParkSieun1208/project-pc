$(function(){

    /* ===== 공통 헤더, 푸터 ===== */
    $('#headerArea').load('../common/sub_header.html',function(){
        $.getScript('../js/fullnav.js');
    });
    $('#footerArea').load('../common/sub_footer.html',function(){
        $.getScript('../js/select.js');
    });


    /* ===== 링크 파라미터 받기 (./sub2_2.html?pname=쥬단학 제품명) ===== */
    var key, value;

    function getParams(){
        // 현재 페이지의 url   ./sub2_2.html?pname=쥬단학 제품명
        var url = decodeURIComponent(location.href);
        if(url.indexOf('?') == -1){ return; }   // 파라미터가 없으면 그대로 종료

        // '?' 이후의 문자열만 자르기 -> 'pname=쥬단학 제품명'
        var params = url.substring(url.indexOf('?')+1, url.length);
        key = params.split('=')[0];     // 'pname'
        value = params.split('=')[1];   // '쥬단학 제품명'
    }
    getParams();


    /* ===== ajax 처리 ===== */
    $.ajax({
        url: './js/jutanhak.json',
        dataType: 'json',
        success: function(data){
            var useData = data.sam;   // 객체배열을 담아 놓는다
            var newArray = [];        // 검색된 객체배열
            var search_on = false;    // 검색 안되었을때 false, 검색 되었을때 true


            /* --- 제품 리스트 출력 (검색 결과) --- */
            function dataPrint(arr){
                var txt = '';

                for(var i in arr){
                    var $Name = arr[i].Name;
                    var $Price = arr[i].Price;
                    var $Descript = arr[i].Descript;
                    var $Image = arr[i].Image;

                    txt += '<li>';
                    txt += '<img src="'+ $Image +'" alt="">';
                    txt += '<dl>';
                    txt += '<dt>'+ $Name +'</dt>';
                    txt += '<dd>'+ $Price.toLocaleString() +'원</dd>';
                    txt += '<dd>'+ $Descript +'</dd>';
                    txt += '</dl>';
                    txt += '<a href="#" class="pop_open">more</a>';
                    txt += '</li>';
                }

                $('#searchResult').html(txt);
                $('#searchEmpty').attr('hidden', arr.length !== 0);
            }

            // 초기실행, 함수호출
            if(key == 'pname' && value){
                // 다른 곳에서 링크로 넘어왔을 때 -> 해당 검색어로 바로 검색
                $('#searchTitle').val(value);
                newArray = useData.filter(function(element){
                    return element.Name.includes(value);
                });
                dataPrint(newArray);
                search_on = true;
                $('html, body').animate({scrollTop: $('.brand_search').offset().top}, 400);
            }else{
                dataPrint(useData);
                search_on = false;
            }


            /* --- 검색 --- */
            function doSearch(keyword){
                // 전체 배열에서 Name 속성에 검색어를 포함하는 객체만 filter
                newArray = useData.filter(function(element){
                    return element.Name.includes(keyword);
                });
                dataPrint(newArray);
                search_on = true;
            }

            // 검색버튼을 클릭했을때
            $('#btn').click(function(){
                doSearch($('#searchTitle').val().trim());
                closeSuggest();
            });

            // 모두보기 클릭시
            $('.btn_all').click(function(){
                $('#searchTitle').val('');
                closeSuggest();
                dataPrint(useData);
                search_on = false;
            });


            /* --- 연관 검색어 --- */
            function closeSuggest(){
                $('#searchSuggest').attr('hidden', true).empty();
            }

            function printSuggest(keyword){
                if(!keyword){
                    closeSuggest();
                    return;
                }
                var matched = useData.filter(function(element){
                    return element.Name.includes(keyword);
                });
                if(matched.length == 0){
                    closeSuggest();
                    return;
                }
                var txt = '';
                matched.slice(0, 5).forEach(function(p){
                    txt += '<li><button type="button" class="suggest_btn">'+ p.Name +'</button></li>';
                });
                $('#searchSuggest').html(txt).attr('hidden', false);
            }

            // 입력할 때마다 연관 검색어 / Enter 키는 바로 검색
            $('#searchTitle').on('keyup', function(e){
                var keyword = $(this).val().trim();
                if(e.keyCode == 13){
                    doSearch(keyword);
                    closeSuggest();
                }else{
                    printSuggest(keyword);
                }
            });

            // 연관 검색어를 클릭하면 검색창에 채우고 바로 검색
            $('#searchSuggest').on('click', '.suggest_btn', function(){
                var keyword = $(this).text();
                $('#searchTitle').val(keyword);
                closeSuggest();
                doSearch(keyword);
            });

            // 검색창 바깥을 클릭하면 연관 검색어 닫기
            $(document).on('click', function(e){
                if(!$(e.target).closest('.search_box').length){
                    closeSuggest();
                }
            });


            /* --- 상세 팝업 (검색 결과) --- */

            // 홈페이지 링크 : 어떤 제품이든 같은 주소로 이동 (바꿀 때는 이 한 줄만 수정)
            var homeUrl = 'https://www.jutanhak.co.kr/main/main.jsp';

            function popchange(obj){   // 팝업창에 내용을 출력하는 함수
                $('.popup_img').css('background-image','url('+ obj.pop_img +')');
                $('.p_en').text(obj.pop_tit);
                $('.p_title').text(obj.Name);
                $('.p_desc').text(obj.Descript);
                $('.p_price').text(obj.Price.toLocaleString() +'원');
                $('.p_buy').attr('href', homeUrl);
                $('.modal_box, .popup').fadeIn();
                $('.popup_close').focus();
            }

            // 팝업창 열기 (검색 리스트의 more)
            $(document).on('click', '.pop_open', function(e){
                e.preventDefault();
                var ind = $(this).parent('li').index();

                if(search_on == false){        // 검색 안되었을때
                    popchange(useData[ind]);   // 클릭한 인덱스에 맞는 객체만 전달
                }else if(search_on == true){   // 검색 되었을때
                    popchange(newArray[ind]);
                }
            });

            // 팝업창 닫기
            function closePopup(){
                $('.modal_box, .popup').fadeOut();
            }
            $('.modal_box, .popup_close').click(closePopup);

            $(document).keydown(function(e){
                if(e.keyCode == 27 && $('.popup').is(':visible')){
                    closePopup();
                }
            });


            /* --- 대표 제품 (best 값이 'Y'인 제품만) --- */
            var bestData = useData.filter(function(element){
                return element.best == 'Y';
            });

            var best = '';
            for(var j in bestData){
                best += '<li>';
                best += '<div class="best_img"><img src="'+ bestData[j].pop_img +'" alt=""></div>';
                best += '<div class="best_info">';
                best += '<p class="best_en">'+ bestData[j].pop_tit +'</p>';
                best += '<h4>'+ bestData[j].Name +'</h4>';
                best += '<p class="best_txt">'+ bestData[j].Descript +'</p>';
                best += '<p class="best_price">'+ bestData[j].Price.toLocaleString() +'원</p>';
                best += '<a href="'+ homeUrl +'" target="_blank">제품 보러가기</a>';
                best += '</div>';
                best += '</li>';
            }
            $('#bestList').html(best);

        }
    });

});