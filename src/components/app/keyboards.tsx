import { Delete } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NumberPadProps = {
  visible: boolean;
  onKeyPress: (key: string) => void;
};

const numberKeys = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

export function NumberPad({ visible, onKeyPress }: NumberPadProps) {
  return (
    <div
      className={cn(
        "mt-auto bg-[#e5e7eb] px-1.5 pb-2 pt-1.5 transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <div className="grid grid-cols-3 gap-x-1.5 gap-y-2">
        {numberKeys.flat().map((key) => (
          <button
            key={key}
            className="flex min-h-[46px] flex-col items-center justify-center rounded-md bg-white/95 text-foreground shadow-sm"
            onClick={() => onKeyPress(key)}
            type="button"
          >
            <span className="text-lg">{key}</span>
            {key !== "1" ? <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500">{key === "2" ? "ABC" : key === "3" ? "DEF" : key === "4" ? "GHI" : key === "5" ? "JKL" : key === "6" ? "MNO" : key === "7" ? "PQRS" : key === "8" ? "TUV" : "WXYZ"}</span> : null}
          </button>
        ))}
        <div />
        <button className="min-h-[46px] rounded-md bg-white/95 text-lg shadow-sm" onClick={() => onKeyPress("0")} type="button">
          0
        </button>
        <button className="grid min-h-[46px] place-items-center rounded-md text-foreground" onClick={() => onKeyPress("delete")} type="button">
          <Delete className="h-6 w-6" />
        </button>
      </div>
      <div className="mx-auto mt-4 h-1.5 w-32 rounded-full bg-foreground" />
    </div>
  );
}

type AlphaKeyboardProps = {
  visible?: boolean;
  onKeyPress: (key: string) => void;
};

const alphaRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export function AlphaKeyboard({ onKeyPress, visible = true }: AlphaKeyboardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300",
        visible ? "max-h-80 opacity-100" : "pointer-events-none max-h-0 opacity-0",
      )}
    >
      <div className="space-y-2 rounded-t-[28px] bg-[#d1d5db] px-2 pb-3 pt-2">
        {alphaRows.map((row) => (
          <div key={row.join("")} className="flex justify-center gap-1.5">
            {row.map((key) => (
              <Button
                key={key}
                className="h-10 min-w-[30px] rounded-md bg-white px-3 text-sm font-medium text-foreground shadow-none"
                onClick={() => onKeyPress(key)}
                variant="outline"
              >
                {key}
              </Button>
            ))}
          </div>
        ))}
        <div className="flex justify-center gap-1.5">
          <Button className="h-10 rounded-md bg-white px-4 text-foreground shadow-none" onClick={() => onKeyPress("space")} variant="outline">
            space
          </Button>
          <Button className="h-10 rounded-md bg-white px-4 text-foreground shadow-none" onClick={() => onKeyPress("delete")} variant="outline">
            delete
          </Button>
          <Button className="h-10 rounded-md bg-white px-4 text-foreground shadow-none" onClick={() => onKeyPress("return")} variant="outline">
            return
          </Button>
        </div>
        <div className="mx-auto mt-3 h-1.5 w-32 rounded-full bg-foreground" />
      </div>
    </div>
  );
}
