export const SITE = {
  name: "Pizzeria Imperia",
  url: "https://www.pizzeria-imperia.dk",
  phoneDisplay: "+45 33 12 00 50",
  phoneHref: "tel:+4533120050",
  street: "Nørre Farimagsgade 68",
  postalCode: "1364",
  city: "København K",
  country: "Denmark",
  cvr: "DK29188610",
  smileyUrl: "https://www.findsmiley.dk/540960",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Pizzeria+Imperia+N%C3%B8rre+Farimagsgade+68+1364+K%C3%B8benhavn+K",
} as const;

// Source: official site, "Man–Søn" table. 0 = Sunday.
export const HOURS = [
  { day: "Monday", open: null, close: null },
  { day: "Tuesday", open: "11:30", close: "21:00" },
  { day: "Wednesday", open: "11:30", close: "21:00" },
  { day: "Thursday", open: "11:30", close: "22:00" },
  { day: "Friday", open: "11:30", close: "22:00" },
  { day: "Saturday", open: "12:00", close: "22:00" },
  { day: "Sunday", open: "12:00", close: "21:00" },
] as const;

export const LUNCH = {
  price: 60,
  window: "11:30–15:30, weekdays",
  note: "All pizzas marked as lunch are 60 kr. between 11:30 and 15:30 on weekdays.",
};
