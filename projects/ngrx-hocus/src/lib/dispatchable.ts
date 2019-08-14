export type Dispatchable<T extends new (...args: any) => any> = (...args: ConstructorParameters<T>) => void;
