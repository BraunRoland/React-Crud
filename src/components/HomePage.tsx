import { BookCard } from './BookCard'
import type { Book } from '../types'

type HomePageProps = {
  books: Book[]
}

export function HomePage({ books }: HomePageProps) {
  return (
    <section aria-labelledby="home-title" className="page-card">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2 id="home-title" className="mb-0">Könyvek listája</h2>
        <span className="badge bg-primary rounded-pill fs-6">{books.length} rekord</span>
      </div>

      <div className="row g-4">
        {books.map((book, index) => (
          <BookCard key={`${book.title}-${index}`} type="home" {...book} />
        ))}
      </div>
    </section>
  )
}
