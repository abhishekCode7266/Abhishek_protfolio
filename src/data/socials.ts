/**
 * Social Links & Contact Channels
 * UI dynamically hides any channel with empty URL to avoid broken buttons.
 */

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: "github" | "linkedin" | "email" | "twitter" | "external";
  ariaLabel: string;
}

export const socials: Record<string, string> = {
  github: "https://github.com/abhishekCode7266",
  portfolioRepo: "https://github.com/abhishekCode7266/Abhishek_portfolio",
  linkedin: "https://linkedin.com/in/abhishek-singh-yadav", // Configurable profile
  email: "mailto:abhisheksoraon9@gmail.com",
  twitter: "", // Empty so it won't render broken button
};

export const socialList: SocialLink[] = [
  {
    id: "github",
    name: "GitHub",
    url: socials.github,
    icon: "github",
    ariaLabel: "Visit Abhishek Singh Yadav's GitHub profile",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: socials.linkedin,
    icon: "linkedin",
    ariaLabel: "Connect with Abhishek Singh Yadav on LinkedIn",
  },
  {
    id: "email",
    name: "Email",
    url: socials.email,
    icon: "email",
    ariaLabel: "Send an email to Abhishek Singh Yadav",
  },
  ...(socials.twitter
    ? [
        {
          id: "twitter",
          name: "Twitter / X",
          url: socials.twitter,
          icon: "twitter" as const,
          ariaLabel: "Follow Abhishek Singh Yadav on Twitter/X",
        },
      ]
    : []),
];
