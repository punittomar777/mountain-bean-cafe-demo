import {
  Leaf,
  Coffee,
  Croissant,
  Heart,
  Wifi,
  Phone,
  Mail,
  Clock,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import {
  InstagramIcon,
  FacebookIcon,
  ThreadsIcon,
} from "../components/ui/BrandIcons";

/* ------------------------------------------------------------------ */
/* Brand + navigation                                                  */
/* ------------------------------------------------------------------ */

export const brand = {
  name: "Mountain Bean",
  full: "Mountain Bean Café",
  tagline: "Good coffee. Great food. Mountain state of mind.",
  since: "2021",
} as const;

// Canonical/production URL — replace with the client's real domain on deploy.
export const siteUrl = "https://cafe-demo.punittomar.com";

/*
 * This site is a portfolio demo — Mountain Bean Café is a fictional restaurant.
 * Used for the demo notices, metadata and structured data.
 */
export const demo = {
  author: "Punit Tomar",
  authorUrl: "https://punittomar.com",
  portfolioUrl: "https://studio.punittomar.com",
} as const;

/*
 * WhatsApp click-to-chat.
 * `number` is the full international number, digits only, no "+" (country code + number).
 * For a real client, replace `number` and `display` with theirs — nothing else changes.
 */
export const whatsapp = {
  number: "917465945752",
  display: "+91 74659 45752",
  message:
    "Hi Punit! I saw the Mountain Bean Café demo website and I'd like to know more.",
} as const;

export const whatsappUrl = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(
  whatsapp.message
)}`;

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* Hero — small trust markers                                          */
/* ------------------------------------------------------------------ */

export const heroTrust: string[] = [
  "Freshly brewed",
  "Locally inspired",
  "Made with care",
];

/* ------------------------------------------------------------------ */
/* About — highlights                                                  */
/* ------------------------------------------------------------------ */

export interface Highlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const highlights: Highlight[] = [
  {
    icon: Coffee,
    title: "Freshly brewed coffee",
    description:
      "Small-batch beans, pulled to order by baristas who actually care about the cup.",
  },
  {
    icon: Croissant,
    title: "Made-to-order food",
    description:
      "Comforting plates cooked fresh in our kitchen — never sitting under a heat lamp.",
  },
  {
    icon: Heart,
    title: "Warm, welcoming space",
    description:
      "Soft light, slow mornings and a corner that's yours for as long as you like.",
  },
];

/* ------------------------------------------------------------------ */
/* Menu                                                                */
/* ------------------------------------------------------------------ */

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  veg?: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
  note: string;
  items: MenuItem[];
}

export const menu: MenuCategory[] = [
  {
    id: "coffee",
    label: "Coffee",
    note: "Beans roasted in the hills, pulled fresh to order.",
    items: [
      {
        name: "Mountain Cappuccino",
        description: "Double shot, velvety steamed milk, a dusting of cocoa.",
        price: 180,
        veg: true,
      },
      {
        name: "Classic Americano",
        description: "Clean, bold espresso lengthened with hot water.",
        price: 150,
        veg: true,
      },
      {
        name: "Vanilla Latte",
        description: "Smooth espresso, silky milk and real vanilla.",
        price: 220,
        veg: true,
      },
      {
        name: "Cold Brew",
        description: "Steeped 18 hours for a mellow, low-acid finish.",
        price: 210,
        veg: true,
      },
      {
        name: "Mocha",
        description: "Espresso and dark chocolate under a soft milk cap.",
        price: 240,
        veg: true,
      },
    ],
  },
  {
    id: "breakfast",
    label: "Breakfast",
    note: "Served all day, because some mornings start late.",
    items: [
      {
        name: "Avocado Toast",
        description: "Sourdough, smashed avocado, chilli flakes, lemon.",
        price: 320,
        veg: true,
      },
      {
        name: "Mountain Breakfast Plate",
        description: "Eggs your way, sautéed greens, toast and roast tomato.",
        price: 380,
      },
      {
        name: "Masala Omelette",
        description: "Three eggs, onion, coriander, green chilli, buttered toast.",
        price: 260,
      },
      {
        name: "Pancake Stack",
        description: "Fluffy buttermilk pancakes, maple syrup, seasonal fruit.",
        price: 300,
        veg: true,
      },
    ],
  },
  {
    id: "mains",
    label: "Mains",
    note: "Hearty plates for a proper sit-down.",
    items: [
      {
        name: "Creamy Pesto Pasta",
        description: "Basil pesto, cream, parmesan and toasted pine nuts.",
        price: 380,
        veg: true,
      },
      {
        name: "Grilled Sandwich",
        description: "Three-cheese melt on sourdough with a side salad.",
        price: 290,
        veg: true,
      },
      {
        name: "Café Veggie Bowl",
        description: "Warm grains, roast veg, hummus and a lemon-herb dressing.",
        price: 340,
        veg: true,
      },
      {
        name: "Smoky Paneer Wrap",
        description: "Chargrilled paneer, slaw and smoky mayo in a soft tortilla.",
        price: 320,
        veg: true,
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    note: "Baked in-house, best with a second coffee.",
    items: [
      {
        name: "Chocolate Brownie",
        description: "Fudgy, dark and warm — add a scoop of vanilla.",
        price: 190,
        veg: true,
      },
      {
        name: "Cheesecake",
        description: "New York style with a seasonal berry compote.",
        price: 260,
        veg: true,
      },
      {
        name: "Tiramisu",
        description: "Espresso-soaked layers with mascarpone and cocoa.",
        price: 280,
        veg: true,
      },
      {
        name: "Cinnamon Roll",
        description: "Soft, swirled and glazed — pulled from the oven all day.",
        price: 170,
        veg: true,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Food gallery                                                        */
/* ------------------------------------------------------------------ */

export interface GalleryImage {
  src: string;
  alt: string;
  /* Tailwind spans for the masonry-style grid */
  span?: string;
}

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const gallery: GalleryImage[] = [
  {
    src: img("photo-1509042239860-f550ce710b93", 900),
    alt: "Latte with delicate leaf latte art in a ceramic cup",
    span: "sm:row-span-2",
  },
  {
    src: img("photo-1621996346565-e3dbc646d9a9"),
    alt: "Bowl of creamy pasta topped with herbs and parmesan",
  },
  {
    src: img("photo-1525351484163-7529414344d8"),
    alt: "Avocado toast on sourdough with chilli flakes",
  },
  {
    src: img("photo-1533134242443-d4fd215305ad", 900),
    alt: "Slice of cheesecake with berry compote",
    span: "sm:row-span-2",
  },
  {
    src: img("photo-1554118811-1e0d58224f24", 900),
    alt: "Cosy café interior with warm wooden tables and soft light",
    span: "sm:col-span-2",
  },
  {
    src: img("photo-1481833761820-0509d3217039"),
    alt: "Outdoor café seating with plants and morning sunlight",
  },
  {
    src: img("photo-1572442388796-11668a67e53d"),
    alt: "Cappuccino with feathered latte art seen from above",
  },
  {
    src: img("photo-1512621776951-a57141f2eefd"),
    alt: "Colourful grain and roast-vegetable café bowl",
  },
];

/* ------------------------------------------------------------------ */
/* Why visit us — features                                             */
/* ------------------------------------------------------------------ */

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Leaf,
    title: "Fresh ingredients",
    description:
      "Thoughtfully prepared food using quality, seasonal ingredients we're proud of.",
  },
  {
    icon: Coffee,
    title: "Specialty coffee",
    description:
      "Freshly brewed coffee made with care, from the first pour to the last sip.",
  },
  {
    icon: Heart,
    title: "Cozy atmosphere",
    description:
      "A relaxed space for conversations, quiet mornings or an afternoon of work.",
  },
  {
    icon: Wifi,
    title: "Stay awhile",
    description:
      "Wi-Fi, plug points and no rush to leave — made for long lunches and laptops.",
  },
];

/* ------------------------------------------------------------------ */
/* Reviews (fictional / demo testimonials)                             */
/* ------------------------------------------------------------------ */

export interface Review {
  quote: string;
  name: string;
  detail: string;
  rating: number;
  avatar: string;
}

export const reviews: Review[] = [
  {
    quote:
      "Beautiful little café with amazing coffee and a really relaxed atmosphere. The pasta was excellent too — we stayed far longer than we planned.",
    name: "Aditi Sharma",
    detail: "Weekend regular",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
  },
  {
    quote:
      "Perfect place for a slow Sunday breakfast. Loved the coffee and the cozy interiors. It's become our go-to whenever we're in the hills.",
    name: "Rahul Mehta",
    detail: "Visited with family",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  },
  {
    quote:
      "The cold brew and the brownie are a dangerous combination. Warm staff, great music and the best window seat in Landour.",
    name: "Sneha Kapoor",
    detail: "Came in to work",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=160&q=80",
  },
];

/* ------------------------------------------------------------------ */
/* Reservation — options                                               */
/* ------------------------------------------------------------------ */

export const guestOptions: string[] = [
  "1 guest",
  "2 guests",
  "3 guests",
  "4 guests",
  "5 guests",
  "6 guests",
  "7+ guests",
];

export const timeSlots: string[] = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

/* ------------------------------------------------------------------ */
/* Location + contact                                                  */
/* ------------------------------------------------------------------ */

/*
 * The café is fictional, so there is no street address, coordinates or
 * directions link. The map shows the area that inspired the demo only.
 * For a real client, add their address and a "Get Directions" link here.
 */
export const location = {
  name: brand.full,
  area: "Landour, Mussoorie",
  // Used for the map embed
  mapQuery: "Landour, Mussoorie, Uttarakhand",
} as const;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  location.mapQuery
)}&z=14&output=embed`;

export interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

// Demo contact details reach the developer, not a café.
export const contactDetails: ContactItem[] = [
  {
    icon: Phone,
    label: "Phone",
    value: whatsapp.display,
    href: `tel:+${whatsapp.number}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: "punittomar777@gmail.com",
    href: "mailto:punittomar777@gmail.com",
  },
];

export interface Hours {
  days: string;
  time: string;
}

// Sample hours to demonstrate the layout — shown with a "sample" label.
export const openingHours: Hours[] = [
  { days: "Monday – Friday", time: "8:00 AM – 9:00 PM" },
  { days: "Saturday – Sunday", time: "8:00 AM – 10:00 PM" },
];

export const hoursIcon = Clock;

/* ------------------------------------------------------------------ */
/* Social                                                              */
/* ------------------------------------------------------------------ */

export interface Social {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

// Placeholder "#" links are hidden in the footer — add real URLs to show them.
export const socials: Social[] = [
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Threads", href: "#", icon: ThreadsIcon },
];
