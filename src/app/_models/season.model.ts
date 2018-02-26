
export class Season {
    id: number;
    start_time: Date;
    end_time: Date;
    max_time: string;
    max_matches: number;
    name: string;
    running: boolean;
    played_matches: number;

    constructor(seasonHash: any) {
        this.id = seasonHash.id;
        this.start_time = seasonHash.start_time;
        this.end_time = seasonHash.end_time;
        this.max_time = seasonHash.max_time;
        this.max_matches = seasonHash.max_matches;
        this.name = seasonHash.name;
        this.running = seasonHash.running;
        this.played_matches = seasonHash.played_matches;
    }
}
