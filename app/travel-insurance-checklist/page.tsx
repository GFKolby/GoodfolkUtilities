"use client";

import { useMemo, useState } from "react";
import ToolPage from "@/components/ToolPage";
import RelatedTools from "@/components/RelatedTools";

type TripType = "domestic" | "international" | "cruise" | "roadTrip";
type TripCost = "low" | "medium" | "high";
type YesNo = "yes" | "no";

function uniqueItems(items: string[]) {
  return Array.from(new Set(items));
}

export default function TravelInsuranceChecklistPage() {
  const [tripType, setTripType] = useState<TripType>("international");
  const [tripCost, setTripCost] = useState<TripCost>("medium");
  const [hasFlights, setHasFlights] = useState<YesNo>("yes");
  const [hasRentalCar, setHasRentalCar] = useState<YesNo>("no");
  const [hasPrepaidLodging, setHasPrepaidLodging] = useState<YesNo>("yes");
  const [medicalConcern, setMedicalConcern] = useState<YesNo>("yes");
  const [baggageConcern, setBaggageConcern] = useState<YesNo>("yes");
  const [cancelConcern, setCancelConcern] = useState<YesNo>("yes");

  const results = useMemo(() => {
    const coverageItems = [
      "Trip cancellation coverage",
      "Trip interruption coverage",
      "Travel delay coverage",
      "Emergency assistance contact information",
      "Policy limits and exclusions",
      "Claim filing steps and required documents",
    ];

    const comparisonQuestions = [
      "What reasons for cancellation are covered?",
      "What is the maximum reimbursement amount?",
      "Are pre-existing conditions excluded or covered with a waiver?",
      "What receipts or proof are needed for claims?",
      "How quickly must claims be filed?",
    ];

    const documents = [
      "Trip confirmation emails",
      "Flight receipts",
      "Hotel or lodging receipts",
      "Tour or attraction receipts",
      "Passport or ID copy",
      "Emergency contact information",
    ];

    if (tripType === "international") {
      coverageItems.push(
        "Emergency medical coverage",
        "Emergency medical evacuation coverage",
        "Passport or travel document assistance"
      );
      comparisonQuestions.push(
        "Does the policy cover medical care outside your home country?",
        "Is evacuation coverage included, and what is the limit?"
      );
    }

    if (tripType === "cruise") {
      coverageItems.push(
        "Cruise interruption coverage",
        "Missed connection coverage",
        "Medical evacuation from ship or port"
      );
      comparisonQuestions.push(
        "Are missed cruise departures covered?",
        "Does coverage apply if a port stop changes?"
      );
    }

    if (tripType === "roadTrip") {
      coverageItems.push(
        "Roadside assistance",
        "Rental car damage coverage, if applicable",
        "Lodging interruption coverage"
      );
      comparisonQuestions.push(
        "Does the policy add anything beyond auto insurance or roadside assistance?"
      );
    }

    if (hasFlights === "yes") {
      coverageItems.push(
        "Flight delay coverage",
        "Missed connection coverage",
        "Lost or delayed baggage coverage"
      );
      documents.push("Airline itinerary", "Baggage claim tags");
    }

    if (hasRentalCar === "yes") {
      coverageItems.push("Rental car damage or collision coverage");
      comparisonQuestions.push(
        "Does rental car coverage include exclusions for certain countries, roads, or vehicle types?"
      );
      documents.push("Rental car reservation");
    }

    if (hasPrepaidLodging === "yes") {
      coverageItems.push("Nonrefundable lodging reimbursement");
      documents.push("Lodging cancellation policy");
    }

    if (medicalConcern === "yes") {
      coverageItems.push(
        "Emergency medical treatment",
        "Hospital coverage",
        "Medical evacuation",
        "Pre-existing condition waiver, if needed"
      );
    }

    if (baggageConcern === "yes") {
      coverageItems.push(
        "Lost baggage coverage",
        "Delayed baggage coverage",
        "Personal item coverage limits"
      );
    }

    if (cancelConcern === "yes") {
      coverageItems.push(
        "Cancel for covered reasons",
        "Cancel for any reason option, if available",
        "Work, illness, weather, or family emergency cancellation rules"
      );
      comparisonQuestions.push(
        "Is cancel-for-any-reason coverage available, and what percentage is reimbursed?"
      );
    }

    if (tripCost === "high") {
      coverageItems.push(
        "Higher trip cancellation limit",
        "Higher trip interruption limit",
        "Review per-person and per-trip maximums"
      );
    }

    if (tripCost === "low") {
      comparisonQuestions.push(
        "Is the policy cost worth it compared with the nonrefundable trip cost?"
      );
    }

    return {
      coverageItems: uniqueItems(coverageItems),
      comparisonQuestions: uniqueItems(comparisonQuestions),
      documents: uniqueItems(documents),
    };
  }, [
    tripType,
    tripCost,
    hasFlights,
    hasRentalCar,
    hasPrepaidLodging,
    medicalConcern,
    baggageConcern,
    cancelConcern,
  ]);

  const checklistText = useMemo(
    () =>
      [
        "Travel Insurance Checklist",
        "",
        "Coverage items to compare:",
        ...results.coverageItems.map((item) => `- ${item}`),
        "",
        "Questions to ask:",
        ...results.comparisonQuestions.map((item) => `- ${item}`),
        "",
        "Documents to keep:",
        ...results.documents.map((item) => `- ${item}`),
      ].join("\n"),
    [results]
  );

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <ToolPage
      line="Goodfolk Travel Utilities"
      title="Travel Insurance Checklist"
      description="Create a simple travel insurance comparison checklist based on your trip type, transportation, and coverage concerns."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-zinc-300">Trip type</span>
              <select
                value={tripType}
                onChange={(event) => setTripType(event.target.value as TripType)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
                <option value="cruise">Cruise</option>
                <option value="roadTrip">Road trip</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Trip cost level</span>
              <select
                value={tripCost}
                onChange={(event) => setTripCost(event.target.value as TripCost)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
              >
                <option value="low">Low / mostly refundable</option>
                <option value="medium">Medium</option>
                <option value="high">High / mostly prepaid</option>
              </select>
            </label>

            <YesNoInput label="Flights involved?" value={hasFlights} setValue={setHasFlights} />
            <YesNoInput label="Rental car involved?" value={hasRentalCar} setValue={setHasRentalCar} />
            <YesNoInput label="Prepaid lodging?" value={hasPrepaidLodging} setValue={setHasPrepaidLodging} />
            <YesNoInput label="Medical coverage concern?" value={medicalConcern} setValue={setMedicalConcern} />
            <YesNoInput label="Baggage concern?" value={baggageConcern} setValue={setBaggageConcern} />
            <YesNoInput label="Cancellation concern?" value={cancelConcern} setValue={setCancelConcern} />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            This is a comparison checklist, not insurance advice. Always read
            the policy documents, limits, exclusions, and claim rules before
            buying coverage.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Checklist</h2>

          <div className="mt-6 space-y-5">
            <ListGroup title="Coverage items to compare" items={results.coverageItems} />
            <ListGroup title="Questions to ask" items={results.comparisonQuestions} />
            <ListGroup title="Documents to keep" items={results.documents} />

            <button
              type="button"
              onClick={() => copyText(checklistText)}
              className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-zinc-300 transition hover:border-amber-300 hover:text-amber-200"
            >
              Copy checklist
            </button>
          </div>
        </section>
      </div>

      <RelatedTools currentHref="/travel-insurance-checklist" category="travel" />
    </ToolPage>
  );
}

function YesNoInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: YesNo;
  setValue: (value: YesNo) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-zinc-300">{label}</span>
      <select
        value={value}
        onChange={(event) => setValue(event.target.value as YesNo)}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300"
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </label>
  );
}

function ListGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <h3 className="font-semibold text-white">{title}</h3>
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-zinc-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}