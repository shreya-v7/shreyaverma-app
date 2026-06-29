import React, { type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type Props = {
  children: ReactNode;
  title?: string;
  onRetry?: () => void;
};

type State = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  private retry = () => {
    this.setState({ error: null });
    this.props.onRetry?.();
  };

  render() {
    if (this.state.error) {
      return (
        <View style={styles.wrap}>
          <ThemedText style={styles.title}>{this.props.title ?? 'Something went wrong'}</ThemedText>
          <ThemedText type="small" themeColor="muted" style={styles.message}>
            {this.state.error.message}
          </ThemedText>
          <Pressable onPress={this.retry} style={styles.retry}>
            <ThemedText type="small" themeColor="ink">
              Try again
            </ThemedText>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.six,
    gap: Spacing.two,
  },
  title: {
    fontFamily: 'Geist_600SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
  },
  retry: {
    marginTop: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
  },
});
