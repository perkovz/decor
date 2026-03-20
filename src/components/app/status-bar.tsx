import { BatteryFull, SignalHigh, Wifi } from "lucide-react";

export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pb-2 pt-3 text-sm font-medium tracking-tight text-white">
      <span>8:30</span>
      <div className="flex items-center gap-2">
        <SignalHigh className="h-4 w-4" />
        <Wifi className="h-4 w-4" />
        <BatteryFull className="h-4 w-4" />
      </div>
    </div>
  );
}
