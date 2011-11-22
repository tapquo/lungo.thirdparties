/** 
 * DatePicker
 * 
 * @namespace LUNGO.Sugar
 * @class DatePicker
 * @version 1.0
 *
 * @author Iñigo Gonzalez Vazquez <ingonza85@gmail.com> || @haas85
 */

LUNGO.Sugar.DatePicker = (function(lng, undefined) {
	
var calendarInfo = new Array();
calendarInfo['es'] = {"mondayFirst":true,"weekDays":["L","M","X","J","V","S","D"],"months":["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]};
calendarInfo['en'] = {"mondayFirst":false,"weekDays":["S","M","T","W","T","F","S"],"months":["January","February","March","April","May","June","July","August","September","October","November","December"]};

var actualDate = new Date();

var theCallback;

var createMonthCalendar = function(dateObject,locale){
	var dateSetter = new Date(dateObject.getTime());
	var calendarType = eval(calendarInfo[locale]);
	dateSetter.setDate(1);
	var weekArray = new Array();
	var week = 0;
	weekArray[0] = new Array(7);
	if (dateSetter.getDay()==0){
		calendarType.mondayFirst ? weekArray[0][6] = 1 : weekArray[0][0] = 1;
		
	}else{
		calendarType.mondayFirst ? weekArray[0][dateSetter.getDay()-1] = 1 : weekArray[0][dateSetter.getDay()] = 1;
	}
	dateSetter.setDate(dateSetter.getDate() + 1);
	while(dateSetter.getMonth()==actualDate.getMonth())
	{
		if((dateSetter.getDay()==1)&&(calendarType.mondayFirst)){
				week = week + 1;
				weekArray[week] = new Array(7);
		}else if((dateSetter.getDay()==0)&&(!calendarType.mondayFirst)){
				week = week + 1;
				weekArray[week] = new Array(7);
		}
		if (dateSetter.getDay()==0){
			calendarType.mondayFirst ? weekArray[week][6] = dateSetter.getDate() : weekArray[week][0] = dateSetter.getDate();
		}else{
			calendarType.mondayFirst ? weekArray[week][dateSetter.getDay()-1] = dateSetter.getDate() : weekArray[week][dateSetter.getDay()] = dateSetter.getDate();
		}
		
		dateSetter.setDate(dateSetter.getDate() + 1);
	}
	return weekArray;
}

var createHTMLDP = function(locale,month,year, dateArray){
	var htmlCode = '<table class="datepicker" id="datePickerId" border="0" cellspacing="0">';
	var calendarType = eval(calendarInfo[locale]);
	htmlCode += '<tr class="pickerheader">';
	htmlCode += '<td colspan=2 class="pickerarrow pickerleft" onclick="LUNGO.Sugar.DatePicker.reducemonth(\'' + locale + '\')"><span class="big icon backward" style="font-size:2em;pading-top:100px;"></span></td>';
	htmlCode += '<td colspan=3 class="pickermonth"><p>' + calendarType.months[month] + '</p>' + year + '</td>';
	htmlCode += '<td colspan=2 class="pickerarrow pickerright" onclick="LUNGO.Sugar.DatePicker.nextmonth(\'' + locale + '\')"><span class="big icon forward" style="font-size:2em;"></span></td></tr>';
	htmlCode += '<tr class="weekdays">';
	for(var i = 0; i < 7;i++){
			htmlCode += '<td>' + calendarType.weekDays[i] + '</td>';
	}
	htmlCode += '</tr>';
	for(var j = 0; j < dateArray.length;j++){
			htmlCode += '<tr class="calendardays">';
			for(var z = 0; z < dateArray[j].length;z++){
				if(null!=dateArray[j][z])
					htmlCode += '<td class="datePickerDay" onclick="LUNGO.Sugar.DatePicker.executeCallback('+dateArray[j][z]+','+month+','+year+')">' + dateArray[j][z] + '</td>';
				else
					htmlCode += '<td class="datePickerDay"></td>';
			}
			htmlCode += '</tr>';
	}
	htmlCode += '<tr class="pickerfooter" onclick="LUNGO.Sugar.DatePicker.hide()"><td colspan=7><span class="big icon cancel" style="font-size:2em;"></span></td></tr>';
	htmlCode += '</table>';
	return htmlCode;
}

var reducemonth = function(locale){
	actualDate.setMonth(actualDate.getMonth() - 1);
	var weekArray = createMonthCalendar(actualDate,locale);
	$('.dateContainer .datePickerObject').html(createHTMLDP(locale,actualDate.getMonth(),actualDate.getFullYear(),weekArray));
}

var nextmonth = function(locale){
	actualDate.setMonth(actualDate.getMonth() + 1);
	var weekArray = createMonthCalendar(actualDate,locale);
	$('.dateContainer .datePickerObject').html(createHTMLDP(locale,actualDate.getMonth(),actualDate.getFullYear(),weekArray));
}

var executeCallback = function(day, month, year){
	theCallback(day,month,year);
	hide();
}

var startDatepicker = function(locale,callback){
	theCallback = callback;
	var weekArray = createMonthCalendar(actualDate,locale);
	show(createHTMLDP(locale,actualDate.getMonth(),actualDate.getFullYear(),weekArray));
}

var show = function(htmlcode){
	$('body').append('<div class="dateContainer"><div class="datePickerObject"></div></div>');
	$('.dateContainer .datePickerObject').html(htmlcode);
}

var hide = function(){
	$('.dateContainer').remove();
	actualDate = new Date();
}

var getMonthName = function(locale,month){
	return calendarInfo[locale].months[month];
}

return {
        startDatepicker: startDatepicker,
        hide: hide,
        executeCallback: executeCallback,
        reducemonth: reducemonth,
        nextmonth: nextmonth,
        getMonthName: getMonthName
}
})(LUNGO);
