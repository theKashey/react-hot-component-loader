import {ComponentType, ForwardRefExoticComponent, Ref, ReactElement} from "react";

export interface DefaultImportedComponent<P> {
  default: ComponentType<P>;
}

export interface Default<T> {
  default: T;
}

export type Mark = string[];

export type Promised<T> = () => Promise<T>;

export type DefaultComponent<P> = ComponentType<P> | DefaultImportedComponent<P>;
export type DefaultComponentImport<T> = () => Promise<DefaultComponent<T>>


export type Defaultable<P> = P | Default<P>;
export type DefaultImport<T> = () => Promise<Defaultable<T>>


export type LazyImport<T> = () => Promise<DefaultImportedComponent<T>>

export type LoadableComponentState = {
  loading?: boolean;
  error?: any;
}

export interface Loadable<T> {
  done: boolean;
  error: any;
  payload: T | undefined;

  mark: Mark;

  resolution: Promise<void>;

  isLoading(): boolean;

  reset(): void;

  loadIfNeeded(): Promise<T>;

  tryResolveSync<Y = T>(then: (x: T) => Y): Promise<Y>;

  load(): Promise<T>;

  then(callback: (x: T) => void, err: () => void): Promise<any>;
}

export type ComponentOptions<P, K> = {
  loadable: DefaultComponentImport<P> | Loadable<P>,

  LoadingComponent?: ComponentType<any>,
  ErrorComponent?: ComponentType<any>,

  onError?: (a: any) => void,

  async?: boolean;

  render?: (Component: ComponentType<P>, State: LoadableComponentState, props?: K) => ReactElement | null;

  forwardRef?: Ref<any>;
  forwardProps?: K;
}

export type HOCOptions = {
  noAutoImport?: boolean;
}

export type AdditionalHOC = {
  preload(): Promise<void>;
  done: Promise<void>;
}

export type HOCType<P, K> =
  ForwardRefExoticComponent<K & { importedProps?: Partial<ComponentOptions<P, K>> }> &
  AdditionalHOC;

export interface HOC {
  <P, K = P>(loader: DefaultComponentImport<P>, options?: Partial<ComponentOptions<P, K>> & HOCOptions): HOCType<P, K>;
}

export interface ImportedComponents {
  [index: number]: () => Promise<DefaultComponent<any>>;
}