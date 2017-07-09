
$(function(){
		$('#thumbPic img').hover(function(){
			var c=$(this).parent().index()+1;
			$('#bigPic img').attr('src','images/image/gold_0'+c+'_big.jpg')
			
		})
		
		
$('#bigPic').mousemove(function(ev){
	var l=ev.pageX-$(this).offset().left-$('#zoom').width()/2;
	var t=ev.pageY-$(this).offset().top-$('#zoom').height()/2;
	
	
	if(l<0){
		l=0;
	};
	if(t<0){
		t=0;
	};
	var max_l=$(this).width()-$('#zoom').width();
	var max_t=$(this).height()-$('#zoom').height();
	if(l>max_l){   
		l=max_l
	};
	if(t>max_t){
		t=max_t
	};
	
	var b=$(this).parent().index()+1;
	$('#bigPic2 img').attr('src','images/image/gold_0'+b+'_Mbig.jpg')
	
	$('#zoom,#bigPic2').show();
	$('#zoom').css({"top":t,"left":l});
	$('#bigPic2 img').css({"top":-t*(800/350),"left":-l*(800/350)});
});


$('#bigPic').mouseout(function(){
	$('#zoom,#bigPic2').hide();
});
		
var n=$('input').value;
$('.addBtn').click(function(){
	n++;
	$('input').value=n;
	if(n>5){
		alert('限购5件');
		$('.changeNum input').value=3;
		n=3;
	};
});
$('.subBtn').click(function(){
	n--;
	$('input').value=n;
	if(n<1){
		alert('限购5件');
		n=1;
		$('.changeNum input').value=1;
	};
});


var c=0
$('.tabList li').click(function(){
	c++;
	c=(c==2)? 0:c;
	$('.tabList li').eq(c).addClass('dc').siblings().removeClass('dc','x_right');
	$('.tabItem').eq(c).css('display','block').siblings().css('display','none')
})




})
