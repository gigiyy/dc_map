export interface IAlert {
    id: string;
    title: string;
    ait_number: number;
    dc: string;
    affected_aits: number[];
    affected_dcs: string[];
    description: string;
}

export class Alert implements IAlert {
    constructor(
        public id: string,
        public title: string,
        public ait_number: number,
        public dc: string,
        public affected_aits: number[],
        public affected_dcs: string[],
        public description: string
    ) {}

    toString(): string {
        return `Alert(id=${this.id}, title=${this.title}, ait_number=${this.ait_number})`;
    }
} 