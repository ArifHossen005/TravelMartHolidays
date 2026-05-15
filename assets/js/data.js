'use strict';

/* ============================================================
   data.js — All hardcoded data for the site
   Packages, gallery items, testimonials
   ============================================================ */

const TM_PACKAGES = {
  umrah: [
    {
      id: 1,
      title: "Economy Umrah Package",
      duration: "14 Days",
      price: "From $1,200",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80",
      description: "Affordable Umrah package with comfortable accommodation near Haram, guided ziyarat, and all transfers included.",
      badge: "Umrah",
      featured: true,
      itinerary: [
        "Day 1: Dhaka → Jeddah flight + transfer to Makkah",
        "Day 2: Umrah performance with group guide",
        "Day 3–6: Ziyarat in Makkah (Jabal Noor, Mina, Arafah)",
        "Day 7: Transfer to Madinah",
        "Day 8–12: Salah at Masjid Nabawi + Madinah ziyarat",
        "Day 13: Return to Jeddah",
        "Day 14: Departure to Dhaka"
      ],
      inclusions: ["Round-trip flight", "Visa processing", "3-star hotel near Haram", "All ground transfers", "Group guide", "Daily breakfast"],
      exclusions: ["Lunch & dinner", "Personal expenses", "Travel insurance"]
    },
    {
      id: 2,
      title: "Premium Umrah Package",
      duration: "21 Days",
      price: "From $2,100",
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80",
      description: "5-star hotel stay, private transfers, Madinah ziyarat, and dedicated Bangladeshi guide.",
      badge: "Umrah",
      featured: true,
      itinerary: [
        "Day 1–2: Dhaka → Jeddah → Makkah, settle in 5-star hotel",
        "Day 3: Umrah with senior guide",
        "Day 4–10: Extensive Makkah ziyarat",
        "Day 11: Private transfer to Madinah",
        "Day 12–19: Madinah ibadah + ziyarat",
        "Day 20: Jeddah city + return",
        "Day 21: Arrival Dhaka"
      ],
      inclusions: ["Round-trip flight", "5-star Haram-view hotel", "Private transfers", "Bangladeshi guide", "All meals", "Visa & insurance"],
      exclusions: ["Personal shopping", "Optional excursions"]
    },
    {
      id: 3,
      title: "Umrah Family Package",
      duration: "14 Days",
      price: "From $1,800",
      image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&q=80",
      description: "Special family-friendly Umrah with child-friendly accommodation and flexible scheduling.",
      badge: "Umrah",
      itinerary: [
        "Day 1: Departure & arrival Makkah",
        "Day 2: Family Umrah with assisted guide",
        "Day 3–7: Flexible ziyarat schedule",
        "Day 8: Transfer to Madinah",
        "Day 9–13: Madinah stay",
        "Day 14: Return home"
      ],
      inclusions: ["Family suite rooms", "Child-friendly transport", "All meals", "Female guide for sisters", "Stroller-accessible transfers"],
      exclusions: ["Personal expenses", "Optional Taif tour"]
    },
    {
      id: 4,
      title: "Ramadan Umrah Package",
      duration: "28 Days",
      price: "From $3,500",
      image: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=600&q=80",
      description: "Full Ramadan month Umrah including Laylatul Qadr nights with premium Haram-view hotel.",
      badge: "Umrah",
      itinerary: [
        "Day 1: Pre-Ramadan arrival Makkah",
        "Day 2–10: First Ashra Ramadan",
        "Day 11–20: Middle Ashra (Qiyamul Layl)",
        "Day 21–27: Last Ashra + Laylatul Qadr",
        "Day 28: Eid & departure"
      ],
      inclusions: ["Haram-view 5-star hotel", "Iftar buffet daily", "Sahri delivery", "Full Ramadan support team", "Group I'tikaf arrangement"],
      exclusions: ["Personal shopping", "Suhoor outside hotel"]
    },
    {
      id: 5,
      title: "VIP Umrah Package",
      duration: "10 Days",
      price: "From $3,000",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80",
      description: "Luxury 5-star Umrah experience with personal concierge, private transport, and Haram-facing suite.",
      badge: "Umrah",
      itinerary: [
        "Day 1: Business-class flight + private transfer",
        "Day 2–5: VIP Umrah with personal scholar",
        "Day 6: Helicopter Madinah option / private car",
        "Day 7–9: Madinah luxury stay",
        "Day 10: Departure"
      ],
      inclusions: ["Business-class flight", "Haram-facing suite", "Personal concierge", "Private scholar/guide", "All gourmet meals", "Lounge access"],
      exclusions: ["Personal souvenirs"]
    }
  ],

  tour: [
    {
      id: 6,
      title: "Thailand Discovery Tour",
      duration: "7 Days",
      price: "From $850",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
      description: "Explore Bangkok, Pattaya & Phuket with beach resorts, elephant sanctuary, and Thai cuisine.",
      badge: "Tour",
      featured: true,
      itinerary: [
        "Day 1: Arrive Bangkok",
        "Day 2: Grand Palace + Wat Pho",
        "Day 3: Transfer Pattaya + beach evening",
        "Day 4: Coral Island day trip",
        "Day 5: Fly Phuket",
        "Day 6: Phi Phi Island tour",
        "Day 7: Departure"
      ],
      inclusions: ["Return flights", "4-star hotels", "Daily breakfast", "City tours", "Airport transfers", "English-speaking guide"],
      exclusions: ["Visa fee", "Lunch & dinner", "Optional activities"]
    },
    {
      id: 7,
      title: "Malaysia & Singapore Tour",
      duration: "8 Days",
      price: "From $1,100",
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80",
      description: "Twin-country tour: Kuala Lumpur city, Genting Highlands, and Singapore's Marina Bay.",
      badge: "Tour",
      featured: true,
      itinerary: [
        "Day 1: Arrive KL",
        "Day 2: KL city tour + Petronas",
        "Day 3: Genting Highlands",
        "Day 4: Putrajaya + Batu Caves",
        "Day 5: Cross border to Singapore",
        "Day 6: Sentosa Island full day",
        "Day 7: Gardens by the Bay + Marina Bay",
        "Day 8: Departure"
      ],
      inclusions: ["Return flights", "4-star hotels", "Daily breakfast", "Coach transfers", "All entry tickets", "Group guide"],
      exclusions: ["Visa fees both countries", "Lunch & dinner"]
    },
    {
      id: 8,
      title: "Dubai Luxury Tour",
      duration: "5 Days",
      price: "From $1,400",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
      description: "Burj Khalifa, desert safari, Abu Dhabi grand mosque, and luxury shopping experience.",
      badge: "Tour",
      itinerary: [
        "Day 1: Arrive Dubai + Dubai Mall evening",
        "Day 2: Burj Khalifa 124th floor + fountain show",
        "Day 3: Desert safari with BBQ dinner",
        "Day 4: Abu Dhabi — Sheikh Zayed Mosque + Ferrari World",
        "Day 5: Dubai Marina + departure"
      ],
      inclusions: ["Return flights", "4-star hotel", "All entry passes", "Desert safari", "Abu Dhabi day trip", "All transfers"],
      exclusions: ["UAE visa fee", "Personal shopping", "Some meals"]
    },
    {
      id: 9,
      title: "Cox's Bazar & Sundarbans",
      duration: "4 Days",
      price: "From $250",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      description: "Domestic tour: world's longest sea beach + mangrove forest boat safari.",
      badge: "Tour",
      itinerary: [
        "Day 1: Dhaka → Cox's Bazar (flight)",
        "Day 2: Inani + Himchori",
        "Day 3: Khulna → Sundarbans boat safari",
        "Day 4: Return Dhaka"
      ],
      inclusions: ["Domestic flights", "Beach resort + boat lodge", "All meals on safari", "Local guide", "Forest entry permits"],
      exclusions: ["Personal expenses", "Optional jet-ski"]
    },
    {
      id: 10,
      title: "Turkey & Istanbul Tour",
      duration: "10 Days",
      price: "From $2,200",
      image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=600&q=80",
      description: "Hagia Sophia, Cappadocia hot air balloon, Bosphorus cruise, and Grand Bazaar.",
      badge: "Tour",
      itinerary: [
        "Day 1–3: Istanbul (Hagia Sophia, Blue Mosque, Topkapi)",
        "Day 4: Bosphorus cruise + Grand Bazaar",
        "Day 5: Fly Cappadocia",
        "Day 6: Hot air balloon + Goreme",
        "Day 7: Underground city + valley tours",
        "Day 8: Fly Pamukkale",
        "Day 9: Ephesus ancient city",
        "Day 10: Departure"
      ],
      inclusions: ["Return flights", "Domestic flights", "4-star hotels", "Hot air balloon (weather permitting)", "Daily breakfast + 3 dinners", "All transfers + guide"],
      exclusions: ["Visa fee", "Some meals", "Tips"]
    }
  ]
};

