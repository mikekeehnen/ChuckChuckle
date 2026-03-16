import { createServerAdapter } from "@whatwg-node/server";

import { fetch as meshFetch } from "../src/handler.js";

const adapter = createServerAdapter(meshFetch);

export default adapter;
