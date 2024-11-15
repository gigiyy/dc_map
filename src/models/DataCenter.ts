interface Position {
    latitude: number;
    longitude: number;
}

export interface IDataCenter {
    name: string;
    position: Position;
    description: string;
}

export class DataCenter implements IDataCenter {
    constructor(
        public name: string,
        public position: Position,
        public description: string
    ) {}

    toString(): string {
        return `DataCenter(name=${this.name}, position=[${this.position.latitude}, ${this.position.longitude}])`;
    }
} 