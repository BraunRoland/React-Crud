import type { Book } from '../types'

export const initialBooks: Book[] = [
  { title: 'Az utolsó király', author: 'Kovács Éva', pages: 320, available: true },
  { title: 'Hullámok a kertben', author: 'Nagy Gábor', pages: 410, available: false },
  { title: 'A kód neve: Nyár', author: 'Fábián Lea', pages: 280, available: true },
  { title: 'Csillagok között', author: 'Horváth Máté', pages: 365, available: true },
  { title: 'Sötét könyvtár', author: 'Balogh Dóra', pages: 450, available: false },
]

export const emptyBookForm: Book = {
  title: '',
  author: '',
  pages: 0,
  available: true,
}
