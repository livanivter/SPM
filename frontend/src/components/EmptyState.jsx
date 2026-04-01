export function EmptyState({ title, note }) {
  return (
    <div className="empty-state">
      <h4 className="section-title">{title}</h4>
      <p className="page-note">{note}</p>
    </div>
  );
}
