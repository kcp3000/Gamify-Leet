import type { Issue } from "../types";

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <h3>{issue.title}</h3>
      <p>{issue.description}</p>
      <span>{issue.status}</span>
    </div>
  );
}
