import type { Page } from '../types'

type HeaderProps = {
  activePage: Page
  onPageChange: (page: Page) => void
}

export function Header({ activePage, onPageChange }: HeaderProps) {
  const links: { key: Page; label: string }[] = [
    { key: 'home', label: 'Kezdőlap' },
    { key: 'admin', label: 'Admin' },
    { key: 'moderator', label: 'Moderátor' },
  ]

  return (
    <header className="site-header bg-dark text-white shadow-sm">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center py-3 gap-3">
        <div className="brand-box">
          <h1 className="h3 mb-0">Könyvek</h1>
        </div>

        <nav aria-label="Főmenü" className="main-nav">
          {links.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`btn ${activePage === item.key ? 'btn-primary' : 'btn-outline-light'} px-3`}
              onClick={() => onPageChange(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
