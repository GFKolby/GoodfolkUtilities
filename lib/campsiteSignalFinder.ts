export type CarrierKey = "verizonScore" | "attScore" | "tmobileScore";

export type CarrierFilter = "all" | CarrierKey;

export type RecommendationLabel =
  | "Not recommended for remote work"
  | "Risky; backup hotspot recommended"
  | "Usable for light remote work"
  | "Good remote-work candidate";

export type CampgroundSignalSeed = {
  name: string;
  parkName: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  verizonScore: number;
  attScore: number;
  tmobileScore: number;
  remoteWorkScore: number;
  notes: string;
  lastUpdated: string;
};

export type CampgroundSignalEntry = CampgroundSignalSeed & {
  recommendation: RecommendationLabel;
};

export const carrierLabels: Record<CarrierKey, string> = {
  verizonScore: "Verizon",
  attScore: "AT&T",
  tmobileScore: "T-Mobile",
};

export function getRemoteWorkRecommendation(
  score: number,
): RecommendationLabel {
  if (score <= 3) {
    return "Not recommended for remote work";
  }

  if (score <= 5) {
    return "Risky; backup hotspot recommended";
  }

  if (score <= 7) {
    return "Usable for light remote work";
  }

  return "Good remote-work candidate";
}

export function getBestCarriers(entry: CampgroundSignalEntry) {
  const carrierScores = [
    { key: "verizonScore" as const, score: entry.verizonScore },
    { key: "attScore" as const, score: entry.attScore },
    { key: "tmobileScore" as const, score: entry.tmobileScore },
  ];
  const topScore = Math.max(...carrierScores.map((carrier) => carrier.score));

  return carrierScores
    .filter((carrier) => carrier.score === topScore)
    .map((carrier) => carrier.key);
}

export function matchesCarrierFilter(
  entry: CampgroundSignalEntry,
  carrier: CarrierFilter,
) {
  if (carrier === "all") {
    return true;
  }

  return getBestCarriers(entry).includes(carrier);
}

