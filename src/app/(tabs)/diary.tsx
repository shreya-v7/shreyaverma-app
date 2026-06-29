import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Image, Linking, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SpotifyEmbedCard } from '@/components/spotify-embed';
import { BrandHeader, PillTabs, SiteScreen } from '@/components/site-ui';
import { ThemedText } from '@/components/themed-text';
import { verticalScrollLock } from '@/constants/scroll';
import { Spacing } from '@/constants/theme';
import { resolveAsset } from '@/data/assets';
import { booksPosts, cinemaMoviePosts, cinemaTvPosts } from '@/data/diary';
import { favoriteArtists } from '@/data/music';
import { useBlogPosts } from '@/hooks/use-blog-posts';
import { useGridColumnWidth } from '@/hooks/use-layout-width';
import { useSpotifyEmbed } from '@/hooks/use-spotify-embed';
import { useTheme } from '@/hooks/use-theme';
import { getBlogReadLabel } from '@/lib/substack';
import { stripSpotifyTitleSuffix } from '@/lib/spotify';
import type { PersonalPost } from '@/types';

type Tab = 'blogs' | 'books' | 'movies' | 'tv' | 'music';

function Stars({ rating }: { rating?: number }) {
  const theme = useTheme();
  if (!rating) return null;
  return (
    <ThemedText type="small" themeColor="muted">
      {'★'.repeat(rating)}
      {'☆'.repeat(Math.max(0, 5 - rating))}
    </ThemedText>
  );
}

