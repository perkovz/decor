import type {
  PurchaseLineItem,
  PurchaseOrderForm,
  PurchaseOrderSummary,
  PurchaseSection,
  ShipToAddress,
  Vendor,
} from "@/types/app";

export const mainNavItems = [
  "Sales",
  "Customer",
  "Item",
  "CRM",
  "Daily Work",
  "Logout",
] as const;

export const dailyWorkItems = [
  "Inventory Transfer",
  "Physical Inventory",
  "Purchase Order",
] as const;

export const purchaseSections: PurchaseSection[] = [
  {
    id: "purchase",
    title: "Purchase",
    items: [
      {
        id: "#PC00003456",
        owner: "JWSZOLEK90",
        orderedAt: "Feb 26, 2026",
        status: "Saved",
        requiredBy: "03/15/2026",
        vendor: "Addison Benjamin Moore Pain...",
        total: "$2,830,197.00",
        reference: "Vitaliy Uretsky",
      },
      {
        id: "#PC00008629",
        owner: "Ryan567890",
        orderedAt: "Feb 24, 2026",
        status: "Emailed",
        requiredBy: "ASAP",
        vendor: "Ace Dropcloth Company",
        total: "$1,597.99",
        reference: "OA382372848",
        store: "Savana",
      },
    ],
  },
  {
    id: "return",
    title: "Return Type",
    items: [
      {
        id: "#PC00004455",
        owner: "ZP",
        orderedAt: "Feb 18, 2026",
        status: "Emailed",
        requiredBy: "ASAP",
        vendor: "PPG Industries, Inc.",
        total: "- $515.99",
        reference: "RM-2042",
      },
      {
        id: "#PC00001123",
        owner: "JWSZOLEK90",
        orderedAt: "Jan 14, 2026",
        status: "Emailed",
        requiredBy: "ASAP",
        vendor: "Benjamin Moore Paint",
        total: "- $515.99",
        reference: "BM-1002",
      },
    ],
  },
];

export const poLineItems: PurchaseLineItem[] = [
  {
    title: "FS All P ALK Primer-White",
    itemCode: "002400-004",
    uom: "Quart",
    quantity: "1.00",
    cost: "$10.4400",
    total: "$10.44",
  },
];

export const vendors: Vendor[] = [
  {
    name: "All Pro",
    number: "ALLPRO",
    type: "Regular",
    city: "Tualatin",
    state: "OR",
    phone: "(503) 486-5267",
  },
  {
    name: "Benjamin Moore",
    number: "BEN100",
    type: "Regular",
    city: "St. Catharines",
    state: "ON",
    phone: "1 (905) 646-6777",
  },
  {
    name: "Emery Jenson",
    number: "EJD001",
    type: "Regular",
    city: "",
    state: "",
    phone: "",
  },
  {
    name: "Subcontractor Vendor",
    number: "ALLPRO",
    type: "Subcontractor Vendor",
    city: "",
    state: "",
    phone: "",
  },
];

export const shipToAddress: ShipToAddress = {
  name: "North Orlando",
  address: "1530 Welland Ave",
  city: "Orlando",
  state: "FL",
  zipCode: "32008-0098",
};

export const detailOrder: PurchaseOrderSummary = {
  id: "#PC00008629",
  owner: "Ryan567890",
  orderedAt: "Feb 24, 2026, 4:57 PM",
  status: "Emailed",
  requiredBy: "ASAP",
  vendor: "Ace Dropcloth Company",
  total: "$1,597.99",
  reference: "OA382372848",
  store: "Savana",
};

export const newOrder: PurchaseOrderSummary = {
  id: "#PC003456",
  owner: "Jeff",
  orderedAt: "1/29/2026",
  status: "Saved",
  requiredBy: "1/30/2026",
  vendor: "Addison Benjamin Moore Paint Store",
  total: "$2,830,197.00",
  reference: "Vitaliy Uretsky",
};

export const defaultForm: PurchaseOrderForm = {
  store: "Savana",
  requiredDate: "ASAP",
  shipTo: "North Orlando",
  vendorReference: "34516141",
  fob: "48gal min 100gal drop",
  shipVia: "Slow Barge",
  terms: "Net 60, 20th",
  confirmedBy: "Joe C",
  reference: "OA382372848",
  vendor: "Ace Dropcloth Company",
  phone: "(342) 546-8823",
  contact: "Herman Constant",
  createdBy: "Jarek",
  created: "Current Date",
  modifiedBy: "CBC",
  modified: "Current Date",
  taxable: true,
};
