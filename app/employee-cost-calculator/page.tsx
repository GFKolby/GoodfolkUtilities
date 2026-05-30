"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

export default function EmployeeCostCalculatorPage() {
  const [salary, setSalary] = useState("65000");
  const [payrollTaxPercent, setPayrollTaxPercent] = useState("7.65");
  const [benefitsCost, setBenefitsCost] = useState("9000");
  const [equipmentCost, setEquipmentCost] = useState("2000");
  const [softwareCost, setSoftwareCost] = useState("1200");
  const [overheadPercent, setOverheadPercent] = useState("15");

  const results = useMemo(() => {
    const annualSalary = Number(salary);
    const payrollTax = Number(payrollTaxPercent);
    const benefits = Number(benefitsCost);
    const equipment = Number(equipmentCost);
    const software = Number(softwareCost);
    const overhead = Number(overheadPercent);

    if (
      annualSalary <= 0 ||
      payrollTax < 0 ||
      benefits < 0 ||
      equipment < 0 ||
      software < 0 ||
      overhead < 0
    ) {
      return null;
    }

    const payrollTaxCost = annualSalary * (payrollTax / 100);
    const overheadCost = annualSalary * (overhead / 100);
    const totalAnnualCost =
      annualSalary +
      payrollTaxCost +
      benefits +
      equipment +
      software +
      overheadCost;

    const monthlyCost = totalAnnualCost / 12;
    const weeklyCost = totalAnnualCost / 52;
    const hourlyEquivalent = totalAnnualCost / 2080;
    const costMultiplier = totalAnnualCost / annualSalary;

    return {
      annualSalary,
      payrollTaxCost,
      benefits,
      equipment,
      software,
      overheadCost,
      totalAnnualCost,
      monthlyCost,
      weeklyCost,
      hourlyEquivalent,
      costMultiplier,
    };
  }, [
    salary,
    payrollTaxPercent,
    benefitsCost,
    equipmentCost,
    softwareCost,
    overheadPercent,
  ]);

  return (
    <ToolPage
      line="Goodfolk Business Utilities"
      title="Employee Cost Calculator"
      description="Estimate the real annual cost of an employee including salary, payroll taxes, benefits, equipment, software, and overhead."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput
              label="Annual salary ($)"
              value={salary}
              setValue={setSalary}
            />

            <NumberInput
              label="Payroll tax estimate (%)"
              value={payrollTaxPercent}
              setValue={setPayrollTaxPercent}
            />

            <MoneyInput
              label="Benefits per year ($)"
              value={benefitsCost}
              setValue={setBenefitsCost}
            />

            <MoneyInput
              label="Equipment per year ($)"
              value={equipmentCost}
              setValue={setEquipmentCost}
            />

            <MoneyInput
              label="Software/tools per year ($)"
              value={softwareCost}
              setValue={setSoftwareCost}
            />

            <NumberInput
              label="Overhead estimate (%)"
              value={overheadPercent}
              setValue={setOverheadPercent}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Salary is only part of employee cost. Payroll taxes, benefits,
            equipment, software, management time, space, and overhead can add a
            lot to the real total.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Employee cost estimate</h2>

          {results ? (
            <div className="mt-6 space-y-4">
              <ResultRow
                label="Salary"
                value={`$${results.annualSalary.toFixed(2)}`}
              />
              <ResultRow
                label="Payroll taxes"
                value={`$${results.payrollTaxCost.toFixed(2)}`}
              />
              <ResultRow
                label="Benefits"
                value={`$${results.benefits.toFixed(2)}`}
              />
              <ResultRow
                label="Equipment"
                value={`$${results.equipment.toFixed(2)}`}
              />
              <ResultRow
                label="Software/tools"
                value={`$${results.software.toFixed(2)}`}
              />
              <ResultRow
                label="Overhead"
                value={`$${results.overheadCost.toFixed(2)}`}
              />
              <ResultRow
                label="Total annual cost"
                value={`$${results.totalAnnualCost.toFixed(2)}`}
              />
              <ResultRow
                label="Monthly cost"
                value={`$${results.monthlyCost.toFixed(2)}`}
              />
              <ResultRow
                label="Weekly cost"
                value={`$${results.weeklyCost.toFixed(2)}`}
              />
              <ResultRow
                label="Hourly equivalent"
                value={`$${results.hourlyEquivalent.toFixed(2)}/hr`}
              />
              <ResultRow
                label="Cost multiplier"
                value={`${results.costMultiplier.toFixed(2)}x salary`}
              />

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-zinc-300">
                A common rough planning range is that total employee cost may be
                1.2x to 1.5x salary or more, depending on benefits, location,
                tools, and overhead.
              </div>
            </div>
          ) : (
            <p className="mt-4 text-zinc-300">
              Enter valid employee cost values to see the estimate.
            </p>
          )}
        </section>
      </div>

      <RelatedTools currentHref="/employee-cost-calculator" category="business" />
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