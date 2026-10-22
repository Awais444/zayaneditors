import { sampleVideo } from "./media";

export type Editor = {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  software: string[];
  bio: string;
  avatar: string;
  reel: { src: string; poster: string; title: string };
};

// TODO: replace with real team members, photos (put images in /public/images/team) and reels.
export const team: Editor[] = [
  {
    slug: "alex-carter",
    name: "Alex Carter",
    role: "Founder & Lead Editor",
    specialty: "YouTube & long-form storytelling",
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    bio: "Eight years cutting YouTube, documentary and brand content. Obsessed with hooks and retention graphs.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=70",
    reel: sampleVideo("Alex Carter reel", 0),
  },
  {
    slug: "maya-lin",
    name: "Maya Lin",
    role: "Senior Editor",
    specialty: "Weddings, brand films & documentaries",
    software: ["DaVinci Resolve", "Premiere Pro"],
    bio: "Story-first editor who finds the emotional thread in hours of footage. Loves a good paper edit.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=70",
    reel: sampleVideo("Maya Lin reel", 3),
  },
  {
    slug: "omar-haddad",
    name: "Omar Haddad",
    role: "Short-Form Lead",
    specialty: "Reels, TikTok, Shorts & music videos",
    software: ["Premiere Pro", "CapCut", "After Effects"],
    bio: "Turns long videos and performance footage into scroll-stopping vertical content every day.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=70",
    reel: sampleVideo("Omar Haddad reel", 2),
  },
  {
    slug: "sofia-reyes",
    name: "Sofia Reyes",
    role: "Colourist & Motion Designer",
    specialty: "Ads, product videos & motion graphics",
    software: ["DaVinci Resolve", "After Effects", "Cinema 4D"],
    bio: "Colourist and animator for ads, product launches and explainers.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=70",
    reel: sampleVideo("Sofia Reyes reel", 1),
  },
  {
    slug: "daniel-okafor",
    name: "Daniel Okafor",
    role: "Audio & Podcast Editor",
    specialty: "Podcasts, sound design & mixing",
    software: ["iZotope RX", "Pro Tools", "Premiere Pro"],
    bio: "Podcast producer and sound designer who makes every voice sound broadcast-ready.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=70",
    reel: sampleVideo("Daniel Okafor reel", 0),
  },
  {
    slug: "priya-nair",
    name: "Priya Nair",
    role: "Client Success Manager",
    specialty: "Briefs, scheduling & quality control",
    software: ["Frame.io", "Notion", "Slack"],
    bio: "Keeps deadlines on track and makes sure every brief is crystal clear before an edit starts.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=70",
    reel: sampleVideo("How we work", 1),
  },
];

export const getEditor = (slug: string) => team.find((m) => m.slug === slug);
/** Editors who actually cut video (excludes non-editing roles). */
export const editors = team.filter((m) => m.slug !== "priya-nair");
