import * as migration_20261016_061521_initial from './20261016_061521_initial';
import * as migration_20261016_152557_blob_object_key from './20261016_152557_blob_object_key';

export const migrations = [
  {
    up: migration_20261016_061521_initial.up,
    down: migration_20261016_061521_initial.down,
    name: '20261016_061521_initial',
  },
  {
    up: migration_20261016_152557_blob_object_key.up,
    down: migration_20261016_152557_blob_object_key.down,
    name: '20261016_152557_blob_object_key'
  },
];
