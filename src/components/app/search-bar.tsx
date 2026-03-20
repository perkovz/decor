import { Barcode, Plus, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  placeholder: string;
  value?: string;
  onActivate?: () => void;
  showFilter?: boolean;
  showBarcode?: boolean;
  floatingAdd?: boolean;
};

export function SearchBar({ placeholder, value, onActivate, showFilter, showBarcode, floatingAdd }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 border-t border-white/10 bg-card px-2 py-3">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <div
          onClick={onActivate}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onActivate?.();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <Input className="h-11 rounded-lg bg-muted pl-11 pr-12" placeholder={placeholder} readOnly value={value} />
        </div>
        {showBarcode ? (
          <Button
            aria-label="Open barcode scanner"
            className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 rounded-md bg-transparent text-muted-foreground shadow-none hover:bg-background"
            size="icon"
            variant="ghost"
          >
            <Barcode className="h-5 w-5" />
          </Button>
        ) : null}
      </div>

      {showFilter ? (
        <Button aria-label="Open filters" className="h-11 w-11 rounded-full bg-muted text-foreground shadow-none hover:bg-muted/80" size="icon" variant="ghost">
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      ) : null}

      {floatingAdd ? (
        <Button aria-label="Add" className="h-11 w-11 rounded-full bg-muted text-foreground shadow-none hover:bg-muted/80" size="icon" variant="ghost">
          <Plus className="h-5 w-5" />
        </Button>
      ) : null}
    </div>
  );
}
