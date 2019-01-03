// JavaScript Document
<!--
//window['seltermZ'] = seltermZ;
//window['calculate'] = calculate;
//window['backzero'] = backzero;
//window['abracadabra'] = abracadabra;
//window['selterm'] = selterm;
//window['clearing'] = clearing;
//window['clears'] = clears;

jQuery.noConflict();
jQuery(document).ready(function () {
	seltermZ();
	addEventOnChange('principal');	
	addEventOnChange('interest');	
	addEventOnChange('years');	
	addEventOnChange('edincom');
	addEventOnChange('startcostcom');
	addEventOnChange('fincostcom');
	addEventOnChange('accountcom');
	addEventOnChange2('theDate2');
	//addEventOnChange2('theDate');

});//конец onload 

function addEventOnChange(obj){
//	jQuery('#'+obj).bind('keyup mouseup change',function(e){
	jQuery('#'+obj).bind('keyup change',function(e){
		abracadabra(document.getElementById(obj));		
	});
	//jQuery('#'+obj).click(		 
	jQuery('#'+obj).focus(		 
		function(){//focusin
 		  clears(document.getElementById(obj)); 
	});
	jQuery('#'+obj).blur(      
		function(){//focusout
  		  backzero(document.getElementById(obj));
	});
}


function addEventOnChange2(obj){
	jQuery('#'+obj).bind('keyup mouseup',function(e){
		abracadabra2(document.getElementById(obj));		
	});
}

function ceils(vall) {
	if (Math.ceil(vall) != vall) {
		vall = vall.toFixed(2);
	}
	return vall;
}


function clears(obj) {
	if (obj.value == 0) {
		obj.value = '';
	}
}

function backzero(obj) {
	if (obj.value == "") {
		obj.value = 0;
	}
calculate();
}

function clearing(obj) {
	obj.value = 0;
	calculate();
}


function initDate() {
var today = new Date();
DD = 0;
if (today.getDate() < 10)  { DD = "0"; }
MM = 0;
if (today.getMonth() < 9) { MM = "0"; }
document.getElementById("theDate2").value = (DD + today.getDate()) + "." + (MM + (today.getMonth()+1)) + "." + today.getFullYear();
}

var zarubka = [0,0];

function abracadabra(obj) {
if ( obj.value.match(',')) {
	obj.value = obj.value.replace(",", ".");
}

	if (obj != document.getElementById('years') && obj.value.match(/[*.*][0-9]*[*.*]/)) {
		if (obj.value.match(/\.$/)) {
			obj.value = obj.value.replace(/\.$/, "");
		} else {
			obj.value = obj.value.replace(/[.]/, "");
		}
	} else if (obj == document.getElementById('years') && obj.value.match(/\.$/)) {
		obj.value = obj.value.replace(/\.$/, "");
	}

onchrkeypress(obj);

if (obj == document.getElementById('startcostcom') && obj.value > 9 &&  zarubka[0] == 0) {
		var objValue = obj.value;
		//alert(objValue);
		if (confirm("В реальности подобного рода комиссии гораздо ниже. Вы настаиваете?")) {
			if (obj.value == 0) {
				obj.value = objValue;
			}			
			zarubka[0] = 1;
			//alert("да");
   		} else {
     			obj.value = 0;
			//alert("нет");
		}
}

if (obj == document.getElementById('fincostcom') && obj.value > 9 &&  zarubka[1] == 0) {
		var objValue = obj.value;
		if (confirm("В реальности подобного рода комиссии гораздо ниже. Вы настаиваете?")) {
     			if (obj.value == 0) {
				obj.value = objValue;
			}			
			zarubka[1] = 1;
   		} else {
			obj.value = 0;
		}
} 

calculate();
}



function abracadabra2(obj){
	if ( obj.value.match(',')!= null) {
		obj.value = obj.value.replace(",", ".");
	}
	onchrkeypress(obj);
}

function onchrkeypress(obj){
	obj.onkeypress = function(e) {
		e = e || event;
		var chr  = getChar(e);
		if (e.ctrlKey || e.altKey || chr == null) return; // специальная клавиша
  		if ( (chr < '0' || chr > '9') && chr != ',' && chr != '.' ) return false;
	}
}

