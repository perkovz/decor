import { ChevronRight, ClipboardList, LogOut, PackageSearch, ShoppingBag, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const iconMap = {
  Sales: ShoppingBag,
  Customer: Users,
  Item: PackageSearch,
  CRM: ClipboardList,
  "Daily Work": ClipboardList,
  Logout: LogOut,
} as const;

type NavMenuProps = {
  items: readonly string[];
  onSelect?: (item: string) => void;
  compact?: boolean;
};

export function NavMenu({ items, onSelect, compact }: NavMenuProps) {
  return (
    <Card className="overflow-hidden rounded-none border-0 shadow-none">
      {items.map((item, index) => {
        const Icon = iconMap[item as keyof typeof iconMap] ?? ClipboardList;
        return (
          <button
            key={item}
            className={cn(
              "flex w-full items-center gap-4 border-b border-border bg-card px-4 text-left transition-colors hover:bg-muted/50",
              compact ? "min-h-[68px]" : "min-h-[72px]",
              index === items.length - 1 && "border-b-0",
            )}
            onClick={() => onSelect?.(item)}
            type="button"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full border border-slate-200 bg-muted text-slate-700">
              <Icon className="h-5 w-5" />
            </span>
            <span className="flex-1 text-base font-medium tracking-tight">{item}</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        );
      })}
    </Card>
  );
}
