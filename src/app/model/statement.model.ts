export class Statement {
    id?: number;
    item?: string;
    description?: string;
    correct?: boolean;

    constructor(init?: Partial<Statement>) {
        Object.assign(this, init);
    }
}