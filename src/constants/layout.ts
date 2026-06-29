import { Dimensions } from 'react-native';

import { MaxContentWidth, Spacing } from '@/constants/theme';

/** @deprecated Prefer `useSiteContentWidth()` / `useGridColumnWidth()` for live dimensions. */
export function siteContentWidth(): number {
  const windowWidth = Dimensions.get('window').width;
  return Math.min(windowWidth - Spacing.four * 2, MaxContentWidth);
}

/** N-column grid cell width with gaps. */
export function gridColumnWidth(columns = 3, gap = Spacing.two): number {
  const totalGap = gap * (columns - 1);
  return Math.floor((siteContentWidth() - totalGap) / columns);
}

/** Two-column grid cell width with gaps. */
export function gridHalfWidth(gap = Spacing.two): number {
  return gridColumnWidth(2, gap);
}
