import * as http from 'http';

declare module 'http' {
  export interface IncomingMessage {
    movies: any[];
  }
}