import {of} from 'rxjs';
import {HttpRequest, HttpResponse} from '@angular/common/http';
// Local imports
import videogamesJSON from '../../assets/mock-data/videogames.json';
import genresJSON from '../../assets/mock-data/genres.json';



const getVideogames = (request: HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 200, body: JSON.parse(JSON.stringify(videogamesJSON))
  }));
};

const getGenres = (request: HttpRequest<any>) => {
    const response = new HttpResponse({
        status: 200, body: JSON.parse(JSON.stringify(genresJSON))
      });
    return of(response);
};



export const selectHandler = (request: HttpRequest<any>) => {
  const requestUrl = new URL(request.url);
  switch (request.method) {
    case 'GET':
      const pathname = requestUrl.pathname;
      if (pathname === '/videogame/list') {
          return getVideogames;
      }
      if (pathname === '/videogame/genre/list') {
        return getGenres;
      }
    default:
      return null;
  }
};