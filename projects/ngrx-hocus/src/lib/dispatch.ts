import { Type } from '@angular/core';

import { setMetadataEntries, DispatchMetadata } from './metadata';

export function Dispatch<T>(action: Type<T>) {
  return (target: any, propertyName: string | symbol) => {
    const metadata = new DispatchMetadata(propertyName, action);

    setMetadataEntries<T>(target, [metadata]);
  };
}
