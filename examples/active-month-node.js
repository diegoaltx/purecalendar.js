const util = require('util');
const purecalendar = require('../purecalendar');

var calendar = new purecalendar.Calendar();
var month = calendar.getMonth(); // gets active month
var line;

console.log('S\tM\tT\tW\tT\tF\tS'); // Header

line = [];

for(var i=0; i < month.days.length; i++) {
  var dayLabel;

  // Highlight if today
  if(month.days[i].isToday) {
    dayLabel = '[' +  month.days[i].day + ']';
  } else {
    dayLabel = month.days[i].day;
  }

  line.push(dayLabel);

  if(line.length === 7) {
    console.log(line.join('\t')); // Output calendar line
    line = [];
  }
}
