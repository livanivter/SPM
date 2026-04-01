export function Badge({ text, tone = "default" }) {
  return <span className={`badge badge-${tone}`}>{text}</span>;
}
