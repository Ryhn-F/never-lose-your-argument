/**
 * Color utility functions
 */

import { FALLACY_COLORS } from '../constants/fallacies';

export const getFallacyColor = (index: number): string => {
  return FALLACY_COLORS[index % FALLACY_COLORS.length];
};