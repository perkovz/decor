import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type MobileFrameProps = PropsWithChildren<{
  className?: string;
}>;

export function MobileFrame({ children, className }: MobileFrameProps) {
  return (
    <main className="min-h-screen bg-page-glow px-4 py-6 text-foreground">
      <div className="mx-auto flex max-w-md justify-center">
        <section
          className={cn(
            "relative flex h-[813px] w-full max-w-[375px] flex-col overflow-hidden rounded-[30px] border border-white/50 bg-background shadow-frame",
            className,
          )}
        >
          {children}
        </section>
      </div>
    </main>
  );
}
