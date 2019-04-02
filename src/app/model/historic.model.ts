import { Certification } from './certification.model';

export class Historic {

    constructor(public certification?: Certification,
                public time?: string,
                public percentage?: number) {}
}