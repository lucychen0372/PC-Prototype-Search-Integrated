const BYTES_PER_GIB = 1024 ** 3

export const gibToBytes = (gib: number): number =>
  Math.round(gib * BYTES_PER_GIB)

export const bytesToGib = (bytes: number): number => bytes / BYTES_PER_GIB
