export * from './dispatch.metadata';
export * from './select.metadata';

const METADATA_KEY = '__ngrx-hocus__';

export function getDecoratorMetadata<T>(
  instance: T
): any[] {
  return Object.getPrototypeOf(instance).constructor[METADATA_KEY] || [];
}

export function setMetadataEntries<T>(
  sourceProto: T,
  entries: any[]
) {
  const constructor = sourceProto.constructor;
  const meta: Array<any> = constructor.hasOwnProperty(
    METADATA_KEY
  )
    ? (constructor as any)[METADATA_KEY]
    : Object.defineProperty(constructor, METADATA_KEY, { value: [] })[
        METADATA_KEY
      ];
  Array.prototype.push.apply(meta, entries);
}
