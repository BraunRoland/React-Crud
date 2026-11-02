import { BookCard } from './BookCard'
import type { Book } from '../types'

type ModeratorPageProps = {
  books: Book[]
  onToggleAvailability: (index: number) => void
}

export function ModeratorPage({ books, onToggleAvailability }: ModeratorPageProps) {
  return (
    <section aria-labelledby="moderator-title" className="page-card">
      <h2 id="moderator-title" className="mb-4">Moderátor felület</h2>

      <div className="row g-4">
        {books.map((book, index) => (
          <BookCard
            key={`${book.title}-moderator-${index}`}
            type="moderator"
            {...book}
            onToggle={() => onToggleAvailability(index)}
          />
        ))}
      </div>
    </section>
  )
}
