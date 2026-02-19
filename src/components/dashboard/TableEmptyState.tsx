import { Search } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
}

export function TableEmptyState({
  title = "No results found",
  description = "Try adjusting your filters or search query.",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Search className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="text-base font-display font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
    </div>
  );
}
