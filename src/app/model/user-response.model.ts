import { Certification } from './certification.model';

export class UserResponse {
    public id?: number;
    public certification: Certification;
    public questionNumber?: string;
    public items?: string
}