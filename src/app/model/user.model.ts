export class User {
    id?: number;
    name: string;
    email: string;
    password: string;
    passwordConfirmation?: string;
    active?: boolean;

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}