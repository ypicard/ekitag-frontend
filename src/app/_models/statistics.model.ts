export class Statistics {
  id: number;
  matchId: number;
  userId: number;
  userPseudo: string;
  score: number;
  tags: number;
  popped: number;
  grabs: number;
  drops: number;
  hold: number; // PSQL INTERVAL
  captures: number;
  prevent: number; // PSQL INTERVAL
  returns: number;
  support: number;
  pups: number;

  constructor(statsHash: any) {
      this.id = statsHash.id;
      this.matchId = statsHash.match_id;
      this.userId = statsHash.user_id;
      this.userPseudo = statsHash.user_pseudo;
      this.score = statsHash.score;
      this.tags = statsHash.tags;
      this.popped = statsHash.popped;
      this.grabs = statsHash.grabs;
      this.drops = statsHash.drops;
      this.hold = statsHash.hold;
      this.captures = statsHash.captures;
      this.prevent = statsHash.prevent;
      this.returns = statsHash.returns;
      this.support = statsHash.support;
      this.pups = statsHash.pups;
  }
}
// PSQL INTERVAL:
// Period of time; Interval value is a string in single quotes with the following syntax:

// '[@] value unit { value unit … }'

// @is optional, value is a number, unit is microsecond, millisecond, second, minute, hour, day, week, month, year, decade, century, millennium
// or their plural form(years, days etc) and abbreviations(min, sec)

// ex: '1 day 3 hours 31 min 24 sec'
