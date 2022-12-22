import { FeatureBase, Props } from "../feature_base.ts";
import { render } from "eta";

const template = `new Table({
    name: "<%=it.name%>"
})`;

export type TableFeatureProperies = Props

class TableFeature extends FeatureBase {
  public props?: TableFeatureProperies;

  setProps(p: Props) {
    this.props = p as TableFeatureProperies;
  }

  resolve(): string {
    const props = this.props!;
    const result: string = render(template, props) as string;

    return result;
  }
}

export default TableFeature;
