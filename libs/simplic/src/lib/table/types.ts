import { TagColor } from '../tag/types';

export interface ColumnDefinition {
  key: string;
  label: string;
  maxWidth?: number;
}

export interface TagData {
  id: string;
  label: string;
  color?: TagColor;
}

export type RowValue = string | boolean | Date | TagData[];

export type RowDefinition = Record<string, RowValue>;
