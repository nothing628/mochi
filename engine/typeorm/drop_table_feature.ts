import { FeatureBase, Props } from "../feature_base.ts";
import { render } from "eta";

const template = `await queryRunner.dropTable("<%=it.tableName%>", true);`;

export type DropTableFeatureProperies = Props & {
  tableName: string;
};

class DropTableFeature extends FeatureBase {
  public props?: DropTableFeatureProperies;

  setProps(p: Props) {
    this.props = p as DropTableFeatureProperies;
  }

  resolve(): string {
    const props = this.props!;
    const result: string = render(template, { tableName: props.tableName }) as string;

    return result;
  }
}

export default DropTableFeature;
