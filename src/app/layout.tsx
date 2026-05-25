import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  axes: ["opsz"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://jossueespinoza.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jossue Espinoza | Robotics and Autonomous Systems Portfolio",
    template: "%s | Jossue Espinoza",
  },
  description:
    "Portfolio of Jossue Espinoza, focused on ROS 2, autonomous robots, simulation, path planning, NMPC control, SLAM, and local AI for robotics.",
  keywords: [
    "Jossue Espinoza",
    "Robotics Engineer",
    "Autonomous Systems",
    "ROS 2",
    "Gazebo",
    "NMPC",
    "SLAM",
    "LiDAR",
    "Local LLM",
    "Path Planning",
    "Control Systems",
    "C++",
    "Python",
  ],
  authors: [{ name: "Jossue Espinoza" }],
  creator: "Jossue Espinoza",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Jossue Espinoza | Robotics and Autonomous Systems Portfolio",
    description:
      "Building intelligent robots through ROS 2, simulation, path planning, control systems, and local AI.",
    siteName: "Jossue Espinoza",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jossue Espinoza | Robotics and Autonomous Systems Portfolio",
    description:
      "Building intelligent robots through ROS 2, simulation, path planning, control systems, and local AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030305" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <head>
        {/* Inline theme detection -- runs before paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme'),p=window.matchMedia('(prefers-color-scheme:dark)').matches,t=s||(p?'dark':'light');if(t==='light')document.documentElement.classList.add('light');}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-0)] font-sans text-[rgb(var(--fg-rgb))] antialiased">
        {children}
      </body>
    </html>
  );
}