function getChar(event) {
  if (event.which == null) {
    return String.fromCharCode(event.keyCode) // IE
  } else if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which)   // остальные
  } else {
    return null; // специальная клавиша
  }
}



function seltermZ() {
	initDate();
	avselected();
	calculate();
}

function findval() {	
		if (document.getElementById("stoog1").checked) {
			var valfind = document.getElementById("stoog1").value;
		} else if (document.getElementById("stoog2").checked) {
			var valfind = document.getElementById("stoog2").value;
		} else if (document.getElementById("stoog3").checked) {
			var valfind = document.getElementById("stoog3").value;
		} else if (document.getElementById("stoog4").checked) {
			var valfind = document.getElementById("stoog4").value;
		} else if (document.getElementById("stoog5").checked) {
			var valfind = document.getElementById("stoog5").value;
		}
return valfind;
}

function avselected() {
var val = findval();
var av11= document.getElementById("av11"); 
av11.options.length = 2;
av11.options[0].value = 1;
av11.options[1].value = 2;
if (val == '') {
	av11.options[0].text = 'уе';
} else {
	av11.options[0].text = val;
}

av11.options[1].text = '%';
av11.options[1].title = 'от суммы кредита';
}

function XDate(paym, date1) {
var oneMinute = 60*1000;
var oneHour = oneMinute*60;
var oneDay = oneHour*24;

var date2 = new Date();
var dateX = new Date();
date2.setTime(date1.getTime());
dateX.setTime(date1.getTime());
var x = 0;
if (dateX !="")	{
	for (var  i = 0; i < paym; i++) {
	
	if (date2.getDate() == date1.getDate()){ //если число совпадает с начальной датой
	  	if (dateX.getMonth() == 11) {
			date2.setDate(date1.getDate());
			date2.setFullYear(dateX.getFullYear() + 1);
			date2.setMonth(0); // прибавить месяц
		} else {
			date2.setDate(date1.getDate());
			date2.setFullYear(dateX.getFullYear());
			date2.setMonth(dateX.getMonth()+1); //прибавить месяц
		}
	} else {
		if (dateX.getMonth() == 11) {
			date2.setFullYear(dateX.getFullYear() + 1); 
			date2.setMonth(0); //прибавить месяц
			date2.setDate(date1.getDate());
		} else {
			date2.setFullYear(dateX.getFullYear());
			date2.setMonth(dateX.getMonth()+1); //прибавить месяц
			date2.setDate(date1.getDate());
		}
	}
				
			x = 0;
		if (date2.getDate() != date1.getDate()){ 
			var dateX2 = new Date();
			dateX2.setTime(date2.getTime());
			if (dateX2.getMonth() == 0) {
				dateX2.setFullYear(date2.getFullYear() - 1);
				dateX2.setMonth(11);
			} else {
				dateX2.setMonth(date2.getMonth() - 1);
				dateX2.setFullYear(date2.getFullYear());	
			}
			x = parseFloat(dateX.getDate() - Math.round((date2.getTime() - dateX2.getTime())/oneDay));
			date2.setTime(date2.getTime() - x*oneDay); // фиксируем отчётный период на последнем дне месяца
		}
		
		
		

	dateX.setTime(date2.getTime());
   }
}
return date2;
}

