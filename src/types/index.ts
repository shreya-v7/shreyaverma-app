// Core app types for MySpace — a private, local-only companion app.
//
// The "reference" types (Company, Role, Certificate, Project, PersonalPost)
// intentionally mirror the shapes used by the personal website
// (shreyaverma-v3 src/types/index.ts) so the imported content stays in sync.

// ---------------------------------------------------------------------------
// Journal / Notes
// ---------------------------------------------------------------------------

export interface Entry {
  id: string;
  title: string | null;
  body: string;
  tags: string[];
  /** Where this entry originated. Seeded entries come from the website diary. */
  source: 'seed' | 'user';
  pinned: boolean;
  createdAt: number; // epoch ms
  updatedAt: number; // epoch ms
}

// ---------------------------------------------------------------------------
// Tasks / To-dos
// ---------------------------------------------------------------------------

export type Priority = 'low' | 'med' | 'high';

export interface Task {
  id: string;
  title: string;
  notes: string | null;
  done: boolean;
  /** Epoch ms for the start of the due day, or null when undated. */
  dueDate: number | null;
  priority: Priority;
  /** Manual ordering within the active list (lower = higher in the list). */
  sortOrder: number;
  createdAt: number;
  completedAt: number | null;
}

export type TaskGroup = 'today' | 'upcoming' | 'done';

// ---------------------------------------------------------------------------
// Routines / Habits
// ---------------------------------------------------------------------------

export type RoutineFrequencyKind = 'daily' | 'weekly';

export interface Routine {
  id: string;
  title: string;
  /** Ionicons glyph name used as the routine badge. */
  icon: string;
  frequencyKind: RoutineFrequencyKind;
  /** Weekdays the routine is active for `weekly` frequency. 0 = Sun … 6 = Sat. */
  weekdays: number[];
  /** Optional "HH:mm" local reminder time. */
  reminderTime: string | null;
  sortOrder: number;
  createdAt: number;
}

/** One completion record. `date` is a local "YYYY-MM-DD" key. */
export interface RoutineLog {
  routineId: string;
  date: string;
}

export interface RoutineWithStatus extends Routine {
  doneToday: boolean;
  streak: number;
  scheduledToday: boolean;
}

// ---------------------------------------------------------------------------
// Reference content (read-only, sourced from the website data files)
// ---------------------------------------------------------------------------

export interface Role {
  title: string;
  duration: string;
  content: string[];
  awards?: string;
  techStack: string[];
}

export interface Company {
  company: string;
  logo: string;
  roles: Role[];
}

export interface Certificate {
  title: string;
  date: string;
  image: string;
}

export interface Project {
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  link: string;
  tags: string[];
}

export interface PersonalPost {
  id: string;
  title?: string;
  caption: string;
  image?: string;
  date?: string;
  tags?: string[];
  link?: string;
  content?: string;
  type: 'books' | 'cinema' | 'blogs';
  metadata?: {
    artist?: string;
    album?: string;
    author?: string;
    book?: string;
    movie?: string;
    show?: string;
    location?: string;
    rating?: number;
    detailedReview?: string[];
  };
}

// ---------------------------------------------------------------------------
// Export payload (Settings → backup)
// ---------------------------------------------------------------------------

export interface ExportPayload {
  app: 'MySpace';
  version: number;
  exportedAt: string;
  entries: Entry[];
  tasks: Task[];
  routines: Routine[];
  routineLogs: RoutineLog[];
}
