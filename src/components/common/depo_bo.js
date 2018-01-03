
// jQuery.noConflict();
// jQuery(document).ready(function () {
// 	initDate();
// 	addEventOnChange('principal');
// 	addEventOnChange('interest1');
// 	addEventOnChange('interest2');
// 	addEventOnChange('prinplus');
// 	addEventOnChange2('theDate2');
// 	addEventOnChange2('theDate');
// });//конец onload


// function clears(obj) {
// 	if (obj.value == 0) {
// 		obj.value = '';
// 	}
// }

// function backzero(obj) {
// 	if (obj.value == "") {
// 		obj.value = 0;
// 	}
// }

// function addEventOnChange(obj){
// 	jQuery('#'+obj).bind('keyup mouseup change',function(e){
// 		abracadabra(document.getElementById(obj));
// 	});
// 	jQuery('#'+obj).click(
// 		function(){//focusin
//  		  clears(document.getElementById(obj));
// 	});
// 	jQuery('#'+obj).blur(
// 		function(){//focusout
//   		  backzero(document.getElementById(obj));
// 	});
// }

// function addEventOnChange2(obj){
// 	jQuery('#'+obj).bind('keyup mouseup',function(e){
// 		abracadabra2(document.getElementById(obj));
// 	});
// }


// function abracadabra(obj) {
// 	if ( obj.value.match(',')!= null) {
// 		obj.value = obj.value.replace(",", ".");
// 	}
// 	if (obj.value.match(/[*.*][0-9]*[*.*]/)!= null) {
// 		if (obj.value.match(/\.$/)) {
// 			obj.value = obj.value.replace(/\.$/, "");
// 		} else {
// 			obj.value = obj.value.replace(/[.]/, "");
// 		}
// 	}
// 	onchrkeypress(obj);
// 	calculate();
// }
// function abracadabra2(obj){
// 	if ( obj.value.match(',')!= null) {
// 		obj.value = obj.value.replace(",", ".");
// 	}
// 	onchrkeypress(obj);
// }

// function onchrkeypress(obj){
// 	obj.onkeypress = function(e) {
// 		e = e || event;
// 		var chr  = getChar(e);
// 		if (e.ctrlKey || e.altKey || chr == null) return; // специальная клавиша
//   		if ( (chr < '0' || chr > '9') && chr != ',' && chr != '.' ) return false;
// 	}
// }

// function getChar(event) {
//   if (event.which == null) {
//     return String.fromCharCode(event.keyCode) // IE
//   } else if (event.which!=0 && event.charCode!=0) {
//     return String.fromCharCode(event.which)   // остальные
//   } else {
//     return null; // специальная клавиша
//   }
// }




// function initDate() {
// var today = new Date();
// DD = 0;
// if (today.getDate() < 10)  { DD = "0"; }
// MM = 0;
// if (today.getMonth() < 9) { MM = "0"; }
// document.forms["loandata"].theDate2.value = (DD + today.getDate()) + "." + (MM + (today.getMonth()+1)) + "." + today.getFullYear();
// document.forms["loandata"].theDate.value = (DD + today.getDate()) + "." + (MM + (today.getMonth()+1)) + "." + (today.getFullYear()+1);
// }

// function calculate() {
// var oneMinute = 60*1000;
// var oneHour = oneMinute*60;
// var oneDay = oneHour*24;
// var oneWeek = oneDay*7;
// var list = document.getElementById("stavka"); // вид депозита
// var principal = document.loandata.principal.value; // сумма вклада
// var interest1 = document.loandata.interest1.value/365/100; // процентная ставка
// var interest2 = document.loandata.interest2.value/365/100;
// var platez = list.options[list.selectedIndex].value;
// var prinplus = parseFloat(document.loandata.prinplus.value);
// var listik = document.getElementById("renewing");
// var plusperiod = listik.options[listik.selectedIndex].value;



// payments1 = document.loandata.theDate2.value; // дата открытия вклада
// payments2 = document.loandata.theDate.value; // дата закрытия вклада



