import type { Languages } from '../interfaces/languages';

export const AVAILABLE_LANGUAGES = [
  { value: 'en', label: 'English', englishLabel: 'English' },
  {
    value: 'id',
    label: 'Bahasa Indonesia',
    englishLabel: 'Indonesian',
  },
] as {
  label: string;
  value: Languages;
  englishLabel: string;
}[];
