export type Props = {
  children?: Feature[],
  [key: string]: unknown
}

export interface Feature {
  name: string;
  template?: string;
  setProps: (props: Props) => void;
  resolve: () => string;
}
