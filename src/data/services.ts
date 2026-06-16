export interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: string;
  priceFrom: number;
  duration: string;
  icon: string;
  category: "dog" | "cat" | "spa" | "special";
  features: string[];
  popular?: boolean;
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  priceLabel: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export const services: Service[] = [
  {
    id: "full-groom",
    name: "Full Luxury Groom",
    description:
      "Complete grooming experience including bath, blow-dry, breed-specific haircut, ear cleaning, nail trimming, and finishing spritz. Your pet will leave looking and feeling their absolute best.",
    shortDescription: "Bath, cut, style & pamper — the complete experience.",
    price: "From £45",
    priceFrom: 45,
    duration: "2-3 hours",
    icon: "✂️",
    category: "dog",
    features: [
      "Luxurious bath with premium shampoo",
      "Professional blow-dry & fluff",
      "Breed-specific haircut & styling",
      "Ear cleaning & nail trimming",
      "Teeth brushing",
      "Finishing cologne spritz",
      "Bandana or bow accessory",
    ],
    popular: true,
  },
  {
    id: "spa-bath",
    name: "Spa Bath & Tidy",
    description:
      "A refreshing spa bath with deep conditioning treatment, gentle blow-dry, sanitary trim, nail clip, and ear clean. Perfect for in-between grooming sessions.",
    shortDescription: "Refresh & rejuvenate between full grooms.",
    price: "From £30",
    priceFrom: 30,
    duration: "1-1.5 hours",
    icon: "🛁",
    category: "dog",
    features: [
      "Deep cleansing spa bath",
      "Conditioning treatment",
      "Gentle blow-dry",
      "Sanitary & paw trim",
      "Nail clipping",
      "Ear cleaning",
    ],
  },
  {
    id: "puppy-intro",
    name: "Puppy First Visit",
    description:
      "A gentle introduction to grooming for puppies aged 12 weeks+. We take it slow, building confidence and trust. Includes mini bath, gentle brush, nail clip, and lots of treats!",
    shortDescription: "Gentle first-time experience for your little one.",
    price: "From £25",
    priceFrom: 25,
    duration: "45 mins",
    icon: "🐶",
    category: "special",
    features: [
      "Calm, patient introduction",
      "Mini bath & gentle brush",
      "Nail clip",
      "Ear check",
      "Face & paw tidy",
      "Lots of treats & praise",
      "Confidence building",
    ],
  },
  {
    id: "cat-groom",
    name: "Cat Grooming",
    description:
      "Specialist feline grooming in a calm, quiet environment. Includes gentle bath, blow-dry, coat trim, nail clip, and ear cleaning. We understand cats need extra patience.",
    shortDescription: "Calm, specialist care for your feline friend.",
    price: "From £40",
    priceFrom: 40,
    duration: "1.5-2 hours",
    icon: "🐱",
    category: "cat",
    features: [
      "Quiet, calm environment",
      "Gentle handling",
      "Specialist cat shampoo",
      "Coat trim & de-mat",
      "Nail clipping",
      "Ear cleaning",
    ],
  },
  {
    id: "deshed",
    name: "De-shedding Treatment",
    description:
      "Intensive de-shedding treatment to reduce loose hair by up to 80%. Perfect for heavy-shedding breeds. Includes bath, conditioning, blow-out, and thorough brush.",
    shortDescription: "Reduce shedding by up to 80%.",
    price: "From £50",
    priceFrom: 50,
    duration: "2-2.5 hours",
    icon: "🌟",
    category: "spa",
    features: [
      "De-shedding shampoo & conditioner",
      "High-velocity blow-out",
      "Thorough undercoat removal",
      "Skin health check",
      "Nail trimming",
      "Up to 80% less shedding",
    ],
  },
  {
    id: "aromatherapy",
    name: "Aromatherapy Spa",
    description:
      "The ultimate relaxation experience. Calming lavender bath, deep conditioning mask, gentle massage, and aromatherapy finishing mist. Pure bliss for your pet.",
    shortDescription: "Ultimate relaxation & rejuvenation spa.",
    price: "From £55",
    priceFrom: 55,
    duration: "2-3 hours",
    icon: "🧘",
    category: "spa",
    features: [
      "Calming lavender spa bath",
      "Deep conditioning mask",
      "Gentle relaxation massage",
      "Aromatherapy mist",
      "Paw balm treatment",
      "Premium finishing spritz",
    ],
  },
];

export const servicePackages: ServicePackage[] = [
  {
    id: "essential",
    name: "Essential",
    tagline: "Clean & Fresh",
    price: 35,
    priceLabel: "From £35",
    features: [
      "Bath & blow-dry",
      "Nail trimming",
      "Ear cleaning",
      "Sanitary trim",
      "Finishing spritz",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "The Full Experience",
    price: 55,
    priceLabel: "From £55",
    features: [
      "Everything in Essential",
      "Full breed-specific haircut",
      "Teeth brushing",
      "Paw pad trim",
      "Bandana or bow",
      "Premium shampoo & conditioner",
    ],
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "royal",
    name: "Royal",
    tagline: "Ultimate Luxury",
    price: 85,
    priceLabel: "From £85",
    features: [
      "Everything in Premium",
      "Aromatherapy spa bath",
      "Deep conditioning mask",
      "Relaxation massage",
      "Paw balm treatment",
      "Luxury finishing cologne",
      "Photo session",
    ],
    badge: "Best Value",
  },
];
