const globals = {
  brand: process.env.node_env === "production" ? process.env.BRAND || "---" : "test-env",
};

Object.freeze(globals);

export default globals;
