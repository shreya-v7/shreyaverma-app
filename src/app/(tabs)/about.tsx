import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';

import { BrandHeader, CompanyCard, PillTabs, SiteScreen, Tag } from '@/components/site-ui';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { resolveAsset } from '@/data/assets';
import { achievementCategories, achievementsData } from '@/data/achievements';
import { sortedCertificates, sortedEducation, sortedExperience } from '@/data/reference';
import { useTheme } from '@/hooks/use-theme';
import type { Achievement } from '@/types';

type Tab = 'experience' | 'education' | 'certifications' | 'achievements';

export default function AboutScreen() {
  const theme = useTheme();
  const [tab, setTab] = useState<Tab>('experience');

  return (
    <SiteScreen>
      <BrandHeader active="ABOUT" />

      <View style={{ marginBottom: Spacing.three }}>
        <PillTabs
          value={tab}
          onChange={setTab}
          options={[
            { value: 'experience', label: 'Experience' },
            { value: 'education', label: 'Education' },
            { value: 'certifications', label: 'Certifications' },
            { value: 'achievements', label: 'Achievements' },
          ]}
        />
      </View>

      {tab === 'experience' &&
        sortedExperience.map((c, i) => (
          <CompanyCard key={c.company} company={c} defaultOpen={i === 0} />
        ))}

      {tab === 'education' &&
        sortedEducation.map((c, i) => (
          <CompanyCard key={c.company} company={c} defaultOpen={i === 0} />
        ))}

      {tab === 'certifications' &&
        sortedCertificates.map((cert) => {
          const img = resolveAsset(cert.image);
          return (
            <View
              key={cert.title}
              style={[styles.certCard, { borderColor: theme.line, backgroundColor: theme.panel }]}>
              {img ? (
                <Image source={img} style={styles.certImg} resizeMode="cover" />
              ) : (
                <View style={[styles.certImg, { backgroundColor: theme.backgroundSelected }]} />
              )}
              <View style={{ flex: 1 }}>
                <ThemedText style={styles.certTitle}>{cert.title}</ThemedText>
                <ThemedText type="code" themeColor="faint" style={{ marginTop: 4 }}>
                  {cert.date}
                </ThemedText>
              </View>
            </View>
          );
        })}

      {tab === 'achievements' && <Achievements />}
    </SiteScreen>
  );
}

function Achievements() {
  const [filter, setFilter] = useState<string>('All');
  const filters = ['All', ...achievementCategories];

  const list = useMemo(
    () => (filter === 'All' ? achievementsData : achievementsData.filter((a) => a.category === filter)),
    [filter],
  );

  return (
    <View>
      <View style={{ marginBottom: Spacing.three }}>
        <PillTabs value={filter} onChange={setFilter} options={filters.map((f) => ({ value: f, label: f }))} />
      </View>
      {list.map((a, i) => (
        <AchievementRow key={`${a.title}-${i}`} achievement={a} />
      ))}
    </View>
  );
}

function AchievementRow({ achievement }: { achievement: Achievement }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const when = achievement.date ?? (achievement.year ? String(achievement.year) : '');

  return (
    <Pressable
      onPress={() => setOpen((o) => !o)}
      style={[styles.achCard, { borderColor: theme.line, backgroundColor: theme.panel }]}>
      <View style={styles.achTop}>
        <View style={{ flex: 1 }}>
          <ThemedText style={styles.certTitle}>{achievement.title}</ThemedText>
          <ThemedText type="small" themeColor="faint" style={{ marginTop: 2 }}>
            {achievement.context}
          </ThemedText>
        </View>
        <View style={{ alignItems: 'flex-end', gap: 4 }}>
          <View style={[styles.catChip, { borderColor: theme.line }]}>
            <ThemedText type="small" themeColor="muted" style={{ fontSize: 10 }}>
              {achievement.category}
            </ThemedText>
          </View>
          <ThemedText type="code" themeColor="faint" style={{ fontSize: 10 }}>
            {when}
          </ThemedText>
        </View>
      </View>
      <ThemedText type="small" themeColor="muted" style={{ marginTop: Spacing.two }}>
        {achievement.highlight}
      </ThemedText>
      {open && achievement.details?.length ? (
        <View style={{ marginTop: Spacing.two, gap: 4 }}>
          {achievement.details.map((d, i) => (
            <View key={i} style={styles.bullet}>
              <ThemedText type="small" themeColor="faint" style={{ width: 8 }}>
                ·
              </ThemedText>
              <ThemedText type="small" themeColor="muted" style={{ flex: 1 }}>
                {d}
              </ThemedText>
            </View>
          ))}
        </View>
      ) : null}
      {achievement.link ? (
        <Pressable onPress={() => Linking.openURL(achievement.link!)} style={styles.achLink}>
          <ThemedText type="small" style={{ color: theme.ink }}>
            Open
          </ThemedText>
          <Ionicons name="open-outline" size={13} color={theme.ink} />
        </Pressable>
      ) : null}
      {achievement.details?.length ? (
        <View style={styles.expandHint}>
          <Ionicons
            name={open ? 'chevron-up' : 'chevron-down'}
            size={14}
            color={theme.faint}
          />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  certCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    marginBottom: Spacing.two,
  },
  certImg: { width: 48, height: 48, borderRadius: 10 },
  certTitle: { fontFamily: 'Geist_600SemiBold', fontSize: 15 },
  achCard: {
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    marginBottom: Spacing.two,
  },
  achTop: { flexDirection: 'row', gap: Spacing.two },
  catChip: { borderWidth: StyleSheet.hairlineWidth, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  bullet: { flexDirection: 'row', gap: 6 },
  achLink: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: Spacing.two },
  expandHint: { alignItems: 'center', marginTop: Spacing.one },
});
