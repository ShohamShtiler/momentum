export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">Momentum</div>

      <nav className="nav">
        <a className="link active" href="#">
          Dashboard
        </a>
        <a className="link" href="#">
          Habits
        </a>
        <a className="link" href="#">
          Focus
        </a>
        <a className="link" href="#">
          Analytics
        </a>
        <a className="link" href="#">
          Settings
        </a>
      </nav>
    </aside>
  )
}