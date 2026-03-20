export type Screen =
  | "main"
  | "dailyWork"
  | "purchaseOrder"
  | "purchaseList"
  | "poDetail"
  | "poNew"
  | "poEdit"
  | "vendorSearch"
  | "shipToAddress";

export type EditFieldKey =
  | "store"
  | "requiredDate"
  | "shipTo"
  | "vendorReference"
  | "fob"
  | "shipVia"
  | "terms"
  | "confirmedBy"
  | "vendor"
  | "phone"
  | "contact";

export type PurchaseOrderSummary = {
  id: string;
  owner: string;
  orderedAt: string;
  status: string;
  requiredBy: string;
  vendor: string;
  total: string;
  reference: string;
  store?: string;
};

export type PurchaseSection = {
  id: string;
  title: string;
  items: PurchaseOrderSummary[];
};

export type PurchaseLineItem = {
  title: string;
  itemCode: string;
  uom: string;
  quantity: string;
  cost: string;
  total: string;
};

export type Vendor = {
  name: string;
  number: string;
  type: string;
  city: string;
  state: string;
  phone: string;
};

export type ShipToAddress = {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

export type PurchaseOrderForm = Record<EditFieldKey, string> & {
  created: string;
  createdBy: string;
  modified: string;
  modifiedBy: string;
  reference: string;
  taxable: boolean;
};
