
export class Season {
    id: number;
    startTime: Date;
    endTime: Date;
    maxTime: string;
    maxMatches: number;
    name: string;
    running: boolean;
    playedMatches: number;

    constructor(seasonHash: any) {
        this.id = seasonHash.id;
        this.startTime = seasonHash.start_time;
        this.endTime = seasonHash.end_time;
        this.maxTime = seasonHash.max_time;
        this.maxMatches = seasonHash.max_matches;
        this.name = seasonHash.name;
        this.running = seasonHash.running;
        this.playedMatches = seasonHash.played_matches;
    }
}
