import { Feature, Props } from "../feature_base.ts";
import { render } from "eta";

const template = `public async up(queryRunner: QueryRunner): Promise<void> {
<% it.childs.forEach(function(child){ %>
  <%~ child %>

<% }) %>
}`;

export type UpRunnerFeatureProperies = Props;

class UpRunnerFeature implements Feature {
  name = "CreateTableFeature";
  template = "";

  public props?: UpRunnerFeatureProperies;

  setProps(p: Props) {
    this.props = p as UpRunnerFeatureProperies;
  }

  protected resolveChildren(props: UpRunnerFeatureProperies): string[] {
    const { children } = props;

    if (children) {
      const resultChildren = children.map(child => {
        const result = child.resolve();
        const resultFinal = this.addIndentation(result);

        console.log(result, resultFinal);

        return resultFinal
      })

      return resultChildren;
    }

    throw new Error("Invalid children");
  }

  protected addIndentation(input: string): string {
    const lines = input.split("\n");
    const result = lines.map((line, idx) => {
      if (idx == 0) return line;
      return "  " + line;
    });

    return result.join("\n");
  }

  resolve(): string {
    const props = this.props!;
    const childs = this.resolveChildren(props);
    const result: string = render(template, { childs: childs }) as string;

    return result;
  }
}

export default UpRunnerFeature;
