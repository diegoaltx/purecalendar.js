(function() {
    'use strict';

    var module = QUnit.module;
    var test = QUnit.test;

    //////////

    module('purecalendar.Calendar');

    test("constructor", function(assert) {
        var c = new purecalendar.Calendar();
        assert.ok(c instanceof purecalendar.Calendar, 'creates a new instance');
    });

    test("lastWeekDay", function(assert) {
        var c = new purecalendar.Calendar();
        assert.equal(c.lastWeekDay, c.SATURDAY, 'by default firstWeekDay is sunday so this is saturday');

        c.firstWeekDay = c.MONDAY;
        assert.equal(c.lastWeekDay, c.SUNDAY, 'if firstWeekDay is monday this is sunday');
    });

    test("getMonth", function(assert) {
        var c = new purecalendar.Calendar();
        assert.ok(c.getMonth() instanceof purecalendar.CalendarMonth, 'returns a new CalendarMonth instance');
    });

    //////////

    module('purecalendar.CalendarMonth');

    test('constructor', function(assert) {
        var c = new purecalendar.Calendar();
        var m = new purecalendar.CalendarMonth(c);
        assert.ok(m instanceof purecalendar.CalendarMonth, 'creates a new instance');
    });

    test('monthIndex', function(assert) {
        var c = new purecalendar.Calendar();
        var m = new purecalendar.CalendarMonth(c, 2016, 5);
        assert.equal(m.monthIndex, 4, 'returns month - 1');
    });

    test('isCurrentMonth', function(assert) {
        var c = new purecalendar.Calendar();
        var m = new purecalendar.CalendarMonth(c);
        c.today.value = new Date(2016, 5 - 1, 1);

        m.year = 2016;
        m.month = 5;
        assert.ok(m.isCurrentMonth, 'returns true if in the same year and month that today value');

        m.year = 2016;
        m.month = 4;
        assert.notOk(m.isCurrentMonth, 'returns false if not in the same year and month that today value');

        m.year = 2014;
        m.month = 5;
        assert.notOk(m.isCurrentMonth, 'returns false if month is the same that today value but year does not');
    });

    test('days', function(assert) {
        var c = new purecalendar.Calendar();
        var m = new purecalendar.CalendarMonth(c);

        assert.ok(m.days instanceof Array, 'returns an array');
        assert.ok(m.days[0].equal(m.firstDay), 'first item of array is firstDay');
        assert.ok(m.days[m.days.length - 1].equal(m.lastDay), 'last item of array is lastDay');
    });
    
})();
