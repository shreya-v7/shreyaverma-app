import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { PriorityDot } from '@/components/priority';
import { Header, Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useDb, useOnThisDay, useTasks, useTodayRoutines } from '@/hooks/use-db';
import { useTheme } from '@/hooks/use-theme';
import { formatDueDate, isPast, relativeTime, startOfDay } from '@/lib/datetime';
import { toggleRoutineDone, toggleTask } from '@/lib/repo';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardScreen() {
  const theme = useTheme();
  const router = useRouter();
  const db = useDb();

  const tasks = useTasks();
  const routines = useTodayRoutines();
  const onThisDay = useOnThisDay();

  const todayTasks = useMemo(
    () =>
      tasks
        .filter((t) => !t.done && (t.dueDate == null || startOfDay(t.dueDate) <= startOfDay()))
        .slice(0, 5),
    [tasks],
  );

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const routinesDone = routines.filter((r) => r.doneToday).length;

  return (
    <Screen>
      <Header title={greeting()} subtitle={today} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => router.push('/entry/new')}
          style={({ pressed }) => [
            styles.newEntry,
            { backgroundColor: theme.tint },
            pressed && styles.pressed,
          ]}>
          <Ionicons name="create-outline" size={20} color="#FFFFFF" />
          <ThemedText style={styles.newEntryText}>New journal entry</ThemedText>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>

        {onThisDay ? (
          <Pressable
            onPress={() => router.push(`/entry/${onThisDay.id}`)}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: theme.backgroundElement, paddingBottom: Spacing.three },
              pressed && styles.pressed,
            ]}>
            <View style={styles.cardTitleRow}>
              <Ionicons name="time-outline" size={16} color={theme.tint} />
              <ThemedText type="small" style={{ color: theme.tint, fontWeight: '700' }}>
                ON THIS DAY
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {relativeTime(onThisDay.createdAt)}
              </ThemedText>
            </View>
            <ThemedText style={styles.memoryTitle} numberOfLines={1}>
              {onThisDay.title ?? (onThisDay.body.split('\n')[0] || 'Untitled')}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
              {onThisDay.body.replace(/\n+/g, ' ')}
            </ThemedText>
          </Pressable>
        ) : null}

        {/* Today's tasks */}
        <SectionTitle
          icon="checkmark-circle-outline"
          label="Today's tasks"
          onPress={() => router.push('/tasks')}
        />
        <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
          {todayTasks.length === 0 ? (
            <ThemedText type="small" themeColor="textSecondary" style={styles.emptyLine}>
              Nothing due today. Nice.
            </ThemedText>
          ) : (
            todayTasks.map((t, i) => {
              const overdue = t.dueDate != null && isPast(t.dueDate);
              return (
                <View
                  key={t.id}
                  style={[styles.itemRow, i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.border }]}>
                  <Pressable onPress={() => toggleTask(db, t.id)} hitSlop={8}>
                    <Ionicons name="ellipse-outline" size={22} color={theme.textSecondary} />
                  </Pressable>
                  <ThemedText style={styles.itemText} numberOfLines={1}>
                    {t.title}
                  </ThemedText>
                  <PriorityDot priority={t.priority} />
                  {t.dueDate != null ? (
                    <ThemedText type="small" style={{ color: overdue ? theme.danger : theme.textSecondary }}>
                      {formatDueDate(t.dueDate)}
                    </ThemedText>
                  ) : null}
                </View>
              );
            })
          )}
        </View>

        {/* Today's routines */}
        <SectionTitle
          icon="repeat-outline"
          label={`Routines · ${routinesDone}/${routines.length}`}
          onPress={() => router.push('/routines')}
        />
        <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
          {routines.length === 0 ? (
            <ThemedText type="small" themeColor="textSecondary" style={styles.emptyLine}>
              No routines scheduled today.
            </ThemedText>
          ) : (
            routines.map((r, i) => (
              <View
                key={r.id}
                style={[styles.itemRow, i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.border }]}>
                <Pressable onPress={() => toggleRoutineDone(db, r.id)} hitSlop={8}>
                  <Ionicons
                    name={r.doneToday ? 'checkmark-circle' : 'ellipse-outline'}
                    size={22}
                    color={r.doneToday ? theme.success : theme.textSecondary}
                  />
                </Pressable>
                <ThemedText
                  style={[styles.itemText, r.doneToday && { color: theme.textSecondary }]}
                  numberOfLines={1}>
                  {r.title}
                </ThemedText>
                {r.streak > 0 ? (
                  <View style={styles.streak}>
                    <Ionicons name="flame" size={13} color={theme.warning} />
                    <ThemedText type="small" style={{ color: theme.warning, fontWeight: '700' }}>
                      {r.streak}
                    </ThemedText>
                  </View>
                ) : null}
              </View>
            ))
          )}
        </View>

        <View style={{ height: Spacing.six }} />
      </ScrollView>
    </Screen>
  );
}

function SectionTitle({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress} style={styles.sectionTitle}>
      <Ionicons name={icon} size={16} color={theme.textSecondary} />
      <ThemedText type="small" themeColor="textSecondary" style={styles.sectionLabel}>
        {label.toUpperCase()}
      </ThemedText>
      <Ionicons name="chevron-forward" size={14} color={theme.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.six,
    gap: Spacing.two,
  },
  pressed: { opacity: 0.8 },
  newEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: 16,
    padding: Spacing.four,
    marginBottom: Spacing.two,
  },
  newEntryText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    marginBottom: Spacing.two,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingTop: Spacing.three,
  },
  memoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: Spacing.two,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.three,
    marginBottom: Spacing.one,
    paddingHorizontal: Spacing.one,
  },
  sectionLabel: {
    flex: 1,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  emptyLine: {
    paddingVertical: Spacing.four,
    textAlign: 'center',
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
});
