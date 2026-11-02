import type { ChangeEvent, FormEvent } from 'react'
import { BookCard } from './BookCard'
import type { Book } from '../types'

type AdminPageProps = {
  books: Book[]
  formData: Book
  editingIndex: number | null
  onFieldChange: (event: ChangeEvent<HTMLInputElement>, field: keyof Book) => void
  onCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onEdit: (index: number) => void
  onDelete: (index: number) => void
  onCancelEdit: () => void
}

export function AdminPage({
  books,
  formData,
  editingIndex,
  onFieldChange,
  onCheckboxChange,
  onSubmit,
  onEdit,
  onDelete,
  onCancelEdit,
}: AdminPageProps) {
  return (
    <section aria-labelledby="admin-title" className="page-card">
      <h2 id="admin-title" className="mb-4">Admin felület</h2>

      <form onSubmit={onSubmit} className="row g-3 mb-4 admin-form">
        <div className="col-md-4">
          <label htmlFor="title" className="form-label">Cím</label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={formData.title}
            onChange={(event) => onFieldChange(event, 'title')}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="author" className="form-label">Szerző</label>
          <input
            id="author"
            type="text"
            className="form-control"
            value={formData.author}
            onChange={(event) => onFieldChange(event, 'author')}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="pages" className="form-label">Oldalak</label>
          <input
            id="pages"
            type="number"
            min="1"
            className="form-control"
            value={formData.pages}
            onChange={(event) => onFieldChange(event, 'pages')}
          />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <div className="form-check form-switch mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="available"
              checked={formData.available}
              onChange={onCheckboxChange}
            />
            <label className="form-check-label" htmlFor="available">
              Elérhető
            </label>
          </div>
        </div>

        <div className="col-12 mt-2 d-flex gap-2">
          <button type="submit" className="btn btn-success">
            {editingIndex !== null ? 'Mentés' : 'Hozzáadás'}
          </button>
          {editingIndex !== null && (
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
              Mégse
            </button>
          )}
        </div>
      </form>

      <div className="row g-4">
        {books.map((book, index) => (
          <BookCard
            key={`${book.title}-${index}`}
            type="admin"
            {...book}
            onEdit={() => onEdit(index)}
            onDelete={() => onDelete(index)}
          />
        ))}
      </div>
    </section>
  )
}
