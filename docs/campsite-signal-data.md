# Campsite Signal Finder data notes

The current Campsite Signal Finder uses static prototype records for a small set
of Georgia campgrounds.

## What the scores represent

The current 0–10 values are planning estimates used to demonstrate the search,
filtering, scoring, and recommendation experience.

## What the scores do not represent

They are not:

- live tower measurements
- verified speed tests
- official carrier coverage guarantees
- site-specific readings

Terrain, foliage, congestion, weather, device hardware, and campground placement
can all change real-world connectivity.

## Source and confidence labels

Current records use:

- Source: `MVP planning estimate`
- Confidence: `low`
- Last verified: `null`

Future records may use FCC data, permitted carrier-map data, field tests, or
user-submitted reports. Any future verified source should include a source label,
confidence level, and verification date.

## Product scope

The tool is intentionally maintained as a small Goodfolk utility. It should not
be treated as a guarantee of connectivity or expanded into a dedicated
campground data platform without evidence of meaningful user demand.
