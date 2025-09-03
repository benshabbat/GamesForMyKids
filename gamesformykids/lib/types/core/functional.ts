/**
 * ===============================================
 * Functional Programming Types - Clean Code
 * ===============================================
 */

/**
 * Result Type לטיפול בשגיאות - עקרון Functional Programming
 */
export type Result<T, E = Error> = Success<T> | Failure<E>;

export interface Success<T> {
  readonly success: true;
  readonly data: T;
}

export interface Failure<E> {
  readonly success: false;
  readonly error: E;
}

/**
 * Maybe Type למניעת null/undefined - עקרון Functional Programming
 */
export type Maybe<T> = Some<T> | None;

export interface Some<T> {
  readonly isSome: true;
  readonly value: T;
}

export interface None {
  readonly isSome: false;
}

/**
 * Either Type לבחירה בין שני טיפוסים - עקרון Functional Programming
 */
export type Either<L, R> = Left<L> | Right<R>;

export interface Left<L> {
  readonly isLeft: true;
  readonly left: L;
}

export interface Right<R> {
  readonly isLeft: false;
  readonly right: R;
}

/**
 * Predicate Function - עקרון Functional Programming
 */
export type Predicate<T> = (value: T) => boolean;

/**
 * Mapper Function - עקרון Functional Programming
 */
export type Mapper<T, U> = (value: T) => U;

/**
 * Reducer Function - עקרון Functional Programming
 */
export type Reducer<T, U> = (accumulator: U, current: T) => U;

/**
 * Async Function - עקרון Functional Programming
 */
export type AsyncFunction<T, U> = (value: T) => Promise<U>;

/**
 * Event Handler - עקרון Functional Programming
 */
export type EventHandler<T> = (event: T) => void;

/**
 * Validation Result - עקרון Functional Programming
 */
export type ValidationResult<T> = Result<T, ValidationError>;

export interface ValidationError {
  readonly field: string;
  readonly message: string;
  readonly code: string;
}

/**
 * Immutable Array Operations - עקרון Functional Programming
 */
export interface ImmutableArray<T> {
  readonly items: ReadonlyArray<T>;
  map<U>(mapper: Mapper<T, U>): ImmutableArray<U>;
  filter(predicate: Predicate<T>): ImmutableArray<T>;
  reduce<U>(reducer: Reducer<T, U>, initial: U): U;
  find(predicate: Predicate<T>): Maybe<T>;
  append(item: T): ImmutableArray<T>;
  remove(predicate: Predicate<T>): ImmutableArray<T>;
}

/**
 * State Machine - עקרון Functional Programming
 */
export interface StateMachine<S, A> {
  readonly currentState: S;
  transition(action: A): StateMachine<S, A>;
  canTransition(action: A): boolean;
}

/**
 * Command Pattern - עקרון Functional Programming
 */
export interface Command<T> {
  execute(): T;
  undo?(): void;
  canExecute(): boolean;
}

/**
 * Query Pattern - עקרון Functional Programming
 */
export interface Query<T, R> {
  execute(params: T): Promise<R>;
  validate(params: T): ValidationResult<T>;
}

/**
 * Lens Pattern לגישה immutable לנתונים - עקרון Functional Programming
 */
export interface Lens<S, A> {
  get(source: S): A;
  set(source: S, value: A): S;
  update(source: S, updater: (value: A) => A): S;
}

/**
 * Pipe Function - עקרון Functional Programming
 */
export type Pipe = {
  <A, B>(a: A, ab: (a: A) => B): B;
  <A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
  <A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D;
};

/**
 * Compose Function - עקרון Functional Programming
 */
export type Compose = {
  <A, B>(ab: (a: A) => B): (a: A) => B;
  <A, B, C>(bc: (b: B) => C, ab: (a: A) => B): (a: A) => C;
  <A, B, C, D>(cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => D;
};
