// components/PricingSection.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { PLANS, FEATURE_COMPARISON, PlanType, BillingPeriod } from "@/lib/stripe/config";

function calcYearlyDiscount(monthlyPrice: number, yearlyPrice: number) {
  if (!monthlyPrice || !yearlyPrice) return 0;
  const full = monthlyPrice * 12;
  if (full <= 0) return 0;
  const pct = Math.round((1 - yearlyPrice / full) * 100);
  return Math.max(0, Math.min(99, pct));
}

type Props = {
  ctaBasePath?: string;      // 例: "/login" or "/signup"
  showComparison?: boolean;  // 比較表を出すか
};

export default function PricingSection({ ctaBasePath = "/login", showComparison = true }: Props) {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  const planOrder: PlanType[] = ["free", "pro", "business"];

  const yearlyDiscountBadge = useMemo(() => {
    const pro = PLANS.pro;
    const d = calcYearlyDiscount(pro.monthlyPrice, pro.yearlyPrice);
    return d || 17; // 0なら一旦17%表示
  }, []);

  const buildHref = (plan: PlanType) => {
    const qp = new URLSearchParams();
    qp.set("plan", plan);
    qp.set("period", billingPeriod);
    return `${ctaBasePath}?${qp.toString()}`;
  };

  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Plans & Pricing</h2>
          <p className="text-gray-600 mt-2">Start free. Upgrade when your dojo grows.</p>
        </div>

        {/* Billing period toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              type="button"
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                billingPeriod === "monthly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod("yearly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                billingPeriod === "yearly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Yearly <span className="ml-1 text-green-600 text-xs">Save {yearlyDiscountBadge}%</span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {planOrder.map((plan) => {
            const config = PLANS[plan];
            const isPopular = !!config.popular;
            const price = billingPeriod === "yearly" ? config.yearlyPrice : config.monthlyPrice;

            const monthlyLabel =
              price === 0
                ? "Free"
                : billingPeriod === "yearly"
                ? `$${Math.round(price / 12)}`
                : `$${price}`;

            return (
              <div
                key={plan}
                className={`relative bg-white rounded-2xl border-2 p-6 ${
                  isPopular ? "border-blue-500 shadow-lg" : "border-gray-200"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{config.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{config.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{monthlyLabel}</span>
                    {price > 0 && <span className="text-gray-500">/mo</span>}
                  </div>
                  {billingPeriod === "yearly" && price > 0 && (
                    <p className="text-sm text-gray-500 mt-1">${price} billed yearly</p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {config.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan === "free" ? (
                  <Link
                    href={ctaBasePath}
                    className="block w-full text-center py-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  >
                    Start Free
                  </Link>
                ) : (
                  <Link
                    href={buildHref(plan)}
                    className={`block w-full text-center py-3 rounded-lg font-medium transition ${
                      isPopular ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    Get {config.name}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Feature comparison */}
        {showComparison && (
          <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Feature Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Feature</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Free</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Pro</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Business</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {FEATURE_COMPARISON.map((feature: any, idx: number) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm text-gray-900">{feature.name}</td>
                      {(["free", "pro", "business"] as const).map((p) => (
                        <td key={p} className="px-6 py-4 text-center">
                          {typeof feature[p] === "boolean" ? (
                            feature[p] ? (
                              <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )
                          ) : (
                            <span className="text-sm text-gray-600">{feature[p]}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-300 text-gray-800 hover:bg-gray-50 transition"
          >
            Request a demo
          </a>
        </div>
      </div>
    </section>
  );
}
