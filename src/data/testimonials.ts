export interface Testimonial {
  id: string;
  name: string;
  petName: string;
  petType: string;
  rating: number;
  text: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah M.",
    petName: "Biscuit",
    petType: "Cockapoo",
    rating: 5,
    text: "Absolutely incredible experience! Biscuit came out looking like a completely different dog. The attention to detail is unmatched, and Monika was so patient with him. He actually seemed to enjoy it! Will never go anywhere else.",
    date: "2 weeks ago",
  },
  {
    id: "t2",
    name: "James T.",
    petName: "Luna",
    petType: "Golden Retriever",
    rating: 5,
    text: "Luna is usually terrified of groomers, but DOGSPA changed everything. The calm, one-to-one environment made all the difference. She came out smelling amazing and her coat has never looked better.",
    date: "1 month ago",
  },
  {
    id: "t3",
    name: "Priya K.",
    petName: "Mochi",
    petType: "Shih Tzu",
    rating: 5,
    text: "The Royal package is worth every penny. Mochi got the full spa treatment — aromatherapy bath, massage, the works. She was so relaxed afterwards! The before and after photos were stunning.",
    date: "3 weeks ago",
  },
  {
    id: "t4",
    name: "David R.",
    petName: "Charlie",
    petType: "Labradoodle",
    rating: 5,
    text: "Best groomer in Harrow, hands down. Charlie's coat was in a terrible state after months of lockdown, but they worked miracles. The pickup service is also incredibly convenient.",
    date: "1 month ago",
  },
  {
    id: "t5",
    name: "Emma L.",
    petName: "Whiskers",
    petType: "Persian Cat",
    rating: 5,
    text: "So hard to find a good cat groomer! DOGSPA was amazing with Whiskers — calm, gentle, and professional. He came home looking like a show cat. Highly recommend for feline parents!",
    date: "2 months ago",
  },
  {
    id: "t6",
    name: "Michael S.",
    petName: "Teddy",
    petType: "Toy Poodle",
    rating: 5,
    text: "First time bringing Teddy as a puppy and they made it such a positive experience. He wasn't scared at all! The puppy intro session is a brilliant idea. Teddy now loves his grooming days.",
    date: "5 weeks ago",
  },
];
