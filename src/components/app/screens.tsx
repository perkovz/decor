import type { PropsWithChildren } from "react";
import { CalendarDays, ChevronDown, ChevronRight, Phone, Plus, User } from "lucide-react";
import { dailyWorkItems, detailOrder, mainNavItems, newOrder, poLineItems, purchaseSections, shipToAddress, vendors } from "@/data/mock-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { AlphaKeyboard, NumberPad } from "@/components/app/keyboards";
import { NavMenu } from "@/components/app/nav-menu";
import { InfoBlock, LineItemCard, OrderSummaryCard, ShipToCard, VendorResultCard } from "@/components/app/purchase-cards";
import { useDecorFusionApp } from "@/hooks/use-decor-fusion-app";
import type { EditFieldKey } from "@/types/app";

type AppState = ReturnType<typeof useDecorFusionApp>;

export function MainScreen({ app }: { app: AppState }) {
  return (
    <div className="p-4">
      <NavMenu
        items={mainNavItems}
        onSelect={(item) => {
          if (item === "Daily Work") app.goToScreen("dailyWork");
        }}
      />
    </div>
  );
}

export function DailyWorkScreen({ app }: { app: AppState }) {
  return (
    <div className="p-4">
      <Card className="rounded-2xl border-0 shadow-none">
        <CardContent className="p-4">
          {dailyWorkItems.map((item, index) => (
            <div key={item}>
              <button
                className="flex min-h-[74px] w-full items-center justify-between rounded-xl bg-card text-left"
                onClick={() => {
                  if (item === "Purchase Order") app.goToScreen("purchaseOrder");
                }}
                type="button"
              >
                <span className="text-base font-medium">{item}</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
              {index < dailyWorkItems.length - 1 ? <Separator /> : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function PurchaseOrderScreen({ app }: { app: AppState }) {
  return (
    <div className="flex h-full flex-col">
      <div className="space-y-4 p-4">
        <Card className="rounded-2xl">
          <CardContent className="space-y-4 p-4">
            <p className="text-base text-muted-foreground">
              To continue to the Purchase Order enter your POS code below
            </p>
            <div className="space-y-3">
              <FieldShell label="POS Code">
                <Input
                  className="border-0 bg-transparent px-0 py-0 text-base font-medium shadow-none focus-visible:ring-0"
                  onFocus={() => app.setShowPosKeyboard(true)}
                  readOnly
                  value={app.posCode}
                />
              </FieldShell>
              <FieldShell label="Store" trailing>
                <Input
                  className="border-0 bg-transparent px-0 py-0 text-base font-medium shadow-none focus-visible:ring-0"
                  onFocus={() => app.setShowPosKeyboard(false)}
                  readOnly
                  value="0001-Savannah Paint & Supply"
                />
              </FieldShell>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={app.rememberMe} onCheckedChange={app.setRememberMe} />
              <span className="text-base">Remember Me</span>
            </div>
          </CardContent>
        </Card>
        <Button className="h-14 w-full rounded-full text-base" onClick={() => app.goToScreen("purchaseList")} size="lg">
          Continue
        </Button>
      </div>
      <NumberPad onKeyPress={app.appendPosKey} visible={app.showPosKeyboard} />
    </div>
  );
}

export function PurchaseListScreen({ app }: { app: AppState }) {
  return (
    <div className="relative h-full">
      <ScrollArea className="h-full">
        <div className="space-y-4 px-3 pb-24 pt-4">
          <Accordion className="space-y-4" type="multiple" value={Object.keys(app.expandedSections).filter((key) => app.expandedSections[key])}>
            {purchaseSections.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger onClick={() => app.toggleSection(section.id)}>{section.title}</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  {section.items.map((item) => (
                    <OrderSummaryCard
                      key={item.id}
                      item={item}
                      onClick={() => app.goToScreen(item.id === "#PC00008629" ? "poDetail" : "poNew")}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
      <Button className="absolute bottom-3 right-4 h-14 rounded-full px-6 text-base" onClick={() => app.goToScreen("poNew")} size="lg">
        <Plus className="h-5 w-5" />
        Create New
      </Button>
    </div>
  );
}

export function PurchaseDetailScreen({ app }: { app: AppState }) {
  return (
    <div className="space-y-4 p-4">
      <InfoBlock onEdit={() => app.goToScreen("poEdit")} order={detailOrder} />
      <div className="space-y-3">
        {poLineItems.map((item) => (
          <LineItemCard item={item} key={item.itemCode} />
        ))}
      </div>
    </div>
  );
}

export function PurchaseNewScreen() {
  return (
    <div className="space-y-4 p-4">
      <InfoBlock order={newOrder} showRequiredBy />
      <Card className="rounded-2xl border-dashed">
        <CardContent className="flex min-h-[220px] items-center justify-center p-6 text-center text-muted-foreground">
          New purchase order items will appear here once they are added.
        </CardContent>
      </Card>
    </div>
  );
}

export function PurchaseEditScreen({ app }: { app: AppState }) {
  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="h-full">
        <div className={`space-y-4 p-4 ${app.activeEditField ? "pb-6" : "pb-24"}`}>
          <InfoBlock order={detailOrder} />
          <EditSection title="PO Header">
            <div className="space-y-2">
              <EditableField app={app} field="store" label="Store" />
              <EditableField app={app} field="requiredDate" label="Required Date" trailingIcon={<CalendarDays className="h-5 w-5 text-muted-foreground" />} />
              <EditableField app={app} field="shipTo" label="Ship To" />
              <EditableField app={app} field="vendorReference" label="Vendor Reference" />
              <EditableField app={app} field="fob" label="FOB" />
              <EditableField app={app} field="shipVia" label="Ship Via" />
              <EditableField app={app} field="terms" label="Terms" trailingIcon={<ChevronDown className="h-5 w-5 text-muted-foreground" />} />
              <EditableField app={app} field="confirmedBy" label="Confirmed By" />
            </div>
          </EditSection>

          <Card className="cursor-pointer rounded-2xl" onClick={() => app.goToScreen("vendorSearch")}>
            <CardHeader className="flex-row items-center justify-between space-y-0 p-4">
              <CardTitle>Vendor</CardTitle>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-3 px-4 pb-4 pt-0 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Vendor: BEN100</p>
                <p className="text-muted-foreground">Account #: 4882-33</p>
                <div className="text-foreground">
                  <p>Benjamin Moore Paints</p>
                  <p>552 Carlton Street</p>
                  <p>Buffalo, NY 14211</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <p>{app.form.contact}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p>{app.form.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer rounded-2xl" onClick={() => app.goToScreen("shipToAddress")}>
            <CardHeader className="flex-row items-center justify-between space-y-0 p-4">
              <CardTitle>Ship to Address</CardTitle>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-3 px-4 pb-4 pt-0 text-sm">
              <div className="space-y-1">
              <p className="text-muted-foreground">Ship By: {shipToAddress.name}</p>
                <p>5046 Silver Star Road</p>
                <p>
                  Orlando, FL 32008-0098
                </p>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <p>{app.form.contact}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p>{app.form.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="flex items-center justify-between p-4">
              <CardTitle>Taxable</CardTitle>
              <Switch checked={app.form.taxable} onCheckedChange={app.setTaxable} />
            </CardContent>
          </Card>

          <EditSection title="Created/Modified">
            <div className="space-y-2 opacity-65">
              <ReadonlyField label="Created By" value={app.form.createdBy} />
              <ReadonlyField label="Created" trailingIcon={<CalendarDays className="h-5 w-5 text-muted-foreground" />} value={app.form.created} />
              <ReadonlyField label="Modified By" value={app.form.modifiedBy} />
              <ReadonlyField label="Modified" trailingIcon={<CalendarDays className="h-5 w-5 text-muted-foreground" />} value={app.form.modified} />
            </div>
          </EditSection>
        </div>
      </ScrollArea>
      <div className="border-t border-border bg-background p-4">
        <Button className="h-14 w-full rounded-full text-base" onClick={() => app.setActiveEditField(null)} size="lg">
          Save
        </Button>
      </div>
      <AlphaKeyboard onKeyPress={app.commitEditKey} visible={Boolean(app.activeEditField)} />
    </div>
  );
}

export function VendorSearchScreen() {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-3 p-4 pb-8">
        {vendors.map((vendor) => (
          <VendorResultCard key={vendor.name} vendor={vendor} />
        ))}
      </div>
    </ScrollArea>
  );
}

export function ShipToAddressScreen() {
  return (
    <div className="p-4">
      <ShipToCard address={shipToAddress} />
    </div>
  );
}

function EditSection({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="p-4 pb-3">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {children}
      </CardContent>
    </Card>
  );
}

function EditableField({
  app,
  field,
  label,
  trailingIcon,
}: {
  app: AppState;
  field: EditFieldKey;
  label: string;
  trailingIcon?: React.ReactNode;
}) {
  return (
    <button
      className={`flex min-h-14 w-full items-center gap-4 rounded-[12px] border px-3 py-2 text-left transition-all ${
        app.activeEditField === field
          ? "border-brand bg-white shadow-[0_0_0_3px_rgba(37,99,235,0.14)]"
          : "border-input bg-muted"
      }`}
      onClick={() => app.setActiveEditField(field)}
      type="button"
    >
      <div className="min-w-0 flex-1">
        <Label className={app.activeEditField === field ? "text-brand" : undefined}>{label}</Label>
        <p className="text-base font-medium text-foreground">{app.form[field]}</p>
      </div>
      {trailingIcon ? <span className="shrink-0">{trailingIcon}</span> : null}
    </button>
  );
}

function ReadonlyField({
  label,
  value,
  trailingIcon,
}: {
  label: string;
  value: string;
  trailingIcon?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-14 w-full items-center gap-4 rounded-[12px] border border-input bg-muted px-3 py-2 text-left">
      <div className="min-w-0 flex-1">
        <Label>{label}</Label>
        <p className="text-base font-medium text-foreground">{value}</p>
      </div>
      {trailingIcon ? <span className="shrink-0">{trailingIcon}</span> : null}
    </div>
  );
}

function FieldShell({
  children,
  label,
  trailing,
}: PropsWithChildren<{ label: string; trailing?: boolean }>) {
  return (
    <div className="rounded-xl border border-input bg-muted px-4 py-2">
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <Label>{label}</Label>
          {children}
        </div>
        {trailing ? <ChevronRight className="h-5 w-5 text-muted-foreground" /> : null}
      </div>
    </div>
  );
}
