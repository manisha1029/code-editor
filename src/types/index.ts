export interface File {
  name: string;
  language: string;
  value: string;
}

export type Theme = 'vs-dark' | 'light';

export interface EditorState {
  code: string;
  language: string;
  theme: Theme;
}