/* ---------- Combined flat array for filters ---------- */
const TM_ALL_PACKAGES = [...TM_PACKAGES.umrah, ...TM_PACKAGES.tour];

/* ---------- Gallery (12 items total) ---------- */
const TM_GALLERY = [
  { id: 1, src: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80", title: "Mecca Grand Mosque", desc: "Pilgrims at Masjid Al-Haram during Umrah", category: "Umrah" },
  { id: 2, src: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80", title: "Phuket Beach", desc: "Beautiful sunset at Patong Beach, Thailand", category: "Tour - Thailand" },
  { id: 3, src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", title: "Burj Khalifa Night", desc: "Dubai skyline from observation deck", category: "Tour - Dubai" },
  { id: 4, src: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80", title: "Petronas Twin Towers", desc: "Iconic skyline of Kuala Lumpur", category: "Tour - Malaysia" },
  { id: 5, src: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80", title: "Madinah Al-Munawwarah", desc: "Masjid An-Nabawi during golden hour", category: "Umrah" },
  { id: 6, src: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80", title: "Hagia Sophia", desc: "Historic mosque in Istanbul, Turkey", category: "Events" },
  { id: 7, src: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80", title: "Thailand Temple", desc: "Wat Arun temple at sunrise, Bangkok", category: "Tour - Thailand" },
  { id: 8, src: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80", title: "Desert Safari Dubai", desc: "Sunset over the Arabian dunes", category: "Tour - Dubai" },
  { id: 9, src: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=800&q=80", title: "Ramadan in Makkah", desc: "Iftar at Masjid Al-Haram courtyard", category: "Umrah" },
  { id: 10, src: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&q=80", title: "Genting Highlands", desc: "Cable car over Malaysian rainforest", category: "Tour - Malaysia" },
  { id: 11, src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80", title: "Group Send-off", desc: "Hajj group departure from Dhaka airport", category: "Events" },
  { id: 12, src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", title: "Phi Phi Island", desc: "Crystal-clear waters of Thailand's south", category: "Tour - Thailand" }
];

/* ---------- Testimonials ---------- */
const TM_TESTIMONIALS = [
  { id: 1, name: "Ahmed Hossain", package: "Premium Umrah Package", rating: 5, quote: "Alhamdulillah! The entire Umrah journey was perfectly organized. Hotel was steps from Haram. TravelMate Holiday took care of everything — we just focused on ibadah.", avatar: "https://randomuser.me/api/portraits/men/32.jpg", country: "🇧🇩 Bangladesh" },
  { id: 2, name: "Fatema Begum", package: "Thailand Discovery Tour", rating: 5, quote: "Amazing trip to Thailand! Everything from flights to hotel transfers was seamless. The guide was very helpful and we felt safe throughout.", avatar: "https://randomuser.me/api/portraits/women/44.jpg", country: "🇧🇩 Bangladesh" },
  { id: 3, name: "Rahim Chowdhury", package: "Dubai Luxury Tour", rating: 5, quote: "Dubai was a dream come true. The desert safari was unforgettable. TravelMate Holiday made the experience truly premium without any hassle.", avatar: "https://randomuser.me/api/portraits/men/67.jpg", country: "🇧🇩 Bangladesh" },
  { id: 4, name: "Nasrin Akter", package: "Economy Umrah Package", rating: 5, quote: "Very affordable yet quality service. The group was well managed and the guide was knowledgeable about all ziyarat points. Highly recommended!", avatar: "https://randomuser.me/api/portraits/women/22.jpg", country: "🇧🇩 Bangladesh" },
  { id: 5, name: "Karim Uddin", package: "Malaysia & Singapore Tour", rating: 4, quote: "The twin-country tour was excellently planned. Petronas towers, Gardens by the Bay — all covered. Smooth visa assistance too!", avatar: "https://randomuser.me/api/portraits/men/55.jpg", country: "🇧🇩 Bangladesh" },
  { id: 6, name: "Salma Khatun", package: "Ramadan Umrah Package", rating: 5, quote: "Spending Ramadan in Mecca is a lifelong blessing. TravelMate made it possible for our family. The hotel view of Haram was breathtaking during Tarawih.", avatar: "https://randomuser.me/api/portraits/women/38.jpg", country: "🇧🇩 Bangladesh" }
];
