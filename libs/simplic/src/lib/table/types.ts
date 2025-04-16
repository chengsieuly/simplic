export interface ColumnDefinition {
  key: string;
  label: string;
  maxWidth?: number;
}

export interface TagData {
  id: string;
  label: string;
  color?: string;
}

export type RowValue = string | boolean | Date | TagData[];

export type RowDefinition = Record<string, RowValue>;
