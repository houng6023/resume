
//  $(".section1 .slide_group").slick({
//    autoplay: true, // 자동재생
//    autoplaySpeed: 3000, // 간격시간
//    dots: true, // 동그라미버튼
//    pauseOnFocus: false, // 동그라미번호버튼 클릭시 자동실행 멈춤여부
//    prevArrow: '<button class="prev"><i class="fas fa-angle-left"></i></button>',
//    nextArrow: '<button class="next"><i class="fas fa-angle-right"></i></button>',
//  })

var homeNear = $('#home').offset().top
var aboutNear = $('#aboutme').offset().top
var portNear = $('#works').offset().top
var skillNear = $('#skills').offset().top
// var contlNear = $('#contact').offset().top
var lastNear = $('body').innerHeight() - $(window).height()


 $('.depth1 li').on('click',function(e){
     e.preventDefault()
     $(this)
     .addClass('on')
     .siblings().removeClass('on')
     var num = $(this).index()

     //네이브 클릭시 스르르 그 영역으로 감
     switch(num){
        case 0 : $('html').stop().animate({scrollTop:0},700); break;
        case 1 : $('html').stop().animate({scrollTop:aboutNear},700); break;
        case 2 : $('html').stop().animate({scrollTop:skillNear},700); break;
        case 3 : $('html').stop().animate({scrollTop:portNear},700); break;
        case 4 : $('html').stop().animate({scrollTop : lastNear}, 700)
    
    }
    
 })

// 화면 위치가 달라짐에 따라 네이브가 자동으로 그페이지에 불을 켜준다
 $(window).on('scroll',function(){
    var sct = $(this).scrollTop()
    if( sct < aboutNear) {
        $('.depth1  li ').eq(0).addClass('on')
        .siblings().removeClass('on')
    } else if(sct >=aboutNear && sct<skillNear) {
        $('.depth1  li').eq(1).addClass('on')
        .siblings().removeClass('on')
        $('#skills .skillcont').removeClass('on')
    } else if(sct >=skillNear && sct<portNear) {
        $('.depth1  li').eq(2).addClass('on')
        .siblings().removeClass('on')
        $('#skills .skillcont').addClass('on')
    } 
    else if(sct >=portNear && sct<lastNear) {
        $('.depth1  li').eq(3).addClass('on')
        .siblings().removeClass('on') 
    }else  {
        $('.depth1  li').eq(4).addClass('on')
        .siblings().removeClass('on') 
    }
})




// 마우스휠을 내리고 올릴떄 스르르 자동으로 가게하는거! .stop()필수!
$('section > div.section').on('mousewheel',function(e, delta){
    // 0보다 크면 위로,0보다 작으면 아래도
    if (delta>0){
        var prev = $(this).prev().offset().top
        $('html').stop().animate({scrollTop:prev}, 500, 'linear')
        

    }else if(delta<0) {
        var next = $(this).next().offset().top
        $('html').stop().animate({scrollTop:next}, 500, 'linear')
        
    }


})   
 




// 갤러리 이미지 클릭시 이미지가 커지면서 한번더 클릭하면 그것에 대한 랑크로 들어감
// 닫기 비포 넥스트도 있음 
var linum;
$('#works li').on('click',function(e){
    e.preventDefault()

    linum = $(this).index()
    var href = $(this).find('a').attr('href')
    var src = $(this).attr('data-src')
    // var alt = $(this).find('img').attr('alt') 

    $('body').append('<div class="outbox"><div class="inbox"></div></div>')

    $('.outbox').css({
        position:'fixed', top:0, left:0, bottom:0, right:0,
        zIndex:'999999',background:'rgba(0,0,0,0.8)'
    })
    $('.inbox').css({
        position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)'
    }).append(`<a href="${href}" target="_blank"><img src="${src}" alt=" "></a>`)
    .append('<button class="close"><i class="fas fa-times-circle"></i></button>')
    .append('<button class="arrow prev"><i class="fas fa-angle-left"></i></button><button class="arrow next"><i class="fas fa-angle-right"></i></button>')
    $('.close').css({
        position:'absolute', top:'-10px' ,right:'-10px',
        background:'none', border:'none', fontSize:'40px',color:'#fff'
    })
    $('.inbox .prev').css({
        position:'absolute', top:'50%' ,left:'50%', marginLeft:'-330px', marginTop:'-20px',
        background:'none', border:'none', fontSize:'40px',color:'#fff'
    })
    $('.inbox .next').css({
        position:'absolute', top:'50%' ,right:'50%', marginRight:'-330px', marginTop:'-20px',
        background:'none', border:'none', fontSize:'40px',color:'#fff'
    })
})

$('body').on('click','.inbox .close, .outbox',function(){
    $('.outbox').remove()

})

$('body').on('click', '.inbox', function(e){
    e.stopPropagation()
})



// 넥스트 비포 버튼을 클릭하면 이동한다.
function works(indexnum){
    var href = $('#works li').eq(indexnum).find('a').attr('href')
    var src = $('#works li').eq(indexnum).attr('data-src')
    $('.inbox').find('a').attr({href:href})
    $('.inbox').find('img').attr({src:src})

}

$('body').on('click','.inbox .next', function(){
    linum++
    if(linum>3){
        linum=0
    }
    works(linum)
})


$('body').on('click','.inbox .prev', function(){
    linum--
    if(linum<0){
        linum=3
    }
    works(linum)

   
})

