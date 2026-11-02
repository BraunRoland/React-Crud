import type { Book } from '../types'

type BookCardProps = Book & {
  type?: 'home' | 'admin' | 'moderator'
  onEdit?: () => void
  onDelete?: () => void
  onToggle?: () => void
}

export function BookCard({
  title,
  author,
  pages,
  available,
  type = 'home',
  onEdit,
  onDelete,
  onToggle,
}: BookCardProps) {
  return (
    <article className="col-md-6 col-xl-4">
      <div className="card h-100 shadow-sm border-0">
        <div className="card-body d-flex flex-column h-100">
          <h3 className="h5 card-title">{title}</h3>
          <p className="mb-2">
            <strong>Szerző:</strong> {author}
          </p>
          <p className="mb-2">
            <strong>Oldalak:</strong> {pages}
          </p>
          <span className={`badge ${available ? 'bg-success' : 'bg-secondary'} rounded-pill mb-3`}>
            {available ? 'Elérhető' : 'Kölcsönzött'}
          </span>

          {type === 'admin' && (
            <div className="mt-auto d-flex gap-2 flex-wrap">
              <button type="button" className="btn btn-sm btn-warning text-dark" onClick={onEdit}>
                Módosítás
              </button>
              <button type="button" className="btn btn-sm btn-danger" onClick={onDelete}>
                Törlés
              </button>
            </div>
          )}

          {type === 'moderator' && (
            <button
              type="button"
              className={`btn mt-auto ${available ? 'btn-outline-danger' : 'btn-outline-success'}`}
              onClick={onToggle}
            >
              {available ? 'Kapcsolás ki' : 'Kapcsolás be'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
