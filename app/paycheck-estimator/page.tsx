"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

const payPeriodsPerYear = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

const payFrequencyLabels = {
  weekly: "Weekly",
  biweekly: "Biweekly",
  semimonthly: "Semi-monthly",
  monthly: "Monthly",
};

export default function PaycheckEstimatorPage() {
  const [grossPay, setGrossPay] = useState("3000");
  const [payFrequency, setPayFrequency] =
    useState<keyof typeof payPeriodsPerYear>("biweekly");
  const [federalTaxPercent, setFederalTaxPercent] = useState("12");
  const [stateTaxPercent, setStateTaxPercent] = useState("5");
  const [retirementPercent, setRetirementPercent] = useState("5");
  const [benefitsPerCheck, setBenefitsPerCheck] = useState("150");
  const [otherDeductions, setOtherDeductions] = useState("50");

  const results = useMemo(() => {
    const gross = Number(grossPay);
    const federalRate = Number(federalTaxPercent);
    const stateRate = Number(stateTaxPercent);
    const retirementRate = Number(retirementPercent);
    const benefits = Number(benefitsPerCheck);
    const other = Number(otherDeductions);

    if (
      gross <= 0 ||
      federalRate < 0 ||
      stateRate < 0 ||
      retirementRate < 0 ||
      benefits < 0 ||
      other < 0
    ) {
      return null;
    }

    const periods = payPeriodsPerYear[payFrequency];

    const socialSecurityTax = gross * 0.062;
    const medicareTax = gross * 0.0145;
    const federalTax = gross * (federalRate / 100);
    const stateTax = gross * (stateRate / 100);
    const retirement = gross * (retirementRate / 100);

    const totalDeductions =
      socialSecurityTax +
      medicareTax +
      federalTax +
      stateTax +
      retirement +
      benefits +
      other;

    const netPay = gross - totalDeductions;
    const annualGross = gross * periods;
    const annualNet = netPay * periods;
    const effectiveDeductionRate = (totalDeductions / gross) * 100;

    return {
      payFrequencyLabel: payFrequencyLabels[payFrequency],
      socialSecurityTax,
      medicareTax,
      federalTax,
      stateTax,
      retirement,
      benefits,
      other,
      totalDeductions,
      netPay,
      annualGross,
      annualNet,
      effectiveDeductionRate,
    };
  }, [
    grossPay,
    payFrequency,
    federalTaxPercent,
    stateTaxPercent,
    retirementPercent,
    benefitsPerCheck,
    otherDeductions,
  ]);

  return (
    <ToolPage
      line="Goodfolk Finance Utilities"
      title="Paycheck Estimator"
      description="Estimate take-home pay after taxes, retirement contributions, benefits, and other paycheck deductions."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput
              label="Gross pay per check ($)"
              value={grossPay}
              setValue={setGrossPay}
            />

            <label className="block">
              <span className="text-sm text-zinc-300">Pay frequency</span>
              <select
                value={payFrequency}
                onChange={(event) =>
                  setPayFrequency(
                    event.target.value as keyof typeof payPeriodsPerYear
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="semimonthly">Semi-monthly</option>
                <option value="monthly">Monthly</option>
              </select>
            </label>

            <NumberInput
              label="Federal tax estimate (%)"
              value={federalTaxPercent}
              setValue={setFederalTaxPercent}
            />

            <NumberInput
              label="State/local tax estimate (%)"
              value={stateTaxPercent}
              setValue={setStateTaxPercent}
            />

            <NumberInput
              label="Retirement contribution (%)"
              value={retirementPercent}
              setValue={setRetirementPercent}
            />

            <MoneyInput
              label="Benefits per check ($)"
              value={benefitsPerCheck}
              setValue={setBenefitsPerCheck}
            />

            <MoneyInput
              label="Other deductions per check ($)"
              value={otherDeductions}
              setValue={setOtherDeductions}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            This is a rough estimate, not payroll or tax advice. It uses fixed
            percentage estimates for federal and state tax, plus standard FICA
            percentages for Social Security and Medicare.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Paycheck estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow label="Pay frequency" value={results.payFrequencyLabel} />
              <ResultRow
                label="Estimated net pay"
                value={`$${results.netPay.toFixed(2)}`}
              />
              <ResultRow
                label="Total deductions"
                value={`$${results.totalDeductions.toFixed(2)}`}
              />
              <ResultRow
                label="Deduction rate"
                value={`${results.effectiveDeductionRate.toFixed(1)}%`}
              />
              <ResultRow
                label="Estimated annual gross"
                value={`$${results.annualGross.toFixed(2)}`}
              />
              <ResultRow
                label="Estimated annual net"
                value={`$${results.annualNet.toFixed(2)}`}
              />

              <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">
                <h3 className="font-semibold text-white">Deduction breakdown</h3>

                <div className="mt-4 space-y-3 text-sm">
                  <ResultRow
                    label="Social Security"
                    value={`$${results.socialSecurityTax.toFixed(2)}`}
                  />
                  <ResultRow
                    label="Medicare"
                    value={`$${results.medicareTax.toFixed(2)}`}
                  />
                  <ResultRow
                    label="Federal tax estimate"
                    value={`$${results.federalTax.toFixed(2)}`}
                  />
                  <ResultRow
                    label="State/local tax estimate"
                    value={`$${results.stateTax.toFixed(2)}`}
                  />
                  <ResultRow
                    label="Retirement contribution"
                    value={`$${results.retirement.toFixed(2)}`}
                  />
                  <ResultRow
                    label="Benefits"
                    value={`$${results.benefits.toFixed(2)}`}
                  />
                  <ResultRow
                    label="Other deductions"
                    value={`$${results.other.toFixed(2)}`}
                  />
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid paycheck details to see your estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/paycheck-estimator" category="finance" />
    </ToolPage>
  );
}

function MoneyInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-zinc-300">{label}</span>
      <input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      />
    </label>
  );
}

function NumberInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-zinc-300">{label}</span>
      <input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      />
    </label>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
      <span className="text-zinc-300">{label}</span>
      <span className="text-right font-semibold text-white">{value}</span>
    </div>
  );
}