
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Sales_Order
 * 
 */
export type Sales_Order = $Result.DefaultSelection<Prisma.$Sales_OrderPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Sales_Orders
 * const sales_Orders = await prisma.sales_Order.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Sales_Orders
   * const sales_Orders = await prisma.sales_Order.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.sales_Order`: Exposes CRUD operations for the **Sales_Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sales_Orders
    * const sales_Orders = await prisma.sales_Order.findMany()
    * ```
    */
  get sales_Order(): Prisma.Sales_OrderDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Sales_Order: 'Sales_Order'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "sales_Order"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Sales_Order: {
        payload: Prisma.$Sales_OrderPayload<ExtArgs>
        fields: Prisma.Sales_OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Sales_OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Sales_OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Sales_OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Sales_OrderPayload>
          }
          findFirst: {
            args: Prisma.Sales_OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Sales_OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Sales_OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Sales_OrderPayload>
          }
          findMany: {
            args: Prisma.Sales_OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Sales_OrderPayload>[]
          }
          create: {
            args: Prisma.Sales_OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Sales_OrderPayload>
          }
          createMany: {
            args: Prisma.Sales_OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.Sales_OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Sales_OrderPayload>
          }
          update: {
            args: Prisma.Sales_OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Sales_OrderPayload>
          }
          deleteMany: {
            args: Prisma.Sales_OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Sales_OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.Sales_OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Sales_OrderPayload>
          }
          aggregate: {
            args: Prisma.Sales_OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSales_Order>
          }
          groupBy: {
            args: Prisma.Sales_OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<Sales_OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.Sales_OrderCountArgs<ExtArgs>
            result: $Utils.Optional<Sales_OrderCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    sales_Order?: Sales_OrderOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Sales_Order
   */

  export type AggregateSales_Order = {
    _count: Sales_OrderCountAggregateOutputType | null
    _avg: Sales_OrderAvgAggregateOutputType | null
    _sum: Sales_OrderSumAggregateOutputType | null
    _min: Sales_OrderMinAggregateOutputType | null
    _max: Sales_OrderMaxAggregateOutputType | null
  }

  export type Sales_OrderAvgAggregateOutputType = {
    product_qty: number | null
    price: number | null
  }

  export type Sales_OrderSumAggregateOutputType = {
    product_qty: number | null
    price: number | null
  }

  export type Sales_OrderMinAggregateOutputType = {
    id: string | null
    product_name: string | null
    product_qty: number | null
    price: number | null
    customer_name: string | null
    finish_date: string | null
    delivery_date: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Sales_OrderMaxAggregateOutputType = {
    id: string | null
    product_name: string | null
    product_qty: number | null
    price: number | null
    customer_name: string | null
    finish_date: string | null
    delivery_date: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Sales_OrderCountAggregateOutputType = {
    id: number
    product_name: number
    product_qty: number
    price: number
    customer_name: number
    finish_date: number
    delivery_date: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Sales_OrderAvgAggregateInputType = {
    product_qty?: true
    price?: true
  }

  export type Sales_OrderSumAggregateInputType = {
    product_qty?: true
    price?: true
  }

  export type Sales_OrderMinAggregateInputType = {
    id?: true
    product_name?: true
    product_qty?: true
    price?: true
    customer_name?: true
    finish_date?: true
    delivery_date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Sales_OrderMaxAggregateInputType = {
    id?: true
    product_name?: true
    product_qty?: true
    price?: true
    customer_name?: true
    finish_date?: true
    delivery_date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Sales_OrderCountAggregateInputType = {
    id?: true
    product_name?: true
    product_qty?: true
    price?: true
    customer_name?: true
    finish_date?: true
    delivery_date?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Sales_OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sales_Order to aggregate.
     */
    where?: Sales_OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales_Orders to fetch.
     */
    orderBy?: Sales_OrderOrderByWithRelationInput | Sales_OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Sales_OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales_Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales_Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sales_Orders
    **/
    _count?: true | Sales_OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Sales_OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Sales_OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Sales_OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Sales_OrderMaxAggregateInputType
  }

  export type GetSales_OrderAggregateType<T extends Sales_OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateSales_Order]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSales_Order[P]>
      : GetScalarType<T[P], AggregateSales_Order[P]>
  }




  export type Sales_OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Sales_OrderWhereInput
    orderBy?: Sales_OrderOrderByWithAggregationInput | Sales_OrderOrderByWithAggregationInput[]
    by: Sales_OrderScalarFieldEnum[] | Sales_OrderScalarFieldEnum
    having?: Sales_OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Sales_OrderCountAggregateInputType | true
    _avg?: Sales_OrderAvgAggregateInputType
    _sum?: Sales_OrderSumAggregateInputType
    _min?: Sales_OrderMinAggregateInputType
    _max?: Sales_OrderMaxAggregateInputType
  }

  export type Sales_OrderGroupByOutputType = {
    id: string
    product_name: string
    product_qty: number
    price: number
    customer_name: string
    finish_date: string
    delivery_date: string
    createdAt: Date
    updatedAt: Date
    _count: Sales_OrderCountAggregateOutputType | null
    _avg: Sales_OrderAvgAggregateOutputType | null
    _sum: Sales_OrderSumAggregateOutputType | null
    _min: Sales_OrderMinAggregateOutputType | null
    _max: Sales_OrderMaxAggregateOutputType | null
  }

  type GetSales_OrderGroupByPayload<T extends Sales_OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Sales_OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Sales_OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Sales_OrderGroupByOutputType[P]>
            : GetScalarType<T[P], Sales_OrderGroupByOutputType[P]>
        }
      >
    >


  export type Sales_OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    product_name?: boolean
    product_qty?: boolean
    price?: boolean
    customer_name?: boolean
    finish_date?: boolean
    delivery_date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sales_Order"]>



  export type Sales_OrderSelectScalar = {
    id?: boolean
    product_name?: boolean
    product_qty?: boolean
    price?: boolean
    customer_name?: boolean
    finish_date?: boolean
    delivery_date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type Sales_OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "product_name" | "product_qty" | "price" | "customer_name" | "finish_date" | "delivery_date" | "createdAt" | "updatedAt", ExtArgs["result"]["sales_Order"]>

  export type $Sales_OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sales_Order"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      product_name: string
      product_qty: number
      price: number
      customer_name: string
      finish_date: string
      delivery_date: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sales_Order"]>
    composites: {}
  }

  type Sales_OrderGetPayload<S extends boolean | null | undefined | Sales_OrderDefaultArgs> = $Result.GetResult<Prisma.$Sales_OrderPayload, S>

  type Sales_OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Sales_OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Sales_OrderCountAggregateInputType | true
    }

  export interface Sales_OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sales_Order'], meta: { name: 'Sales_Order' } }
    /**
     * Find zero or one Sales_Order that matches the filter.
     * @param {Sales_OrderFindUniqueArgs} args - Arguments to find a Sales_Order
     * @example
     * // Get one Sales_Order
     * const sales_Order = await prisma.sales_Order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Sales_OrderFindUniqueArgs>(args: SelectSubset<T, Sales_OrderFindUniqueArgs<ExtArgs>>): Prisma__Sales_OrderClient<$Result.GetResult<Prisma.$Sales_OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sales_Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Sales_OrderFindUniqueOrThrowArgs} args - Arguments to find a Sales_Order
     * @example
     * // Get one Sales_Order
     * const sales_Order = await prisma.sales_Order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Sales_OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, Sales_OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Sales_OrderClient<$Result.GetResult<Prisma.$Sales_OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sales_Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sales_OrderFindFirstArgs} args - Arguments to find a Sales_Order
     * @example
     * // Get one Sales_Order
     * const sales_Order = await prisma.sales_Order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Sales_OrderFindFirstArgs>(args?: SelectSubset<T, Sales_OrderFindFirstArgs<ExtArgs>>): Prisma__Sales_OrderClient<$Result.GetResult<Prisma.$Sales_OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sales_Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sales_OrderFindFirstOrThrowArgs} args - Arguments to find a Sales_Order
     * @example
     * // Get one Sales_Order
     * const sales_Order = await prisma.sales_Order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Sales_OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, Sales_OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__Sales_OrderClient<$Result.GetResult<Prisma.$Sales_OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sales_Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sales_OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sales_Orders
     * const sales_Orders = await prisma.sales_Order.findMany()
     * 
     * // Get first 10 Sales_Orders
     * const sales_Orders = await prisma.sales_Order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sales_OrderWithIdOnly = await prisma.sales_Order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Sales_OrderFindManyArgs>(args?: SelectSubset<T, Sales_OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Sales_OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sales_Order.
     * @param {Sales_OrderCreateArgs} args - Arguments to create a Sales_Order.
     * @example
     * // Create one Sales_Order
     * const Sales_Order = await prisma.sales_Order.create({
     *   data: {
     *     // ... data to create a Sales_Order
     *   }
     * })
     * 
     */
    create<T extends Sales_OrderCreateArgs>(args: SelectSubset<T, Sales_OrderCreateArgs<ExtArgs>>): Prisma__Sales_OrderClient<$Result.GetResult<Prisma.$Sales_OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sales_Orders.
     * @param {Sales_OrderCreateManyArgs} args - Arguments to create many Sales_Orders.
     * @example
     * // Create many Sales_Orders
     * const sales_Order = await prisma.sales_Order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Sales_OrderCreateManyArgs>(args?: SelectSubset<T, Sales_OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Sales_Order.
     * @param {Sales_OrderDeleteArgs} args - Arguments to delete one Sales_Order.
     * @example
     * // Delete one Sales_Order
     * const Sales_Order = await prisma.sales_Order.delete({
     *   where: {
     *     // ... filter to delete one Sales_Order
     *   }
     * })
     * 
     */
    delete<T extends Sales_OrderDeleteArgs>(args: SelectSubset<T, Sales_OrderDeleteArgs<ExtArgs>>): Prisma__Sales_OrderClient<$Result.GetResult<Prisma.$Sales_OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sales_Order.
     * @param {Sales_OrderUpdateArgs} args - Arguments to update one Sales_Order.
     * @example
     * // Update one Sales_Order
     * const sales_Order = await prisma.sales_Order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Sales_OrderUpdateArgs>(args: SelectSubset<T, Sales_OrderUpdateArgs<ExtArgs>>): Prisma__Sales_OrderClient<$Result.GetResult<Prisma.$Sales_OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sales_Orders.
     * @param {Sales_OrderDeleteManyArgs} args - Arguments to filter Sales_Orders to delete.
     * @example
     * // Delete a few Sales_Orders
     * const { count } = await prisma.sales_Order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Sales_OrderDeleteManyArgs>(args?: SelectSubset<T, Sales_OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales_Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sales_OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sales_Orders
     * const sales_Order = await prisma.sales_Order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Sales_OrderUpdateManyArgs>(args: SelectSubset<T, Sales_OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Sales_Order.
     * @param {Sales_OrderUpsertArgs} args - Arguments to update or create a Sales_Order.
     * @example
     * // Update or create a Sales_Order
     * const sales_Order = await prisma.sales_Order.upsert({
     *   create: {
     *     // ... data to create a Sales_Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sales_Order we want to update
     *   }
     * })
     */
    upsert<T extends Sales_OrderUpsertArgs>(args: SelectSubset<T, Sales_OrderUpsertArgs<ExtArgs>>): Prisma__Sales_OrderClient<$Result.GetResult<Prisma.$Sales_OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sales_Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sales_OrderCountArgs} args - Arguments to filter Sales_Orders to count.
     * @example
     * // Count the number of Sales_Orders
     * const count = await prisma.sales_Order.count({
     *   where: {
     *     // ... the filter for the Sales_Orders we want to count
     *   }
     * })
    **/
    count<T extends Sales_OrderCountArgs>(
      args?: Subset<T, Sales_OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Sales_OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sales_Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sales_OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Sales_OrderAggregateArgs>(args: Subset<T, Sales_OrderAggregateArgs>): Prisma.PrismaPromise<GetSales_OrderAggregateType<T>>

    /**
     * Group by Sales_Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sales_OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Sales_OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Sales_OrderGroupByArgs['orderBy'] }
        : { orderBy?: Sales_OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Sales_OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSales_OrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sales_Order model
   */
  readonly fields: Sales_OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sales_Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Sales_OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sales_Order model
   */
  interface Sales_OrderFieldRefs {
    readonly id: FieldRef<"Sales_Order", 'String'>
    readonly product_name: FieldRef<"Sales_Order", 'String'>
    readonly product_qty: FieldRef<"Sales_Order", 'Int'>
    readonly price: FieldRef<"Sales_Order", 'Int'>
    readonly customer_name: FieldRef<"Sales_Order", 'String'>
    readonly finish_date: FieldRef<"Sales_Order", 'String'>
    readonly delivery_date: FieldRef<"Sales_Order", 'String'>
    readonly createdAt: FieldRef<"Sales_Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Sales_Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Sales_Order findUnique
   */
  export type Sales_OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sales_Order
     */
    select?: Sales_OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sales_Order
     */
    omit?: Sales_OrderOmit<ExtArgs> | null
    /**
     * Filter, which Sales_Order to fetch.
     */
    where: Sales_OrderWhereUniqueInput
  }

  /**
   * Sales_Order findUniqueOrThrow
   */
  export type Sales_OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sales_Order
     */
    select?: Sales_OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sales_Order
     */
    omit?: Sales_OrderOmit<ExtArgs> | null
    /**
     * Filter, which Sales_Order to fetch.
     */
    where: Sales_OrderWhereUniqueInput
  }

  /**
   * Sales_Order findFirst
   */
  export type Sales_OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sales_Order
     */
    select?: Sales_OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sales_Order
     */
    omit?: Sales_OrderOmit<ExtArgs> | null
    /**
     * Filter, which Sales_Order to fetch.
     */
    where?: Sales_OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales_Orders to fetch.
     */
    orderBy?: Sales_OrderOrderByWithRelationInput | Sales_OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales_Orders.
     */
    cursor?: Sales_OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales_Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales_Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales_Orders.
     */
    distinct?: Sales_OrderScalarFieldEnum | Sales_OrderScalarFieldEnum[]
  }

  /**
   * Sales_Order findFirstOrThrow
   */
  export type Sales_OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sales_Order
     */
    select?: Sales_OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sales_Order
     */
    omit?: Sales_OrderOmit<ExtArgs> | null
    /**
     * Filter, which Sales_Order to fetch.
     */
    where?: Sales_OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales_Orders to fetch.
     */
    orderBy?: Sales_OrderOrderByWithRelationInput | Sales_OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales_Orders.
     */
    cursor?: Sales_OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales_Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales_Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales_Orders.
     */
    distinct?: Sales_OrderScalarFieldEnum | Sales_OrderScalarFieldEnum[]
  }

  /**
   * Sales_Order findMany
   */
  export type Sales_OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sales_Order
     */
    select?: Sales_OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sales_Order
     */
    omit?: Sales_OrderOmit<ExtArgs> | null
    /**
     * Filter, which Sales_Orders to fetch.
     */
    where?: Sales_OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales_Orders to fetch.
     */
    orderBy?: Sales_OrderOrderByWithRelationInput | Sales_OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sales_Orders.
     */
    cursor?: Sales_OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales_Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales_Orders.
     */
    skip?: number
    distinct?: Sales_OrderScalarFieldEnum | Sales_OrderScalarFieldEnum[]
  }

  /**
   * Sales_Order create
   */
  export type Sales_OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sales_Order
     */
    select?: Sales_OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sales_Order
     */
    omit?: Sales_OrderOmit<ExtArgs> | null
    /**
     * The data needed to create a Sales_Order.
     */
    data: XOR<Sales_OrderCreateInput, Sales_OrderUncheckedCreateInput>
  }

  /**
   * Sales_Order createMany
   */
  export type Sales_OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sales_Orders.
     */
    data: Sales_OrderCreateManyInput | Sales_OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sales_Order update
   */
  export type Sales_OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sales_Order
     */
    select?: Sales_OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sales_Order
     */
    omit?: Sales_OrderOmit<ExtArgs> | null
    /**
     * The data needed to update a Sales_Order.
     */
    data: XOR<Sales_OrderUpdateInput, Sales_OrderUncheckedUpdateInput>
    /**
     * Choose, which Sales_Order to update.
     */
    where: Sales_OrderWhereUniqueInput
  }

  /**
   * Sales_Order updateMany
   */
  export type Sales_OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sales_Orders.
     */
    data: XOR<Sales_OrderUpdateManyMutationInput, Sales_OrderUncheckedUpdateManyInput>
    /**
     * Filter which Sales_Orders to update
     */
    where?: Sales_OrderWhereInput
    /**
     * Limit how many Sales_Orders to update.
     */
    limit?: number
  }

  /**
   * Sales_Order upsert
   */
  export type Sales_OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sales_Order
     */
    select?: Sales_OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sales_Order
     */
    omit?: Sales_OrderOmit<ExtArgs> | null
    /**
     * The filter to search for the Sales_Order to update in case it exists.
     */
    where: Sales_OrderWhereUniqueInput
    /**
     * In case the Sales_Order found by the `where` argument doesn't exist, create a new Sales_Order with this data.
     */
    create: XOR<Sales_OrderCreateInput, Sales_OrderUncheckedCreateInput>
    /**
     * In case the Sales_Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Sales_OrderUpdateInput, Sales_OrderUncheckedUpdateInput>
  }

  /**
   * Sales_Order delete
   */
  export type Sales_OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sales_Order
     */
    select?: Sales_OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sales_Order
     */
    omit?: Sales_OrderOmit<ExtArgs> | null
    /**
     * Filter which Sales_Order to delete.
     */
    where: Sales_OrderWhereUniqueInput
  }

  /**
   * Sales_Order deleteMany
   */
  export type Sales_OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sales_Orders to delete
     */
    where?: Sales_OrderWhereInput
    /**
     * Limit how many Sales_Orders to delete.
     */
    limit?: number
  }

  /**
   * Sales_Order without action
   */
  export type Sales_OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sales_Order
     */
    select?: Sales_OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sales_Order
     */
    omit?: Sales_OrderOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Sales_OrderScalarFieldEnum: {
    id: 'id',
    product_name: 'product_name',
    product_qty: 'product_qty',
    price: 'price',
    customer_name: 'customer_name',
    finish_date: 'finish_date',
    delivery_date: 'delivery_date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Sales_OrderScalarFieldEnum = (typeof Sales_OrderScalarFieldEnum)[keyof typeof Sales_OrderScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const Sales_OrderOrderByRelevanceFieldEnum: {
    id: 'id',
    product_name: 'product_name',
    customer_name: 'customer_name',
    finish_date: 'finish_date',
    delivery_date: 'delivery_date'
  };

  export type Sales_OrderOrderByRelevanceFieldEnum = (typeof Sales_OrderOrderByRelevanceFieldEnum)[keyof typeof Sales_OrderOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type Sales_OrderWhereInput = {
    AND?: Sales_OrderWhereInput | Sales_OrderWhereInput[]
    OR?: Sales_OrderWhereInput[]
    NOT?: Sales_OrderWhereInput | Sales_OrderWhereInput[]
    id?: StringFilter<"Sales_Order"> | string
    product_name?: StringFilter<"Sales_Order"> | string
    product_qty?: IntFilter<"Sales_Order"> | number
    price?: IntFilter<"Sales_Order"> | number
    customer_name?: StringFilter<"Sales_Order"> | string
    finish_date?: StringFilter<"Sales_Order"> | string
    delivery_date?: StringFilter<"Sales_Order"> | string
    createdAt?: DateTimeFilter<"Sales_Order"> | Date | string
    updatedAt?: DateTimeFilter<"Sales_Order"> | Date | string
  }

  export type Sales_OrderOrderByWithRelationInput = {
    id?: SortOrder
    product_name?: SortOrder
    product_qty?: SortOrder
    price?: SortOrder
    customer_name?: SortOrder
    finish_date?: SortOrder
    delivery_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: Sales_OrderOrderByRelevanceInput
  }

  export type Sales_OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: Sales_OrderWhereInput | Sales_OrderWhereInput[]
    OR?: Sales_OrderWhereInput[]
    NOT?: Sales_OrderWhereInput | Sales_OrderWhereInput[]
    product_name?: StringFilter<"Sales_Order"> | string
    product_qty?: IntFilter<"Sales_Order"> | number
    price?: IntFilter<"Sales_Order"> | number
    customer_name?: StringFilter<"Sales_Order"> | string
    finish_date?: StringFilter<"Sales_Order"> | string
    delivery_date?: StringFilter<"Sales_Order"> | string
    createdAt?: DateTimeFilter<"Sales_Order"> | Date | string
    updatedAt?: DateTimeFilter<"Sales_Order"> | Date | string
  }, "id">

  export type Sales_OrderOrderByWithAggregationInput = {
    id?: SortOrder
    product_name?: SortOrder
    product_qty?: SortOrder
    price?: SortOrder
    customer_name?: SortOrder
    finish_date?: SortOrder
    delivery_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: Sales_OrderCountOrderByAggregateInput
    _avg?: Sales_OrderAvgOrderByAggregateInput
    _max?: Sales_OrderMaxOrderByAggregateInput
    _min?: Sales_OrderMinOrderByAggregateInput
    _sum?: Sales_OrderSumOrderByAggregateInput
  }

  export type Sales_OrderScalarWhereWithAggregatesInput = {
    AND?: Sales_OrderScalarWhereWithAggregatesInput | Sales_OrderScalarWhereWithAggregatesInput[]
    OR?: Sales_OrderScalarWhereWithAggregatesInput[]
    NOT?: Sales_OrderScalarWhereWithAggregatesInput | Sales_OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sales_Order"> | string
    product_name?: StringWithAggregatesFilter<"Sales_Order"> | string
    product_qty?: IntWithAggregatesFilter<"Sales_Order"> | number
    price?: IntWithAggregatesFilter<"Sales_Order"> | number
    customer_name?: StringWithAggregatesFilter<"Sales_Order"> | string
    finish_date?: StringWithAggregatesFilter<"Sales_Order"> | string
    delivery_date?: StringWithAggregatesFilter<"Sales_Order"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Sales_Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Sales_Order"> | Date | string
  }

  export type Sales_OrderCreateInput = {
    id?: string
    product_name: string
    product_qty: number
    price: number
    customer_name: string
    finish_date: string
    delivery_date: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Sales_OrderUncheckedCreateInput = {
    id?: string
    product_name: string
    product_qty: number
    price: number
    customer_name: string
    finish_date: string
    delivery_date: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Sales_OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    customer_name?: StringFieldUpdateOperationsInput | string
    finish_date?: StringFieldUpdateOperationsInput | string
    delivery_date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Sales_OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    customer_name?: StringFieldUpdateOperationsInput | string
    finish_date?: StringFieldUpdateOperationsInput | string
    delivery_date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Sales_OrderCreateManyInput = {
    id?: string
    product_name: string
    product_qty: number
    price: number
    customer_name: string
    finish_date: string
    delivery_date: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Sales_OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    customer_name?: StringFieldUpdateOperationsInput | string
    finish_date?: StringFieldUpdateOperationsInput | string
    delivery_date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Sales_OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    customer_name?: StringFieldUpdateOperationsInput | string
    finish_date?: StringFieldUpdateOperationsInput | string
    delivery_date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Sales_OrderOrderByRelevanceInput = {
    fields: Sales_OrderOrderByRelevanceFieldEnum | Sales_OrderOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type Sales_OrderCountOrderByAggregateInput = {
    id?: SortOrder
    product_name?: SortOrder
    product_qty?: SortOrder
    price?: SortOrder
    customer_name?: SortOrder
    finish_date?: SortOrder
    delivery_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Sales_OrderAvgOrderByAggregateInput = {
    product_qty?: SortOrder
    price?: SortOrder
  }

  export type Sales_OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    product_name?: SortOrder
    product_qty?: SortOrder
    price?: SortOrder
    customer_name?: SortOrder
    finish_date?: SortOrder
    delivery_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Sales_OrderMinOrderByAggregateInput = {
    id?: SortOrder
    product_name?: SortOrder
    product_qty?: SortOrder
    price?: SortOrder
    customer_name?: SortOrder
    finish_date?: SortOrder
    delivery_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Sales_OrderSumOrderByAggregateInput = {
    product_qty?: SortOrder
    price?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}