import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Header, Screen } from '@/components/screen';
import { Segmented } from '@/components/segmented';
import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import {
  sortedCertificates,
  sortedEducation,
  sortedExperience,
  sortedProjects,
} from '@/data/reference';
import type { Company, Role } from '@/types';

type Tab = 'experience' | 'education' | 'certificates' | 'projects';

export default function ReferenceScreen() {
  const theme = useTheme();
  const [tab, setTab] = useState<Tab>('experience');

  return (
    <Screen>
      <Header title="Reference" subtitle="From shreyaverma.com" />

      <View style={styles.controls}>
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { value: 'experience', label: 'Work' },
            { value: 'education', label: 'School' },
            { value: 'certificates', label: 'Certs' },
            { value: 'projects', label: 'Projects' },
          ]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {tab === 'experience' &&
          sortedExperience.map((c, i) => <CompanyCard key={c.company} company={c} defaultOpen={i === 0} />)}

        {tab === 'education' &&
          sortedEducation.map((c, i) => <CompanyCard key={c.company} company={c} defaultOpen={i === 0} />)}

        {tab === 'certificates' &&
          sortedCertificates.map((cert) => (
            <View key={cert.title} style={[styles.simpleCard, { backgroundColor: theme.backgroundElement }]}>
              <View style={[styles.certIcon, { backgroundColor: theme.tintMuted }]}>
                <Ionicons name="ribbon-outline" size={18} color={theme.tint} />
              </View>
              <View style={styles.flex}>
                <ThemedText style={styles.cardTitle}>{cert.title}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {cert.date}
                </ThemedText>
              </View>
            </View>
          ))}

        {tab === 'projects' &&
          sortedProjects.map((p) => (
            <Pressable
              key={p.title}
              onPress={() => p.link && Linking.openURL(p.link)}
              style={({ pressed }) => [
                styles.projectCard,
                { backgroundColor: theme.backgroundElement },
                pressed && styles.pressed,
              ]}>
              <View style={styles.projectHeader}>
                <ThemedText style={styles.cardTitle}>{p.title}</ThemedText>
                <Ionicons name="open-outline" size={16} color={theme.textSecondary} />
              </View>
              <ThemedText type="small" themeColor="textSecondary">
                {p.description}
              </ThemedText>
              <View style={styles.tagRow}>
                {p.tags.map((t) => (
                  <View key={t} style={[styles.miniTag, { backgroundColor: theme.tintMuted }]}>
                    <ThemedText type="small" style={{ color: theme.tint, fontSize: 11, fontWeight: '600' }}>
                      {t}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </Pressable>
          ))}

        <View style={{ height: Spacing.six }} />
      </ScrollView>
    </Screen>
  );
}

function CompanyCard({ company, defaultOpen }: { company: Company; defaultOpen?: boolean }) {
  const theme = useTheme();
  const [open, setOpen] = useState(!!defaultOpen);

  return (
    <View style={[styles.companyCard, { backgroundColor: theme.backgroundElement }]}>
      <Pressable onPress={() => setOpen((o) => !o)} style={styles.companyHeader}>
        <View style={styles.flex}>
          <ThemedText style={styles.companyName}>{company.company}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {company.roles[0].title}
            {company.roles.length > 1 ? ` · ${company.roles.length} roles` : ''}
          </ThemedText>
        </View>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={theme.textSecondary} />
      </Pressable>

      {open ? (
        <View style={styles.roles}>
          {company.roles.map((role, idx) => (
            <RoleBlock key={`${role.title}-${idx}`} role={role} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

function RoleBlock({ role }: { role: Role }) {
  const theme = useTheme();
  return (
    <View style={[styles.roleBlock, { borderLeftColor: theme.border }]}>
      <ThemedText style={styles.roleTitle}>{role.title}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.roleDuration}>
        {role.duration}
      </ThemedText>
      {role.content.map((line, i) => (
        <View key={i} style={styles.bullet}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.bulletDot}>
            •
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.flex}>
            {line}
          </ThemedText>
        </View>
      ))}
      {role.awards ? (
        <View style={styles.award}>
          <Ionicons name="trophy-outline" size={13} color={theme.warning} />
          <ThemedText type="small" style={{ color: theme.warning, flex: 1 }}>
            {role.awards}
          </ThemedText>
        </View>
      ) : null}
      <View style={styles.tagRow}>
        {role.techStack.slice(0, 12).map((t) => (
          <View key={t} style={[styles.miniTag, { backgroundColor: theme.background }]}>
            <ThemedText type="small" themeColor="textSecondary" style={{ fontSize: 11 }}>
              {t}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: { paddingHorizontal: Spacing.four, marginBottom: Spacing.three },
  content: { paddingHorizontal: Spacing.four, gap: Spacing.two },
  flex: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '600', flex: 1 },
  simpleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: 14,
    padding: Spacing.three,
    marginBottom: Spacing.two,
  },
  certIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectCard: {
    borderRadius: 14,
    padding: Spacing.three,
    marginBottom: Spacing.two,
    gap: Spacing.one + 2,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  pressed: { opacity: 0.7 },
  companyCard: {
    borderRadius: 16,
    padding: Spacing.three,
    marginBottom: Spacing.two,
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  companyName: { fontSize: 17, fontWeight: '700' },
  roles: { marginTop: Spacing.three, gap: Spacing.three },
  roleBlock: {
    borderLeftWidth: 2,
    paddingLeft: Spacing.three,
    gap: Spacing.one,
  },
  roleTitle: { fontSize: 15, fontWeight: '600' },
  roleDuration: { marginBottom: Spacing.one },
  bullet: { flexDirection: 'row', gap: Spacing.one + 2 },
  bulletDot: { width: 10 },
  award: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one + 2,
    marginTop: Spacing.one,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one + 2,
    marginTop: Spacing.one,
  },
  miniTag: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
    borderRadius: 8,
  },
});
