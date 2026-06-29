import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { SpotifyEmbedItem } from '@/lib/spotify';
import { stripSpotifyTitleSuffix } from '@/lib/spotify';
import { useTheme } from '@/hooks/use-theme';

const WEBVIEW_LOCK_SCRIPT = `
  (function () {
    var meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.head.appendChild(meta);
    }
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.width = '100%';
    document.body.style.maxWidth = '100%';
  })();
  true;
`;

export function SpotifyEmbedCard({ item }: { item: SpotifyEmbedItem }) {
  const theme = useTheme();
  const title = stripSpotifyTitleSuffix(item.title, item.type === 'playlist' ? 'Playlist' : 'Spotify');
  const height = Math.min(item.height, 280);

  return (
    <View style={[styles.card, { borderColor: theme.line, backgroundColor: theme.panel }]}>
      <ThemedText type="small" themeColor="faint" style={{ marginBottom: Spacing.one }}>
        {item.type === 'track' ? 'Favorite track' : item.type === 'artist' ? 'Artist' : 'Playlist'}
      </ThemedText>
      <ThemedText style={styles.title} numberOfLines={1}>
        {title}
      </ThemedText>
      <View style={[styles.embedWrap, { height }]}>
        <WebView
          source={{ uri: item.embedUrl }}
          style={[styles.webview, { height }]}
          scrollEnabled={false}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          domStorageEnabled
          setBuiltInZoomControls={false}
          scalesPageToFit={false}
          injectedJavaScript={WEBVIEW_LOCK_SCRIPT}
        />
      </View>
      <Pressable onPress={() => Linking.openURL(item.spotifyUrl)} style={styles.openRow}>
        <ThemedText type="small" style={{ color: theme.ink }}>
          Open in Spotify
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    marginBottom: Spacing.three,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    alignSelf: 'stretch',
  },
  title: { fontFamily: 'Geist_600SemiBold', fontSize: 15, marginBottom: Spacing.two },
  embedWrap: {
    width: '100%',
    maxWidth: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#121212',
    alignSelf: 'stretch',
  },
  webview: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    opacity: 0.99,
  },
  openRow: { marginTop: Spacing.two },
});
