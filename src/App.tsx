import { SearchBar } from "@/components/app/search-bar";
import { AppHeader } from "@/components/app/app-header";
import { MobileFrame } from "@/components/app/mobile-frame";
import {
  DailyWorkScreen,
  MainScreen,
  PurchaseDetailScreen,
  PurchaseEditScreen,
  PurchaseListScreen,
  PurchaseNewScreen,
  PurchaseOrderScreen,
  ShipToAddressScreen,
  VendorSearchScreen,
} from "@/components/app/screens";
import { StatusBar } from "@/components/app/status-bar";
import { NavMenu } from "@/components/app/nav-menu";
import { AlphaKeyboard } from "@/components/app/keyboards";
import { mainNavItems } from "@/data/mock-data";
import { useDecorFusionApp } from "@/hooks/use-decor-fusion-app";

export default function App() {
  const app = useDecorFusionApp();

  return (
    <MobileFrame>
      <header className="sticky top-0 z-20 bg-brand text-brand-foreground">
        <StatusBar />
        <AppHeader
          canGoBack={app.canGoBack}
          menu={app.chrome.menu}
          onBack={app.goBack}
          onMenu={() => app.setMenuOpen(true)}
          showTrailingFilter={app.screen === "purchaseList"}
          subtitle={app.chrome.subtitle}
          title={app.chrome.title}
        />
        {app.chrome.search ? <SearchBar {...app.chrome.search} onActivate={app.openSearch} value={app.searchValue} /> : null}
      </header>

      <section className="flex-1 overflow-hidden bg-background">
        {app.screen === "main" ? <MainScreen app={app} /> : null}
        {app.screen === "dailyWork" ? <DailyWorkScreen app={app} /> : null}
        {app.screen === "purchaseOrder" ? <PurchaseOrderScreen app={app} /> : null}
        {app.screen === "purchaseList" ? <PurchaseListScreen app={app} /> : null}
        {app.screen === "poDetail" ? <PurchaseDetailScreen app={app} /> : null}
        {app.screen === "poNew" ? <PurchaseNewScreen /> : null}
        {app.screen === "poEdit" ? <PurchaseEditScreen app={app} /> : null}
        {app.screen === "vendorSearch" ? <VendorSearchScreen /> : null}
        {app.screen === "shipToAddress" ? <ShipToAddressScreen /> : null}
      </section>

      <div
        aria-hidden={!app.searchKeyboardVisible}
        className={`absolute inset-x-0 bottom-0 top-[154px] z-30 transition-opacity duration-200 ${app.searchKeyboardVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <button
          aria-label="Close search keyboard"
          className="absolute inset-0 bg-transparent"
          onClick={app.closeSearch}
          type="button"
        />
      </div>

      <div
        aria-hidden={!app.menuOpen}
        className={`absolute inset-0 z-40 transition-opacity duration-200 ${app.menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <button
          aria-label="Close navigation"
          className="absolute inset-0 bg-slate-900/20"
          onClick={() => app.setMenuOpen(false)}
          type="button"
        />

        <aside
          aria-label="Main navigation drawer"
          className={`absolute left-0 top-[98px] flex h-[calc(100%-98px)] w-[calc(100%-3.5rem)] max-w-[343px] flex-col overflow-hidden rounded-r-[28px] border-r border-border bg-card shadow-frame transition-transform duration-300 ${app.menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <NavMenu
            compact
            items={mainNavItems}
            onSelect={(item) => {
              if (item === "Daily Work") {
                app.goToScreen("dailyWork");
              } else {
                app.setMenuOpen(false);
              }
            }}
          />
        </aside>
      </div>

      <div className="relative z-50 mt-auto">
        <AlphaKeyboard onKeyPress={app.commitSearchKey} visible={app.searchKeyboardVisible} />
      </div>
    </MobileFrame>
  );
}
