import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';

import { BrandHeader, PillTabs, SiteScreen } from '@/components/site-ui';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { resolveAsset } from '@/data/assets';
import { sortedProjects } from '@/data/reference';
import { useTheme } from '@/hooks/use-theme';

export default function ProjectsScreen() {
  const theme = useTheme();
  const [filter, setFilter] = useState('All');

  const allTags = useMemo(() => {
    const set = new Set<string>();
    sortedProjects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set)];
  }, []);

  const list = useMemo(
    () => (filter === 'All' ? sortedProjects : sortedProjects.filter((p) => p.tags.includes(filter))),
    [filter],
  );

  return (
    <SiteScreen>
      <BrandHeader active="PROJECTS" />
      <ThemedText type="small" themeColor="muted" style={{ marginBottom: Spacing.three }}>
        Things I have built, researched, and talked about.
      </ThemedText>

      <View style={{ marginBottom: Spacing.three }}>
        <PillTabs value={filter} onChange={setFilter} options={allTags.map((t) => ({ value: t, label: t }))} />
      </View>

      <View style={styles.grid}>
        {list.map((p) => {
          const img = resolveAsset(p.image);
          return (
            <Pressable
              key={p.title}
              onPress={() => Linking.openURL(p.link)}
              style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}>
              {img ? (
                <Image source={img} style={styles.cardImg} resizeMode="cover" />
              ) : (
                <View style={[styles.cardImg, { backgroundColor: theme.backgroundSelected }]} />
              )}
              <View style={styles.cardOverlay} />
              <View style={styles.cardBody}>
                <ThemedText type="label" style={{ color: '#e5e5e5' }}>
                  {p.category}
                </ThemedText>
                <ThemedText style={styles.cardTitle}>{p.title}</ThemedText>
                <View style={styles.openRow}>
                  <ThemedText type="small" style={{ color: '#f2f2f2', fontSize: 11 }}>
                    Open
                  </ThemedText>
                  <Ionicons name="arrow-forward" size={12} color="#f2f2f2" />
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </SiteScreen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '48.5%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: Spacing.three,
    backgroundColor: '#111',
    justifyContent: 'flex-end',
  },
  cardImg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', opacity: 0.55 },
  cardOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(10,10,10,0.4)' },
  cardBody: { padding: Spacing.three },
  cardTitle: { fontFamily: 'Geist_600SemiBold', fontSize: 15, color: '#ffffff', marginTop: 4 },
  openRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
});
