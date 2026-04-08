export type Platform = 'PC' | 'PlayStation 5' | 'Xbox Series X/S' | 'Nintendo Switch' | 'Steam Deck';
export type Genre = 'Acción' | 'Aventura' | 'Rol' | 'Estrategia' | 'Deportes' | 'Simulación';

export interface Videogame {
  id: number;
  name: string;
  description: string;
  platform: Platform;
  genre: Genre;
  developer: string;
  year: number;
  multiplayer: boolean;
  hours: number;
  value: number;
}