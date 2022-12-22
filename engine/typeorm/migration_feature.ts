import { Feature, FeatureBase, Props } from "../feature_base.ts";
import { render } from "eta";

const template = `import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class <%=it.migrationName%> implements MigrationInterface {
  <%~it.upChild%>


  <%~it.downChild%>

}
`;

export type MigrationFeatureProperies = Props & {
    upChild: Feature,
    downChild: Feature,
    migrationName: string,
};

class MigrationFeature extends FeatureBase {
  public props?: MigrationFeatureProperies;

  setProps(p: Props) {
    this.props = p as MigrationFeatureProperies;
  }

  resolve(): string {
    const props = this.props!;
    const upChild = props.upChild.resolve();
    const downChild = props.downChild.resolve();
    const result: string = render(template, {
        downChild: this.addIndentation(downChild),
        upChild: this.addIndentation(upChild),
        migrationName: props.migrationName,
    }) as string;

    return result;
  }
}

export default MigrationFeature;
