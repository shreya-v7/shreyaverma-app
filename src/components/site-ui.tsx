import { Ionicons } from '@expo/vector-icons';
import { type ReactNode, useState } from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { screenShell, verticalScrollLock } from '@/constants/scroll';
import { resolveAsset } from '@/data/assets';
import { socialItems } from '@/data/site';
import { useTheme } from '@/hooks/use-theme';
import type { Company, Role } from '@/types';

/** Scrollable page wrapper with the website's narrow centered column. */
export function SiteScreen({
  children,
  contentStyle,
}: {
  children: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  return (
    <View style={[screenShell, { backgroundColor: theme.paper }]}>
      <SafeAreaView edges={['top', 'left', 'right']} style={screenShell}>
        <ScrollView
          {...verticalScrollLock}
          style={screenShell}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.scroll, contentStyle]}>
          <View style={styles.column}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export function BrandHeader({ active }: { active?: string }) {
  return (
    <View style={styles.brand}>
      <ThemedText type="siteName">Shreya Verma</ThemedText>
      {active ? (
        <ThemedText type="label" themeColor="faint" style={{ marginTop: 6 }}>
          {active}
        </ThemedText>
      ) : null}
    </View>
  );
}

export function SectionRow({
  title,
  subtitle,
  actionLabel,
  onAction,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const theme = useTheme();
  return (
    <View style={styles.sectionRow}>
      <View style={{ flex: 1, minWidth: 0 }}>
        <ThemedText type="sectionTitle">{title}</ThemedText>
        {subtitle ? (
          <ThemedText type="small" themeColor="muted" style={{ marginTop: 4 }}>
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <ThemedText type="small" style={{ color: theme.ink, textDecorationLine: 'underline' }}>
            {actionLabel}
          </ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
}

export function Divider() {
  const theme = useTheme();
  return <View style={[styles.divider, { backgroundColor: theme.line }]} />;
}

export function SocialRow({ center = true }: { center?: boolean }) {
  const theme = useTheme();
  return (
    <View style={[styles.social, center && { justifyContent: 'center' }]}>
      {socialItems.map((s) => (
        <Pressable
          key={s.key}
          onPress={() => Linking.openURL(s.href)}
          hitSlop={8}
          style={({ pressed }) => [styles.socialBtn, pressed && { opacity: 0.5 }]}>
          <Ionicons name={s.icon as never} size={20} color={theme.muted} />
        </Pressable>
      ))}
    </View>
  );
}

/** Pill row used for in-page section navigation (About / Diary tabs). */
export function PillTabs<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  const theme = useTheme();
  return (
    <View style={styles.pillsWrap}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[
              styles.pill,
              { borderColor: theme.line },
              active && { backgroundColor: theme.ink, borderColor: theme.ink },
            ]}>
            <ThemedText
              type="small"
              style={{
                color: active ? theme.paper : theme.muted,
                fontFamily: 'Geist_500Medium',
              }}>
              {opt.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Tag({ label }: { label: string }) {
  const theme = useTheme();
  return (
    <View style={[styles.tag, { borderColor: theme.line, backgroundColor: theme.panel }]}>
      <ThemedText type="small" themeColor="muted" style={{ fontSize: 11 }}>
        {label}
      </ThemedText>
    </View>
  );
}

/** Collapsible company / school card with logo, roles, bullets, tech stack. */
export function CompanyCard({ company, defaultOpen }: { company: Company; defaultOpen?: boolean }) {
  const theme = useTheme();
  const [open, setOpen] = useState(!!defaultOpen);
  const logo = resolveAsset(company.logo);

  return (
    <View style={[styles.card, { borderColor: theme.line, backgroundColor: theme.panel }]}>
      <Pressable onPress={() => setOpen((o) => !o)} style={styles.companyHeader}>
        {logo ? (
          <View style={styles.logoWrap}>
            <Image source={logo} style={styles.logo} resizeMode="cover" />
          </View>
        ) : (
          <View style={[styles.logoWrap, { backgroundColor: theme.backgroundSelected }]} />
        )}
        <View style={{ flex: 1, minWidth: 0 }}>
          <ThemedText style={styles.companyName}>{company.company}</ThemedText>
          <ThemedText type="small" themeColor="muted">
            {company.roles[0].title}
            {company.roles.length > 1 ? ` · ${company.roles.length} roles` : ''}
          </ThemedText>
        </View>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={theme.faint} />
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
    <View style={[styles.roleBlock, { borderLeftColor: theme.line }]}>
      <ThemedText style={styles.roleTitle}>{role.title}</ThemedText>
      <ThemedText type="code" themeColor="faint" style={{ marginBottom: 6 }}>
        {role.duration}
      </ThemedText>
      {role.content.map((line, i) => (
        <View key={i} style={styles.bullet}>
          <ThemedText type="small" themeColor="faint" style={styles.bulletDot}>
            ·
          </ThemedText>
          <ThemedText type="small" themeColor="muted" style={{ flex: 1, minWidth: 0 }}>
            {line}
          </ThemedText>
        </View>
      ))}
      {role.awards ? (
        <View style={styles.award}>
          <Ionicons name="trophy-outline" size={13} color={theme.muted} />
          <ThemedText type="small" themeColor="muted" style={{ flex: 1, fontStyle: 'italic' }}>
            {role.awards}
          </ThemedText>
        </View>
      ) : null}
      <View style={styles.tagRow}>
        {role.techStack.slice(0, 12).map((t) => (
          <Tag key={t} label={t} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    maxWidth: '100%',
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.six,
    alignItems: 'stretch',
    flexGrow: 1,
  },
  column: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  brand: { paddingTop: Spacing.two, paddingBottom: Spacing.four, width: '100%' },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: Spacing.three,
    marginBottom: Spacing.three,
    width: '100%',
    minWidth: 0,
  },
  divider: { height: StyleSheet.hairlineWidth, width: '100%', marginVertical: Spacing.four },
  social: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.three, alignItems: 'center' },
  socialBtn: {
    minWidth: 40,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    paddingVertical: Spacing.one,
    width: '100%',
  },
  pill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  tag: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  card: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    marginBottom: Spacing.two,
  },
  companyHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, minWidth: 0 },
  logoWrap: { width: 36, height: 36, borderRadius: 8, overflow: 'hidden' },
  logo: { width: '100%', height: '100%' },
  companyName: { fontFamily: 'Geist_600SemiBold', fontSize: 16 },
  roles: { marginTop: Spacing.three, gap: Spacing.three },
  roleBlock: { borderLeftWidth: 2, paddingLeft: Spacing.three, gap: 3 },
  roleTitle: { fontFamily: 'Geist_600SemiBold', fontSize: 15 },
  bullet: { flexDirection: 'row', gap: Spacing.one + 2 },
  bulletDot: { width: 8 },
  award: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one + 2, marginTop: Spacing.one },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.one + 2, marginTop: Spacing.two },
});