function XDate2(date1,principal,payments,interest,startcostcom,fincostcom,accountcom,edincom) {
var oneMinute = 60*1000;
var oneHour = oneMinute*60;
var oneDay = oneHour*24;
		var dateY = new Date();
		var dateY1 = new Date();
  		dateY.setTime(date1.getTime());
		dateY1.setTime(date1.getTime());
		var payprocent = 0;
		var ostatok = principal;
		var paystart = 0;
		var payfin = 0;	
		var payaccount = 0;
		var paymonths = 0;
		var pereplata = 0;
		var principalA = principal;
		var telo = principal/payments;
		var edincoming = edincom;
		var realapr = 0;
		var realinteger = 0;
		var shorting = new Array();
		shorting['telo'] = telo;

		var vsego = 0;
		var x=0;
		for (var i=0; i < payments; i++) {
				
		if (dateY.getDate() == date1.getDate()){ //если число совпадает с начальной датой
	  		if (dateY1.getMonth() == 11) {
				dateY.setDate(date1.getDate());
				dateY.setFullYear(dateY1.getFullYear() + 1);
				dateY.setMonth(0); // прибавить месяц
				} else {
					dateY.setDate(date1.getDate());
				dateY.setFullYear(dateY1.getFullYear());
				dateY.setMonth(dateY1.getMonth()+1); //прибавить месяц
			}
		} else {
			if (dateY1.getMonth() == 11) {
				dateY.setFullYear(dateY1.getFullYear() + 1); 
				dateY.setMonth(0); //прибавить месяц
				dateY.setDate(date1.getDate());
			} else {
				dateY.setFullYear(dateY1.getFullYear());
				dateY.setMonth(dateY1.getMonth()+1); //прибавить месяц
				dateY.setDate(date1.getDate());
			}
		}
				
				x = 0;
			if (dateY.getDate() != date1.getDate()){ 
				dateY2 = new Date();
				dateY2.setTime(dateY.getTime());
				if (dateY.getMonth() == 0) {
					dateY2.setFullYear(dateY.getFullYear() - 1);
					dateY2.setMonth(11);
				} else {
					dateY2.setFullYear(dateY.getFullYear());	
					dateY2.setMonth(dateY.getMonth() - 1);
				}
				x = parseFloat(dateY1.getDate() - Math.round((dateY.getTime() - dateY2.getTime())/oneDay));
				dateY.setTime(dateY.getTime() - x*oneDay); // фиксируем отчётный период на последнем дне месяца
			}
		
		
		
		
			daysY = Math.round((dateY.getTime() - dateY1.getTime())/oneDay);

			var procentFast = principalA*interest*daysY;
			monthly = telo + procentFast;

			paystart = paystart + principal*startcostcom/100;//
			ostatok = ostatok - telo;

			payfin = payfin + ostatok*fincostcom/100;
			payaccount = payaccount + accountcom;//
			
			
			realapr = realapr + principalA*daysY;
			
			
			payprocent = payprocent + procentFast;
			vsego = vsego + monthly; // итого к оплате	
			
			principalA = principalA - telo;
			dateY1.setTime(dateY.getTime());
			}
			paymonths = paystart + payfin + payaccount;
			pereplata = payprocent +  paymonths + edincom;
			vsego = vsego + paymonths + edincom; // итого к оплате	
			
			realinteger = 100*365*pereplata/realapr;

			
			shorting['procentFast'] = procentFast;
			shorting['principalA'] = principalA;
			shorting['paymonths'] = paymonths;
			shorting['pereplata'] = pereplata;
			shorting['monthly'] = monthly;
			shorting['realinteger'] = realinteger;
			shorting['vsego'] = vsego;
			return shorting;
}



