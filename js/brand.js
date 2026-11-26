const brandButtons = document.querySelectorAll('.brand_selection button');

const brandInfo = document.querySelector('.brand_info');
const brandTitle = brandInfo.querySelector('h4');
const brandText = brandInfo.querySelector('p');
const brandImg = document.getElementById('brandImg');
const brandUrl = document.getElementById('brandUrl');


const brandData = {
    sansim: {
        title: 'Sansim',
        text: '전통한방 원료와 현대 기술의 만남.<br>스킨케어부터 바디케어까지,<br>자연 그대로의 순환 케어를 제안합니다.',
        imgurl : './images/brandsansim.jpg',
        url:'./sub2/sub2_1.html'
    },

    judanhak: {
        title: 'Judanhak',
        text: '쥬단학 브랜드의 간단한 설명을 넣을 예정입니다.',
        imgurl : './images/brandsansim2.jpg',
        url:'./sub2/sub2_2.html'
    },

    'hyo-um': {
        title: 'HYOUM',
        text: '효움 브랜드의 간단한 설명을 넣을 예정입니다.',
        imgurl : './images/brandsansim3.jpg',
        url:'./sub2/sub2_3.html'
    }
};


brandButtons.forEach(function(button){

    button.addEventListener('click', function(){

        // 모든 버튼에서 active 제거
        brandButtons.forEach(function(btn){
            btn.classList.remove('active');
        });

        // 클릭한 버튼에 active 추가
        button.classList.add('active');

        // 클릭한 브랜드 확인
        const brandName = button.dataset.brand;

        // 해당 브랜드 정보 가져오기
        const data = brandData[brandName];

        // 왼쪽 브랜드 설명 변경
        brandTitle.textContent = data.title;
        brandText.innerHTML = data.text;
        brandImg.src= data.imgurl;
        brandUrl.href = data.url;

    });

});