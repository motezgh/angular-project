import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
//import { PROMOTIONS } from '../shared/promotions';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions') 
    .pipe(catchError(this.processHTTPMsgService.handleError));
    //of(PROMOTIONS).pipe(delay(2000));
    
  }

  getPromotion(id: string): Observable<Promotion> {
    return  this.http.get<Promotion>(baseURL + 'promotions/' + id) 
    .pipe(catchError(this.processHTTPMsgService.handleError));
    //of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
    
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
    .pipe(map(promotions => promotions[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
    //of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    
  }

  

}
