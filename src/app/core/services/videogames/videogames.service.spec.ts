import { TestBed } from '@angular/core/testing';
import { VideogamesService } from './videogames.service';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { Genre, Videogame } from '@shared/models/videogames';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('VideogamesService', () => {
  let service: VideogamesService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VideogamesService],
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new VideogamesService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('baseURL should be `http://localhost:8000/videogame`', () => {
    expect(service.baseURL).toEqual('http://localhost:8000/videogame');
  });

  it('getVideogames should return a list of videogames', () => {
    const videogameList: Videogame[] = [
      {
        id: '1',
        title: 'Hades',
        genreId: '1',
        price: 16.79,
        releaseDate: '2020-09-17',
        tags: ['Action roguelike', 'roguelike', 'Action', 'indie'],
      },
      {
        id: '2',
        title: 'Valheim',
        genreId: '2',
        price: 16.79,
        releaseDate: '2021-02-02',
        tags: ['Open World Survival Craft', 'Online Co-Op', 'Survival'],
      },
    ];

    httpClientSpy.get.and.returnValue(
      new Observable((observer) => {
        observer.next(videogameList);
      })
    );

    service.getVideogames().subscribe((body) => {
      expect(body?.length).toBe(2);
      expect(body).toEqual(videogameList);
    });
  });

  it('getGenres should return a list of genres', () => {
    const genreList: Genre[] = [
      {
        id: '1',
        name: 'RPG',
      },
      {
        id: '2',
        name: 'Adventure',
      },
    ];

    httpClientSpy.get.and.returnValue(
      new Observable((observer) => {
        observer.next(genreList);
      })
    );

    service.getGenres().subscribe((body) => {
      expect(body?.length).toBe(2);
      expect(body).toEqual(genreList);
    });
  });
});