// payments1array = payments1.split(".");
// payments2array = payments2.split(".");
// if ((parseFloat(payments1array[0])) <= 0 || (parseFloat(payments1array[0])) > 31 || (isNaN(parseFloat(payments1array[0]))) || (parseFloat(payments1array[1])) <= 0 || (parseFloat(payments1array[1])) > 12 || (isNaN(parseFloat(payments1array[1]))) || (parseFloat(payments1array[2])) <= 0 || (isNaN(parseFloat(payments1array[2])))) {
// 	alert("Укажите дату в формате 'ДД.ММ.ГГГГ'");
// 	var today = new Date();
// 	DD = 0;
// 	if (today.getDate() < 10)  { DD = "0"; }
// 		MM = 0;
// 	if (today.getMonth() < 9) { MM = "0"; }
// 		document.forms["loandata"].theDate2.value = (DD + today.getDate()) + "." + (MM + (today.getMonth()+1)) + "." + today.getFullYear();
// 	calculate();
// } else if ((parseFloat(payments2array[0])) <= 0 || (parseFloat(payments2array[0])) > 31 || (isNaN(parseFloat(payments2array[0]))) || (parseFloat(payments2array[1])) <= 0 || (parseFloat(payments2array[1])) > 12 || (isNaN(parseFloat(payments2array[1]))) || (parseFloat(payments2array[2])) <= 0 || (isNaN(parseFloat(payments2array[2])))) {
// 	alert("Укажите дату в формате 'ДД.ММ.ГГГГ'");
// 	var today = new Date();
// 	DD = 0;
// 	if (today.getDate() < 10)  { DD = "0"; }
// 		MM = 0;
// 	if (today.getMonth() < 9) { MM = "0"; }
// 		document.forms["loandata"].theDate.value = (DD + today.getDate()) + "." + (MM + (today.getMonth()+1)) + "." + (today.getFullYear()+1);
// 	calculate();
// }
// var date1 = new Date(payments1array[2],(payments1array[1]-1),payments1array[0]);

// var date2 = new Date(payments2array[2],(payments2array[1]-1),payments2array[0]);


// dateX = Math.round((date2.getTime() - date1.getTime())/oneDay);



// days = parseFloat(date2.getDate() - date1.getDate());
// var cf = 0;

// dateZ = new Date();
// dateZ.setTime(date1.getTime());
// var x = 0;
// if (days < 0) {
// 	if (date1.getMonth() == 0) {
// 	dateZ.setYear(date1.getFullYear() - 1);
// 	dateZ.setMonth(11);
// 	} else {
// 	dateZ.setYear(date1.getFullYear());
// 	dateZ.setMonth(date1.getMonth()-1);
// 	}
// 	dateZ.setDate(payments1array[0]);


// 	days = Math.round((date1.getTime() - dateZ.getTime())/oneDay) + days;
// 	if (days < 0) {
// 			x = parseFloat(date1.getDate() - Math.round((date1.getTime() - dateZ.getTime())/oneDay));
// 			dateZ.setTime(dateZ.getTime() - x*oneDay); // фиксируем отчётный период на последнем дне месяца
// 			days = Math.round((date1.getTime() - dateZ.getTime())/oneDay) + days;
// 	}


// 	cf = 1;
// 	}

// 	months = (date2.getFullYear() - date1.getFullYear())*12 + (date2.getMonth()+1) - (date1.getMonth()+1) - cf;

// 	dateXS = dateX;
// 	var dni = 0;
// var dateXstring = dateX.toString();
// simvol = parseInt(dateXstring.charAt(dateXstring.length - 1));
// simvol2 = parseInt(dateXstring.charAt(dateXstring.length - 2));
// if 	((simvol == 0) && (dateXstring.length ==1)){
// 	dni = "";
// 	dateXS = "";
// } else if ((simvol == 1)&&(simvol2!=1)) {
// 	dni = " день";
// } else if ((simvol <= 4) && (simvol != 0) && (simvol != 1) && (simvol2!=1)) {
// 	dni = " дня";
// } else if ((simvol > 4) || (simvol2 ==1) || (simvol ==0)) {
// 	dni = " дней";
// }


// 	daysS = days;
// 	var dni1 = 0;
// 	S = " или ";
// var daysstring = days.toString();
// sim = parseInt(daysstring.charAt(daysstring.length - 1));
// sim2 = parseInt(daysstring.charAt(daysstring.length - 2));
// if 	((sim == 0) && (daysstring.length ==1)){
// 	dni1 = "";
// 	daysS = "";
// } else if ((sim == 1)&&(sim2!=1)) {
// 	dni1 = " день";
// } else if ((sim <= 4) && (sim != 0) && (sim != 1) && (sim2!=1)) {
// 	dni1 = " дня";
// } else if ((sim > 4) || (sim2 ==1) || (sim ==0)) {
// 	dni1 = " дней";
// }


