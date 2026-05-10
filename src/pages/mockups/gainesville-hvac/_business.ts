// Business data for the Gainesville HVAC Services mockup.
// SWAP THESE VALUES with the real ones from the prospect before sending the link.
// Owner finds them on the Google Business Profile page.

export const business = {
  name: "Gainesville HVAC Services",
  shortName: "Gainesville HVAC",
  tagline: "Heating & cooling, done right.",
  phone: "(770) 555-0142", // SWAP — real phone from their Google listing
  phoneDigits: "7705550142",
  email: "service@gainesvillehvac.com", // SWAP if they have one
  address: {
    street: "Gainesville, GA",
    city: "Gainesville",
    state: "GA",
    zip: "30501",
  },
  hours: {
    weekdays: "Mon–Fri · 8am–6pm",
    saturday: "Sat · 9am–3pm",
    sunday: "Sun · By appointment",
    emergency: "24/7 emergency service",
  },
  established: "2014",
  yearsInBusiness: "10+",
  licenseNumber: "GA CN006847", // SWAP with real GA Conditioned Air license
  certifications: ["Licensed & Insured", "EPA 608 Certified", "NATE Certified Technicians"],
  serviceArea: [
    "Gainesville", "Oakwood", "Flowery Branch", "Buford",
    "Cumming", "Dawsonville", "Cleveland", "Dahlonega",
    "Hoschton", "Braselton", "Lula", "Murrayville",
  ],
  services: [
    {
      num: "01",
      name: "AC Repair",
      summary: "Same-day diagnosis on cooling problems. We pull up, find the fault, and quote you on the spot — no upsell pressure.",
      detail: "Compressor failures, refrigerant leaks, capacitor and contactor replacement, frozen coil thaw and root-cause, blower motor service, thermostat issues. We carry the parts that fail 90% of the time on the truck.",
      starting: "From $89 diagnostic",
    },
    {
      num: "02",
      name: "AC Installation",
      summary: "Replacement systems sized properly for your home — not the easiest sale. Free in-home estimate.",
      detail: "Manual J load calculation before we quote. Carrier, Trane, Lennox, Rheem, and Goodman systems. SEER2-rated equipment from 14.3 to 22+. Permitting and inspection handled. Old unit haul-away included.",
      starting: "Free estimate",
    },
    {
      num: "03",
      name: "Heating Repair & Install",
      summary: "Furnaces, heat pumps, dual-fuel — we service every system common in North Georgia.",
      detail: "Gas furnace ignition and gas valve diagnostics, heat pump reversing valve service, electric furnace element replacement, complete furnace replacement. Cold-snap emergency calls — first call goes ahead of routine appointments.",
      starting: "From $89 diagnostic",
    },
    {
      num: "04",
      name: "Maintenance Plans",
      summary: "Two visits a year, priority scheduling, 15% off repairs. Pays for itself in one breakdown avoided.",
      detail: "Spring AC tune-up + fall heating tune-up. Coil cleaning, refrigerant level check, capacitor test, condensate line clearing, electrical contact inspection, thermostat calibration. Plan members never pay diagnostic fees.",
      starting: "$179/year",
    },
    {
      num: "05",
      name: "Indoor Air Quality",
      summary: "Better air with less drama. Whole-home filters, UV lights, humidifiers — installed in a single visit.",
      detail: "MERV 11 and 13 media filter cabinets, REME HALO and other UV/ionizer products, whole-house steam humidifiers, dehumidifiers for crawl spaces and basements. Honest answers about what helps and what doesn't.",
      starting: "From $385 installed",
    },
    {
      num: "06",
      name: "Ductwork",
      summary: "If your back rooms never cool down, the system isn't always the problem. Often it's the ducts.",
      detail: "Aeroseal duct sealing, sheet-metal repair and replacement, return-air sizing fixes, supply register adjustment, full duct system design for additions and renovations.",
      starting: "Free assessment",
    },
  ],
  trustSignals: [
    { label: "EST.", value: "2014" },
    { label: "GA LIC", value: "CN006847" },
    { label: "RESPONSE", value: "< 4 HRS" },
    { label: "WARRANTY", value: "10 YR PARTS" },
  ],
  // Real Google reviews from the business's actual page — lightly tightened for flow.
  reviews: [
    {
      quote: "Decided it was time for a heating system check-up after a cold morning. Technician arrived promptly and was thorough in his inspection, explaining each step. Within an hour, everything was running efficiently. Their attention to detail truly sets them apart.",
      name: "Manish Gupta",
      date: "1 week ago",
      rating: 5,
      service: "Heating Maintenance",
    },
    {
      quote: "A wave of relief when the technician arrived 15 minutes early. He navigated my cluttered attic with ease, leaving no stone unturned. By the time he left, my A/C hummed like new — and I felt confident going into the hotter months.",
      name: "Mariam Gary",
      date: "2 months ago",
      rating: 5,
      service: "A/C Service",
    },
    {
      quote: "New ductless heating system installed in a single afternoon. Friendly technicians made the process smooth and explained everything clearly. Warm and cozy in no time.",
      name: "Bryant Rebekah",
      date: "2 months ago",
      rating: 5,
      service: "Ductless Heating Install",
    },
    {
      quote: "Spent an afternoon researching before choosing this team for our ventilated ceiling install — they exceeded expectations. The crew was punctual, took the time to walk me through each step, and the craftsmanship was top tier.",
      name: "Jordan Hayes",
      date: "1 month ago",
      rating: 5,
      service: "Ventilated Ceiling Install",
    },
  ],
};

export const nav = [
  { label: "Home", href: "/mockups/gainesville-hvac/" },
  { label: "Services", href: "/mockups/gainesville-hvac/services" },
  { label: "Service Area", href: "/mockups/gainesville-hvac/service-area" },
  { label: "About", href: "/mockups/gainesville-hvac/about" },
  { label: "Contact", href: "/mockups/gainesville-hvac/contact" },
];
