export class Statistics {
  id: number;
  match_id: number;
  user_id: number;
  score: number;
  tags: number;
  popped: number;
  grabs: number;
  drops: number;
  hold: string; // PSQL INTERVAL
  captures: number;
  prevent: string; // PSQL INTERVAL
  returns: number;
  support: number;
  pups: number;
}
// PSQL INTERVAL:
// Period of time; Interval value is a string in single quotes with the following syntax:

// '[@] value unit { value unit … }'

// @is optional, value is a number, unit is microsecond, millisecond, second, minute, hour, day, week, month, year, decade, century, millennium
// or their plural form(years, days etc) and abbreviations(min, sec)

// ex: '1 day 3 hours 31 min 24 sec'