// 	monthsS = months;
// 	var month = 0;
// var monthsstring = months.toString();
// si = parseInt(monthsstring.charAt(monthsstring.length - 1));
// si2 = parseInt(monthsstring.charAt(monthsstring.length - 2));
// if 	((si == 0) && (monthsstring.length ==1)){
// 	month1 = "";
// 	monthsS = "";
// 	daysS = "";
// 	dni1 = "";
// 	S = "";
// } else if ((si == 1)&&(si2!=1)) {
// 	month1 = " месяц ";
// } else if ((si <= 4) && (si != 0) && (si != 1) && (si2!=1)) {
// 	month1 = " месяца ";
// } else if ((si > 4) || (si2 ==1) || (si ==0)) {
// 	month1 = " месяцев ";
// }


// var srok = document.getElementById("srok");
//    	if (isFinite(dateX)) {
// 	srok.innerHTML = dateXS + dni + S + monthsS + month1 + daysS + dni1;
// 	 } else {
//     srok.innerHTML = "";
// 	 }

// var totalinterest1=0;
// payments = months;
// var principal1=parseFloat(principal);
// var dateY = new Date();
// var dateY1 = new Date();
// dateY.setTime(date1.getTime());
// dateY1.setTime(date1.getTime());
// var x = 0;
// var zxc = 0;
// var cxz = 0;
// if (dateX !="")	{
// if (dateX > 0) {
// for (var i = 1; i <= payments; i++) {

// 	if (dateY.getDate() == date1.getDate()){ //если число совпадает с начальной датой
// 	  	if (dateY1.getMonth() == 11) {
// 			dateY.setDate(date1.getDate());
// 			dateY.setYear(dateY1.getFullYear() + 1);
// 			dateY.setMonth(0); // прибавить месяц
// 		} else {
// 			dateY.setDate(date1.getDate());
// 			dateY.setYear(dateY1.getFullYear());
// 			dateY.setMonth(dateY1.getMonth()+1); //прибавить месяц
// 		}
// 	} else {
// 		if (dateY1.getMonth() == 11) {
// 			dateY.setYear(dateY1.getFullYear() + 1);
// 			dateY.setMonth(0); //прибавить месяц
// 			dateY.setDate(date1.getDate());
// 		} else {
// 			dateY.setYear(dateY1.getFullYear());
// 			dateY.setMonth(dateY1.getMonth()+1); //прибавить месяц
// 			dateY.setDate(date1.getDate());
// 		}
// 	}

// 			x = 0;
// 		if (dateY.getDate() != date1.getDate()){
// 			dateY2 = new Date();
// 			dateY2.setTime(dateY.getTime());
// 			if (dateY.getMonth() == 0) {
// 				dateY2.setYear(dateY.getFullYear() - 1);
// 				dateY2.setMonth(11);

// 			} else {
// 				dateY2.setMonth(dateY.getMonth() - 1);
// 				dateY2.setYear(dateY.getFullYear());
// 			}
// 			x = parseFloat(dateY1.getDate() - Math.round((dateY.getTime() - dateY2.getTime())/oneDay));
// 			dateY.setTime(dateY.getTime() - x*oneDay); // фиксируем отчётный период на последнем дне месяца
// 		}

// 		daysY = Math.round((dateY.getTime() - dateY1.getTime())/oneDay);

// 	if (plusperiod == 1) {
// 		zxc = 0;
// 	} else if (plusperiod == 2) {
// 		if (i>1) {
// 			zxc = prinplus;
// 		} else {
// 			zxc = 0;
// 		}
// 	} else if (plusperiod == 3){
// 		if ((i/3) == Math.floor(i/3)) {
// 			zxc = prinplus;
// 		} else {
// 			zxc = 0;
// 		}
// 	} else if (plusperiod == 4){
// 		if ((i/12) == Math.floor(i/12)) {
// 			zxc = prinplus;
// 		} else {
// 			zxc = 0;
// 		}
// 	}

// 	if (platez == 1) {
// 		totalinterest1 = principal1*interest1*daysY;	// начислено процентов
// 		principal1 = totalinterest1 + principal1+zxc; // вклад + процент за последний месяц в цикле
// 		cxz = cxz + zxc;
// 	 } else if (platez == 2){
// 	 	totalinterest1 = (parseFloat(principal)+cxz)*interest1*daysY;	// начислено процентов
// 		principal1 = totalinterest1 + principal1+zxc; // вклад + проценты за весь период депозита
// 		cxz = cxz + zxc;
// 	 }

