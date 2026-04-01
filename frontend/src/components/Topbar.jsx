export function Topbar({ role, username }) {
  return (
    <header className="topbar">
      <div>
        <h1>Collaborative Frontend Skeleton</h1>
        <p>One feature can be owned end-to-end, but shared layout, API rules, and styles stay centralized.</p>
      </div>
      <div className={`role-chip ${role.toLowerCase()}`}>
        <span>{role}</span>
        <strong>{username}</strong>
      </div>
    </header>
  );
}
