import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

import { MaxContentWidth, Spacing } from '@/constants/theme';

/** Live content width inside SiteScreen (respects rotation + safe padding). */
export function useSiteContentWidth(): number {
  const { width } = useWindowDimensions();
  return Math.min(width - Spacing.four * 2, MaxContentWidth);
}

export function useGridColumnWidth(columns = 3, gap = Spacing.two): number {
  const contentWidth = useSiteContentWidth();
  return useMemo(() => {
    const totalGap = gap * (columns - 1);
    return Math.max(1, Math.floor((contentWidth - totalGap) / columns));
  }, [contentWidth, columns, gap]);
}

export function useGridHalfWidth(gap = Spacing.two): number {
  return useGridColumnWidth(2, gap);
}
