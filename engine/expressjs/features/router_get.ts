import { Feature } from "../../feature_base.ts";
import { Handlebars, HandlebarsConfig } from 'hbr';

type RouterGetProps = {
  router_var?: string;
  path: string;
  child: string | Feature;
};

class RouterGetFeature implements Feature {
  public name = "expressjs/features/router_get";
  public template = `[[router]].get('[[path]]', [[child]])`;

  resolve(props: unknown) {
    const routerProps = props as RouterGetProps;
    const { child, path, router_var } = routerProps;
    let child_resoved = "";
    let template = Handlebars();

    if (typeof child == "string") child_resoved = child;
    else child_resoved = child.resolve(props);

    return `${router_var || "router"}.get('${path}', ${child_resoved})`;
  }
}

export default RouterGetFeature;
