export default function Header({ total, done }) {
  return (
    <header className="header">
      <h1>Moji zadaci</h1>
      <p className="muted">
        Završeno {done} od {total}
      </p>
    </header>
  )
}
