module.exports = {
  importOrder: ["^react", "^((?!(react|(@/)))|@)\\w+", "^@/\\w+", "^[./]"], //react, external libs, project modules, local modules
  importOrderSeparation: true,
};
