export interface Space {
  id: string;
  name: string;
  description: string;
  image: string;
  soundUrl: string;
  color: string;
  accent: string;
}

export const SPACES: Space[] = [
  {
    id: 'rainy-forest',
    name: 'Rainy Forest',
    description: 'The gentle pitter-patter of rain on lush green leaves.',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1920&q=80',
    soundUrl: 'https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-2393.mp3',
    color: '#064e3b',
    accent: '#10b981'
  },
  {
    id: 'cozy-library',
    name: 'Cozy Library',
    description: 'A quiet sanctuary with the scent of old books and a crackling fire.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1920&q=80',
    soundUrl: 'https://assets.mixkit.co/sfx/preview/mixkit-fireplace-crackling-loop-3039.mp3',
    color: '#451a03',
    accent: '#f59e0b'
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    description: 'Rhythmic waves washing over a peaceful shoreline.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    soundUrl: 'https://assets.mixkit.co/sfx/preview/mixkit-waves-on-the-beach-loop-1196.mp3',
    color: '#1e3a8a',
    accent: '#3b82f6'
  },
  {
    id: 'zen-garden',
    name: 'Zen Garden',
    description: 'A tranquil space for meditation with soft wind chimes.',
    image: 'https://images.unsplash.com/photo-1557406230-2225f8843015?auto=format&fit=crop&w=1920&q=80',
    soundUrl: 'https://assets.mixkit.co/sfx/preview/mixkit-wind-blowing-sough-loop-1159.mp3',
    color: '#365314',
    accent: '#84cc16'
  },
  {
    id: 'night-cafe',
    name: 'Night Cafe',
    description: 'The distant hum of a city and the warmth of a late-night cafe.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80',
    soundUrl: 'https://assets.mixkit.co/sfx/preview/mixkit-coffee-shop-ambience-loop-451.mp3',
    color: '#1e1b4b',
    accent: '#6366f1'
  }
];
