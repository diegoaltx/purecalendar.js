/**
 * @namespace purecalendar
 */
(function() {
    'use strict';

    /**
     * @class {CalendarDay}
     * @memberOf purecalendar
     * @param {purecalendar.Calendar} calendar
     * @param {number=} year
     * @param {number=} month
     * @param {number=} day
     * @property {purecalendar.Calendar} calendar
     * @property {Date} value
     * @constructor
     */
    function CalendarDay(calendar, year, month, day) {
        this.calendar = calendar;
        if(arguments.length == 4) {
            this.value = new Date(year, month - 1, day);
        } else {
            this.value = new Date();
        }
    }

    CalendarDay.prototype =
    /**
     * @lends {purecalendar.CalendarDay}
     */
    {
        constructor: CalendarDay,

        /**
         * @property {number} year
         */
        get year() {
            return this.value.getFullYear();
        },

        /**
         * @property {number} monthIndex
         */
        get monthIndex() {
            return this.value.getMonth();
        },

        /**
         * @property {number} month
         */
        get month() {
            return this.value.getMonth() + 1;
        },

        /**
         * @property {number} day
         */
        get day() {
            return this.value.getDate();
        },

        /**
         * @property {number} weekDayIndex
         */
        get weekDayIndex() {
            return this.value.getDay();
        },

        /**
         * @property {number} weekDay
         */
        get weekDay() {
            return this.value.getDay() + 1;
        },

        /**
         * @property {boolean} isWeekend
         */
        get isWeekend() {
            var weekend = this.calendar.weekend;
            return weekend.indexOf(this.value.getDay()) > -1;
        },

        /**
         * @property {boolean} isToday
         */
        get isToday() {
            var today = this.calendar.today;
            return this.equal(today);
        },

        /**
         * @property {boolean} isFirstDayOfWeek
         */
        get isFirstDayOfWeek() {
            return this.weekDayIndex === this.calendar.firstWeekDay;
        },

        /**
         * @property {boolean} isLastDayOfWeek
         */
        get isLastDayOfWeek() {
            return this.weekDayIndex === this.calendar.lastWeekDay;
        },

        /**
         * @param {purecalendar.CalendarDay} day
         * @returns {boolean}
         */
        equal: function(day) {
            return day.value.toDateString() === this.value.toDateString();
        },

        /**
         * @returns {purecalendar.CalendarDay}
         */
        firstDayOfWeek: function() {
            var day = this;
            while(!day.isFirstDayOfWeek) {
                day = day.previous();
            }
            return day;
        },

        /**
         * @returns {purecalendar.CalendarDay}
         */
        lastDayOfWeek: function() {
            var day = this;
            while(!day.isLastDayOfWeek) {
                day = day.next();
            }
            return day;
        },

        /**
         * @returns {purecalendar.CalendarDay}
         */
        next: function() {
            return new CalendarDay(this.calendar, this.year, this.month, this.day + 1);
        },

        /**
         * @returns {purecalendar.CalendarDay}
         */
        previous: function() {
            return new CalendarDay(this.calendar, this.year, this.month, this.day - 1);
        }
    };

    /**
     * @class {Calendar}
     * @memberOf purecalendar
     * @property {number} firstWeekDay
     * @property {string[]} weekDaysLabels
     * @property {string[]} monthsLabels
     * @property {purecalendar.CalendarDay} today
     * @constructor
     */
    function Calendar() {
        this.firstWeekDay = this.SUNDAY;
        this.weekend = [this.SUNDAY,this.SATURDAY];
        this.today = new CalendarDay(this);
    }

    Calendar.prototype =
    /**
     * @lends {purecalendar.Calendar}
     */
    {
        constructor: Calendar,
        SUNDAY: 0,
        MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3,
        THURSDAY: 4,
        FRIDAY: 5,
        SATURDAY: 6,

        /**
         * @property {number} lastWeekDay
         */
        get lastWeekDay() {
            if(this.firstWeekDay == this.SUNDAY) {
                return this.SATURDAY;
            }
            return this.firstWeekDay - 1;
        },

        /**
         * @param {number=} year
         * @param {number=} month
         * @returns {purecalendar.CalendarMonth}
         */
        getMonth: function (year, month) {
            return new CalendarMonth(this, year, month);
        }
    };

    /**
     * @class {CalendarMonth}
     * @memberOf purecalendar
     * @param {purecalendar.Calendar} calendar
     * @param {number=} year
     * @param {number=} month
     * @property {number} year
     * @property {number} month
     * @constructor
     */
    function CalendarMonth(calendar, year, month) {
        this.calendar = calendar;
        this.year = year || calendar.today.year;
        this.month = month || calendar.today.month;
    }

    CalendarMonth.prototype =
    /**
     * @lends {purecalendar.CalendarMonth}
     */
    {
        constructor: CalendarMonth,

        /**
         * @property {number} monthIndex
         */
        get monthIndex() {
            return this.month - 1;
        },

        /**
         * @property {boolean} isCurrentMonth
         */
        get isCurrentMonth() {
            var today = this.calendar.today;
            return (this.year == today.year && this.month == today.month);
        },

        /**
         * @property {purecalendar.CalendarDay} firstDay
         */
        get firstDay() {
            return (new CalendarDay(this.calendar, this.year, this.month, 1)).firstDayOfWeek();
        },

        /**
         * @property {purecalendar.CalendarDay} lastDay
         */
        get lastDay() {
            return (new CalendarDay(this.calendar, this.year, this.month + 1, 0)).lastDayOfWeek();
        },

        /**
         * @property {purecalendar.CalendarDay[]} days
         */
        get days() {
            var days = [];
            var day = this.firstDay;
            var max = this.lastDay.next();

            do {
                days.push(day);
                day = day.next();
            } while (!day.equal(max));

            return days;
        },

        /**
         * @returns {purecalendar.CalendarMonth}
         */
        previous: function() {
            var year = this.year;
            var month = this.month;

            if(month == 1) {
                year = year - 1;
                month = 12;
            } else {
                month = month - 1;
            }

            return new CalendarMonth(this.calendar, year, month);
        },

        /**
         * @returns {purecalendar.CalendarMonth}
         */
        next: function() {
            var year = this.year;
            var month = this.month;

            if(month == 12) {
                year = year + 1;
                month = 1;
            } else {
                month = month + 1;
            }

            return new CalendarMonth(this.calendar, year, month);
        }
    };

    var purecalendar = {
        Calendar: Calendar,
        CalendarMonth: CalendarMonth,
        CalendarDay: CalendarDay
    };

    if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        // Running as Node.js module
        module.exports = purecalendar;
    } else {
        // Running on browser
        window.purecalendar = purecalendar;
    }

})();
