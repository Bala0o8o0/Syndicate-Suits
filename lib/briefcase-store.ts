import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Suit, SYNDICATE_DISCOUNTS } from "./suits-data";

export interface BriefcaseItem {
  id: string;
  suit: Suit;
  selectedFabricId: string;
  selectedLapelId: string;
  selectedLiningId: string;
  size: string;
  monogram?: string;
  unitPrice: number;
  quantity: number;
}

interface BriefcaseState {
  items: BriefcaseItem[];
  isOpen: boolean;
  activeDiscountCode: string | null;
  discountPercent: number;
  discountLabel: string | null;
  
  openBriefcase: () => void;
  closeBriefcase: () => void;
  toggleBriefcase: () => void;
  
  addItem: (item: Omit<BriefcaseItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearBriefcase: () => void;
  
  applyDiscount: (code: string) => { success: boolean; message: string; percent?: number };
  removeDiscount: () => void;
  
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useBriefcaseStore = create<BriefcaseState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      activeDiscountCode: null,
      discountPercent: 0,
      discountLabel: null,

      openBriefcase: () => set({ isOpen: true }),
      closeBriefcase: () => set({ isOpen: false }),
      toggleBriefcase: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (item) => {
        const id = `${item.suit.id}-${item.selectedFabricId}-${item.selectedLapelId}-${item.selectedLiningId}-${item.size}-${item.monogram || "none"}`;
        const existingIndex = get().items.findIndex((i) => i.id === id);

        if (existingIndex > -1) {
          const updatedItems = [...get().items];
          updatedItems[existingIndex].quantity += item.quantity;
          set({ items: updatedItems, isOpen: true });
        } else {
          set({ items: [...get().items, { ...item, id }], isOpen: true });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      updateQuantity: (id, delta) => {
        const items = get().items
          .map((item) => {
            if (item.id === id) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as BriefcaseItem[];
        set({ items });
      },

      clearBriefcase: () => set({ items: [], activeDiscountCode: null, discountPercent: 0, discountLabel: null }),

      applyDiscount: (rawCode) => {
        const code = rawCode.trim().toUpperCase();
        const discount = SYNDICATE_DISCOUNTS[code];
        if (discount) {
          set({
            activeDiscountCode: code,
            discountPercent: discount.percent,
            discountLabel: discount.label,
          });
          return {
            success: true,
            message: `Capisce! Applied ${discount.label} (${discount.percent}% off).`,
            percent: discount.percent,
          };
        }
        return {
          success: false,
          message: "Fuggedaboutit! That syndicate passcode doesn't fly with Toni Lee.",
        };
      },

      removeDiscount: () => set({ activeDiscountCode: null, discountPercent: 0, discountLabel: null }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        return (subtotal * get().discountPercent) / 100;
      },

      getTotal: () => {
        return Math.max(0, get().getSubtotal() - get().getDiscountAmount());
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "syndicate-briefcase-storage",
      partialize: (state) => ({
        items: state.items,
        activeDiscountCode: state.activeDiscountCode,
        discountPercent: state.discountPercent,
        discountLabel: state.discountLabel,
      }),
    }
  )
);