// 	 dateY1.setTime(dateY.getTime());
// }
// }
// }

// 	var payment2 = (principal1 - parseFloat(principal) - cxz)/payments;

// if (days != 0) {
// 	if (platez == 1) {
// 	totalinterest1 = principal1*interest2*days;
// 	principal1 = totalinterest1 + principal1;
// 	} else if (platez == 2){
// 	totalinterest1 = (parseFloat(principal)+cxz)*interest2*days;	// начислено процентов
// 	principal1 = totalinterest1 + principal1;
// 	}
// }

//  if (platez == 1) {
// 	document.getElementById("cvet").style.color = "";
// 	document.getElementById("zvet").style.color = "";

//   } else if (platez == 2){
// 	document.getElementById("cvet").style.color = "#FFFFFF";
// 	document.getElementById("zvet").style.color = "#FFFFFF";
//   }
// 	var payment = document.getElementById("payment");
//     var total = document.getElementById("total");
// 	var principal2 = document.getElementById("principal2");
// 	var total2 = principal1;

// 	var rdio = document.loandata; // валюта кредита
// 	for (var i=0; i<rdio.stoog.length; i++) {
// 		if (rdio.stoog[i].checked) {
// 			break;
// 	}
// 	}
// 	var val = rdio.stoog[i].value;


// var grafic = "<table border='1' bordercolor='#D5D5D5' bgcolor='#F2F2F2' id='finance'><caption  valign='top' style='background-color: #ABABAB'>График погашения кредита:</caption><thead> <tr><th bgcolor='#D5D5D5' scope='col'><div align='center'>№ </div></th><th bgcolor='#D5D5D5' scope='col'><div align='center'>дата</div></th>  <th bgcolor='#D5D5D5' scope='col'><div align='center'>%<br>ставка</div></th><th bgcolor='#D5D5D5' scope='col'><div align='center'>начислено<br>процентов</div></th><th bgcolor='#D5D5D5' scope='col'><div align='center'>кол-во<br>дней</div></th><th bgcolor='#D5D5D5' scope='col'><div align='center'>начислено %<br> итого</div></th><th bgcolor='#D5D5D5' scope='col'><div align='center'>общая  сумма<br>сбережений</div></th></tr> </thead> <tbody id='mathData'></table>";


// 	function drawTable() {
// 	var tr,td;
// 	tbody = document.getElementById('mathData');
// 	var PodrData = new Array();
// 	principalA = parseFloat(principal); // сумма депозита
// 	var totalinterest2 = 0;
// 	var dateYY = new Date(); // промежуточная переменная
// 	dateYY.setTime(date1.getTime());
// 	var dateYY1 = new Date(); // промежуточная переменная
// 	dateYY1.setTime(date1.getTime());
// 	//var int = 0;

// 	var n = 0;
// 	zxc = 0;
// 	cxz = 0;

// 	if (days != 0) { n = 1;}
// 	for (var i=0; i < (payments + n); i++) {

// 	  if ((platez == 1) && (i < payments)) {


// 	if (dateYY.getDate() == date1.getDate()){ //если число совпадает с начальной датой
// 	  	if (dateYY1.getMonth() == 11) {
// 			dateYY.setDate(date1.getDate());
// 			dateYY.setYear(dateYY1.getFullYear() + 1);
// 			dateYY.setMonth(0); // прибавить месяц
// 		} else {
// 			dateYY.setDate(date1.getDate());
// 			dateYY.setYear(dateYY1.getFullYear());
// 			dateYY.setMonth(dateYY1.getMonth()+1); //прибавить месяц
// 		}
// 	} else {
// 		if (dateYY1.getMonth() == 11) {
// 			dateYY.setYear(dateYY1.getFullYear() + 1);
// 			dateYY.setMonth(0); //прибавить месяц
// 			dateYY.setDate(date1.getDate());
// 		} else {
// 			dateYY.setYear(dateYY1.getFullYear());
// 			dateYY.setMonth(dateYY1.getMonth()+1); //прибавить месяц
// 			dateYY.setDate(date1.getDate());
// 		}
// 	}

