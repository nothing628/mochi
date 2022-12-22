import { Application, Router } from "oak";
import { getEvents, getResult } from "~/controller/engine.ts";

const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = {
    success: true,
  };
});
router.get("/events", getEvents);
router.get('/compile', getResult);

app.use(router.routes());

await app.listen({ port: 8000 });
