window.onload=function(){
	var oMoney=document.getElementsByClassName('money')[0];
	var oEm=oMoney.getElementsByTagName('em')[0];
	var oOl=document.getElementById('priceList');
	var aLi1=oOl.getElementsByTagName('a');
	var oBt1=document.getElementById('okBtn')
	oEm.innerHTML="199";
	//封装函数
function number(){
	var oBt2=document.getElementsByClassName('addBtn')[0];
	var oBt3=document.getElementsByClassName('subBtn')[0];
	var oInput=document.getElementsByClassName('inpt')[0];
	var n=oInput.value;
	oBt2.onclick=function(){
		n++;
		oInput.value=n
		if (n>3) {
			alert("限购3件,不要太贪心了哦！")
		oInput.value=3;
		n=3;
		}
	}
	oBt3.onclick=function(){
		n--;
		oInput.value=n
		if (n<1) {
			n=1;
		oInput.value=1;
		}
	}
	oBt1.onclick=function(){
		alert("成功加入购物车");
		oInput.value=n;
		n=1;
		oInput.value=1;
		
	}
	
}
	
	for(var i=0;i<aLi1.length;i++){
		aLi1[i].index=i;
		aLi1[i].show=true;
		aLi1[i].onclick=function(){
		number()
		if (this.show) {
		for (var j=0;j<aLi1.length;j++) {
		aLi1[j].style.border="2px solid #d5cbcc";
		aLi1[j].show=true;
		}
		var a=this.index+1;
		this.style.border="2px solid #a85350";
		oBt1.disabled=false;
		this.show=false;
		if (this.index==0) {
		oEm.innerHTML="199"	
		}
		if (this.index==1) {
		oEm.innerHTML="159"	
		}
		if (this.index==2) {
		oEm.innerHTML="205"	
		}
		if (this.index==3) {
		oEm.innerHTML="189"	
		}
		if (this.index==4) {
		oEm.innerHTML="169"	
		}
		if (this.index==5) {
		oEm.innerHTML="188"	
		}
		if (this.index==6) {
		oEm.innerHTML="99"	
		}
		if (this.index==7) {
		oEm.innerHTML="219"	
		}
		if (this.index==8) {
		oEm.innerHTML="289"	
		}
		} else{
		oBt1.disabled=true;
		this.show=true;
		oEm.innerHTML="199";
			}
		
		}
	}
}
