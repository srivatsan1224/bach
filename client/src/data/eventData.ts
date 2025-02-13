import { Music, Dumbbell, Palette, UtensilsCrossed, Laptop, Briefcase, Heart, GraduationCap } from 'lucide-react';

export const upcomingEvents = [
  {
    id: 1,
    title: "Summer Music Festival 2024",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1000",
    date: "June 15-17, 2024",
    location: "Central Park, New York",
    price: "$149",
    rating: 4.8,
    reviews: 2456,
    tag: "Featured",
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
    date: "July 10-12, 2024",
    location: "Convention Center, San Francisco",
    price: "$299",
    rating: 4.9,
    reviews: 1832,
    tag: "Trending",
  },
  {
    id: 3,
    title: "Food & Wine Festival",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000",
    date: "August 5-7, 2024",
    location: "Riverside Gardens, Chicago",
    price: "$89",
    rating: 4.7,
    reviews: 3211,
    tag: "Popular",
  },
  {
    id: 4,
    title: "Art Exhibition: Modern Masters",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=1000",
    date: "September 1-30, 2024",
    location: "Metropolitan Museum, NYC",
    price: "$45",
    rating: 4.9,
    reviews: 1567,
    tag: "New",
  },
];

export const categories = [
  { name: "Music", icon: Music, gradient: "from-pink-500 to-rose-500", count: "2.5k events" },
  { name: "Sports", icon: Dumbbell, gradient: "from-blue-500 to-cyan-500", count: "1.8k events" },
  { name: "Arts", icon: Palette, gradient: "from-violet-500 to-purple-500", count: "3.2k events" },
  { name: "Food", icon: UtensilsCrossed, gradient: "from-orange-500 to-amber-500", count: "1.5k events" },
  { name: "Technology", icon: Laptop, gradient: "from-emerald-500 to-teal-500", count: "2.1k events" },
  { name: "Business", icon: Briefcase, gradient: "from-blue-600 to-indigo-600", count: "1.9k events" },
  { name: "Lifestyle", icon: Heart, gradient: "from-red-500 to-pink-500", count: "2.7k events" },
  { name: "Education", icon: GraduationCap, gradient: "from-amber-500 to-orange-500", count: "2.3k events" },
];