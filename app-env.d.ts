/// <reference types="expo/types" />

// Allow side-effect CSS imports (used for web font variables). Expo also
// generates expo-env.d.ts at dev time; this keeps `tsc` happy beforehand.
declare module '*.css';
