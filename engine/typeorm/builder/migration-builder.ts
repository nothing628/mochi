import { Feature } from "~/engine/feature_base.ts";
import TableFeature, {
  TableFeatureProperies,
} from "~/engine/typeorm/feature/table_feature.ts";
import CreateTableFeature, {
  CreateTableFeatureProperies,
} from "~/engine/typeorm/feature/create_table_feature.ts";
import DropTableFeature, {
  DropTableFeatureProperies,
} from "~/engine/typeorm/feature/drop_table_feature.ts";
import UpRunnerFeature from "~/engine/typeorm/feature/up_runner_feature.ts";
import DownRunnerFeature from "~/engine/typeorm/feature/down_runner_feature.ts";
import MigrationFeature, {
  MigrationFeatureProperies,
} from "~/engine/typeorm/feature/migration_feature.ts";
import { TableColumnOptions } from "~/engine/typeorm/types.ts";

export type MigrationBuilderProps = {
  filename: string;
  columns: TableColumnOptions[];
};

class MigrationBuilder {
  setProps(props: MigrationBuilderProps) {
    //
  }

  build(): Feature {
    const props: TableFeatureProperies = {
      name: "users",
    };
    const feature = new TableFeature();
    feature.setProps(props);
    const createTableProps: CreateTableFeatureProperies = {
      children: [feature],
    };
    const createTableFeature = new CreateTableFeature();
    createTableFeature.setProps(createTableProps);

    const upRunnerFeature = new UpRunnerFeature();
    upRunnerFeature.setProps({
      children: [createTableFeature, createTableFeature, createTableFeature],
    });

    const dropTableProps: DropTableFeatureProperies = {
      tableName: "users",
    };
    const dropTableFeature = new DropTableFeature();
    dropTableFeature.setProps(dropTableProps);
    const downRunnerFeature = new DownRunnerFeature();
    downRunnerFeature.setProps({
      children: [dropTableFeature, dropTableFeature, dropTableFeature],
    });

    const migration = new MigrationFeature();
    const migrationProps: MigrationFeatureProperies = {
      downChild: downRunnerFeature,
      upChild: upRunnerFeature,
      migrationName: "CreateUserTable",
    };
    migration.setProps(migrationProps);

    return migration;
  }
}

export default MigrationBuilder;
