import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../interfaces/user/user.model';

@Injectable({
    providedIn: 'root'
})
export class LoggedUserService {
    public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
}
