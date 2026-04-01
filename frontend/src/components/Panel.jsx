export function Panel({ title, children, actions }) {
  return (
    <section className="panel">
      <header className="panel-header">
        <h3>{title}</h3>
        <div>{actions}</div>
      </header>
      <div>{children}</div>
    </section>
  );
}