// 			x = 0;
// 		if (dateYY.getDate() != date1.getDate()){
// 			dateYY2 = new Date();
// 			dateYY2.setTime(dateYY.getTime());
// 			if (dateYY.getMonth() == 0) {
// 				dateYY2.setYear(dateYY.getFullYear() - 1);
// 				dateYY2.setMonth(11);

// 			} else {
// 				dateYY2.setMonth(dateYY.getMonth() - 1);
// 				dateYY2.setYear(dateYY.getFullYear());
// 			}
// 			x = parseFloat(dateYY1.getDate() - Math.round((dateYY.getTime() - dateYY2.getTime())/oneDay));
// 			dateYY.setTime(dateYY.getTime() - x*oneDay); // фиксируем отчётный период на последнем дне месяца
// 		}
// 	if (plusperiod == 1) {
// 		zxc = 0;
// 	} else if (plusperiod == 2) {
// 		if (i>0) {
// 			zxc = prinplus;
// 		} else {
// 			zxc = 0;
// 		}
// 	} else if (plusperiod == 3){
// 		if (((i+1)/3) == Math.floor((i+1)/3)) {
// 			zxc = prinplus;
// 		} else {
// 			zxc = 0;
// 		}
// 	} else if (plusperiod == 4){
// 		if (((i+1)/12) == Math.floor((i+1)/12)) {
// 			zxc = prinplus;
// 		} else {
// 			zxc = 0;
// 		}
// 	}
// 		daysYY = Math.round((dateYY.getTime() - dateYY1.getTime())/oneDay);
// 		totalinterestA = principalA*interest1*daysYY;	// начислено процентов
// 		principalA = totalinterestA + principalA+zxc; // вклад + процент за последний месяц в цикле
// 		cxz = cxz + zxc;
// 		totalinterest2 = totalinterestA+totalinterest2;
// 		var integ = document.forms["loandata"].interest1.value;
// 		dateYY1.setTime(dateYY.getTime());


// 	  }else if ((platez == 2)&& (i < payments)){

// 	if (dateYY.getDate() == date1.getDate()){ //если число совпадает с начальной датой
// 	  	if (dateYY1.getMonth() == 11) {
// 			dateYY.setDate(date1.getDate());
// 			dateYY.setYear(dateYY1.getFullYear() + 1);
// 			dateYY.setMonth(0); // прибавить месяц
// 		} else {
// 			dateYY.setDate(date1.getDate());
// 			dateYY.setYear(dateYY1.getFullYear());
// 			dateYY.setMonth(dateYY1.getMonth()+1); //прибавить месяц
// 		}
// 	} else {
// 		if (dateYY1.getMonth() == 11) {
// 			dateYY.setYear(dateYY1.getFullYear() + 1);
// 			dateYY.setMonth(0); //прибавить месяц
// 			dateYY.setDate(date1.getDate());
// 		} else {
// 			dateYY.setYear(dateYY1.getFullYear());
// 			dateYY.setMonth(dateYY1.getMonth()+1); //прибавить месяц
// 			dateYY.setDate(date1.getDate());
// 		}
// 	}

// 			x = 0;
// 		if (dateYY.getDate() != date1.getDate()){
// 			dateYY2 = new Date();
// 			dateYY2.setTime(dateYY.getTime());
// 			if (dateYY.getMonth() == 0) {
// 				dateYY2.setYear(dateYY.getFullYear() - 1);
// 				dateYY2.setMonth(11);

// 			} else {
// 				dateYY2.setMonth(dateYY.getMonth() - 1);
// 				dateYY2.setYear(dateYY.getFullYear());
// 			}
// 			x = parseFloat(dateYY1.getDate() - Math.round((dateYY.getTime() - dateYY2.getTime())/oneDay));
// 			dateYY.setTime(dateYY.getTime() - x*oneDay); // фиксируем отчётный период на последнем дне месяца
// 		}

// 		if (plusperiod == 1) {
// 		zxc = 0;
// 	} else if (plusperiod == 2) {
// 		if (i>0) {
// 			zxc = prinplus;
// 		} else {
// 			zxc = 0;
// 		}
// 	} else if (plusperiod == 3){
// 		if (((i+1)/3) == Math.floor((i+1)/3)) {
// 			zxc = prinplus;
// 		} else {
// 			zxc = 0;
// 		}
// 	} else if (plusperiod == 4){
// 		if (((i+1)/12) == Math.floor((i+1)/12)) {
// 			zxc = prinplus;
// 		} else {
// 			zxc = 0;
// 		}
// 	}

