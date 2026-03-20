import { ChevronRight, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { PurchaseLineItem, PurchaseOrderSummary, ShipToAddress, Vendor } from "@/types/app";

export function OrderSummaryCard({
  item,
  onClick,
}: {
  item: PurchaseOrderSummary;
  onClick?: () => void;
}) {
  return (
    <Card className="cursor-pointer rounded-2xl" onClick={onClick}>
      <CardContent className="flex items-center gap-3 p-4">
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm text-muted-foreground">
            {item.owner} • Ordered: {item.orderedAt} • {item.status}
          </p>
          <h3 className="font-display text-lg font-semibold">{item.id}</h3>
          <p className="text-sm text-muted-foreground">Required By: {item.requiredBy}</p>
          <p className="text-sm">
            <span className="text-muted-foreground">Vendor:</span> {item.vendor}
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Total:</span> {item.total}
          </p>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
      </CardContent>
    </Card>
  );
}

export function InfoBlock({
  order,
  onEdit,
  showRequiredBy,
}: {
  order: PurchaseOrderSummary;
  onEdit?: () => void;
  showRequiredBy?: boolean;
}) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                Ordered: {order.orderedAt} <span className="mx-1">•</span> {order.status}
              </p>
            </div>
            {showRequiredBy ? <Badge>Required By: {order.requiredBy}</Badge> : null}
          </div>
          {onEdit ? (
            <Button className="h-9 w-9 rounded-full shadow-none" onClick={onEdit} size="icon" variant="ghost">
              <Pencil className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
        <div className="space-y-1.5 text-sm">
          <p>Reference: {order.reference}</p>
          {order.store ? <p>Store: {order.store}</p> : null}
          <p>Vendor: {order.vendor}</p>
          <p>Total: {order.total}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function LineItemCard({ item }: { item: PurchaseLineItem }) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="min-w-0 flex-1 space-y-1">
          <h3 className="font-display text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-muted-foreground">
            <span>Item:</span> {item.itemCode} <span className="mx-1">•</span> <span>UOM:</span> {item.uom}
          </p>
          <p className="text-sm text-muted-foreground">
            <span>Order Qty:</span> {item.quantity} <span className="mx-1">•</span> <span>Std Cost:</span> {item.cost}
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Total:</span> {item.total}
          </p>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
      </CardContent>
    </Card>
  );
}

export function VendorResultCard({ vendor }: { vendor: Vendor }) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="space-y-2 p-4">
        <h3 className="font-display text-lg font-semibold">{vendor.name}</h3>
        <p className="text-sm text-muted-foreground">
          <span>Number:</span> {vendor.number} <span className="mx-1">•</span> <span>Type:</span> {vendor.type}
        </p>
        <p className="text-sm text-muted-foreground">
          <span>City:</span> {vendor.city || " "} <span className="mx-1">•</span> <span>State:</span> {vendor.state || " "}
        </p>
        <p className="text-sm text-muted-foreground">
          <span>Phone:</span> {vendor.phone || " "}
        </p>
      </CardContent>
    </Card>
  );
}

export function ShipToCard({ address }: { address: ShipToAddress }) {
  const rows = [
    ["Name", address.name],
    ["Address", address.address],
    ["City", address.city],
    ["State", address.state],
    ["Zip Code", address.zipCode],
  ];

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-0">
        {rows.map(([label, value], index) => (
          <div key={label}>
            <div className="px-4 py-3">
              <p className="text-xs font-medium text-muted-foreground">{label}</p>
              <p className="mt-1 text-base">{value}</p>
            </div>
            {index < rows.length - 1 ? <Separator /> : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
