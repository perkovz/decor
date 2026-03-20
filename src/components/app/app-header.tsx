import { ArrowLeft, Menu, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  menu?: boolean;
  canGoBack?: boolean;
  onBack?: () => void;
  onMenu?: () => void;
  showTrailingFilter?: boolean;
};

export function AppHeader({
  title,
  subtitle,
  menu,
  canGoBack,
  onBack,
  onMenu,
  showTrailingFilter,
}: AppHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-2 pb-4">
      {menu ? (
        <Button aria-label="Open menu" className="shrink-0" size="icon" variant="icon" onClick={onMenu}>
          <Menu className="h-5 w-5" />
        </Button>
      ) : canGoBack ? (
        <Button aria-label="Go back" className="shrink-0" size="icon" variant="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
      ) : (
        <div className="h-11 w-11 shrink-0" />
      )}

      <div className="min-w-0 flex-1">
        {subtitle ? <p className="mb-1 text-xs font-medium text-white/80">{subtitle}</p> : null}
        <h1 className={cn("truncate font-display text-lg font-semibold text-white", subtitle && "leading-none")}>{title}</h1>
      </div>

      {showTrailingFilter ? (
        <Button aria-label="Filters" className="shrink-0" size="icon" variant="icon">
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      ) : null}
    </div>
  );
}
