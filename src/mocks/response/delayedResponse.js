import { createResponseComposition, context } from "msw";

const delayedResponse = createResponseComposition(null, [
  context.delay()
]);

export default delayedResponse;
