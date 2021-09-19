import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Quote} from "./model/quote";

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private readonly QUOTES_ENDPOINT = environment.apiUrl + '/api/quotes';

  constructor(private http: HttpClient) {
  }

  getPaginatedQuotes(page: number, size: number): Observable<Quote[]> {
    const params = new HttpParams().set('page', page).set('size', size)
    return this.http.get<Quote[]>(this.QUOTES_ENDPOINT, {params: params})
  }

  getTotalQuotesCount(): Observable<number> {
    return this.http.get<number>(this.QUOTES_ENDPOINT + '/count');
  }

  getQuoteById(id: number): Observable<Quote> {
    return this.http.get<Quote>(this.QUOTES_ENDPOINT + '/' + id);
  }

  createQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.QUOTES_ENDPOINT, quote)
  }

  updateQuote(quote: Quote): Observable<Quote> {
    return this.http.put<Quote>(this.QUOTES_ENDPOINT, quote)
  }

  deleteQuote(id: number): Observable<any> {
    return this.http.delete(this.QUOTES_ENDPOINT + '/' + id);
  }
}
