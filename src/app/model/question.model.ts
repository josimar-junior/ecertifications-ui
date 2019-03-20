import { Certification } from "./certification.model";
import { Statement } from "./statement.model";

export class Question {
    id?: number;
    certification?: Certification;
    number?: string;
    statementQuestion?: string;
    statements?: Statement[] = [];

    constructor(init?: Partial<Question>) {
        Object.assign(this, init);
    }
}