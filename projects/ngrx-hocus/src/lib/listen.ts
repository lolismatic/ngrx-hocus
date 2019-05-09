import { ListenMetadata, setMetadataEntries } from './metadata';

export function Listen<T extends any[]>(...args: T) {
  return (target: any, propertyName: string | symbol) => {
    const metadata = new ListenMetadata(propertyName, args);

    setMetadataEntries(target, [metadata]);
  };
}
