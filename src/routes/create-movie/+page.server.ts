import type { PageServerLoad } from "./$types";
import { Api } from "sst/node/api";

export const load = (async () => {
  return { url: Api.MoviesApi.url };
}) satisfies PageServerLoad;
