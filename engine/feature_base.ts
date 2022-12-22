export type Props = {
  children?: Feature[],
  [key: string]: unknown
}

export interface Feature {
  setProps: (props: Props) => void;
  resolve: () => string;
}

export abstract class FeatureBase implements Feature {
  abstract resolve(): string;
  abstract setProps(props: Props): void;

  protected addIndentation(input: string): string {
    const lines = input.split("\n");
    const result = lines.map((line, idx) => {
      if (idx == 0) return line;
      return "  " + line;
    });

    return result.join("\n");
  }
}
