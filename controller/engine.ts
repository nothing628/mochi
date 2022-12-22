import { Context } from "oak";
import { render } from "eta";
import TableFeature, {
  TableFeatureProperies,
} from "~/engine/typeorm/table_feature.ts";
import CreateTableFeature, {
  CreateTableFeatureProperies,
} from "~/engine/typeorm/create_table_feature.ts";
import UpRunnerFeature from "~/engine/typeorm/up_runner_feature.ts";

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

  ctx.response.body = upRunnerFeature.resolve();
};
