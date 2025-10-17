import type React from 'react';

export type LocaleString = {
  vi: string;
  th: string;
};

// Represents a training video
export interface Video {
  id: string; // YouTube video ID
  title: LocaleString;
  thumbnailUrl: string; // URL for the video thumbnail
}

// Represents a complete training process
export interface TrainingProcess {
  id: string; // Unique identifier (e.g., 'p1', 'p2')
  title: LocaleString;
  description: LocaleString;
  icon: string; // The name of the React SVG icon component (e.g., "SafetyIcon")
  videos: Video[]; // An array of videos belonging to this process
}

// FIX: Moved SiteConfig here to be shared across components.
export interface SiteConfig {
    logoUrl: string;
    title: LocaleString;
    subtitle: LocaleString;
    siteName: LocaleString;
}
