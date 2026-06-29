import type { ScrollViewProps } from 'react-native';

/** Props that block accidental horizontal panning on vertical ScrollViews. */
export const verticalScrollLock: Pick<
  ScrollViewProps,
  | 'horizontal'
  | 'showsHorizontalScrollIndicator'
  | 'directionalLockEnabled'
  | 'alwaysBounceHorizontal'
  | 'nestedScrollEnabled'
  | 'overScrollMode'
> = {
  horizontal: false,
  showsHorizontalScrollIndicator: false,
  directionalLockEnabled: true,
  alwaysBounceHorizontal: false,
  nestedScrollEnabled: false,
  overScrollMode: 'never',
};

/** Root wrapper style applied to every tab screen shell. */
export const screenShell = {
  flex: 1 as const,
  width: '100%' as const,
  maxWidth: '100%' as const,
  overflow: 'hidden' as const,
};
