import { Context } from "oak";
import { render } from "eta";

export const getEvents = (ctx: Context) => {
  const result = render("Hi, myname is <%= it.name %>", { name: "Bambank" });

  ctx.response.body = {
    success: true,
    event: "Get-Event",
    result: result,
  };
};
