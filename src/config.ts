const globals = {
  brand: process.env.NODE_ENV === "production" ? process.env.BRAND || "---" : "test-env",
};

Object.freeze(globals);

export default globals;
