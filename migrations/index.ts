import * as migration_20261016_061521_initial from "./20261016_061521_initial";

export const migrations = [
  {
    up: migration_20261016_061521_initial.up,
    down: migration_20261016_061521_initial.down,
    name: "20261016_061521_initial",
  },
];
