import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthModalService {
    private _loginVisible = new BehaviorSubject<boolean>(false);
    loginVisible$ = this._loginVisible.asObservable();

    openLogin() {
        this._loginVisible.next(true);
    }

    closeLogin() {
        this._loginVisible.next(false);
    }
}