export default function DiaryScreen() {
  const theme = useTheme();
  const [tab, setTab] = useState<Tab>('blogs');
  const [selected, setSelected] = useState<PersonalPost | null>(null);
  const { posts: blogPosts, loading: blogsLoading, error: blogsError } = useBlogPosts();
  const { embed, loading: spotifyLoading, error: spotifyError } = useSpotifyEmbed();
  const artistSize = useGridColumnWidth(3);

  return (
    <SiteScreen>
      <BrandHeader active="DIARY" />
      <ThemedText type="small" themeColor="muted" style={{ marginBottom: Spacing.three }}>
        Less professional, more human. Music, cinema, books, and the things I think about.
      </ThemedText>

      <View style={{ marginBottom: Spacing.four }}>
        <PillTabs
          value={tab}
          onChange={setTab}
          options={[
            { value: 'blogs', label: 'Blogs' },
            { value: 'books', label: 'Books' },
            { value: 'movies', label: 'Movies' },
            { value: 'tv', label: 'TV shows' },
            { value: 'music', label: 'Music' },
          ]}
        />
      </View>

      {tab === 'blogs' && (
        <>
          {blogsLoading ? (
            <ActivityIndicator color={theme.ink} style={{ marginVertical: Spacing.four }} />
          ) : null}
          {blogsError ? (
            <ThemedText type="small" themeColor="muted" style={{ marginBottom: Spacing.two }}>
              Could not refresh from Substack. Showing saved posts.
            </ThemedText>
          ) : null}
          {blogPosts.map((post) => (
            <Pressable
              key={post.id}
              onPress={() => post.link && Linking.openURL(post.link)}
              style={[styles.textCard, { borderColor: theme.line, backgroundColor: theme.panel }]}>
              <ThemedText style={styles.cardTitle}>{post.title}</ThemedText>
              <ThemedText type="small" themeColor="muted" style={{ marginTop: 6 }}>
                {post.caption}
              </ThemedText>
              <View style={styles.openRow}>
                <ThemedText type="small" style={{ color: theme.ink }}>
                  {getBlogReadLabel(post)}
                </ThemedText>
                <Ionicons name="open-outline" size={13} color={theme.ink} />
              </View>
            </Pressable>
          ))}
        </>
      )}

      {tab === 'books' &&
        booksPosts.map((post) => (
          <Pressable
            key={post.id}
            onPress={() => setSelected(post)}
            style={[styles.textCard, { borderColor: theme.line, backgroundColor: theme.panel }]}>
            <View style={styles.bookHead}>
              <View style={{ flex: 1 }}>
                <ThemedText style={styles.cardTitle}>
                  {post.metadata?.book ?? post.title}
                </ThemedText>
                {post.metadata?.author ? (
                  <ThemedText type="small" themeColor="faint" style={{ marginTop: 2 }}>
                    {post.metadata.author}
                  </ThemedText>
                ) : null}
              </View>
              <Stars rating={post.metadata?.rating} />
            </View>
            <ThemedText type="small" themeColor="muted" style={{ marginTop: 8 }}>
              {post.caption}
            </ThemedText>
          </Pressable>
        ))}

      {tab === 'movies' && <PosterGrid posts={cinemaMoviePosts()} onSelect={setSelected} />}
      {tab === 'tv' && <PosterGrid posts={cinemaTvPosts()} onSelect={setSelected} />}

      {tab === 'music' && (
        <>
          {spotifyLoading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator color={theme.ink} />
              <ThemedText type="small" themeColor="muted" style={{ marginTop: Spacing.two }}>
                Loading from Spotify…
              </ThemedText>
            </View>
          ) : null}

          {spotifyError ? (
            <ThemedText type="small" themeColor="muted" style={{ marginBottom: Spacing.three }}>
              Spotify unavailable offline. Showing saved favorites.
            </ThemedText>
          ) : null}

          {embed?.favoriteTrack ? <SpotifyEmbedCard item={embed.favoriteTrack} /> : null}

          {embed?.playlists.map((item) => (
            <SpotifyEmbedCard key={item.id} item={item} />
          ))}

          <ThemedText type="sectionTitle" style={{ marginBottom: Spacing.three }}>
            Top artists
          </ThemedText>
          <View style={styles.artistGrid}>
            {(embed?.topArtists.length ? embed.topArtists : null)?.map((artist) => (
              <Pressable
                key={artist.id}
                onPress={() => Linking.openURL(artist.spotifyUrl)}
                style={[styles.artist, { width: artistSize }]}>
                <View style={[styles.artistImgWrap, { width: artistSize, height: artistSize }]}>
                  {artist.imageUrl ? (
                    <Image source={{ uri: artist.imageUrl }} style={styles.artistImg} resizeMode="cover" />
                  ) : (
                    <View style={[styles.artistImg, { backgroundColor: theme.backgroundSelected }]} />
                  )}
                </View>
                <ThemedText type="small" themeColor="muted" numberOfLines={2} style={styles.artistName}>
                  {stripSpotifyTitleSuffix(artist.title, 'Artist')}
                </ThemedText>
              </Pressable>
            )) ??
              favoriteArtists.map((a) => {
                const img = resolveAsset(a.image);
                return (
                  <View key={a.name} style={[styles.artist, { width: artistSize }]}>
                    <View style={[styles.artistImgWrap, { width: artistSize, height: artistSize }]}>
                      {img ? (
                        <Image source={img} style={styles.artistImg} resizeMode="cover" />
                      ) : (
                        <View style={[styles.artistImg, { backgroundColor: theme.backgroundSelected }]} />
                      )}
                    </View>
                    <ThemedText type="small" themeColor="muted" numberOfLines={2} style={styles.artistName}>
                      {a.name}
                    </ThemedText>
                  </View>
                );
              })}
          </View>
        </>
      )}

      <ReviewModal post={selected} onClose={() => setSelected(null)} />
    </SiteScreen>
  );
}

