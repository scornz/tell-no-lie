/**
 * Returns a new Promise that will resolve in ms number of milliseconds
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
