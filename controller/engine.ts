import { Context } from "oak";
import { render } from "eta";
import MigrationBuilder from "~/engine/typeorm/builder/migration-builder.ts";

export const getEvents = (ctx: Context) => {
  const result = render("Hi, myname is <%= it.name %>", { name: "Bambank" });

  ctx.response.body = {
    success: true,
    event: "Get-Event",
    result: result,
  };
};

export const getResult = (ctx: Context) => {
  const builder = new MigrationBuilder();
  const feature = builder.build();

  ctx.response.body = feature.resolve();
};