function PosterGrid({
  posts,
  onSelect,
}: {
  posts: PersonalPost[];
  onSelect: (p: PersonalPost) => void;
}) {
  const theme = useTheme();
  const posterW = useGridColumnWidth(3);
  const posterH = Math.round(posterW / 0.7);
  return (
    <View style={styles.posterGrid}>
      {posts.map((p) => {
        const img = resolveAsset(p.image);
        const title = p.metadata?.movie ?? p.metadata?.show ?? p.title ?? '';
        return (
          <Pressable
            key={p.id}
            onPress={() => onSelect(p)}
            style={[styles.poster, { width: posterW }]}>
            <View style={[styles.posterImgWrap, { width: posterW, height: posterH }]}>
              {img ? (
                <Image source={img} style={styles.posterImg} resizeMode="cover" />
              ) : (
                <View style={[styles.posterImg, { backgroundColor: theme.backgroundSelected }]} />
              )}
            </View>
            <ThemedText type="small" themeColor="muted" numberOfLines={2} style={{ marginTop: 6 }}>
              {title}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

function ReviewModal({ post, onClose }: { post: PersonalPost | null; onClose: () => void }) {
  const theme = useTheme();
  if (!post) return null;
  const title = post.metadata?.book ?? post.metadata?.movie ?? post.metadata?.show ?? post.title ?? '';
  const img = resolveAsset(post.image);

  return (
    <Modal visible animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalSheet, { backgroundColor: theme.paper }]}>
          <SafeAreaView edges={['bottom']}>
            <View style={styles.modalHandleWrap}>
              <View style={[styles.modalHandle, { backgroundColor: theme.line }]} />
            </View>
            <ScrollView
              {...verticalScrollLock}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: Spacing.four, width: '100%' }}>
              <View style={styles.modalHead}>
                {img ? (
                  <View style={styles.modalPosterWrap}>
                    <Image source={img} style={styles.modalPoster} resizeMode="cover" />
                  </View>
                ) : null}
                <View style={{ flex: 1, minWidth: 0 }}>
                  <ThemedText type="sectionTitle">{title}</ThemedText>
                  {post.metadata?.author ? (
                    <ThemedText type="small" themeColor="faint" style={{ marginTop: 2 }}>
                      {post.metadata.author}
                    </ThemedText>
                  ) : null}
                  <View style={{ marginTop: 6 }}>
                    <Stars rating={post.metadata?.rating} />
                  </View>
                </View>
              </View>

              <ThemedText style={{ marginTop: Spacing.three }}>{post.caption}</ThemedText>

              {post.metadata?.detailedReview?.length ? (
                <View style={{ marginTop: Spacing.three, gap: Spacing.two }}>
                  {post.metadata.detailedReview.map((line, i) => (
                    <View key={i} style={styles.bullet}>
                      <ThemedText type="small" themeColor="faint" style={{ width: 10 }}>
                        ·
                      </ThemedText>
                      <ThemedText type="small" themeColor="muted" style={{ flex: 1 }}>
                        {line}
                      </ThemedText>
                    </View>
                  ))}
                </View>
              ) : null}

              <Pressable onPress={onClose} style={[styles.closeBtn, { borderColor: theme.line }]}>
                <ThemedText type="small" style={{ color: theme.ink }}>
                  Close
                </ThemedText>
              </Pressable>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textCard: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    marginBottom: Spacing.two,
    width: '100%',
    maxWidth: '100%',
  },
  cardTitle: { fontFamily: 'Geist_600SemiBold', fontSize: 16 },
  openRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: Spacing.three },
  bookHead: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.two, minWidth: 0 },
  loadingBox: { alignItems: 'center', paddingVertical: Spacing.four },
  posterGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two, width: '100%' },
  poster: { marginBottom: Spacing.two, maxWidth: '100%' },
  posterImgWrap: { borderRadius: 10, overflow: 'hidden' },
  posterImg: { width: '100%', height: '100%' },
  artistGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two, width: '100%' },
  artist: { alignItems: 'center', marginBottom: Spacing.two, maxWidth: '100%' },
  artistImgWrap: { borderRadius: 999, overflow: 'hidden' },
  artistImg: { width: '100%', height: '100%' },
  artistName: { marginTop: 6, textAlign: 'center', fontSize: 11 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalSheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '88%' },
  modalHandleWrap: { alignItems: 'center', paddingTop: Spacing.two },
  modalHandle: { width: 40, height: 4, borderRadius: 2 },
  modalHead: { flexDirection: 'row', gap: Spacing.three, alignItems: 'flex-start' },
  modalPosterWrap: { width: 72, height: 102, borderRadius: 10, overflow: 'hidden' },
  modalPoster: { width: '100%', height: '100%' },
  bullet: { flexDirection: 'row', gap: 6 },
  closeBtn: {
    marginTop: Spacing.four,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
});