function calculate() {

var oneMinute = 60*1000;
var oneHour = oneMinute*60;
var oneDay = oneHour*24;

   
var list = document.getElementById("stavka"); // вид кредита
var platez = list.options[list.selectedIndex].value; 
var principal = document.getElementById("principal").value; // сумма кредита
var interest = document.getElementById("interest").value /365/100; // процентная ставка
var terms = document.getElementById("terms");
if (terms.options[terms.selectedIndex].value == 1) {
	var payments = document.getElementById("years").value ; // срок кредита - месяцы
} else if (terms.options[terms.selectedIndex].value == 2) {
	var payments = (document.getElementById("years").value)*12;
}
var x = Math.pow(1 + interest*365/12, payments);
principal = parseFloat(principal);
if (interest > 0)  {
var monthly = (principal*x*interest*365/12)/(x-1); // равный месячный платёж - ануитет
} else {
	var monthly = principal/payments;
}

var absval = document.getElementById("absval");
var absval1 = document.getElementById("absval1");
var realint = document.getElementById("realint");

	
var payment = document.getElementById("payment"); // результат - месячный платёж
var vsrednem =  document.getElementById("vsrednem");

var total = document.getElementById("total"); // результат - итого к оплате
var totalinterest = document.getElementById("totalinterest"); // результат - сумма переплаты
var bar = document.getElementById("bar");
var srok = document.getElementById("srok");
var edincom = document.getElementById("edincom").value;
var startcostcom = document.getElementById("startcostcom").value;
var fincostcom = document.getElementById("fincostcom").value;
var accountcom = document.getElementById("accountcom").value;
	edincom = parseFloat(edincom);
	startcostcom = parseFloat(startcostcom);
	fincostcom = parseFloat(fincostcom);
	accountcom = parseFloat(accountcom);

var podrobno = document.getElementById("podrobno"); // не используется

var payments1 = document.getElementById("theDate2").value; // дата выдачи кредита
	payments1array = payments1.split(".");
	
if ((parseFloat(payments1array[0])) <= 0 || (parseFloat(payments1array[0])) > 31 || (isNaN(parseFloat(payments1array[0]))) || (parseFloat(payments1array[1])) <= 0 || (parseFloat(payments1array[1])) > 12 || (isNaN(parseFloat(payments1array[1]))) || (parseFloat(payments1array[2])) <= 0 || (isNaN(parseFloat(payments1array[2])))) {
	alert("Укажите дату в формате 'ДД.ММ.ГГГГ'");
	initDate();
	calculate();
	return;
}
	
var date1 = new Date(payments1array[2],(payments1array[1]-1),payments1array[0]);

var date2 = XDate(payments, date1);



	DD1 = 0;
	if (date2.getDate() < 10)  { DD1 = "0"; }
    MM1 = 0;
    if (date2.getMonth() < 9) { MM1 = "0"; }
	dateX1 = date2.getMonth() + 1;
	dateX2 = MM1 + parseInt(dateX1,10);	
	dateX = DD1 + date2.getDate() + "." + dateX2 + "." + date2.getFullYear() + "г."; 
	
var val =  findval();
var valuta1 = '';
var valuta = '';

	absval.innerHTML = val;
	absval1.innerHTML = val;

	if ((val == '$') || (val == '€')) {
		valuta1 = val;
	} else  {
		valuta = ' ' + val;
	} 
	

   	if (isFinite(date2)) {
	srok.innerHTML = dateX;
	 } else {
    srok.innerHTML = "";
	 }

var av11= document.getElementById("av11"); 
av11.options.length = 2;
av11.options[0].value = 1;
av11.options[1].value = 2;
if (val == '') {
	av11.options[0].text = 'уе';
} else {
	av11.options[0].text = val;
}
av11.options[1].text = '%  ';

if (av11.options[av11.selectedIndex].value == 2) {
			edincom = edincom*principal/100;
}

	var days = Math.round((date2.getTime() - date1.getTime())/oneDay);

if (platez == 2) {
	document.getElementById("startcostcomd").style.textDecoration = "line-through"; 
	document.getElementById("startcostcom").style.color = "white"; 
	document.getElementById("startcostcom").readOnly = true;
	document.getElementById("fincostcomd").style.textDecoration = "line-through"; 
	document.getElementById("fincostcom").style.color = "white"; 
	document.getElementById("fincostcom").readOnly = true;
	document.getElementById("accountcomd").style.textDecoration = "line-through"; 
	document.getElementById("accountcom").style.color = "white"; 
	document.getElementById("accountcom").readOnly = true;
	document.getElementById("zacher").style.textDecoration = "line-through";
} else {
	document.getElementById("startcostcomd").style.textDecoration = "none"; 
	document.getElementById("startcostcom").style.color = "black"; 
	document.getElementById("startcostcom").readOnly = false;
	document.getElementById("fincostcomd").style.textDecoration = "none"; 
	document.getElementById("fincostcom").style.color = "black"; 
	document.getElementById("fincostcom").readOnly = false;
	document.getElementById("accountcomd").style.textDecoration = "none"; 
	document.getElementById("accountcom").style.color = "black"; 
	document.getElementById("accountcom").readOnly = false;
	document.getElementById("zacher").style.textDecoration = "none"; 
}

if (principal>0) {
if (platez == 1) { // если ануитет
	var ostatok = principal;
	var paystart = 0;
	var payfin = 0;	
	var payaccount = 0;
	var paymonths = 0;
		for (var i=0; i < payments; i++) {
			paystart = paystart + principal*startcostcom/100;
			ostatok = ostatok - (monthly-ostatok*interest*365/12);
			payfin = payfin + ostatok*fincostcom/100;
			payaccount = payaccount + accountcom;
			paymonths = paystart + payfin + payaccount;
		}
		var vsego = monthly * payments + paymonths; // итого к оплате
		monthlyAll = vsego/payments;
		vsego = monthlyAll * payments + edincom; // итого к оплате
		var pereplata = vsego-principal;
		var compayments = paymonths + edincom;
		var interestpayments = pereplata - compayments;
		
if (paymonths == 0 && edincom == 0) {
	var realinteger = parseFloat(document.getElementById("interest").value);
} else {
	var vspm = vsego/payments;
	if (document.getElementById("interest").value!=0) {
		var realinteger = parseFloat(document.getElementById("interest").value);
	} else {
		var realinteger = 0.0001;
	}
	var xx = 0;
	var bet = 0;
	function calcrealinteger(realvar) {
	xx = Math.pow(1 + realinteger/(12*100), payments);
	bet = (principal*realinteger*1/12*1/100*xx)/(xx-1);
		for (var i = realinteger; bet < vspm; i+=realvar) {
				xx = Math.pow(1 + (i+realvar)/(12*100), payments);
				bet = (principal*(i+realvar)*1/12*1/100*xx)/(xx-1);
				realinteger = i;
		}
	}
	calcrealinteger(10);
	calcrealinteger(1);
	calcrealinteger(0.1);
	calcrealinteger(0.01);
	calcrealinteger(0.001);
	calcrealinteger(0.0001);
}//realinteger к оплате
	
} else if (platez == 2) {

	var pereplata = interest*principal*days + edincom; // переплата =  процентная ставка * сумма кредита * месяцы
	var vsego = pereplata + principal; // итого к оплате
	var compayments = edincom;
	var interestpayments = pereplata - compayments;

	
	if (edincom == 0) {
		var realinteger = parseFloat(document.getElementById("interest").value);
	} else {
		var realinteger = pereplata*100/principal*payments/12;
	}

} else if (platez == 3) {
	var shorting = XDate2(date1,principal,payments,interest,startcostcom,fincostcom,accountcom,edincom);
		var telo = shorting['telo'];
		var procentFast = shorting['procentFast'];
		var principalA = shorting['principalA'];
		var paymonths = shorting['paymonths'];
		var pereplata = shorting['pereplata'];
		var monthly = shorting['monthly'];
		var realinteger = shorting['realinteger'];
		var vsego =	shorting['vsego'];	
		var monthly2 = (vsego-edincom)/payments;
		var compayments = paymonths + edincom;
		var interestpayments = pereplata - compayments;

}
}
	


	
	
	function drawTable() {
var grafic = "<table border='5' align='center' cellspacing='0' bgcolor='#F2F2F2' id='finance'><caption  valign='top' style='background-color: #ABABAB'>График погашения кредита:</caption><thead> <tr><th bgcolor='#D5D5D5' scope='col'><div align='center'>№ </div></th><th bgcolor='#D5D5D5' scope='col'><div align='center'>дата<br />платежа</div></th><th bgcolor='#D5D5D5' scope='col'><div align='center'>дни</div></th><th bgcolor='#D5D5D5' scope='col'><div align='center'>погашение<br />тела кредита</div></th><th bgcolor='#D5D5D5' scope='col'><div align='center'>платёж по<br />процентам</div></th>  <th bgcolor='#D5D5D5' scope='col'><div align='center'>комиссионные<br />    платежи</div></th><th bgcolor='#D5D5D5' scope='col'><div align='center'>общая сумма<br />платежа</div></th><th bgcolor='#D5D5D5' scope='col'><div align='center'>основной<br />остаток долга</div></th><th bgcolor='#D5D5D5' scope='col'><div align='center'>переплата</div></th></tr> </thead>"; 

	var PodrData = new Array();
	principalA = principal; // сумма кредита
	var pereplat = 0;
 	var procentFast = 0;
	var dateYY = new Date();
	var dateYY1 = new Date();
	dateYY.setTime(date1.getTime());
	dateYY1.setTime(date1.getTime());
	var ostatokA = principal;
	var monthlyA = 0;
	var paystartA = 0;
	var payfinA = 0;	
	var payaccountA = 0;
	var paymonthsA = 0;
	var paymonthsAF = 0;
	var procentFastF = 0;
	
	for (var i=0; i < payments; i++) {
				
		
	if (dateYY.getDate() == date1.getDate()){ //если число совпадает с начальной датой
	  	if (dateYY1.getMonth() == 11) {
			dateYY.setDate(date1.getDate());
			dateYY.setFullYear(dateYY1.getFullYear() + 1);
			dateYY.setMonth(0); // прибавить месяц
		} else {
			dateYY.setDate(date1.getDate());
			dateYY.setFullYear(dateYY1.getFullYear());
			dateYY.setMonth(dateYY1.getMonth()+1); //прибавить месяц
		}
	} else {
		if (dateYY1.getMonth() == 11) {
			dateYY.setFullYear(dateYY1.getFullYear() + 1); 
			dateYY.setMonth(0); //прибавить месяц
			dateYY.setDate(date1.getDate());
		} else {
			dateYY.setFullYear(dateYY1.getFullYear());
			dateYY.setMonth(dateYY1.getMonth()+1); //прибавить месяц
			dateYY.setDate(date1.getDate());
		}
	}
				
			x = 0;
		if (dateYY.getDate() != date1.getDate()){ 
			dateYY2 = new Date();
			dateYY2.setTime(dateYY.getTime());
			if (dateYY.getMonth() == 0) {
				dateYY2.setFullYear(dateYY.getFullYear() - 1);
				dateYY2.setMonth(11);
			} else {
				dateYY2.setFullYear(dateYY.getFullYear());	
				dateYY2.setMonth(dateYY.getMonth() - 1);
			}
			x = parseFloat(dateYY1.getDate() - Math.round((dateYY.getTime() - dateYY2.getTime())/oneDay));
			dateYY.setTime(dateYY.getTime() - x*oneDay); // фиксируем отчётный период на последнем дне месяца
		}
		
	daysYY = Math.round((dateYY.getTime() - dateYY1.getTime())/oneDay);
	  if (platez == 1) {
		procentFast = principalA*interest*365/12; // месячный платёж по процентам = ОтатокСсуднойЗадолженности * месячная процентая ставка
		procentFastF = procentFastF + procentFast;
		var telo = monthly-procentFast; // тело кредита = равный месячный платёж - месячный платёж по процентам
		principalA = principalA - telo; // остаток ссудной задолженности
		paystartA = principal*startcostcom/100;
		ostatokA = ostatokA - (monthly-ostatokA*interest*365/12);
		payfinA = ostatokA*fincostcom/100;
		payaccountA = accountcom;
		paymonthsA = paystartA + payfinA + payaccountA;
		paymonthsAF = paymonthsAF + paymonthsA;
		monthlyA = monthly + paymonthsA;
		pereplat = pereplat + procentFast + paymonthsA; // переплата = переплата + месячный платёж по процентам
	  }else if (platez == 3){ 
	   	procentFast = principalA*interest*daysYY;
		procentFastF = procentFastF + procentFast;
		var telo = principal/payments;
      	principalA = principalA - telo;
		monthly = telo + procentFast;
		
		paystartA = principal*startcostcom/100;//
		ostatokA = ostatokA - telo;
		payfinA = ostatokA*fincostcom/100;
		payaccountA = accountcom;//
		paymonthsA = paystartA + payfinA + payaccountA;
		paymonthsAF = paymonthsAF + paymonthsA;
		monthlyA = telo + procentFast + paymonthsA;
		pereplat = pereplat + procentFast + paymonthsA;
		}
	dateYY1.setTime(dateYY.getTime());
		
	DD1 = 0;
	if (dateYY1.getDate() < 10)  { DD1 = "0"; }
    MM1 = 0;
    if (dateYY1.getMonth() < 9) { MM1 = "0"; }
	ZZ11 = dateYY1.getMonth() + 1;
	ZZ12 = MM1 + parseInt(ZZ11,10);	
	ZZ1 = DD1 + dateYY1.getDate() + "." + ZZ12 + "." + dateYY1.getFullYear(); 
	
	
	PodrData[i] = {nomerA:i+1,date:ZZ1,days:daysYY,teloA:telo,procentFastA:procentFast,paymonthsAB:paymonthsA,platezA:monthlyA,principalAB:principalA,pereplataA:pereplat};
	}
	grafic += '<tbody>';
	
	for (var i=0; i < PodrData.length; i++) {
	
	grafic += '<tr>';
	grafic += '<td align="center">'+ PodrData[i].nomerA +'</td>';
	grafic += '<td align="center" bgcolor="#EAEAEA">'+ PodrData[i].date +'</td>';
	grafic += '<td align="center">'+ PodrData[i].days +'</td>';
	grafic += '<td align="center" bgcolor="#EAEAEA">'+ PodrData[i].teloA.toFixed(2) +'</td>';
	grafic += '<td align="center">'+ PodrData[i].procentFastA.toFixed(2) +'</td>';
	grafic += '<td align="center" bgcolor="#EAEAEA">'+ PodrData[i].paymonthsAB.toFixed(2) +'</td>';
	grafic += '<td align="center">'+ PodrData[i].platezA.toFixed(2) +'</td>';
	grafic += '<td align="center" bgcolor="#EAEAEA">'+ Math.abs(PodrData[i].principalAB.toFixed(2)) +'</td>';
	grafic += '<td align="center">'+ PodrData[i].pereplataA.toFixed(2) +'</td>';
	grafic += '</tr>';
}
grafic += '</tbody>';
grafic += '<tfoot  bgcolor="#D5D5D5">';
grafic += '<tr>';
grafic += '<td align="center" colspan="3"><em><strong>итого:</strong></em></td>';
grafic += '<td align="center"><strong>' + ceils(principal) + '</strong></td>';
grafic += '<td align="center"><strong>' + ceils(procentFastF) + '</strong></td>';
grafic += '<td align="center"><strong>' + ceils(paymonthsAF+edincom) + '</strong></td>';
grafic += '<td align="center"><strong>' + ceils(vsego) + '</strong></td>';
grafic += '<td align="center">-</td>';
grafic += '<td align="center"><strong>' + ceils(pereplata) + '</strong></td>';
grafic += '</tr>';
grafic += '</tfoot><table>';

return grafic;
}
	
	monthsS = payments;
	var month = 0;
var monthsstring = payments.toString();
si = parseInt(monthsstring.charAt(monthsstring.length - 1),10);
si2 = parseInt(monthsstring.charAt(monthsstring.length - 2),10);
if 	((si == 0) && (monthsstring.length ==1)){
	month1 = "";
	monthsS = "";
	daysS = "";
	dni1 = "";
	S = "";
} else if ((si == 1)&&(si2!=1)) {
	month1 = " месяц ";
} else if ((si <= 4) && (si != 0) && (si != 1) && (si2!=1)) {
	month1 = " месяца ";
} else if ((si > 4) || (si2 ==1) || (si ==0)) {
	month1 = " месяцев ";
}
	

var intpay = document.getElementById("intpay");
var compay = document.getElementById("compay");

    if (monthly>0) {
	   total.innerHTML = valuta1 + vsego.toFixed(2) + valuta; // 6) Всего Вы заплатите
	   totalinterest.innerHTML = valuta1 + pereplata.toFixed(2) + valuta; // 7) Сумма переплаты
	   
	   intpay.innerHTML = valuta1 + interestpayments.toFixed(2) + valuta; // 7) на оплату процентов
	   compay.innerHTML = valuta1 + compayments.toFixed(2) + valuta; // 7) комиссионные платежи

	   if (realinteger) {
		   if (Math.ceil(realinteger) != realinteger) {
				realinteger = realinteger.toFixed(4);
		   }
		   realint.innerHTML = realinteger + ' %';
	   } else { 
	   	   realint.innerHTML = "";
	   }
	   		if (platez == 1) {
				if (payfin == 0) {
					vsrednem.innerHTML = "";
				} else {
					vsrednem.innerHTML = "в среднем";
				}
       			payment.innerHTML = valuta1 + monthlyAll.toFixed(2) + valuta; // 5) Ваш ежемесячный платёж
				if (document.getElementById("checkThis").checked) {
					podrobno.innerHTML = drawTable(); // график погашения кредита
					drawTable();
				} else {
					podrobno.innerHTML = "";
				}
			}else if (platez == 2){
				vsrednem.innerHTML = "";
		 		payment.innerHTML = "";		 		
				if (document.getElementById("checkThis").checked) {
					podrobno.innerHTML = "<table  border='5' align='center' cellspacing='0'><caption  valign='top' style='background-color: #ABABAB'>График погашения кредита:</caption><tr bgcolor='#D5D5D5'><td height='13'>Выплата процентов и тела кредита происходит в конце срока кредита, т.е через " + payments + " " + month1 + ".</td></tr></table>";
				} else {
					podrobno.innerHTML = "";
				}
			} else if (platez == 3) {
				vsrednem.innerHTML = "в среднем";
				payment.innerHTML = valuta1 + monthly2.toFixed(2) + valuta; // 5) Ваш ежемесячный платёж
				if (document.getElementById("checkThis").checked) {
					podrobno.innerHTML = drawTable(); // график погашения кредита
				} else {
					podrobno.innerHTML = "";
				}
			}		
    }else{
        payment.innerHTML = "";
        total.innerHTML = ""
        totalinterest.innerHTML = "";
		podrobno.innerHTML = "";
		}


var x1 = ['Сумма кредита', principal];
if (interestpayments>0) {
	var x2 = ['Платежи по процентам', interestpayments];
} else {
	var x2 = undefined;
}
if (compayments>0) {
	var x3 = ['Комиссионные платежи', compayments];
} else {
	var x3 = undefined;
}

	if ((x2)&&(x3)) {								
   		s1 = [x1, x2, x3];
	} else if (x2) {
   		s1 = [x1, x2];
	} else if (x3) {
   		s1 = [x1, x3];
	} else {
  		s1 = [x1];
	}

bar.innerHTML = '<div id="chart1" align="center" style="margin-top:10px; margin-left:10px; width:220px; height:300px;"></div>';
plot1 = jQuery.jqplot('chart1', [s1], {
        grid: {
            drawBorder: false, 
            drawGridlines: false,
            background: '#FFFFFF',
			shadow: false

        },
		

		seriesColors: [ "#eee", "#ccc", "#999"],

		seriesDefaults:{
            renderer:jQuery.jqplot.PieRenderer,
            rendererOptions: {
				showDataLabels: true,
				fill: true, 
				sliceMargin:6
            }
        },
        legend: {
            show: true,
            rendererOptions: {
                //numberRows: 2
				numberColumns: 1
            },
            location: 'n',
			yoffset: 2
        }
    });
 
jQuery('#chart1').bind('jqplotDataHighlight', 	
	function (ev, seriesIndex, pointIndex, data) {   
      		var chart_left = jQuery('#chart1').offset().left,
	        chart_top = jQuery('#chart1').offset().top;
		var color = 'rgb(50%,50%,100%)';
		jQuery('#tooltip1b').css({left:chart_left+40, top:chart_top+250});
		jQuery('#tooltip1b').html('<span style="font-size:12px;font-weight:bold;color:#444444;">' + data[0] + ' ' + valuta1 + ceils(data[1])+ valuta + '</span>');
		jQuery('#tooltip1b').show();
});

jQuery('#chart1').bind('jqplotDataUnhighlight',
      function (ev, seriesIndex, pointIndex, data) {
          jQuery('#tooltip1b').empty();
          jQuery('#tooltip1b').hide();
});	
	
	
}



//-->
