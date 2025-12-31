type Left<L> = { left: L; right?: never };
type Right<R> = { left?: never; right: R };
type UnwrapEitherValue = <L, R>(value: EitherValue<L, R>) => NonNullable<L | R>;
type EitherValue<L, R> = NonNullable<Left<L> | Right<R>>;

interface EitherResolver<L, R, V> {
  left?: (_: L) => V | undefined;
  right?: (_: R) => V | undefined;
}

const isDefined = (object: any): boolean => typeof object !== 'undefined' && object !== null;

const isLeft = <L, R>(value: EitherValue<L, R>): value is Left<L> => isDefined(value.left);
const isRight = <L, R>(value: EitherValue<L, R>): value is Right<R> => isDefined(value.right);

const makeLeft = <L>(value: L): Left<L> => ({ left: value });
const makeRight = <R>(value: R): Right<R> => ({ right: value });

const unwrapEither: UnwrapEitherValue = <L, R>(value: EitherValue<L, R>) => {
  const { left, right } = value;

  const errorMsn_1 = 'Received both left and right values at runtime';
  const errorMsn_2 = 'Received no left or right values at runtime when opening Either';

  if (isDefined(right) && isDefined(left)) throw new Error(errorMsn_1);
  if (isDefined(left)) return left as NonNullable<L>;
  if (isDefined(right)) return right as NonNullable<R>;

  throw new Error(errorMsn_2);
};

const getErrorMessage = (error: any): any => {
  if (error) {
    if (error.error) return error.error.message || error.error.status;
    else return error.message || error;
  } else return error;
};

export class Either<L, R> {
  private constructor(private value: EitherValue<L, R>) {}

  public fold<V>(resolver: EitherResolver<L, R, V>): V | undefined {
    if (isRight(this.value) && resolver.right) return resolver.right(unwrapEither(this.value));
    if (isLeft(this.value) && resolver.left) return resolver.left(unwrapEither(this.value));
    return undefined;
  }

  public static left<L>(value: any, isErr = true): Either<L, any> {
    if (typeof value === 'object' && isErr) return new Either(makeLeft<L>(getErrorMessage(value)));
    else return new Either(makeLeft<L>(value));
  }

  public static right<R>(value: R): Either<any, R> {
    return new Either(makeRight<R>(value));
  }
}
