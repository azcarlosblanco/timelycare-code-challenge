export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface SearchResponse {
  Search?: Movie[];
  Response: string;
  Error?: string;
  totalResults?: string;
}
