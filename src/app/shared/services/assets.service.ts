import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HomeOptions } from '../../home/home-options';
import { Asset } from '../domain/asset';
import { AssetsQueryOptions } from '../domain/assets-query-options';
import { ParseService } from './parse.service';

@Injectable()
export class AssetsService {
  /**
   *
   */
  constructor(private parseService: ParseService) {
  }

  query(options: AssetsQueryOptions): Observable<Asset[]> {
    let url = 'classes/Asset?skip=0';
    if (options.name) {
      url = url + '&where={"name":"' + options.name + '"}';
    }
    return this.parseService
      .get(url)
      .map(this.parseService.extractArray)
      .catch(this.parseService.handleError);
  }
}
