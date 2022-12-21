export interface Feature {
  name: string;
  template?: string;
  resolve: (props: unknown) => string;
}
