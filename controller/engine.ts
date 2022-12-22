import { Context } from "oak";
import { render } from "eta";
import TableFeature, {
  TableFeatureProperies,
} from "~/engine/typeorm/table_feature.ts";
import CreateTableFeature, {
  CreateTableFeatureProperies,
} from "~/engine/typeorm/create_table_feature.ts";
import DropTableFeature, {
  DropTableFeatureProperies,
} from "~/engine/typeorm/drop_table_feature.ts";
import UpRunnerFeature from "~/engine/typeorm/up_runner_feature.ts";
import DownRunnerFeature from "~/engine/typeorm/down_runner_feature.ts";
import MigrationFeature, {
  MigrationFeatureProperies,
} from "~/engine/typeorm/migration_feature.ts";

export const getEvents = (ctx: Context) => {
  const result = render("Hi, myname is <%= it.name %>", { name: "Bambank" });

  ctx.response.body = {
    success: true,
    event: "Get-Event",
    result: result,
  };
};

export const getResult = (ctx: Context) => {
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

  ctx.response.body = migration.resolve();
};
