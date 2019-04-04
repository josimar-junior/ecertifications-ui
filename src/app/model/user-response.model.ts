import { Certification } from './certification.model';
import { Historic } from './historic.model';

export class UserResponse {
    public id?: number;
    public certification: Certification;
    public historic?: Historic;
    public questionNumber?: string;
    public items?: string
}