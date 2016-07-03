import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HomeOptions } from '../../home/home-options';
import { Client } from '../domain/client';
import { ParseService } from './parse.service';

@Injectable()
export class ClientsService {
    /**
     *
     */
    constructor(private parseService: ParseService) {
    }

    get(id: string): Observable<Client> {
        let url = 'classes/Client/' + id;
        return this.parseService
            .get(url)
            .map(this.parseService.extractObject)
            .catch(this.parseService.handleError);
    }
}