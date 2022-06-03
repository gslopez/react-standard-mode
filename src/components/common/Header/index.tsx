import "./styles.css";

export function Header({ title, children: actionsChildren }) {
  return (
    <div className="Header">
      <h4 className="dashboard-title">{title}</h4>
      <div className="dashboard-actions">{actionsChildren || []}</div>
    </div>
  );
}
