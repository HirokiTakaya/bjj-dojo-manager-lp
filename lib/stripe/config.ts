// lib/stripe/config.ts

export type PlanType = "free" | "pro" | "business";
export type BillingPeriod = "monthly" | "yearly";

export type PlanConfig = {
  name: string;
  description: string;
  monthlyPrice: number; // USD想定
  yearlyPrice: number;  // USD想定
  popular?: boolean;
  features: string[];
};

export const PLANS: Record<PlanType, PlanConfig> = {
  free: {
    name: "Free",
    description: "Try the core workflow",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Up to 20 members",
      "Up to 2 staff accounts",
      "Up to 3 announcements",
      "Up to 5 classes in timetable",
      "Staff-first attendance",
    ],
  },
  pro: {
    name: "Pro",
    description: "For growing dojos",
    monthlyPrice: 49,
    yearlyPrice: 490,
    popular: true,
    features: [
      "More members & staff",
      "More announcements",
      "More timetable classes",
      "Better admin control",
      "Priority support",
    ],
  },
  business: {
    name: "Business",
    description: "For multi-location & serious ops",
    monthlyPrice: 179,
    yearlyPrice: 1790,
    features: [
      "Multiple locations support",
      "Advanced roles & permissions",
      "Higher limits across the board",
      "Priority support",
      "Built for scaling operations",
    ],
  },
};

// PricingSectionの比較表が動く形式（boolean か string）
export const FEATURE_COMPARISON: Array<{
  name: string;
  free: boolean | string;
  pro: boolean | string;
  business: boolean | string;
}> = [
  { name: "Members", free: "Up to 20", pro: "Higher limits", business: "Highest limits" },
  { name: "Staff accounts", free: "Up to 2", pro: "Higher limits", business: "Highest limits" },
  { name: "Announcements", free: "Up to 3", pro: "Higher limits", business: "Highest limits" },
  { name: "Timetable classes", free: "Up to 5", pro: "Higher limits", business: "Highest limits" },
  { name: "Role & permissions", free: false, pro: true, business: true },
  { name: "Multi-location", free: false, pro: false, business: true },
  { name: "Priority support", free: false, pro: true, business: true },
];
