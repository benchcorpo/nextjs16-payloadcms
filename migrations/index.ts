import * as migration_20251119_151420 from './20251119_151420';

export const migrations = [
  {
    up: migration_20251119_151420.up,
    down: migration_20251119_151420.down,
    name: '20251119_151420'
  },
];
