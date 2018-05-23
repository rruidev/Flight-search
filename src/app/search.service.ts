import { Injectable, NgModule, forwardRef } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FlightInformation } from './flight-information';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { SearchRequest } from './search-request';


@Injectable()
export class SearchService {
  public url: string = "http://localhost:8882/searchFlights";
  constructor(private http: Http) { }

  getFlightData(request: SearchRequest): Observable<FlightInformation[]> {
    return this.http.get(this.url, { search: this.getSearchParams(request) })
      .map(res => res.json()).catch((err, caught) => caught);
  }

  getSearchParams(request: SearchRequest): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    if (request.date) {
      params.set('d', request.date.toString());
    };
    if (request.destination) {
      params.set('des', request.destination);
    };
    if (request.origin) {
      params.set('ori', request.origin);
    };
    if (request.flightNumber) {
      params.set('f', request.flightNumber.toString())
    }
    return params;
  }
}

