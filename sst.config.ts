import type { SSTConfig } from "sst";
import { Api, SvelteKitSite, Table } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "video-store",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const table = new Table(stack, "Movies", {
        fields: {
          pk: "string",
          sk: "string",
        },
        primaryIndex: {
          partitionKey: "pk",
          sortKey: "sk"
        }
      });

      const api = new Api(stack, "MoviesApi", {
        defaults: {
          function: {
            bind: [table],
          }
        },
        routes: {
          "GET /movies": "api/functions/src/movies/list.handler",
          "POST /movies": "api/functions/src/movies/create.handler",
          "PATCH /movies/{sk}/likes": "api/functions/src/movies/like.handler"
        }
      });

      const site = new SvelteKitSite(stack, "site", {
        bind: [api]
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