export function searchCampgrounds(
  campgrounds: CampgroundSignalEntry[],
  query: string,
  carrier: CarrierFilter,
) {
  const normalizedQuery = query.trim().toLowerCase();

  return campgrounds.filter((campground) => {
    if (!matchesCarrierFilter(campground, carrier)) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const carrierTerms = getBestCarriers(campground).map(
      (carrierKey) => carrierLabels[carrierKey].toLowerCase(),
    );
    const haystack = [
      campground.name,
      campground.parkName,
      campground.city,
      campground.state,
      campground.recommendation,
      campground.notes,
      ...carrierTerms,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

const campgroundSignalSeeds: CampgroundSignalSeed[] = [
  {
    name: "Fort Yargo State Park Campground",
    parkName: "Fort Yargo State Park",
    city: "Winder",
    state: "Georgia",
    latitude: 33.9618,
    longitude: -83.7274,
    verizonScore: 8,
    attScore: 7,
    tmobileScore: 6,
    remoteWorkScore: 7,
    notes:
      "Reliable morning and midday signal near the lake loop. Video calls may need a hotspot boost at busier times.",
    lastUpdated: "2026-06-03",
  },
  {
    name: "Hard Labor Creek Campground",
    parkName: "Hard Labor Creek State Park",
    city: "Rutledge",
    state: "Georgia",
    latitude: 33.6207,
    longitude: -83.5889,
    verizonScore: 6,
    attScore: 5,
    tmobileScore: 4,
    remoteWorkScore: 5,
    notes:
      "Usable for email and messaging at most sites. Backup connectivity is wise for longer work sessions.",
    lastUpdated: "2026-06-03",
  },
  {
    name: "Cloudland Canyon West Rim Campground",
    parkName: "Cloudland Canyon State Park",
    city: "Rising Fawn",
    state: "Georgia",
    latitude: 34.8254,
    longitude: -85.4892,
    verizonScore: 4,
    attScore: 5,
    tmobileScore: 3,
    remoteWorkScore: 3,
    notes:
      "Scenic but patchy. Expect dropped calls in lower areas and plan offline work if you are staying deep in the canyon area.",
    lastUpdated: "2026-06-03",
  },
  {
    name: "Vogel State Park Campground",
    parkName: "Vogel State Park",
    city: "Blairsville",
    state: "Georgia",
    latitude: 34.7651,
    longitude: -83.9154,
    verizonScore: 5,
    attScore: 4,
    tmobileScore: 2,
    remoteWorkScore: 4,
    notes:
      "Signal improves closer to the park entrance. Good enough for light planning, but not ideal for a full remote-work day.",
    lastUpdated: "2026-06-03",
  },
  {
    name: "Tallulah Gorge Campground",
    parkName: "Tallulah Gorge State Park",
    city: "Tallulah Falls",
    state: "Georgia",
    latitude: 34.7337,
    longitude: -83.3944,
    verizonScore: 7,
    attScore: 6,
    tmobileScore: 5,
    remoteWorkScore: 6,
    notes:
      "Strongest performance near the campground road and visitor area. Enough for light remote work with modest upload demands.",
    lastUpdated: "2026-06-03",
  },
  {
    name: "Unicoi State Park Campground",
    parkName: "Unicoi State Park",
    city: "Helen",
    state: "Georgia",
    latitude: 34.7072,
    longitude: -83.7165,
    verizonScore: 7,
    attScore: 7,
    tmobileScore: 5,
    remoteWorkScore: 7,
    notes:
      "Balanced carrier coverage around the main campground. Shared lodge traffic can make evening speeds less predictable.",
    lastUpdated: "2026-06-03",
  },
  {
    name: "Red Top Mountain Campground",
    parkName: "Red Top Mountain State Park",
    city: "Cartersville",
    state: "Georgia",
    latitude: 34.1419,
    longitude: -84.7074,
    verizonScore: 8,
    attScore: 8,
    tmobileScore: 6,
    remoteWorkScore: 8,
    notes:
      "Consistent coverage close to the lake and campground loops. One of the stronger options for dependable weekday camp work.",
    lastUpdated: "2026-06-03",
  },
  {
    name: "Amicalola Falls Campground",
    parkName: "Amicalola Falls State Park",
    city: "Dawsonville",
    state: "Georgia",
    latitude: 34.562,
    longitude: -84.2491,
    verizonScore: 6,
    attScore: 6,
    tmobileScore: 4,
    remoteWorkScore: 6,
    notes:
      "Moderate all-around service. Fine for messaging and lighter work, but large uploads may be frustrating.",
    lastUpdated: "2026-06-03",
  },
  {
    name: "Black Rock Mountain Campground",
    parkName: "Black Rock Mountain State Park",
    city: "Mountain City",
    state: "Georgia",
    latitude: 34.9067,
    longitude: -83.4128,
    verizonScore: 6,
    attScore: 5,
    tmobileScore: 3,
    remoteWorkScore: 5,
    notes:
      "Elevation helps in some spots, but coverage varies across the mountain. Bring backup power and offline work if deadlines matter.",
    lastUpdated: "2026-06-03",
  },
  {
    name: "Skidaway Island Campground",
    parkName: "Skidaway Island State Park",
    city: "Savannah",
    state: "Georgia",
    latitude: 31.9363,
    longitude: -81.0495,
    verizonScore: 9,
    attScore: 8,
    tmobileScore: 7,
    remoteWorkScore: 9,
    notes:
      "Strong coastal coverage and one of the most remote-work-friendly options in this Georgia MVP set.",
    lastUpdated: "2026-06-03",
  },
];

export const campsiteSignalCampgrounds: CampgroundSignalEntry[] =
  campgroundSignalSeeds.map((campground) => ({
    ...campground,
    recommendation: getRemoteWorkRecommendation(campground.remoteWorkScore),
  }));
