import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Producer } from '../domain/producer';
import { ParseService } from './parse.service';

@Injectable()
export class ProducersService {
    /**
     *
     */
    constructor(private parseService: ParseService) {
    }

    query(): Observable<Producer[]> {
        let url = 'classes/Producer';
        return this.parseService
            .get(url)
            .map(this.parseService.extractArray)
            .catch(this.parseService.handleError);
    }
}
