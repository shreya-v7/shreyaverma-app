import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';

import { BrandHeader, SiteScreen, SectionRow, SocialRow, Tag } from '@/components/site-ui';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { profileImage, resolveAsset } from '@/data/assets';
import { bio, metaData } from '@/data/site';
import { experienceData, sortedProjects } from '@/data/reference';
import { blogsPosts } from '@/data/diary';
import { useTheme } from '@/hooks/use-theme';

function highlightCompanies() {
  const names = ['Proofpoint', 'Morgan Stanley'];
  return names
    .map((n) => experienceData.find((c) => c.company === n))
    .filter((c): c is NonNullable<typeof c> => c != null);
}

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  const highlights = highlightCompanies();
  const quantastica = sortedProjects.find((p) => p.title.startsWith('Quantastica'));
  const research = sortedProjects
    .filter((p) => p.title === 'Multifactor Authentication' || p.title === 'DiagZone')
    .slice(0, 2);
  const latestBlogs = blogsPosts.slice(0, 2);

  return (
    <SiteScreen>
      <BrandHeader />

      <View style={styles.hero}>
        <Pressable onPress={() => Linking.openURL('https://x.com/shreyasapphire')}>
          <Image source={profileImage} style={styles.avatar} />
        </Pressable>

        <View style={styles.tagline}>
          <ThemedText type="subtitle">{metaData.tagline}</ThemedText>
          <ThemedText type="small" themeColor="muted" style={{ marginTop: 2 }}>
            {metaData.taglineAside}
          </ThemedText>
        </View>

        {bio.map((p, i) => (
          <ThemedText key={i} style={styles.bio}>
            {p}
          </ThemedText>
        ))}

        <View style={{ marginTop: Spacing.three }}>
          <SocialRow center />
        </View>
      </View>

      {/* Experience timeline */}
      <SectionRow
        title="Experience Timeline"
        subtitle="A quick vertical view of recent roles."
        actionLabel="View all"
        onAction={() => router.push('/about')}
      />
      <View style={styles.timeline}>
        <View style={[styles.timelineLine, { backgroundColor: theme.line }]} />
        {highlights.map((company, index) => {
          const role = company.roles[0];
          return (
            <View key={company.company} style={styles.timelineItem}>
              <View style={styles.dotWrap}>
                <View style={[styles.dotOuter, { backgroundColor: theme.ink }]}>
                  <View style={[styles.dotInner, { backgroundColor: theme.paper }]} />
                </View>
              </View>
              <View style={[styles.timelineCard, { borderColor: theme.line, backgroundColor: theme.panel }]}>
                <View style={styles.timelineTop}>
                  <ThemedText type="code" themeColor="faint">
                    {String(index + 1).padStart(2, '0')} · {company.company}
                  </ThemedText>
                  <ThemedText type="code" themeColor="faint">
                    {role.duration}
                  </ThemedText>
                </View>
                <ThemedText style={styles.roleTitle}>{role.title}</ThemedText>
                {role.content[0] ? (
                  <ThemedText type="small" themeColor="muted" style={{ marginTop: 4 }}>
                    {role.content[0]}
                  </ThemedText>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>

      {/* Featured projects */}
      <View style={{ marginTop: Spacing.five }}>
        <SectionRow
          title="Featured Projects"
          subtitle="Quantastica up front, with two research highlights."
          actionLabel="See all"
          onAction={() => router.push('/projects')}
        />
      </View>

      {quantastica ? (
        <Pressable
          onPress={() => Linking.openURL(quantastica.link)}
          style={({ pressed }) => [styles.spotlight, pressed && { opacity: 0.92 }]}>
          {resolveAsset(quantastica.image) ? (
            <Image source={resolveAsset(quantastica.image)} style={styles.spotlightImg} />
          ) : null}
          <View style={styles.spotlightOverlay} />
          <View style={styles.spotlightContent}>
            <ThemedText type="label" style={{ color: '#e5e5e5' }}>
              {quantastica.category}
            </ThemedText>
            <ThemedText style={styles.spotlightTitle}>{quantastica.title}</ThemedText>
            <ThemedText type="small" style={{ color: '#e9e9e9', marginTop: 6 }}>
              {quantastica.description}
            </ThemedText>
            <View style={styles.spotlightTags}>
              {quantastica.tags.slice(0, 4).map((t) => (
                <View key={t} style={styles.spotlightTag}>
                  <ThemedText type="small" style={{ color: '#f4f4f4', fontSize: 11 }}>
                    {t}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        </Pressable>
      ) : null}

      {research.map((p) => (
        <Pressable
          key={p.title}
          onPress={() => Linking.openURL(p.link)}
          style={({ pressed }) => [
            styles.researchCard,
            { borderColor: theme.line, backgroundColor: theme.panel },
            pressed && { opacity: 0.8 },
          ]}>
          <ThemedText type="label" themeColor="faint">
            {p.category}
          </ThemedText>
          <ThemedText style={[styles.roleTitle, { marginTop: 6 }]}>{p.title}</ThemedText>
          <ThemedText type="small" themeColor="muted" style={{ marginTop: 4 }}>
            {p.description}
          </ThemedText>
          <View style={styles.researchFoot}>
            <ThemedText type="small" style={{ color: theme.ink }}>
              View paper
            </ThemedText>
            <Ionicons name="arrow-forward" size={14} color={theme.ink} />
          </View>
        </Pressable>
      ))}

      {/* Latest writing */}
      <View style={{ marginTop: Spacing.five }}>
        <SectionRow
          title="Latest Writing"
          subtitle="Recent posts as simple tiles."
          actionLabel="Open"
          onAction={() => router.push('/diary')}
        />
      </View>
      {latestBlogs.map((post) => (
        <Pressable
          key={post.id}
          onPress={() => post.link && Linking.openURL(post.link)}
          style={({ pressed }) => [
            styles.researchCard,
            { borderColor: theme.line, backgroundColor: theme.panel },
            pressed && { opacity: 0.8 },
          ]}>
          {post.tags?.[0] ? (
            <ThemedText type="label" themeColor="faint">
              {post.tags[0]}
            </ThemedText>
          ) : null}
          <ThemedText style={[styles.roleTitle, { marginTop: 6 }]}>{post.title}</ThemedText>
          <ThemedText type="small" themeColor="muted" style={{ marginTop: 4 }}>
            {post.caption}
          </ThemedText>
          <View style={styles.researchFoot}>
            <ThemedText type="small" style={{ color: theme.ink }}>
              Read
            </ThemedText>
            <Ionicons name="open-outline" size={14} color={theme.ink} />
          </View>
        </Pressable>
      ))}
    </SiteScreen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', marginBottom: Spacing.five },
  avatar: { width: 140, height: 140, borderRadius: 70, marginBottom: Spacing.four },
  tagline: { alignItems: 'center', flexDirection: 'row', gap: 8, marginBottom: Spacing.three },
  bio: { textAlign: 'left', marginBottom: Spacing.two, alignSelf: 'stretch' },
  timeline: { paddingLeft: Spacing.one },
  timelineLine: { position: 'absolute', top: 6, bottom: 6, left: 9, width: StyleSheet.hairlineWidth },
  timelineItem: { flexDirection: 'row', gap: Spacing.three, marginBottom: Spacing.three },
  dotWrap: { width: 20, alignItems: 'center', marginTop: 4 },
  dotOuter: { width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  dotInner: { width: 7, height: 7, borderRadius: 4 },
  timelineCard: { flex: 1, borderWidth: StyleSheet.hairlineWidth, borderRadius: 14, padding: Spacing.three },
  timelineTop: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.two },
  roleTitle: { fontFamily: 'Geist_600SemiBold', fontSize: 15, marginTop: 4 },
  spotlight: {
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: Spacing.two,
    justifyContent: 'flex-end',
    backgroundColor: '#111',
  },
  spotlightImg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', opacity: 0.4 },
  spotlightOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(10,10,10,0.45)' },
  spotlightContent: { padding: Spacing.four },
  spotlightTitle: { fontFamily: 'Geist_600SemiBold', fontSize: 22, color: '#ffffff', marginTop: 6 },
  spotlightTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: Spacing.three },
  spotlightTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  researchCard: { borderRadius: 16, borderWidth: StyleSheet.hairlineWidth, padding: Spacing.three, marginBottom: Spacing.two },
  researchFoot: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: Spacing.three },
});
