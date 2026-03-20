import { useMemo, useState } from "react";
import { defaultForm } from "@/data/mock-data";
import type { EditFieldKey, PurchaseOrderForm, Screen } from "@/types/app";

const BACK_STACK: Partial<Record<Screen, Screen>> = {
  dailyWork: "main",
  purchaseOrder: "dailyWork",
  purchaseList: "purchaseOrder",
  poDetail: "purchaseList",
  poNew: "purchaseList",
  poEdit: "poDetail",
  vendorSearch: "poEdit",
  shipToAddress: "poEdit",
};

export function useDecorFusionApp() {
  const [screen, setScreen] = useState<Screen>("main");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPosKeyboard, setShowPosKeyboard] = useState(false);
  const [activeSearchScreen, setActiveSearchScreen] = useState<Screen | null>(null);
  const [searchValues, setSearchValues] = useState<Partial<Record<Screen, string>>>({});
  const [posCode, setPosCode] = useState("4329");
  const [rememberMe, setRememberMe] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    purchase: true,
    return: true,
  });
  const [form, setForm] = useState<PurchaseOrderForm>(defaultForm);
  const [activeEditField, setActiveEditField] = useState<EditFieldKey | null>(null);

  const canGoBack = Boolean(BACK_STACK[screen]);

  const goToScreen = (next: Screen) => {
    setScreen(next);
    setMenuOpen(false);
    setShowPosKeyboard(false);
    setActiveSearchScreen(null);

    if (next !== "poEdit") {
      setActiveEditField(null);
    }
  };

  const goBack = () => {
    const previous = BACK_STACK[screen];
    if (previous) {
      goToScreen(previous);
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }));
  };

  const appendPosKey = (key: string) => {
    setPosCode((current) => {
      if (key === "delete") return current.slice(0, -1);
      if (!/^\d$/.test(key) || current.length >= 8) return current;
      return current + key;
    });
  };

  const updateField = (field: EditFieldKey, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const openSearch = () => {
    setActiveEditField(null);
    setActiveSearchScreen(screen);
  };

  const closeSearch = () => {
    setActiveSearchScreen(null);
  };

  const updateSearchValue = (screenKey: Screen, value: string) => {
    setSearchValues((current) => ({ ...current, [screenKey]: value }));
  };

  const setTaxable = (value: boolean) => {
    setForm((current) => ({ ...current, taxable: value }));
  };

  const commitEditKey = (key: string) => {
    if (!activeEditField) return;
    if (key === "delete") {
      updateField(activeEditField, form[activeEditField].slice(0, -1));
      return;
    }
    if (key === "space") {
      updateField(activeEditField, `${form[activeEditField]} `);
      return;
    }
    if (key === "return") {
      setActiveEditField(null);
      return;
    }
    if (key.length === 1) {
      updateField(activeEditField, `${form[activeEditField]}${key.toUpperCase()}`);
    }
  };

  const commitSearchKey = (key: string) => {
    if (!activeSearchScreen) return;

    const currentValue = searchValues[activeSearchScreen] ?? "";

    if (key === "delete") {
      updateSearchValue(activeSearchScreen, currentValue.slice(0, -1));
      return;
    }

    if (key === "space") {
      updateSearchValue(activeSearchScreen, `${currentValue} `);
      return;
    }

    if (key === "return") {
      closeSearch();
      return;
    }

    if (key.length === 1) {
      updateSearchValue(activeSearchScreen, `${currentValue}${key}`);
    }
  };

  const chrome = useMemo(() => {
    switch (screen) {
      case "main":
        return { title: "Decor Fusion", subtitle: "", menu: true, search: null };
      case "dailyWork":
        return { title: "Daily Work", subtitle: "", menu: false, search: null };
      case "purchaseOrder":
        return { title: "Purchase Order", subtitle: "", menu: false, search: null };
      case "purchaseList":
        return {
          title: "Purchase Order",
          subtitle: "",
          menu: true,
          search: { placeholder: "Search", showFilter: true, showBarcode: true },
        };
      case "poDetail":
        return {
          title: "PO: #PC00008629",
          subtitle: "",
          menu: false,
          search: { placeholder: "Search", showFilter: true, showBarcode: true },
        };
      case "poNew":
        return {
          title: "PO: #PC003456",
          subtitle: "",
          menu: false,
          search: { placeholder: "Search", showFilter: false, showBarcode: true, floatingAdd: true },
        };
      case "poEdit":
        return {
          title: "PO Details",
          subtitle: "PO: #PC00008629",
          menu: false,
          search: null,
        };
      case "vendorSearch":
        return {
          title: "PO Details",
          subtitle: "PO: #PC00008629",
          menu: false,
          search: { placeholder: "Vendor Name", showFilter: true, showBarcode: false, floatingAdd: true },
        };
      case "shipToAddress":
        return {
          title: "Ship to Address",
          subtitle: "PO: #PC00008629",
          menu: false,
          search: null,
        };
    }
  }, [screen]);

  return {
    activeEditField,
    appendPosKey,
    canGoBack,
    chrome,
    commitEditKey,
    commitSearchKey,
    closeSearch,
    expandedSections,
    form,
    goBack,
    goToScreen,
    menuOpen,
    openSearch,
    posCode,
    rememberMe,
    screen,
    searchValue: searchValues[screen] ?? "",
    searchKeyboardVisible: activeSearchScreen === screen,
    setActiveEditField,
    setMenuOpen,
    setRememberMe,
    setShowPosKeyboard,
    setTaxable,
    showPosKeyboard,
    toggleSection,
    updateField,
  };
}
