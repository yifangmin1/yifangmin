// JavaScript Document
documentReady(function(){
	var navList=document.getElementById('navList');
	var aLiList=navList.getElementsByTagName('li');
	var opopup=document.getElementById('poPup');
	var asection=opopup.getElementsByClassName('section');
	var timer=null;
	for( var i=0; i<aLiList.length; i++){
		aLiList[i].index=i;
		aLiList[i].onmouseenter=function(){
			clearTimeout(timer);
			for( var j=0; j<aLiList.length; j++){
				aLiList[j].className='';
				asection[j].style.display='none';
			};
			this.className='ac';
			asection[this.index].style.display='block';
		};
		aLiList[i].onmouseleave=function(){
			timer=setTimeout(function(){
				for( var j=0; j<aLiList.length; j++){
					aLiList[j].className='';
					asection[j].style.display='none';
				};
			},100)
		};
	};
	opopup.onmouseenter=function(){
		clearTimeout(timer);
	};
	opopup.onmouseleave=function(){
		for( var j=0; j<aLiList.length; j++){
			aLiList[j].className='';
			asection[j].style.display='none';
		};
	};
	
	
	
	var oBanner=document.getElementById('bannerA');
	var bannerList=document.getElementById('bannerList');
	var aLiBanner=bannerList.children;
	aLiBanner[0].style.opacity=1;
	var pBtn=document.getElementById('prevBtn');
	var nBtn=document.getElementById('nextBtn');
	var n=0;
	var timer1=null;
	
	var ol=document.createElement('ol');
	for(var i=0; i<aLiBanner.length; i++){
		ol.innerHTML+='<li>'+ (i+1)+'</li>';
	};
	oBanner.appendChild(ol);
	var aBtn=ol.children;
	aBtn[0].className="ac";
	
	function moveImg(){
		clearInterval(timer1);
		timer1=setInterval(function(){
			n++;
			if(n>aLiBanner.length-1){
				n=0;
				slideItem(aLiBanner.length-1,0);
			}else{
				slideItem(n-1,n);
			};
			changeAc();
		},2000)
	};
	moveImg();
	
	for(var i=0; i<aBtn.length; i++){
		aBtn[i].index=i;
		aBtn[i].onmouseover=function(){
			if(n!=this.index){
				slideItem(n,this.index);
				n=this.index;
				changeAc();
			};
		};
	};

	oBanner.onmouseover=function(){
		pBtn.className='prev';
		nBtn.className="next";
		clearInterval(timer1);
	};
	oBanner.onmouseout=function(){
		pBtn.className='prev hide';
		nBtn.className="next hide";
		moveImg();
	};
	pBtn.onclick=function(){
		if(n<1){
			n=aLiBanner.length;
			slideItem(0,aLiBanner.length-1);
		}else{
			slideItem(n,n-1);
		};
		n--;
		changeAc();
	};
	nBtn.onclick=function(){
		n++;
		if(n>aLiBanner.length-1){
			n=0;
			slideItem(aLiBanner.length-1,0);
		}else{
			slideItem(n-1,n);
		};
		changeAc();
	};
	
	
	
	
	
	
	
	function slideItem(a,b){
		aLiBanner[a].style.display='block';
		aLiBanner[a].style.opacity=1;;
		
		aLiBanner[b].style.display='block';
		aLiBanner[b].style.opacity=0;
		
		hxsd_tools.move1(aLiBanner[a],'opacity',0,1000);
		hxsd_tools.move1(aLiBanner[b],'opacity',100,1000,function(){
			aLiBanner[a].style.display='none';
		});
	};
	function changeAc(){
		for(var j=0; j<aBtn.length; j++){
			aBtn[j].className='';
		};
		aBtn[n].className='ac';
	};
	
	var aNavF=document.getElementsByClassName('nav_f');
	var aConF=document.getElementsByClassName('con_f');
	for( var q=0; q<aNavF.length; q++){
		aNavF[q].index=q;
		
	aNavF[q].onmouseover=function(){
			var aLiNavF=this.getElementsByTagName('li');
			var aDetails=aConF[this.index].getElementsByClassName('details')
			for(var z=0; z<aLiNavF.length; z++){
				aLiNavF[z].index=z;
				aLiNavF[z].onmouseover=function(){
					for( var y=0; y<aDetails.length; y++){
						aLiNavF[y].className=" ";
						aDetails[y].className="details hide";
					};
					this.className="ac";
					aDetails[this.index].className="details";
				};
			};
		};
	};
	
	



	var oFloorList=document.getElementsByClassName('floorList')[0];
	var aLi=oFloorList.children;
	var aFloor=document.getElementsByClassName('floorF');
	var arr=[];

for(var i=0; i<aFloor.length; i++){
		var json={};
		json.name=i;
		json.offsetTop=aFloor[i].offsetTop;
		arr.push(json);
	};
	
	window.onscroll=function(ev){

var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
		
		var h=document.documentElement.clientHeight;
		
		if(scrolltop+h>1730){
			oFloorList.style.display='block';
		}else{
			oFloorList.style.display='none';
		};
		if(scrolltop>aFloor[aFloor.length-1].offsetTop+aFloor[aFloor.length-1].offsetHeight){
			oFloorList.style.display='none';
		};
		
		var last_arr=[];
		
		for(var j=0; j<arr.length; j++){
			if(arr[j].offsetTop<scrolltop+h/2){
				last_arr.push(arr[j].name);
			}
		};
		
		if (scrolltop>1730) {
            var li_index = last_arr[last_arr.length - 1];
	
			for(var l=0; l<aFloor.length; l++){
				aLi[l].className='';
			};
			aLi[li_index].className='ac';
		};
		
		
	};
	for(var i=0; i<aFloor.length; i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			var start=document.documentElement.scrollTop || document.body.scrollTop;
			var end=arr[this.index].offsetTop;
			move(start,end)
		}
	};
	var timer;
	function move(start,end){
		var dis=end-start;
		var count=parseInt(1500/30);
		var n=0;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var a=1-n/count;
			var step_dis=start+dis*(1-a*a*a*a);
			window.scrollTo(0,step_dis);
			if(n==count){
				clearInterval(timer);
			};
		},30)
	};






















})
