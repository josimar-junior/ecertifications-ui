export class CertificationFilter {
    name?: string;
    exam?: string;
    idOrganization?: number;

    constructor(init?: Partial<CertificationFilter>) {
        Object.assign(this, init);
    }
}