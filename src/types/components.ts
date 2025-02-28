import { Movie } from "./movie";

export interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export interface MovieCardProps {
  movie: Movie;
} 