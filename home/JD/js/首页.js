$(function(){
    var H = $('.xxk .floorF').height(); 
    var Top = $('.xxk').offset().top; 
    $(window).scroll(function(){
        if($(document).scrollTop() > Top){ 
            $('.LocationFloorList').slideDown('slow');
        }else{
            $('.LocationFloorList').slideUp('slow');
        }
    });
    $('.LocationFloorList').on('mouseover','li',function(){   
    $(this).addClass('ac').siblings().removeClass('ac');
        var Height = H*($(this).index())+Top;
        $('document,body').stop().animate({'scrollTop':Height},400);
    })

	$('#popup').animate({'margin-top':'0px'},2000,function(){
		$('#popup').delay(2000).animate({'margin-top':'-520px'},2000)
	})
	
	
	
	
	
})
