export interface Videogame {
  id: string;
  title: string;
  genreId: string;
  price: number;
  releaseDate: string;
  tags: string[];
}

export interface Genre {
  id: string;
  name: string;
}
