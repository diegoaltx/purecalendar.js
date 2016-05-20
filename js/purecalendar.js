var purecalendar = (function() {

    'use strict';

    /**
     * @param {Date} date
     * @property {Date} value
     * @property {number} year
     * @property {number} monthIndex
     * @property {number} month
     * @property {number} day
     * @property {number} weekDayIndex
     * @property {number} weekDay
     * @property {boolean} isWeekend
     * @property {boolean} isToday
     * @constructor
     */
    function CalendarDate(date) {
        this.value = date;
        this.year = date.getFullYear();
        this.monthIndex = date.getMonth();
        this.month = this.monthIndex + 1;
        this.day = date.getDate();
        this.weekDayIndex = date.getDay();
        this.weekDay = this.weekDayIndex + 1;
        this.isWeekend = [0,6].indexOf(this.weekDayIndex) > -1;
        this.isToday = (new Date()).toDateString() === date.toDateString();
    }

    /**
     * @returns {string}
     */
    Calendar.prototype.toString = function() {
        var date = this.value;
        return [date.getFullYear(), date.getMonth(), date.getDate()].join('-');
    };

    /**
     * @param {number} year
     * @param {number} month
     * @property {number} year
     * @property {number} month
     * @property {CalendarDate[]} dates
     * @property {CalendarDate} firstDate
     * @property {CalendarDate} lastDate
     * @property {CalendarDate} today
     * @property {boolean} isCurrentMonth
     * @returns {Calendar}
     * @constructor
     */
    function Calendar(year, month) {

        this.today = new CalendarDate(new Date());

        this.year = (year ? year : this.today.year);
        this.month = (month ? month : this.today.month);
        this.monthIndex = this.month - 1;

        var first = this.firstDateOfWeek(new Date(this.year, this.month - 1));
        var last = this.lastDateOfWeek(new Date(this.year, this.month, 0));
        this.firstDate = new CalendarDate(first);
        this.lastDate = new CalendarDate(last);

        this.isCurrentMonth = (this.year === this.today.year && this.month === this.today.month);

        this.dates = [];
        var current = first;

        do {
            this.dates.push(new CalendarDate(current));
            current = this.nextDate(current);
        } while (current <= last);

        return this;
    }

    /**
     * @param {Date} date
     * @returns {Date}
     */
    Calendar.prototype.firstDateOfWeek = function(date) {
        var currentDate = date;
        while(!this.isFirstDateOfWeek(currentDate)) {
            currentDate = this.previousDate(currentDate);
        }
        return currentDate;
    };

    /**
     * @param {Date} date
     * @returns {Date}
     */
    Calendar.prototype.lastDateOfWeek = function(date) {
        var currentDate = date;
        while(!this.isLastDateOfWeek(currentDate)) {
            currentDate = this.nextDate(currentDate);
        }
        return currentDate;
    };

    /**
     * @param {Date} date
     * @returns {Date}
     */
    Calendar.prototype.previousDate = function(date) {
        if(this.isFirstDateOfYear(date)) {
            return new Date(date.getFullYear() - 1, 11, 31);
        }
        if(this.isFirstDateOfMonth(date)) {
            return new Date(date.getFullYear(), date.getMonth(), 0);
        }
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    };

    /**
     * @param {Date} date
     * @returns {Date}
     */
    Calendar.prototype.nextDate = function(date) {
        if(this.isLastDateOfYear(date)) {
            return new Date(date.getFullYear() + 1, 0, 1);
        }
        if(this.isLastDateOfMonth(date)) {
            return new Date(date.getFullYear(), date.getMonth() + 1, 1);
        }
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    };

    /**
     * @param {Date} date
     * @returns {boolean}
     */
    Calendar.prototype.isFirstDateOfMonth = function(date) {
        return date.getDate() === 1;
    };

    /**
     * @param {Date} date
     * @returns {boolean}
     */
    Calendar.prototype.isLastDateOfMonth = function(date) {
        var lastDayOfMonth;
        if(this.isLastMonthOfYear(date)) {
            lastDayOfMonth = new Date(date.getFullYear() + 1, 0, 0);
        } else {
            lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }
        return date.getDate() === lastDayOfMonth.getDate();
    };

    /**
     * @param {Date} date
     * @returns {boolean}
     */
    Calendar.prototype.isFirstMonthOfYear = function(date) {
        return date.getMonth() === 0;
    };

    /**
     * @param {Date} date
     * @returns {boolean}
     */
    Calendar.prototype.isLastMonthOfYear = function(date) {
        return date.getMonth() === 11;
    };

    /**
     * @param {Date} date
     * @returns {boolean}
     */
    Calendar.prototype.isFirstDateOfYear = function(date) {
        return this.isFirstMonthOfYear(date) && this.isFirstDateOfMonth(date);
    };

    /**
     * @param {Date} date
     * @returns {boolean}
     */
    Calendar.prototype.isLastDateOfYear = function(date) {
        return this.isLastMonthOfYear(date) && this.isLastDateOfMonth(date);
    };

    /**
     * @param {Date} date
     * @returns {boolean}
     */
    Calendar.prototype.isFirstDateOfWeek = function(date) {
        return date.getDay() === 0;
    };

    /**
     * @param {Date} date
     * @returns {boolean}
     */
    Calendar.prototype.isLastDateOfWeek = function (date) {
        return date.getDay() === 6;
    };

    return {
        CalendarDate: CalendarDate,
        Calendar: Calendar
    };

})();
