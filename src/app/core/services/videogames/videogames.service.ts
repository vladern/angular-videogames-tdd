
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Genre, Videogame } from '@shared/models/videogames';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  public baseURL = environment.apiURL + '/videogame';

  constructor(private _http: HttpClient) { }

  getVideogames(): Observable<Videogame[]> {
    return this._http.get<Videogame[]>(this.baseURL+'/list');
  }

  getGenres(): Observable<Genre[]> {
    return this._http.get<Genre[]>(this.baseURL+'/genre/list');
  }
}
