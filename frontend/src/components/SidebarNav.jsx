export function SidebarNav({ menus, activeKey, onNavigate }) {
  return (
    <nav className="nav-list">
      {menus.map((item) => (
        <button
          key={item.key}
          className={`nav-item ${activeKey === item.key ? "active" : ""}`}
          onClick={() => onNavigate(item.key)}
        >
          <span className="nav-title">{item.title}</span>
          <span className="nav-hint">{item.hint}</span>
        </button>
      ))}
    </nav>
  );
}
