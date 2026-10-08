import React from "react";
import { SuitGrid } from "@/components/catalog/suit-grid";
import { ShopCampaignHero } from "@/components/catalog/shop-campaign-hero";
import { BespokeConsultationBanner } from "@/components/catalog/bespoke-consultation-banner";
import { SyndicateLedgerNewsletter } from "@/components/catalog/syndicate-ledger-newsletter";

export const metadata = {
  title: "The Bespoke Vault | Handcrafted Syndicate Suits",
  description:
    "Explore The Syndicate Seven — seven bespoke cuts engineered with Level III-A Kevlar bulletproof weave, Como hand-rolled canvas, and discreet underworld utility.",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-[#D4AF37]/30 selection:text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-16">
        {/* Eye-Catching Campaign Hero Banner (First Section) */}
        <ShopCampaignHero />

        {/* Main 7-Suit Interactive Catalog Grid & Quick View */}
        <section id="suits-catalog" className="space-y-6">
          <SuitGrid showFilters={true} />
        </section>

        {/* Toni Lee Personal Consultation Callout */}
        <section id="bespoke-consultation">
          <BespokeConsultationBanner />
        </section>

        {/* VIP Black Ledger Dispatch & Family Code */}
        <section id="syndicate-newsletter" className="pb-10">
          <SyndicateLedgerNewsletter />
        </section>
      </div>
    </div>
  );
}