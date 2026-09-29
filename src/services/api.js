export const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const simulateRequest = async (callback, ms = 300) => {
  await delay(ms);
  return callback();
};
