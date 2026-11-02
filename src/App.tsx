import { useState, type ChangeEvent, type FormEvent } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './components/HomePage'
import { AdminPage } from './components/AdminPage'
import { ModeratorPage } from './components/ModeratorPage'
import { initialBooks, emptyBookForm } from './data/books'
import type { Book, Page } from './types'

function App() {
  const [activePage, setActivePage] = useState<Page>('home')
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [formData, setFormData] = useState<Book>(emptyBookForm)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, field: keyof Book) => {
    const value = field === 'pages' ? Number(event.target.value) : event.target.value
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({ ...current, available: event.target.checked }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedBook: Book = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      pages: Number(formData.pages),
      available: formData.available,
    }

    if (!normalizedBook.title || !normalizedBook.author || normalizedBook.pages <= 0) {
      return
    }

    if (editingIndex !== null) {
      setBooks((current) =>
        current.map((book, index) => (index === editingIndex ? normalizedBook : book)),
      )
      setEditingIndex(null)
    } else {
      setBooks((current) => [...current, normalizedBook])
    }

    setFormData(emptyBookForm)
  }

  const startEditing = (index: number) => {
    setFormData({ ...books[index] })
    setEditingIndex(index)
    setActivePage('admin')
  }

  const removeBook = (index: number) => {
    setBooks((current) => current.filter((_, itemIndex) => itemIndex !== index))

    if (editingIndex === index) {
      setEditingIndex(null)
      setFormData(emptyBookForm)
    }
  }

  const toggleAvailability = (index: number) => {
    setBooks((current) =>
      current.map((book, itemIndex) =>
        itemIndex === index ? { ...book, available: !book.available } : book,
      ),
    )
  }

  const renderCurrentPage = () => {
    if (activePage === 'admin') {
      return (
        <AdminPage
          books={books}
          formData={formData}
          editingIndex={editingIndex}
          onFieldChange={handleInputChange}
          onCheckboxChange={handleCheckboxChange}
          onSubmit={handleSubmit}
          onEdit={startEditing}
          onDelete={removeBook}
          onCancelEdit={() => {
            setEditingIndex(null)
            setFormData(emptyBookForm)
          }}
        />
      )
    }

    if (activePage === 'moderator') {
      return <ModeratorPage books={books} onToggleAvailability={toggleAvailability} />
    }

    return <HomePage books={books} />
  }

  return (
    <div className="app-wrapper">
      <Header activePage={activePage} onPageChange={setActivePage} />
      <main className="container py-4 flex-grow-1">{renderCurrentPage()}</main>
      <Footer />
    </div>
  )
}

export default App
