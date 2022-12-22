import { Feature, Props } from "../feature_base.ts";
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

class MigrationFeature implements Feature {
  name = "MigrationFeature";
  template = "";

  public props?: MigrationFeatureProperies;

  setProps(p: Props) {
    this.props = p as MigrationFeatureProperies;
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
