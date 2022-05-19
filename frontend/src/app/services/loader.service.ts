import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
    
    public state = new BehaviorSubject(false);

    constructor() { }

    public start() {
        this.state.next(true);
    }

    public finish() {
        this.state.next(false);
    }
}