import { FeatureBase, Props } from "../feature_base.ts";
import { render } from "eta";

const template = `await queryRunner.createTable(
  <%~it.child%>,
  true
);`;

export type CreateTableFeatureProperies = Props;

class CreateTableFeature extends FeatureBase {
  public props?: CreateTableFeatureProperies;

  setProps(p: Props) {
    this.props = p as CreateTableFeatureProperies;
  }

  protected resolveChildren(props: CreateTableFeatureProperies): string {
    const { children } = props;

    if (children) {
      const [firstChild] = children;
      const result = firstChild.resolve();

      return this.addIndentation(result);
    }

    throw new Error("Invalid children");
  }

  resolve(): string {
    const props = this.props!;
    const child = this.resolveChildren(props);
    const result: string = render(template, { child: child }) as string;

    return result;
  }
}

export default CreateTableFeature;
