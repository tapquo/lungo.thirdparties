var tapquocalendar = function(){
    this.elementId = null;
    this.events = null;
    this.defaults = {
					date	: new Date(),
					days	: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
					months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                    weekstart: 1,
					label_Events: 'List of Events',
					label_noEvents: 'No Events',
					callback: null
			};
    this.settings = null;
    
    this.init = function(){
	    $('head').append('<style type="text/css">'
            + '.coffee_calendar { color:#3F4E5E; float:left; width: 100%; }'
            + '.coffee_calendar table { border-collapse: separate; font-size: 20px; }'
            + '.coffee_calendar td { background-color: #d5d4d9; border-top: 1px solid #f0eff1; border-right: 1px solid #f0eff1; border-bottom: 1px solid #A3A7AF; border-left: 1px solid #A3A7AF; font-weight:bold; height:43px; position:relative; text-align:center; vertical-align:middle; width:128px;}'
            + '.coffee_calendar td.prevmonth, .coffee_calendar td.nextmonth { color: #89909A; }'
            + '.coffee_calendar td.today, .coffee_calendar td.selected, .coffee_calendar .date_has_event { border-top: 1px solid rgba(0,0,0,.30); border-right: 1px solid rgba(0,0,0,.30); border-bottom: 1px solid rgba(255,255,255,.10); border-left: 1px solid rgba(255,255,255,.10); -webkit-box-shadow: inset rgba(0,0,0,.35) 2px 2px 8px; color: white;}'
            + '.coffee_calendar td.selected { background-color: #1980e5;}'
            + '.coffee_calendar td.today { background: #7188a8; }'
            + '.coffee_calendar .date_has_event {	background: #da0000;}'
            + '.coffee_calendar thead { background: -webkit-gradient(linear,left top,left bottom,color-stop(0, #f6f6f7),color-stop(1, #ccccd1));}'
            + '.coffee_calendar thead  th { font-size: 8px; vertical-align: bottom; padding-bottom: 3px; color: #6c6c6c; text-align:center; height: 40px;}'
            + '.coffee_calendar thead  th:first-child { background: url(./resources/images/arrow-left.svg) no-repeat center 8px; }'
            + '.coffee_calendar thead  th:last-child { background: url(./resources/images/arrow-right.svg) no-repeat center 8px;}'
            + '.coffee_calendar thead th span { font-size:20px; height:30px; left: 0px; right: 0px; top:6px; position:absolute; text-align:center; margin: 0 64px;}'
            + '.coffee_calendar ul { list-style-type: none; margin: 0; padding: 0; border: 0; -webkit-border-radius: 0px; background: #fff; width: 100%; min-height: 128px;}'
            + '.coffee_calendar ul li { border:none !important; font-weight: bold; background-color: #fff;}'
            + '.coffee_calendar ul li span { font-size: 10px; padding-right: 10px;}'
            + '.coffee_calendar ul .no-events { color: #ccc; text-align: center;}'
        + '</style>');
	}
	
	this.create = function(pElementId, pEvents, pOptions){
	    this.elementId = pElementId;
	    this.events = pEvents;
	    this.settings = $.extend({}, this.defaults, pOptions);
	    this.markup();
		this.loadEvents();
	    this.setBindings();
	    this.setToday();
	    this.setSelected(this.settings.date);
	    
	    this.current_date();
	}
	
	this.current_date = function(){
	    var $el = $(this.elementId);
	    day = ($(this.elementId).find('.selected').length>=1) ? this.stringToDate($(this.elementId).find('.selected').attr('datetime')) : this.stringToDate($(this.elementId).find('.today').attr('datetime'));
        return day;
	}
	
	//PRIVATES
	this.markup = function(){
	    var $el = $(this.elementId);
	    $el.addClass('coffee_calendar');
	    $el.empty();
	    $el.append(this.generateCalendar(this.settings.date.getMonth(), this.settings.date.getFullYear()));
	}
	
	this.generateCalendar = function(month, year) {
		var markup = this.monthMarkup(month, year).after('<ul class="events"></ul>');
		return markup;
	}
	
	this.monthMarkup= function(month, year) {
		var c = new Date();
		c.setDate(1);c.setMonth(month);c.setFullYear(year);
		var x = parseInt(this.settings.weekstart,10);
		var s = (c.getDay()-x)%7;
		if (s<0) { s+=7; }
		var dm = this.monthLength(month,year);

		var this_month = $('<table/>');
		this_month.data('month',month+1);
		this_month.data('year',year);
		this_month.attr('cellspacing', 0);
		var table_head = $('<thead/>');
		var table_row = $('<tr/>');

		$('<th>' + this.settings.days[(0+x)%7]+'</th>').addClass('goto-prevmonth').appendTo(table_row);
		$('<th>' + this.settings.days[(1+x)%7]+'</th>').appendTo(table_row);
		$('<th>' + this.settings.days[(2+x)%7]+'</th>').appendTo(table_row);
		$('<th><span>' + this.settings.months[month] + ' ' + year + '</span>' + this.settings.days[(3+x)%7] + '</th>').appendTo(table_row);
		$('<th>' + this.settings.days[(4+x)%7]+'</th>').appendTo(table_row);
		$('<th>' + this.settings.days[(5+x)%7]+'</th>').appendTo(table_row);
		$('<th>' + this.settings.days[(6+x)%7]+'</th>').addClass('goto-nextmonth').appendTo(table_row);
        table_head.append(table_row);
        this_month.append(table_head);
		var table_body = $('<tbody/>');
		table_row = $('<tr/>');

		//Add remaining days from previous month
		for ( var i=s; i>0; i-- ) {
			var this_y = (month-1)<0?year-1:year;
			table_row.append(this.dayMarkup(0, dm-i+1 , (month+11)%12, this_y, (s-i+x)%7));
		}

		//Add this month
		dm = this.monthLength(month+1,year);
		for(var i=1; i <= dm; i++) {
			if ( (s%7) == 0 ) {
				table_body.append(table_row.clone());
				table_row.empty();
				s = 0;
			}
			table_row.append(this.dayMarkup(1, i , month, year, (s+x)%7));
			s++;
		}

		//Add start of next month
		var j=1;
		for ( var i=s; i<7; i++ ) {
			 var this_y = (month+1)>11?year+1:year;
			 table_row.append(this.dayMarkup(9, j , (month+1)%12, this_y, (i+x)%7));
			 j++;
		 }

		table_body.append(table_row);
		this_month.append(table_body);
		return this_month;
	}
	
	this.monthLength = function(month, year) {
		var dd = new Date(year, month, 0);
		return dd.getDate();
	}
	
	this.dayMarkup = function(format,day,month,year,column) {
		var this_day = $('<td/>');

		if ( format == 0 ) {
			this_day.addClass('prevmonth');
		} else if ( format == 9 ) {
			this_day.addClass('nextmonth');
		}
		if ( column==0 || column==6 ) {
			this_day.addClass('weekend');
		}
		this_day.attr('datetime',year+'-'+(month+1)+'-'+day);
		this_day.html(day);
		return this_day;
    }
	 
    this.setToday = function() {
		var date = new Date();
		$(this.elementId).find('td[datetime='+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+']').addClass('today');
    }
    
    this.setBindings = function() {
		var $el = $(this.elementId);
		var _this = this;
		$el.find('td').bind("click", function() {
			_this.removeSelectedCell();
			$(this).addClass('selected');
			var clickedDate = _this.getCellDate($(this));
			_this.setToday();
			if( $(this).hasClass('date_has_event') ) {
			    _this.showEvents(clickedDate);
			} else {
			    _this.showEvents();
			}
			/*
			console.log(uiTQbars);
			if(uiTQ) { uiTQ.setPageHeight(); }
            */
            
			if( $(this).hasClass('prevmonth') || $(this).hasClass('nextmonth') ) {
			    CF.calendar.create(_this.elementId, _this.events, {date:clickedDate});
			}
		});

		// load previous Month
		$el.find(".goto-prevmonth").bind("click", function() { _this.loadMonthDelta(-1); });
		// load next Month
		$el.find(".goto-nextmonth").bind("click", function() { _this.loadMonthDelta(1); });
	}
	
	this.setSelected = function(date) {
		$el = $(this.elementId);
		var _this = this;
		this.removeSelectedCell();
		$el.find('td').each(function() {
			var clickedDate = _this.getCellDate($(this));
			if( !$(this).hasClass("prevmonth") && !$(this).hasClass("nextmonth") && (_this.sameDay(date, clickedDate)) ) {
				$(this).addClass('selected');
				if ( $(this).hasClass('date_has_event') ) {
				    _this.showEvents(date);
				} else {
					_this.showEvents();
				}
			}
		});
		_this.setToday();
	}
	
	this.sameDay = function(date1, date2) {
		return (date1.getDate && date2.getDate) && date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear()
	}
	
	this.loadMonthDelta = function(delta) {
		$el = $(this.elementId);
		
		//day = ($el.find('.selected').length>=1) ? this.stringToDate($el.find('.selected').attr('datetime')).getDate() : this.stringToDate($el.find('.today').attr('datetime')).getDate();
        var day = 1;
        var month = $el.find('table').data('month');
        var year = $el.find('table').data('year');
        var newDay = new Date(year, (month-1)+delta, day);
        
        CF.calendar.create(this.elementId, this.events, {date:newDay});
	}
	
	this.getCellDate = function(dateCell) {
		var date = $(dateCell).attr('datetime');
		return this.stringToDate(date);
	}
	
	this.stringToDate = function(dateString) {
		var a = dateString.split('-');
		return new Date(a[0],(a[1]-1),a[2]);
	}
	
	this.dateToString = function(date) {
		return date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate();
	}
	
	this.removeSelectedCell = function() {
	    $(this.elementId).find('.selected').removeClass('selected');
	}
	
	this.loadEvents = function() {
	    if (this.events.length > 0){
            var _events = new Array();
    	    $.each(this.events, function() { _events[_events.length] = this.date.substr(0,4) + '-' + parseInt(this.date.substr(4,2)) + '-' + parseInt(this.date.substr(6,2)); });
            $(this.elementId).find('td').each( function(){ if ($.inArray($(this).attr('datetime'), _events) > -1) $(this).addClass('date_has_event'); });
	    }
	}
    
    this.showEvents = function(date) {
        $(this.elementId).find('.events').empty();
        var _list = '<li class="sep">' + this.settings.label_Events + '</li>';
        if (date != undefined && this.events.length > -1){
            var current_event = '';
            $.each(this.events, function() { 
                current_event = this.date.substr(0,4) + '-' + parseInt(this.date.substr(4,2)) + '-' + parseInt(this.date.substr(6,2));
                if (current_event == (date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate())){
                    _list += '<li><span>' + this.time + '</span>'+this.text+'</li>';
                }
            });
        } else {
            _list = '<li class="no-events">' + this.settings.label_noEvents + '</li>';
        }
        $(this.elementId).find('.events').append(_list);
	}
}