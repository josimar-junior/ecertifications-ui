import { Detail } from './detail.model';
import { Organization } from './organization.model';

export class Certification {
    id: number;
    name: string;
    exam: string;
    details: Array<Detail>;
    organization: Organization;
    description: string;
    percentage: number;

    constructor(init?: Partial<Certification>) {
        Object.assign(this, init);
    }
}