// 		daysYY = Math.round((dateYY.getTime() - dateYY1.getTime())/oneDay);
// 	   	totalinterestA = (parseFloat(principal)+cxz)*interest1*daysYY;	// начислено процентов
// 		principalA = totalinterestA + principalA+zxc; //вклад + процент за последний месяц в цикле
// 		cxz = cxz + zxc;
// 		totalinterest2 = totalinterestA+totalinterest2;
// 		integ = document.loandata.interest1.value;
// 		dateYY1.setTime(dateYY.getTime());
// 	  }


// 	if ((days != 0) && (i == payments)) {
// 		YY1 = new Date();
// 		YY1.setTime(days*oneDay);
// 	   	//dateYY.setTime(dateYY.getTime() + YY1.getTime());
// 		dateYY.setTime(date2.getTime());
// 		integ = document.loandata.interest2.value;
// 		daysYY = Math.round((dateYY.getTime() - dateYY1.getTime())/oneDay);
// 		if (platez == 1) {
// 			totalinterestA = principalA*interest2*daysYY;
// 		} else if (platez == 2){
// 			totalinterestA = (parseFloat(principal)+cxz)*interest2*daysYY;	// начислено процентов
// 		}
// 		principalA = totalinterestA + principalA;
// 		totalinterest2 = totalinterestA+totalinterest2;
// 	}
// 	if(navigator.appName == "Netscape"){
// 		DD1 = 0;
// 		if (dateYY.getDate() < 10)  { DD1 = "0"; }
// 	    MM1 = 0;
// 	    if (dateYY.getMonth() < 9) { MM1 = "0"; }
// 		ZZ11 = dateYY.getMonth() + 1;
// 		ZZ12 = MM1 + parseInt(ZZ11);
// 		ZZ1 = DD1 + dateYY.getDate() + "." + ZZ12 + "." + dateYY.getFullYear();
// 	} else {
// 		ZZ1 = dateYY.toLocaleDateString();
// 	}
// 	var intA;
// 	PodrData[i] = {nomerA:i+1,dateA:ZZ1,intA:integ,procentFastA:totalinterestA,platezA:totalinterest2,daysA:daysYY,principalAB:principalA.toFixed(2)};
// 	}

// 	for (var i=0; i < PodrData.length; i++) {
// 	tr = tbody.insertRow(tbody.rows.length);
// 	td = tr.insertCell(tr.cells.length);
// 	td.setAttribute("align","center");
// 	td.innerHTML = PodrData[i].nomerA; // № п/п
// 	td = tr.insertCell(tr.cells.length);
// 	td.setAttribute("align","left");
// 	td.innerHTML = PodrData[i].dateA; // дата
// 	td = tr.insertCell(tr.cells.length);
// 	td.setAttribute("align","center");
// 	td.innerHTML = PodrData[i].intA;
// 	td = tr.insertCell(tr.cells.length);
// 	td.setAttribute("align","center");
// 	td.innerHTML = PodrData[i].procentFastA.toFixed(2); // начислено процентов
// 	td = tr.insertCell(tr.cells.length);
// 	td.setAttribute("align","center");
// 	td.innerHTML = PodrData[i].daysA; //дней
// 	td = tr.insertCell(tr.cells.length);
// 	td.setAttribute("align","center");
// 	td.innerHTML = PodrData[i].platezA.toFixed(2); // начислено процентов итого
// 	td = tr.insertCell(tr.cells.length);
// 	td.setAttribute("align","center");
// 	td.innerHTML = PodrData[i].principalAB; // общая сумма сбережений
// 	}
// 	}

// var podrobno = document.getElementById("podrobno");

// 	if ((principal1>0)) {
//   			if (isFinite(payment2)) {
// 				payment.innerHTML = payment2.toFixed(2)+val;
// 			} else {
// 	   	  		payment.innerHTML = "";
// 			}
//         	total.innerHTML = principal1.toFixed(2)+val;
// 			principal2.innerHTML = (principal1-principal-cxz).toFixed(2)+val;
// 			if (document.getElementById("checkThis").checked) {
// 				jQuery("#podrobno").html(grafic);
// 				drawTable();
// 			} else {
// 				podrobno.innerHTML = "";
// 			}

//     }  else {
//     	  	payment.innerHTML = "";
//     		total.innerHTML = ""
// 			principal2.innerHTML = "";
// 	}

// }

