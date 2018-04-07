import { Pipe } from "@angular/core";

@Pipe({
  name: "sort"
})
export class ArraySortPipe {
  transform(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}

@Pipe({
  name: "duration"
})
export class DurationPipe {
  // Use the options param to pass wanted display values:
  // 'h-m-s' will display hours, minutes and seconds
  // 'm-s' will display only minutes and seconds
  transform(seconds: number, options: any): string {
    var date = new Date(null);
    date.setSeconds(seconds);

    options = options.split("-");
    let startIdx = { h: 11, m: 14, s: 17 }[options[0]];
    let endIdx = { h: 13, m: 16, s: 19 }[options[options.length - 1]];

    return date.toISOString().substring(startIdx, endIdx);
  }
}


@Pipe({
  name: "ekimoney"
})
export class EkiMoneyPipe {
  transform(seconds: number): string {
    let ekiRate = 1000 / 8 / 60 / 60; // = $ rate per seconds
   return (seconds * ekiRate).toFixed(0) + "€";
  }
}
