const util = require('util');
const purecalendar = require('../purecalendar');

var calendar = new purecalendar.Calendar();
var month = calendar.getMonth(); // gets active month
var stdout = process.stdout;
var weekDayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

stdout.write(weekDayLabels.join('\t'));

for(var i=0; i < month.days.length; i++) {
  if(month.days[i].isFirstDayOfWeek) {
    stdout.write('\n');
  } else {
    stdout.write('\t');
  }

  if(month.days[i].isToday) {
    // Highlight active day
    stdout.write('[' +  month.days[i].day + ']');
  } else if(month.days[i].month === month.month) {
    // Hide if not in active month
    stdout.write(month.days[i].day.toString());
  }
}

stdout.write('\n');
