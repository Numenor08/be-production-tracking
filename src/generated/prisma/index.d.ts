
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
 * Model SPK
 * 
 */
export type SPK = $Result.DefaultSelection<Prisma.$SPKPayload>
/**
 * Model Material
 * 
 */
export type Material = $Result.DefaultSelection<Prisma.$MaterialPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ProductMaterial
 * 
 */
export type ProductMaterial = $Result.DefaultSelection<Prisma.$ProductMaterialPayload>
/**
 * Model SalesOrderProduct
 * 
 */
export type SalesOrderProduct = $Result.DefaultSelection<Prisma.$SalesOrderProductPayload>

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

  /**
   * `prisma.sPK`: Exposes CRUD operations for the **SPK** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SPKS
    * const sPKS = await prisma.sPK.findMany()
    * ```
    */
  get sPK(): Prisma.SPKDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.material`: Exposes CRUD operations for the **Material** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Materials
    * const materials = await prisma.material.findMany()
    * ```
    */
  get material(): Prisma.MaterialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productMaterial`: Exposes CRUD operations for the **ProductMaterial** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductMaterials
    * const productMaterials = await prisma.productMaterial.findMany()
    * ```
    */
  get productMaterial(): Prisma.ProductMaterialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.salesOrderProduct`: Exposes CRUD operations for the **SalesOrderProduct** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SalesOrderProducts
    * const salesOrderProducts = await prisma.salesOrderProduct.findMany()
    * ```
    */
  get salesOrderProduct(): Prisma.SalesOrderProductDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.8.1
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
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
    Sales_Order: 'Sales_Order',
    SPK: 'SPK',
    Material: 'Material',
    Product: 'Product',
    ProductMaterial: 'ProductMaterial',
    SalesOrderProduct: 'SalesOrderProduct'
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
      modelProps: "sales_Order" | "sPK" | "material" | "product" | "productMaterial" | "salesOrderProduct"
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
      SPK: {
        payload: Prisma.$SPKPayload<ExtArgs>
        fields: Prisma.SPKFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SPKFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SPKPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SPKFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SPKPayload>
          }
          findFirst: {
            args: Prisma.SPKFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SPKPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SPKFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SPKPayload>
          }
          findMany: {
            args: Prisma.SPKFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SPKPayload>[]
          }
          create: {
            args: Prisma.SPKCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SPKPayload>
          }
          createMany: {
            args: Prisma.SPKCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SPKDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SPKPayload>
          }
          update: {
            args: Prisma.SPKUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SPKPayload>
          }
          deleteMany: {
            args: Prisma.SPKDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SPKUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SPKUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SPKPayload>
          }
          aggregate: {
            args: Prisma.SPKAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSPK>
          }
          groupBy: {
            args: Prisma.SPKGroupByArgs<ExtArgs>
            result: $Utils.Optional<SPKGroupByOutputType>[]
          }
          count: {
            args: Prisma.SPKCountArgs<ExtArgs>
            result: $Utils.Optional<SPKCountAggregateOutputType> | number
          }
        }
      }
      Material: {
        payload: Prisma.$MaterialPayload<ExtArgs>
        fields: Prisma.MaterialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaterialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaterialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          findFirst: {
            args: Prisma.MaterialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaterialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          findMany: {
            args: Prisma.MaterialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>[]
          }
          create: {
            args: Prisma.MaterialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          createMany: {
            args: Prisma.MaterialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MaterialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          update: {
            args: Prisma.MaterialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          deleteMany: {
            args: Prisma.MaterialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaterialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MaterialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          aggregate: {
            args: Prisma.MaterialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaterial>
          }
          groupBy: {
            args: Prisma.MaterialGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaterialGroupByOutputType>[]
          }
          count: {
            args: Prisma.MaterialCountArgs<ExtArgs>
            result: $Utils.Optional<MaterialCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ProductMaterial: {
        payload: Prisma.$ProductMaterialPayload<ExtArgs>
        fields: Prisma.ProductMaterialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductMaterialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductMaterialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductMaterialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductMaterialPayload>
          }
          findFirst: {
            args: Prisma.ProductMaterialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductMaterialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductMaterialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductMaterialPayload>
          }
          findMany: {
            args: Prisma.ProductMaterialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductMaterialPayload>[]
          }
          create: {
            args: Prisma.ProductMaterialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductMaterialPayload>
          }
          createMany: {
            args: Prisma.ProductMaterialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductMaterialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductMaterialPayload>
          }
          update: {
            args: Prisma.ProductMaterialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductMaterialPayload>
          }
          deleteMany: {
            args: Prisma.ProductMaterialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductMaterialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductMaterialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductMaterialPayload>
          }
          aggregate: {
            args: Prisma.ProductMaterialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductMaterial>
          }
          groupBy: {
            args: Prisma.ProductMaterialGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductMaterialGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductMaterialCountArgs<ExtArgs>
            result: $Utils.Optional<ProductMaterialCountAggregateOutputType> | number
          }
        }
      }
      SalesOrderProduct: {
        payload: Prisma.$SalesOrderProductPayload<ExtArgs>
        fields: Prisma.SalesOrderProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SalesOrderProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesOrderProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SalesOrderProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesOrderProductPayload>
          }
          findFirst: {
            args: Prisma.SalesOrderProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesOrderProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SalesOrderProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesOrderProductPayload>
          }
          findMany: {
            args: Prisma.SalesOrderProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesOrderProductPayload>[]
          }
          create: {
            args: Prisma.SalesOrderProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesOrderProductPayload>
          }
          createMany: {
            args: Prisma.SalesOrderProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SalesOrderProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesOrderProductPayload>
          }
          update: {
            args: Prisma.SalesOrderProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesOrderProductPayload>
          }
          deleteMany: {
            args: Prisma.SalesOrderProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SalesOrderProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SalesOrderProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesOrderProductPayload>
          }
          aggregate: {
            args: Prisma.SalesOrderProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSalesOrderProduct>
          }
          groupBy: {
            args: Prisma.SalesOrderProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<SalesOrderProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.SalesOrderProductCountArgs<ExtArgs>
            result: $Utils.Optional<SalesOrderProductCountAggregateOutputType> | number
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
    sPK?: SPKOmit
    material?: MaterialOmit
    product?: ProductOmit
    productMaterial?: ProductMaterialOmit
    salesOrderProduct?: SalesOrderProductOmit
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
   * Count Type Sales_OrderCountOutputType
   */

  export type Sales_OrderCountOutputType = {
    products: number
  }

  export type Sales_OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Sales_OrderCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * Sales_OrderCountOutputType without action
   */
  export type Sales_OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sales_OrderCountOutputType
     */
    select?: Sales_OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Sales_OrderCountOutputType without action
   */
  export type Sales_OrderCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SalesOrderProductWhereInput
  }


  /**
   * Count Type MaterialCountOutputType
   */

  export type MaterialCountOutputType = {
    products: number
  }

  export type MaterialCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | MaterialCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * MaterialCountOutputType without action
   */
  export type MaterialCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCountOutputType
     */
    select?: MaterialCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MaterialCountOutputType without action
   */
  export type MaterialCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductMaterialWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    materials: number
    salesOrders: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    materials?: boolean | ProductCountOutputTypeCountMaterialsArgs
    salesOrders?: boolean | ProductCountOutputTypeCountSalesOrdersArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountMaterialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductMaterialWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountSalesOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SalesOrderProductWhereInput
  }


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
  }

  export type Sales_OrderSumAggregateOutputType = {
    product_qty: number | null
  }

  export type Sales_OrderMinAggregateOutputType = {
    id: string | null
    customer_name: string | null
    product_qty: number | null
    finish_date: Date | null
    delivery_date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    spkId: string | null
  }

  export type Sales_OrderMaxAggregateOutputType = {
    id: string | null
    customer_name: string | null
    product_qty: number | null
    finish_date: Date | null
    delivery_date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    spkId: string | null
  }

  export type Sales_OrderCountAggregateOutputType = {
    id: number
    customer_name: number
    product_qty: number
    finish_date: number
    delivery_date: number
    createdAt: number
    updatedAt: number
    spkId: number
    _all: number
  }


  export type Sales_OrderAvgAggregateInputType = {
    product_qty?: true
  }

  export type Sales_OrderSumAggregateInputType = {
    product_qty?: true
  }

  export type Sales_OrderMinAggregateInputType = {
    id?: true
    customer_name?: true
    product_qty?: true
    finish_date?: true
    delivery_date?: true
    createdAt?: true
    updatedAt?: true
    spkId?: true
  }

  export type Sales_OrderMaxAggregateInputType = {
    id?: true
    customer_name?: true
    product_qty?: true
    finish_date?: true
    delivery_date?: true
    createdAt?: true
    updatedAt?: true
    spkId?: true
  }

  export type Sales_OrderCountAggregateInputType = {
    id?: true
    customer_name?: true
    product_qty?: true
    finish_date?: true
    delivery_date?: true
    createdAt?: true
    updatedAt?: true
    spkId?: true
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
    customer_name: string
    product_qty: number
    finish_date: Date
    delivery_date: Date
    createdAt: Date
    updatedAt: Date
    spkId: string | null
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
    customer_name?: boolean
    product_qty?: boolean
    finish_date?: boolean
    delivery_date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    spkId?: boolean
    products?: boolean | Sales_Order$productsArgs<ExtArgs>
    spk?: boolean | Sales_Order$spkArgs<ExtArgs>
    _count?: boolean | Sales_OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sales_Order"]>



  export type Sales_OrderSelectScalar = {
    id?: boolean
    customer_name?: boolean
    product_qty?: boolean
    finish_date?: boolean
    delivery_date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    spkId?: boolean
  }

  export type Sales_OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customer_name" | "product_qty" | "finish_date" | "delivery_date" | "createdAt" | "updatedAt" | "spkId", ExtArgs["result"]["sales_Order"]>
  export type Sales_OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Sales_Order$productsArgs<ExtArgs>
    spk?: boolean | Sales_Order$spkArgs<ExtArgs>
    _count?: boolean | Sales_OrderCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $Sales_OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sales_Order"
    objects: {
      products: Prisma.$SalesOrderProductPayload<ExtArgs>[]
      spk: Prisma.$SPKPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customer_name: string
      product_qty: number
      finish_date: Date
      delivery_date: Date
      createdAt: Date
      updatedAt: Date
      spkId: string | null
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
    products<T extends Sales_Order$productsArgs<ExtArgs> = {}>(args?: Subset<T, Sales_Order$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalesOrderProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    spk<T extends Sales_Order$spkArgs<ExtArgs> = {}>(args?: Subset<T, Sales_Order$spkArgs<ExtArgs>>): Prisma__SPKClient<$Result.GetResult<Prisma.$SPKPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
    readonly customer_name: FieldRef<"Sales_Order", 'String'>
    readonly product_qty: FieldRef<"Sales_Order", 'Int'>
    readonly finish_date: FieldRef<"Sales_Order", 'DateTime'>
    readonly delivery_date: FieldRef<"Sales_Order", 'DateTime'>
    readonly createdAt: FieldRef<"Sales_Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Sales_Order", 'DateTime'>
    readonly spkId: FieldRef<"Sales_Order", 'String'>
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
     * Choose, which related nodes to fetch as well
     */
    include?: Sales_OrderInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: Sales_OrderInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: Sales_OrderInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: Sales_OrderInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: Sales_OrderInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: Sales_OrderInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: Sales_OrderInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: Sales_OrderInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: Sales_OrderInclude<ExtArgs> | null
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
   * Sales_Order.products
   */
  export type Sales_Order$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesOrderProduct
     */
    select?: SalesOrderProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesOrderProduct
     */
    omit?: SalesOrderProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesOrderProductInclude<ExtArgs> | null
    where?: SalesOrderProductWhereInput
    orderBy?: SalesOrderProductOrderByWithRelationInput | SalesOrderProductOrderByWithRelationInput[]
    cursor?: SalesOrderProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SalesOrderProductScalarFieldEnum | SalesOrderProductScalarFieldEnum[]
  }

  /**
   * Sales_Order.spk
   */
  export type Sales_Order$spkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPK
     */
    select?: SPKSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SPK
     */
    omit?: SPKOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SPKInclude<ExtArgs> | null
    where?: SPKWhereInput
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Sales_OrderInclude<ExtArgs> | null
  }


  /**
   * Model SPK
   */

  export type AggregateSPK = {
    _count: SPKCountAggregateOutputType | null
    _min: SPKMinAggregateOutputType | null
    _max: SPKMaxAggregateOutputType | null
  }

  export type SPKMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SPKMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SPKCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SPKMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SPKMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SPKCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SPKAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SPK to aggregate.
     */
    where?: SPKWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SPKS to fetch.
     */
    orderBy?: SPKOrderByWithRelationInput | SPKOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SPKWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SPKS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SPKS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SPKS
    **/
    _count?: true | SPKCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SPKMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SPKMaxAggregateInputType
  }

  export type GetSPKAggregateType<T extends SPKAggregateArgs> = {
        [P in keyof T & keyof AggregateSPK]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSPK[P]>
      : GetScalarType<T[P], AggregateSPK[P]>
  }




  export type SPKGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SPKWhereInput
    orderBy?: SPKOrderByWithAggregationInput | SPKOrderByWithAggregationInput[]
    by: SPKScalarFieldEnum[] | SPKScalarFieldEnum
    having?: SPKScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SPKCountAggregateInputType | true
    _min?: SPKMinAggregateInputType
    _max?: SPKMaxAggregateInputType
  }

  export type SPKGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    _count: SPKCountAggregateOutputType | null
    _min: SPKMinAggregateOutputType | null
    _max: SPKMaxAggregateOutputType | null
  }

  type GetSPKGroupByPayload<T extends SPKGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SPKGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SPKGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SPKGroupByOutputType[P]>
            : GetScalarType<T[P], SPKGroupByOutputType[P]>
        }
      >
    >


  export type SPKSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Sales_Order?: boolean | SPK$Sales_OrderArgs<ExtArgs>
  }, ExtArgs["result"]["sPK"]>



  export type SPKSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SPKOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt", ExtArgs["result"]["sPK"]>
  export type SPKInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Sales_Order?: boolean | SPK$Sales_OrderArgs<ExtArgs>
  }

  export type $SPKPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SPK"
    objects: {
      Sales_Order: Prisma.$Sales_OrderPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sPK"]>
    composites: {}
  }

  type SPKGetPayload<S extends boolean | null | undefined | SPKDefaultArgs> = $Result.GetResult<Prisma.$SPKPayload, S>

  type SPKCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SPKFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SPKCountAggregateInputType | true
    }

  export interface SPKDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SPK'], meta: { name: 'SPK' } }
    /**
     * Find zero or one SPK that matches the filter.
     * @param {SPKFindUniqueArgs} args - Arguments to find a SPK
     * @example
     * // Get one SPK
     * const sPK = await prisma.sPK.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SPKFindUniqueArgs>(args: SelectSubset<T, SPKFindUniqueArgs<ExtArgs>>): Prisma__SPKClient<$Result.GetResult<Prisma.$SPKPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SPK that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SPKFindUniqueOrThrowArgs} args - Arguments to find a SPK
     * @example
     * // Get one SPK
     * const sPK = await prisma.sPK.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SPKFindUniqueOrThrowArgs>(args: SelectSubset<T, SPKFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SPKClient<$Result.GetResult<Prisma.$SPKPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SPK that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SPKFindFirstArgs} args - Arguments to find a SPK
     * @example
     * // Get one SPK
     * const sPK = await prisma.sPK.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SPKFindFirstArgs>(args?: SelectSubset<T, SPKFindFirstArgs<ExtArgs>>): Prisma__SPKClient<$Result.GetResult<Prisma.$SPKPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SPK that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SPKFindFirstOrThrowArgs} args - Arguments to find a SPK
     * @example
     * // Get one SPK
     * const sPK = await prisma.sPK.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SPKFindFirstOrThrowArgs>(args?: SelectSubset<T, SPKFindFirstOrThrowArgs<ExtArgs>>): Prisma__SPKClient<$Result.GetResult<Prisma.$SPKPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SPKS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SPKFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SPKS
     * const sPKS = await prisma.sPK.findMany()
     * 
     * // Get first 10 SPKS
     * const sPKS = await prisma.sPK.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sPKWithIdOnly = await prisma.sPK.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SPKFindManyArgs>(args?: SelectSubset<T, SPKFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SPKPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SPK.
     * @param {SPKCreateArgs} args - Arguments to create a SPK.
     * @example
     * // Create one SPK
     * const SPK = await prisma.sPK.create({
     *   data: {
     *     // ... data to create a SPK
     *   }
     * })
     * 
     */
    create<T extends SPKCreateArgs>(args: SelectSubset<T, SPKCreateArgs<ExtArgs>>): Prisma__SPKClient<$Result.GetResult<Prisma.$SPKPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SPKS.
     * @param {SPKCreateManyArgs} args - Arguments to create many SPKS.
     * @example
     * // Create many SPKS
     * const sPK = await prisma.sPK.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SPKCreateManyArgs>(args?: SelectSubset<T, SPKCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SPK.
     * @param {SPKDeleteArgs} args - Arguments to delete one SPK.
     * @example
     * // Delete one SPK
     * const SPK = await prisma.sPK.delete({
     *   where: {
     *     // ... filter to delete one SPK
     *   }
     * })
     * 
     */
    delete<T extends SPKDeleteArgs>(args: SelectSubset<T, SPKDeleteArgs<ExtArgs>>): Prisma__SPKClient<$Result.GetResult<Prisma.$SPKPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SPK.
     * @param {SPKUpdateArgs} args - Arguments to update one SPK.
     * @example
     * // Update one SPK
     * const sPK = await prisma.sPK.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SPKUpdateArgs>(args: SelectSubset<T, SPKUpdateArgs<ExtArgs>>): Prisma__SPKClient<$Result.GetResult<Prisma.$SPKPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SPKS.
     * @param {SPKDeleteManyArgs} args - Arguments to filter SPKS to delete.
     * @example
     * // Delete a few SPKS
     * const { count } = await prisma.sPK.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SPKDeleteManyArgs>(args?: SelectSubset<T, SPKDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SPKS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SPKUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SPKS
     * const sPK = await prisma.sPK.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SPKUpdateManyArgs>(args: SelectSubset<T, SPKUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SPK.
     * @param {SPKUpsertArgs} args - Arguments to update or create a SPK.
     * @example
     * // Update or create a SPK
     * const sPK = await prisma.sPK.upsert({
     *   create: {
     *     // ... data to create a SPK
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SPK we want to update
     *   }
     * })
     */
    upsert<T extends SPKUpsertArgs>(args: SelectSubset<T, SPKUpsertArgs<ExtArgs>>): Prisma__SPKClient<$Result.GetResult<Prisma.$SPKPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SPKS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SPKCountArgs} args - Arguments to filter SPKS to count.
     * @example
     * // Count the number of SPKS
     * const count = await prisma.sPK.count({
     *   where: {
     *     // ... the filter for the SPKS we want to count
     *   }
     * })
    **/
    count<T extends SPKCountArgs>(
      args?: Subset<T, SPKCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SPKCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SPK.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SPKAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SPKAggregateArgs>(args: Subset<T, SPKAggregateArgs>): Prisma.PrismaPromise<GetSPKAggregateType<T>>

    /**
     * Group by SPK.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SPKGroupByArgs} args - Group by arguments.
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
      T extends SPKGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SPKGroupByArgs['orderBy'] }
        : { orderBy?: SPKGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SPKGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSPKGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SPK model
   */
  readonly fields: SPKFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SPK.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SPKClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Sales_Order<T extends SPK$Sales_OrderArgs<ExtArgs> = {}>(args?: Subset<T, SPK$Sales_OrderArgs<ExtArgs>>): Prisma__Sales_OrderClient<$Result.GetResult<Prisma.$Sales_OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SPK model
   */
  interface SPKFieldRefs {
    readonly id: FieldRef<"SPK", 'String'>
    readonly createdAt: FieldRef<"SPK", 'DateTime'>
    readonly updatedAt: FieldRef<"SPK", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SPK findUnique
   */
  export type SPKFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPK
     */
    select?: SPKSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SPK
     */
    omit?: SPKOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SPKInclude<ExtArgs> | null
    /**
     * Filter, which SPK to fetch.
     */
    where: SPKWhereUniqueInput
  }

  /**
   * SPK findUniqueOrThrow
   */
  export type SPKFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPK
     */
    select?: SPKSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SPK
     */
    omit?: SPKOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SPKInclude<ExtArgs> | null
    /**
     * Filter, which SPK to fetch.
     */
    where: SPKWhereUniqueInput
  }

  /**
   * SPK findFirst
   */
  export type SPKFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPK
     */
    select?: SPKSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SPK
     */
    omit?: SPKOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SPKInclude<ExtArgs> | null
    /**
     * Filter, which SPK to fetch.
     */
    where?: SPKWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SPKS to fetch.
     */
    orderBy?: SPKOrderByWithRelationInput | SPKOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SPKS.
     */
    cursor?: SPKWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SPKS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SPKS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SPKS.
     */
    distinct?: SPKScalarFieldEnum | SPKScalarFieldEnum[]
  }

  /**
   * SPK findFirstOrThrow
   */
  export type SPKFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPK
     */
    select?: SPKSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SPK
     */
    omit?: SPKOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SPKInclude<ExtArgs> | null
    /**
     * Filter, which SPK to fetch.
     */
    where?: SPKWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SPKS to fetch.
     */
    orderBy?: SPKOrderByWithRelationInput | SPKOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SPKS.
     */
    cursor?: SPKWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SPKS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SPKS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SPKS.
     */
    distinct?: SPKScalarFieldEnum | SPKScalarFieldEnum[]
  }

  /**
   * SPK findMany
   */
  export type SPKFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPK
     */
    select?: SPKSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SPK
     */
    omit?: SPKOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SPKInclude<ExtArgs> | null
    /**
     * Filter, which SPKS to fetch.
     */
    where?: SPKWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SPKS to fetch.
     */
    orderBy?: SPKOrderByWithRelationInput | SPKOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SPKS.
     */
    cursor?: SPKWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SPKS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SPKS.
     */
    skip?: number
    distinct?: SPKScalarFieldEnum | SPKScalarFieldEnum[]
  }

  /**
   * SPK create
   */
  export type SPKCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPK
     */
    select?: SPKSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SPK
     */
    omit?: SPKOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SPKInclude<ExtArgs> | null
    /**
     * The data needed to create a SPK.
     */
    data: XOR<SPKCreateInput, SPKUncheckedCreateInput>
  }

  /**
   * SPK createMany
   */
  export type SPKCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SPKS.
     */
    data: SPKCreateManyInput | SPKCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SPK update
   */
  export type SPKUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPK
     */
    select?: SPKSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SPK
     */
    omit?: SPKOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SPKInclude<ExtArgs> | null
    /**
     * The data needed to update a SPK.
     */
    data: XOR<SPKUpdateInput, SPKUncheckedUpdateInput>
    /**
     * Choose, which SPK to update.
     */
    where: SPKWhereUniqueInput
  }

  /**
   * SPK updateMany
   */
  export type SPKUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SPKS.
     */
    data: XOR<SPKUpdateManyMutationInput, SPKUncheckedUpdateManyInput>
    /**
     * Filter which SPKS to update
     */
    where?: SPKWhereInput
    /**
     * Limit how many SPKS to update.
     */
    limit?: number
  }

  /**
   * SPK upsert
   */
  export type SPKUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPK
     */
    select?: SPKSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SPK
     */
    omit?: SPKOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SPKInclude<ExtArgs> | null
    /**
     * The filter to search for the SPK to update in case it exists.
     */
    where: SPKWhereUniqueInput
    /**
     * In case the SPK found by the `where` argument doesn't exist, create a new SPK with this data.
     */
    create: XOR<SPKCreateInput, SPKUncheckedCreateInput>
    /**
     * In case the SPK was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SPKUpdateInput, SPKUncheckedUpdateInput>
  }

  /**
   * SPK delete
   */
  export type SPKDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPK
     */
    select?: SPKSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SPK
     */
    omit?: SPKOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SPKInclude<ExtArgs> | null
    /**
     * Filter which SPK to delete.
     */
    where: SPKWhereUniqueInput
  }

  /**
   * SPK deleteMany
   */
  export type SPKDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SPKS to delete
     */
    where?: SPKWhereInput
    /**
     * Limit how many SPKS to delete.
     */
    limit?: number
  }

  /**
   * SPK.Sales_Order
   */
  export type SPK$Sales_OrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sales_Order
     */
    select?: Sales_OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sales_Order
     */
    omit?: Sales_OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Sales_OrderInclude<ExtArgs> | null
    where?: Sales_OrderWhereInput
  }

  /**
   * SPK without action
   */
  export type SPKDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPK
     */
    select?: SPKSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SPK
     */
    omit?: SPKOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SPKInclude<ExtArgs> | null
  }


  /**
   * Model Material
   */

  export type AggregateMaterial = {
    _count: MaterialCountAggregateOutputType | null
    _avg: MaterialAvgAggregateOutputType | null
    _sum: MaterialSumAggregateOutputType | null
    _min: MaterialMinAggregateOutputType | null
    _max: MaterialMaxAggregateOutputType | null
  }

  export type MaterialAvgAggregateOutputType = {
    price: number | null
    stock: number | null
  }

  export type MaterialSumAggregateOutputType = {
    price: number | null
    stock: number | null
  }

  export type MaterialMinAggregateOutputType = {
    id: string | null
    material_name: string | null
    price: number | null
    stock: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MaterialMaxAggregateOutputType = {
    id: string | null
    material_name: string | null
    price: number | null
    stock: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MaterialCountAggregateOutputType = {
    id: number
    material_name: number
    price: number
    stock: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MaterialAvgAggregateInputType = {
    price?: true
    stock?: true
  }

  export type MaterialSumAggregateInputType = {
    price?: true
    stock?: true
  }

  export type MaterialMinAggregateInputType = {
    id?: true
    material_name?: true
    price?: true
    stock?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MaterialMaxAggregateInputType = {
    id?: true
    material_name?: true
    price?: true
    stock?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MaterialCountAggregateInputType = {
    id?: true
    material_name?: true
    price?: true
    stock?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MaterialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Material to aggregate.
     */
    where?: MaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materials to fetch.
     */
    orderBy?: MaterialOrderByWithRelationInput | MaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Materials
    **/
    _count?: true | MaterialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MaterialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MaterialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaterialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaterialMaxAggregateInputType
  }

  export type GetMaterialAggregateType<T extends MaterialAggregateArgs> = {
        [P in keyof T & keyof AggregateMaterial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaterial[P]>
      : GetScalarType<T[P], AggregateMaterial[P]>
  }




  export type MaterialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialWhereInput
    orderBy?: MaterialOrderByWithAggregationInput | MaterialOrderByWithAggregationInput[]
    by: MaterialScalarFieldEnum[] | MaterialScalarFieldEnum
    having?: MaterialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaterialCountAggregateInputType | true
    _avg?: MaterialAvgAggregateInputType
    _sum?: MaterialSumAggregateInputType
    _min?: MaterialMinAggregateInputType
    _max?: MaterialMaxAggregateInputType
  }

  export type MaterialGroupByOutputType = {
    id: string
    material_name: string
    price: number
    stock: number
    createdAt: Date
    updatedAt: Date
    _count: MaterialCountAggregateOutputType | null
    _avg: MaterialAvgAggregateOutputType | null
    _sum: MaterialSumAggregateOutputType | null
    _min: MaterialMinAggregateOutputType | null
    _max: MaterialMaxAggregateOutputType | null
  }

  type GetMaterialGroupByPayload<T extends MaterialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaterialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaterialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaterialGroupByOutputType[P]>
            : GetScalarType<T[P], MaterialGroupByOutputType[P]>
        }
      >
    >


  export type MaterialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    material_name?: boolean
    price?: boolean
    stock?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    products?: boolean | Material$productsArgs<ExtArgs>
    _count?: boolean | MaterialCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["material"]>



  export type MaterialSelectScalar = {
    id?: boolean
    material_name?: boolean
    price?: boolean
    stock?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MaterialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "material_name" | "price" | "stock" | "createdAt" | "updatedAt", ExtArgs["result"]["material"]>
  export type MaterialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Material$productsArgs<ExtArgs>
    _count?: boolean | MaterialCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MaterialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Material"
    objects: {
      products: Prisma.$ProductMaterialPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      material_name: string
      price: number
      stock: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["material"]>
    composites: {}
  }

  type MaterialGetPayload<S extends boolean | null | undefined | MaterialDefaultArgs> = $Result.GetResult<Prisma.$MaterialPayload, S>

  type MaterialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MaterialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MaterialCountAggregateInputType | true
    }

  export interface MaterialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Material'], meta: { name: 'Material' } }
    /**
     * Find zero or one Material that matches the filter.
     * @param {MaterialFindUniqueArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaterialFindUniqueArgs>(args: SelectSubset<T, MaterialFindUniqueArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Material that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaterialFindUniqueOrThrowArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaterialFindUniqueOrThrowArgs>(args: SelectSubset<T, MaterialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Material that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialFindFirstArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaterialFindFirstArgs>(args?: SelectSubset<T, MaterialFindFirstArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Material that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialFindFirstOrThrowArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaterialFindFirstOrThrowArgs>(args?: SelectSubset<T, MaterialFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Materials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Materials
     * const materials = await prisma.material.findMany()
     * 
     * // Get first 10 Materials
     * const materials = await prisma.material.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const materialWithIdOnly = await prisma.material.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MaterialFindManyArgs>(args?: SelectSubset<T, MaterialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Material.
     * @param {MaterialCreateArgs} args - Arguments to create a Material.
     * @example
     * // Create one Material
     * const Material = await prisma.material.create({
     *   data: {
     *     // ... data to create a Material
     *   }
     * })
     * 
     */
    create<T extends MaterialCreateArgs>(args: SelectSubset<T, MaterialCreateArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Materials.
     * @param {MaterialCreateManyArgs} args - Arguments to create many Materials.
     * @example
     * // Create many Materials
     * const material = await prisma.material.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaterialCreateManyArgs>(args?: SelectSubset<T, MaterialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Material.
     * @param {MaterialDeleteArgs} args - Arguments to delete one Material.
     * @example
     * // Delete one Material
     * const Material = await prisma.material.delete({
     *   where: {
     *     // ... filter to delete one Material
     *   }
     * })
     * 
     */
    delete<T extends MaterialDeleteArgs>(args: SelectSubset<T, MaterialDeleteArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Material.
     * @param {MaterialUpdateArgs} args - Arguments to update one Material.
     * @example
     * // Update one Material
     * const material = await prisma.material.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaterialUpdateArgs>(args: SelectSubset<T, MaterialUpdateArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Materials.
     * @param {MaterialDeleteManyArgs} args - Arguments to filter Materials to delete.
     * @example
     * // Delete a few Materials
     * const { count } = await prisma.material.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaterialDeleteManyArgs>(args?: SelectSubset<T, MaterialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Materials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Materials
     * const material = await prisma.material.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaterialUpdateManyArgs>(args: SelectSubset<T, MaterialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Material.
     * @param {MaterialUpsertArgs} args - Arguments to update or create a Material.
     * @example
     * // Update or create a Material
     * const material = await prisma.material.upsert({
     *   create: {
     *     // ... data to create a Material
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Material we want to update
     *   }
     * })
     */
    upsert<T extends MaterialUpsertArgs>(args: SelectSubset<T, MaterialUpsertArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Materials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialCountArgs} args - Arguments to filter Materials to count.
     * @example
     * // Count the number of Materials
     * const count = await prisma.material.count({
     *   where: {
     *     // ... the filter for the Materials we want to count
     *   }
     * })
    **/
    count<T extends MaterialCountArgs>(
      args?: Subset<T, MaterialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaterialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Material.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MaterialAggregateArgs>(args: Subset<T, MaterialAggregateArgs>): Prisma.PrismaPromise<GetMaterialAggregateType<T>>

    /**
     * Group by Material.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialGroupByArgs} args - Group by arguments.
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
      T extends MaterialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaterialGroupByArgs['orderBy'] }
        : { orderBy?: MaterialGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MaterialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Material model
   */
  readonly fields: MaterialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Material.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaterialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Material$productsArgs<ExtArgs> = {}>(args?: Subset<T, Material$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductMaterialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Material model
   */
  interface MaterialFieldRefs {
    readonly id: FieldRef<"Material", 'String'>
    readonly material_name: FieldRef<"Material", 'String'>
    readonly price: FieldRef<"Material", 'Int'>
    readonly stock: FieldRef<"Material", 'Int'>
    readonly createdAt: FieldRef<"Material", 'DateTime'>
    readonly updatedAt: FieldRef<"Material", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Material findUnique
   */
  export type MaterialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * Filter, which Material to fetch.
     */
    where: MaterialWhereUniqueInput
  }

  /**
   * Material findUniqueOrThrow
   */
  export type MaterialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * Filter, which Material to fetch.
     */
    where: MaterialWhereUniqueInput
  }

  /**
   * Material findFirst
   */
  export type MaterialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * Filter, which Material to fetch.
     */
    where?: MaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materials to fetch.
     */
    orderBy?: MaterialOrderByWithRelationInput | MaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Materials.
     */
    cursor?: MaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Materials.
     */
    distinct?: MaterialScalarFieldEnum | MaterialScalarFieldEnum[]
  }

  /**
   * Material findFirstOrThrow
   */
  export type MaterialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * Filter, which Material to fetch.
     */
    where?: MaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materials to fetch.
     */
    orderBy?: MaterialOrderByWithRelationInput | MaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Materials.
     */
    cursor?: MaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Materials.
     */
    distinct?: MaterialScalarFieldEnum | MaterialScalarFieldEnum[]
  }

  /**
   * Material findMany
   */
  export type MaterialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * Filter, which Materials to fetch.
     */
    where?: MaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materials to fetch.
     */
    orderBy?: MaterialOrderByWithRelationInput | MaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Materials.
     */
    cursor?: MaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materials.
     */
    skip?: number
    distinct?: MaterialScalarFieldEnum | MaterialScalarFieldEnum[]
  }

  /**
   * Material create
   */
  export type MaterialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * The data needed to create a Material.
     */
    data: XOR<MaterialCreateInput, MaterialUncheckedCreateInput>
  }

  /**
   * Material createMany
   */
  export type MaterialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Materials.
     */
    data: MaterialCreateManyInput | MaterialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Material update
   */
  export type MaterialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * The data needed to update a Material.
     */
    data: XOR<MaterialUpdateInput, MaterialUncheckedUpdateInput>
    /**
     * Choose, which Material to update.
     */
    where: MaterialWhereUniqueInput
  }

  /**
   * Material updateMany
   */
  export type MaterialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Materials.
     */
    data: XOR<MaterialUpdateManyMutationInput, MaterialUncheckedUpdateManyInput>
    /**
     * Filter which Materials to update
     */
    where?: MaterialWhereInput
    /**
     * Limit how many Materials to update.
     */
    limit?: number
  }

  /**
   * Material upsert
   */
  export type MaterialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * The filter to search for the Material to update in case it exists.
     */
    where: MaterialWhereUniqueInput
    /**
     * In case the Material found by the `where` argument doesn't exist, create a new Material with this data.
     */
    create: XOR<MaterialCreateInput, MaterialUncheckedCreateInput>
    /**
     * In case the Material was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaterialUpdateInput, MaterialUncheckedUpdateInput>
  }

  /**
   * Material delete
   */
  export type MaterialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * Filter which Material to delete.
     */
    where: MaterialWhereUniqueInput
  }

  /**
   * Material deleteMany
   */
  export type MaterialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Materials to delete
     */
    where?: MaterialWhereInput
    /**
     * Limit how many Materials to delete.
     */
    limit?: number
  }

  /**
   * Material.products
   */
  export type Material$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductMaterial
     */
    select?: ProductMaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductMaterial
     */
    omit?: ProductMaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductMaterialInclude<ExtArgs> | null
    where?: ProductMaterialWhereInput
    orderBy?: ProductMaterialOrderByWithRelationInput | ProductMaterialOrderByWithRelationInput[]
    cursor?: ProductMaterialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductMaterialScalarFieldEnum | ProductMaterialScalarFieldEnum[]
  }

  /**
   * Material without action
   */
  export type MaterialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    product_name: string | null
    price: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    product_name: string | null
    price: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    product_name: number
    price: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    product_name?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    product_name?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    product_name?: true
    price?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    product_name: string
    price: number
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    product_name?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    materials?: boolean | Product$materialsArgs<ExtArgs>
    salesOrders?: boolean | Product$salesOrdersArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>



  export type ProductSelectScalar = {
    id?: boolean
    product_name?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "product_name" | "price" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    materials?: boolean | Product$materialsArgs<ExtArgs>
    salesOrders?: boolean | Product$salesOrdersArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      materials: Prisma.$ProductMaterialPayload<ExtArgs>[]
      salesOrders: Prisma.$SalesOrderProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      product_name: string
      price: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
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
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    materials<T extends Product$materialsArgs<ExtArgs> = {}>(args?: Subset<T, Product$materialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductMaterialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    salesOrders<T extends Product$salesOrdersArgs<ExtArgs> = {}>(args?: Subset<T, Product$salesOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalesOrderProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly product_name: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Int'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.materials
   */
  export type Product$materialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductMaterial
     */
    select?: ProductMaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductMaterial
     */
    omit?: ProductMaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductMaterialInclude<ExtArgs> | null
    where?: ProductMaterialWhereInput
    orderBy?: ProductMaterialOrderByWithRelationInput | ProductMaterialOrderByWithRelationInput[]
    cursor?: ProductMaterialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductMaterialScalarFieldEnum | ProductMaterialScalarFieldEnum[]
  }

  /**
   * Product.salesOrders
   */
  export type Product$salesOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesOrderProduct
     */
    select?: SalesOrderProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesOrderProduct
     */
    omit?: SalesOrderProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesOrderProductInclude<ExtArgs> | null
    where?: SalesOrderProductWhereInput
    orderBy?: SalesOrderProductOrderByWithRelationInput | SalesOrderProductOrderByWithRelationInput[]
    cursor?: SalesOrderProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SalesOrderProductScalarFieldEnum | SalesOrderProductScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ProductMaterial
   */

  export type AggregateProductMaterial = {
    _count: ProductMaterialCountAggregateOutputType | null
    _avg: ProductMaterialAvgAggregateOutputType | null
    _sum: ProductMaterialSumAggregateOutputType | null
    _min: ProductMaterialMinAggregateOutputType | null
    _max: ProductMaterialMaxAggregateOutputType | null
  }

  export type ProductMaterialAvgAggregateOutputType = {
    stock_needed: number | null
  }

  export type ProductMaterialSumAggregateOutputType = {
    stock_needed: number | null
  }

  export type ProductMaterialMinAggregateOutputType = {
    id: string | null
    productId: string | null
    materialId: string | null
    stock_needed: number | null
  }

  export type ProductMaterialMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    materialId: string | null
    stock_needed: number | null
  }

  export type ProductMaterialCountAggregateOutputType = {
    id: number
    productId: number
    materialId: number
    stock_needed: number
    _all: number
  }


  export type ProductMaterialAvgAggregateInputType = {
    stock_needed?: true
  }

  export type ProductMaterialSumAggregateInputType = {
    stock_needed?: true
  }

  export type ProductMaterialMinAggregateInputType = {
    id?: true
    productId?: true
    materialId?: true
    stock_needed?: true
  }

  export type ProductMaterialMaxAggregateInputType = {
    id?: true
    productId?: true
    materialId?: true
    stock_needed?: true
  }

  export type ProductMaterialCountAggregateInputType = {
    id?: true
    productId?: true
    materialId?: true
    stock_needed?: true
    _all?: true
  }

  export type ProductMaterialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductMaterial to aggregate.
     */
    where?: ProductMaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductMaterials to fetch.
     */
    orderBy?: ProductMaterialOrderByWithRelationInput | ProductMaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductMaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductMaterials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductMaterials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductMaterials
    **/
    _count?: true | ProductMaterialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductMaterialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductMaterialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMaterialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaterialMaxAggregateInputType
  }

  export type GetProductMaterialAggregateType<T extends ProductMaterialAggregateArgs> = {
        [P in keyof T & keyof AggregateProductMaterial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductMaterial[P]>
      : GetScalarType<T[P], AggregateProductMaterial[P]>
  }




  export type ProductMaterialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductMaterialWhereInput
    orderBy?: ProductMaterialOrderByWithAggregationInput | ProductMaterialOrderByWithAggregationInput[]
    by: ProductMaterialScalarFieldEnum[] | ProductMaterialScalarFieldEnum
    having?: ProductMaterialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductMaterialCountAggregateInputType | true
    _avg?: ProductMaterialAvgAggregateInputType
    _sum?: ProductMaterialSumAggregateInputType
    _min?: ProductMaterialMinAggregateInputType
    _max?: ProductMaterialMaxAggregateInputType
  }

  export type ProductMaterialGroupByOutputType = {
    id: string
    productId: string
    materialId: string
    stock_needed: number
    _count: ProductMaterialCountAggregateOutputType | null
    _avg: ProductMaterialAvgAggregateOutputType | null
    _sum: ProductMaterialSumAggregateOutputType | null
    _min: ProductMaterialMinAggregateOutputType | null
    _max: ProductMaterialMaxAggregateOutputType | null
  }

  type GetProductMaterialGroupByPayload<T extends ProductMaterialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductMaterialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductMaterialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductMaterialGroupByOutputType[P]>
            : GetScalarType<T[P], ProductMaterialGroupByOutputType[P]>
        }
      >
    >


  export type ProductMaterialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    materialId?: boolean
    stock_needed?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    material?: boolean | MaterialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productMaterial"]>



  export type ProductMaterialSelectScalar = {
    id?: boolean
    productId?: boolean
    materialId?: boolean
    stock_needed?: boolean
  }

  export type ProductMaterialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "materialId" | "stock_needed", ExtArgs["result"]["productMaterial"]>
  export type ProductMaterialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    material?: boolean | MaterialDefaultArgs<ExtArgs>
  }

  export type $ProductMaterialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductMaterial"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      material: Prisma.$MaterialPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      materialId: string
      stock_needed: number
    }, ExtArgs["result"]["productMaterial"]>
    composites: {}
  }

  type ProductMaterialGetPayload<S extends boolean | null | undefined | ProductMaterialDefaultArgs> = $Result.GetResult<Prisma.$ProductMaterialPayload, S>

  type ProductMaterialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductMaterialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductMaterialCountAggregateInputType | true
    }

  export interface ProductMaterialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductMaterial'], meta: { name: 'ProductMaterial' } }
    /**
     * Find zero or one ProductMaterial that matches the filter.
     * @param {ProductMaterialFindUniqueArgs} args - Arguments to find a ProductMaterial
     * @example
     * // Get one ProductMaterial
     * const productMaterial = await prisma.productMaterial.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductMaterialFindUniqueArgs>(args: SelectSubset<T, ProductMaterialFindUniqueArgs<ExtArgs>>): Prisma__ProductMaterialClient<$Result.GetResult<Prisma.$ProductMaterialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductMaterial that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductMaterialFindUniqueOrThrowArgs} args - Arguments to find a ProductMaterial
     * @example
     * // Get one ProductMaterial
     * const productMaterial = await prisma.productMaterial.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductMaterialFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductMaterialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductMaterialClient<$Result.GetResult<Prisma.$ProductMaterialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductMaterial that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductMaterialFindFirstArgs} args - Arguments to find a ProductMaterial
     * @example
     * // Get one ProductMaterial
     * const productMaterial = await prisma.productMaterial.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductMaterialFindFirstArgs>(args?: SelectSubset<T, ProductMaterialFindFirstArgs<ExtArgs>>): Prisma__ProductMaterialClient<$Result.GetResult<Prisma.$ProductMaterialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductMaterial that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductMaterialFindFirstOrThrowArgs} args - Arguments to find a ProductMaterial
     * @example
     * // Get one ProductMaterial
     * const productMaterial = await prisma.productMaterial.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductMaterialFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductMaterialFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductMaterialClient<$Result.GetResult<Prisma.$ProductMaterialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductMaterials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductMaterialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductMaterials
     * const productMaterials = await prisma.productMaterial.findMany()
     * 
     * // Get first 10 ProductMaterials
     * const productMaterials = await prisma.productMaterial.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productMaterialWithIdOnly = await prisma.productMaterial.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductMaterialFindManyArgs>(args?: SelectSubset<T, ProductMaterialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductMaterialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductMaterial.
     * @param {ProductMaterialCreateArgs} args - Arguments to create a ProductMaterial.
     * @example
     * // Create one ProductMaterial
     * const ProductMaterial = await prisma.productMaterial.create({
     *   data: {
     *     // ... data to create a ProductMaterial
     *   }
     * })
     * 
     */
    create<T extends ProductMaterialCreateArgs>(args: SelectSubset<T, ProductMaterialCreateArgs<ExtArgs>>): Prisma__ProductMaterialClient<$Result.GetResult<Prisma.$ProductMaterialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductMaterials.
     * @param {ProductMaterialCreateManyArgs} args - Arguments to create many ProductMaterials.
     * @example
     * // Create many ProductMaterials
     * const productMaterial = await prisma.productMaterial.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductMaterialCreateManyArgs>(args?: SelectSubset<T, ProductMaterialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductMaterial.
     * @param {ProductMaterialDeleteArgs} args - Arguments to delete one ProductMaterial.
     * @example
     * // Delete one ProductMaterial
     * const ProductMaterial = await prisma.productMaterial.delete({
     *   where: {
     *     // ... filter to delete one ProductMaterial
     *   }
     * })
     * 
     */
    delete<T extends ProductMaterialDeleteArgs>(args: SelectSubset<T, ProductMaterialDeleteArgs<ExtArgs>>): Prisma__ProductMaterialClient<$Result.GetResult<Prisma.$ProductMaterialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductMaterial.
     * @param {ProductMaterialUpdateArgs} args - Arguments to update one ProductMaterial.
     * @example
     * // Update one ProductMaterial
     * const productMaterial = await prisma.productMaterial.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductMaterialUpdateArgs>(args: SelectSubset<T, ProductMaterialUpdateArgs<ExtArgs>>): Prisma__ProductMaterialClient<$Result.GetResult<Prisma.$ProductMaterialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductMaterials.
     * @param {ProductMaterialDeleteManyArgs} args - Arguments to filter ProductMaterials to delete.
     * @example
     * // Delete a few ProductMaterials
     * const { count } = await prisma.productMaterial.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductMaterialDeleteManyArgs>(args?: SelectSubset<T, ProductMaterialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductMaterials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductMaterialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductMaterials
     * const productMaterial = await prisma.productMaterial.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductMaterialUpdateManyArgs>(args: SelectSubset<T, ProductMaterialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductMaterial.
     * @param {ProductMaterialUpsertArgs} args - Arguments to update or create a ProductMaterial.
     * @example
     * // Update or create a ProductMaterial
     * const productMaterial = await prisma.productMaterial.upsert({
     *   create: {
     *     // ... data to create a ProductMaterial
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductMaterial we want to update
     *   }
     * })
     */
    upsert<T extends ProductMaterialUpsertArgs>(args: SelectSubset<T, ProductMaterialUpsertArgs<ExtArgs>>): Prisma__ProductMaterialClient<$Result.GetResult<Prisma.$ProductMaterialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductMaterials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductMaterialCountArgs} args - Arguments to filter ProductMaterials to count.
     * @example
     * // Count the number of ProductMaterials
     * const count = await prisma.productMaterial.count({
     *   where: {
     *     // ... the filter for the ProductMaterials we want to count
     *   }
     * })
    **/
    count<T extends ProductMaterialCountArgs>(
      args?: Subset<T, ProductMaterialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductMaterialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductMaterial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductMaterialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductMaterialAggregateArgs>(args: Subset<T, ProductMaterialAggregateArgs>): Prisma.PrismaPromise<GetProductMaterialAggregateType<T>>

    /**
     * Group by ProductMaterial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductMaterialGroupByArgs} args - Group by arguments.
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
      T extends ProductMaterialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductMaterialGroupByArgs['orderBy'] }
        : { orderBy?: ProductMaterialGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductMaterialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductMaterialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductMaterial model
   */
  readonly fields: ProductMaterialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductMaterial.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductMaterialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    material<T extends MaterialDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MaterialDefaultArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ProductMaterial model
   */
  interface ProductMaterialFieldRefs {
    readonly id: FieldRef<"ProductMaterial", 'String'>
    readonly productId: FieldRef<"ProductMaterial", 'String'>
    readonly materialId: FieldRef<"ProductMaterial", 'String'>
    readonly stock_needed: FieldRef<"ProductMaterial", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ProductMaterial findUnique
   */
  export type ProductMaterialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductMaterial
     */
    select?: ProductMaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductMaterial
     */
    omit?: ProductMaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductMaterialInclude<ExtArgs> | null
    /**
     * Filter, which ProductMaterial to fetch.
     */
    where: ProductMaterialWhereUniqueInput
  }

  /**
   * ProductMaterial findUniqueOrThrow
   */
  export type ProductMaterialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductMaterial
     */
    select?: ProductMaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductMaterial
     */
    omit?: ProductMaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductMaterialInclude<ExtArgs> | null
    /**
     * Filter, which ProductMaterial to fetch.
     */
    where: ProductMaterialWhereUniqueInput
  }

  /**
   * ProductMaterial findFirst
   */
  export type ProductMaterialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductMaterial
     */
    select?: ProductMaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductMaterial
     */
    omit?: ProductMaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductMaterialInclude<ExtArgs> | null
    /**
     * Filter, which ProductMaterial to fetch.
     */
    where?: ProductMaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductMaterials to fetch.
     */
    orderBy?: ProductMaterialOrderByWithRelationInput | ProductMaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductMaterials.
     */
    cursor?: ProductMaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductMaterials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductMaterials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductMaterials.
     */
    distinct?: ProductMaterialScalarFieldEnum | ProductMaterialScalarFieldEnum[]
  }

  /**
   * ProductMaterial findFirstOrThrow
   */
  export type ProductMaterialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductMaterial
     */
    select?: ProductMaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductMaterial
     */
    omit?: ProductMaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductMaterialInclude<ExtArgs> | null
    /**
     * Filter, which ProductMaterial to fetch.
     */
    where?: ProductMaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductMaterials to fetch.
     */
    orderBy?: ProductMaterialOrderByWithRelationInput | ProductMaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductMaterials.
     */
    cursor?: ProductMaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductMaterials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductMaterials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductMaterials.
     */
    distinct?: ProductMaterialScalarFieldEnum | ProductMaterialScalarFieldEnum[]
  }

  /**
   * ProductMaterial findMany
   */
  export type ProductMaterialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductMaterial
     */
    select?: ProductMaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductMaterial
     */
    omit?: ProductMaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductMaterialInclude<ExtArgs> | null
    /**
     * Filter, which ProductMaterials to fetch.
     */
    where?: ProductMaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductMaterials to fetch.
     */
    orderBy?: ProductMaterialOrderByWithRelationInput | ProductMaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductMaterials.
     */
    cursor?: ProductMaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductMaterials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductMaterials.
     */
    skip?: number
    distinct?: ProductMaterialScalarFieldEnum | ProductMaterialScalarFieldEnum[]
  }

  /**
   * ProductMaterial create
   */
  export type ProductMaterialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductMaterial
     */
    select?: ProductMaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductMaterial
     */
    omit?: ProductMaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductMaterialInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductMaterial.
     */
    data: XOR<ProductMaterialCreateInput, ProductMaterialUncheckedCreateInput>
  }

  /**
   * ProductMaterial createMany
   */
  export type ProductMaterialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductMaterials.
     */
    data: ProductMaterialCreateManyInput | ProductMaterialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductMaterial update
   */
  export type ProductMaterialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductMaterial
     */
    select?: ProductMaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductMaterial
     */
    omit?: ProductMaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductMaterialInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductMaterial.
     */
    data: XOR<ProductMaterialUpdateInput, ProductMaterialUncheckedUpdateInput>
    /**
     * Choose, which ProductMaterial to update.
     */
    where: ProductMaterialWhereUniqueInput
  }

  /**
   * ProductMaterial updateMany
   */
  export type ProductMaterialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductMaterials.
     */
    data: XOR<ProductMaterialUpdateManyMutationInput, ProductMaterialUncheckedUpdateManyInput>
    /**
     * Filter which ProductMaterials to update
     */
    where?: ProductMaterialWhereInput
    /**
     * Limit how many ProductMaterials to update.
     */
    limit?: number
  }

  /**
   * ProductMaterial upsert
   */
  export type ProductMaterialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductMaterial
     */
    select?: ProductMaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductMaterial
     */
    omit?: ProductMaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductMaterialInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductMaterial to update in case it exists.
     */
    where: ProductMaterialWhereUniqueInput
    /**
     * In case the ProductMaterial found by the `where` argument doesn't exist, create a new ProductMaterial with this data.
     */
    create: XOR<ProductMaterialCreateInput, ProductMaterialUncheckedCreateInput>
    /**
     * In case the ProductMaterial was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductMaterialUpdateInput, ProductMaterialUncheckedUpdateInput>
  }

  /**
   * ProductMaterial delete
   */
  export type ProductMaterialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductMaterial
     */
    select?: ProductMaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductMaterial
     */
    omit?: ProductMaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductMaterialInclude<ExtArgs> | null
    /**
     * Filter which ProductMaterial to delete.
     */
    where: ProductMaterialWhereUniqueInput
  }

  /**
   * ProductMaterial deleteMany
   */
  export type ProductMaterialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductMaterials to delete
     */
    where?: ProductMaterialWhereInput
    /**
     * Limit how many ProductMaterials to delete.
     */
    limit?: number
  }

  /**
   * ProductMaterial without action
   */
  export type ProductMaterialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductMaterial
     */
    select?: ProductMaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductMaterial
     */
    omit?: ProductMaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductMaterialInclude<ExtArgs> | null
  }


  /**
   * Model SalesOrderProduct
   */

  export type AggregateSalesOrderProduct = {
    _count: SalesOrderProductCountAggregateOutputType | null
    _avg: SalesOrderProductAvgAggregateOutputType | null
    _sum: SalesOrderProductSumAggregateOutputType | null
    _min: SalesOrderProductMinAggregateOutputType | null
    _max: SalesOrderProductMaxAggregateOutputType | null
  }

  export type SalesOrderProductAvgAggregateOutputType = {
    product_qty: number | null
    price: number | null
  }

  export type SalesOrderProductSumAggregateOutputType = {
    product_qty: number | null
    price: number | null
  }

  export type SalesOrderProductMinAggregateOutputType = {
    id: string | null
    salesOrderId: string | null
    productId: string | null
    product_qty: number | null
    price: number | null
  }

  export type SalesOrderProductMaxAggregateOutputType = {
    id: string | null
    salesOrderId: string | null
    productId: string | null
    product_qty: number | null
    price: number | null
  }

  export type SalesOrderProductCountAggregateOutputType = {
    id: number
    salesOrderId: number
    productId: number
    product_qty: number
    price: number
    _all: number
  }


  export type SalesOrderProductAvgAggregateInputType = {
    product_qty?: true
    price?: true
  }

  export type SalesOrderProductSumAggregateInputType = {
    product_qty?: true
    price?: true
  }

  export type SalesOrderProductMinAggregateInputType = {
    id?: true
    salesOrderId?: true
    productId?: true
    product_qty?: true
    price?: true
  }

  export type SalesOrderProductMaxAggregateInputType = {
    id?: true
    salesOrderId?: true
    productId?: true
    product_qty?: true
    price?: true
  }

  export type SalesOrderProductCountAggregateInputType = {
    id?: true
    salesOrderId?: true
    productId?: true
    product_qty?: true
    price?: true
    _all?: true
  }

  export type SalesOrderProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SalesOrderProduct to aggregate.
     */
    where?: SalesOrderProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalesOrderProducts to fetch.
     */
    orderBy?: SalesOrderProductOrderByWithRelationInput | SalesOrderProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SalesOrderProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalesOrderProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalesOrderProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SalesOrderProducts
    **/
    _count?: true | SalesOrderProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SalesOrderProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SalesOrderProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SalesOrderProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SalesOrderProductMaxAggregateInputType
  }

  export type GetSalesOrderProductAggregateType<T extends SalesOrderProductAggregateArgs> = {
        [P in keyof T & keyof AggregateSalesOrderProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSalesOrderProduct[P]>
      : GetScalarType<T[P], AggregateSalesOrderProduct[P]>
  }




  export type SalesOrderProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SalesOrderProductWhereInput
    orderBy?: SalesOrderProductOrderByWithAggregationInput | SalesOrderProductOrderByWithAggregationInput[]
    by: SalesOrderProductScalarFieldEnum[] | SalesOrderProductScalarFieldEnum
    having?: SalesOrderProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SalesOrderProductCountAggregateInputType | true
    _avg?: SalesOrderProductAvgAggregateInputType
    _sum?: SalesOrderProductSumAggregateInputType
    _min?: SalesOrderProductMinAggregateInputType
    _max?: SalesOrderProductMaxAggregateInputType
  }

  export type SalesOrderProductGroupByOutputType = {
    id: string
    salesOrderId: string
    productId: string
    product_qty: number
    price: number
    _count: SalesOrderProductCountAggregateOutputType | null
    _avg: SalesOrderProductAvgAggregateOutputType | null
    _sum: SalesOrderProductSumAggregateOutputType | null
    _min: SalesOrderProductMinAggregateOutputType | null
    _max: SalesOrderProductMaxAggregateOutputType | null
  }

  type GetSalesOrderProductGroupByPayload<T extends SalesOrderProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SalesOrderProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SalesOrderProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SalesOrderProductGroupByOutputType[P]>
            : GetScalarType<T[P], SalesOrderProductGroupByOutputType[P]>
        }
      >
    >


  export type SalesOrderProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    salesOrderId?: boolean
    productId?: boolean
    product_qty?: boolean
    price?: boolean
    salesOrder?: boolean | Sales_OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["salesOrderProduct"]>



  export type SalesOrderProductSelectScalar = {
    id?: boolean
    salesOrderId?: boolean
    productId?: boolean
    product_qty?: boolean
    price?: boolean
  }

  export type SalesOrderProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "salesOrderId" | "productId" | "product_qty" | "price", ExtArgs["result"]["salesOrderProduct"]>
  export type SalesOrderProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    salesOrder?: boolean | Sales_OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $SalesOrderProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SalesOrderProduct"
    objects: {
      salesOrder: Prisma.$Sales_OrderPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      salesOrderId: string
      productId: string
      product_qty: number
      price: number
    }, ExtArgs["result"]["salesOrderProduct"]>
    composites: {}
  }

  type SalesOrderProductGetPayload<S extends boolean | null | undefined | SalesOrderProductDefaultArgs> = $Result.GetResult<Prisma.$SalesOrderProductPayload, S>

  type SalesOrderProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SalesOrderProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SalesOrderProductCountAggregateInputType | true
    }

  export interface SalesOrderProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SalesOrderProduct'], meta: { name: 'SalesOrderProduct' } }
    /**
     * Find zero or one SalesOrderProduct that matches the filter.
     * @param {SalesOrderProductFindUniqueArgs} args - Arguments to find a SalesOrderProduct
     * @example
     * // Get one SalesOrderProduct
     * const salesOrderProduct = await prisma.salesOrderProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SalesOrderProductFindUniqueArgs>(args: SelectSubset<T, SalesOrderProductFindUniqueArgs<ExtArgs>>): Prisma__SalesOrderProductClient<$Result.GetResult<Prisma.$SalesOrderProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SalesOrderProduct that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SalesOrderProductFindUniqueOrThrowArgs} args - Arguments to find a SalesOrderProduct
     * @example
     * // Get one SalesOrderProduct
     * const salesOrderProduct = await prisma.salesOrderProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SalesOrderProductFindUniqueOrThrowArgs>(args: SelectSubset<T, SalesOrderProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SalesOrderProductClient<$Result.GetResult<Prisma.$SalesOrderProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SalesOrderProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesOrderProductFindFirstArgs} args - Arguments to find a SalesOrderProduct
     * @example
     * // Get one SalesOrderProduct
     * const salesOrderProduct = await prisma.salesOrderProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SalesOrderProductFindFirstArgs>(args?: SelectSubset<T, SalesOrderProductFindFirstArgs<ExtArgs>>): Prisma__SalesOrderProductClient<$Result.GetResult<Prisma.$SalesOrderProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SalesOrderProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesOrderProductFindFirstOrThrowArgs} args - Arguments to find a SalesOrderProduct
     * @example
     * // Get one SalesOrderProduct
     * const salesOrderProduct = await prisma.salesOrderProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SalesOrderProductFindFirstOrThrowArgs>(args?: SelectSubset<T, SalesOrderProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__SalesOrderProductClient<$Result.GetResult<Prisma.$SalesOrderProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SalesOrderProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesOrderProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SalesOrderProducts
     * const salesOrderProducts = await prisma.salesOrderProduct.findMany()
     * 
     * // Get first 10 SalesOrderProducts
     * const salesOrderProducts = await prisma.salesOrderProduct.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const salesOrderProductWithIdOnly = await prisma.salesOrderProduct.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SalesOrderProductFindManyArgs>(args?: SelectSubset<T, SalesOrderProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalesOrderProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SalesOrderProduct.
     * @param {SalesOrderProductCreateArgs} args - Arguments to create a SalesOrderProduct.
     * @example
     * // Create one SalesOrderProduct
     * const SalesOrderProduct = await prisma.salesOrderProduct.create({
     *   data: {
     *     // ... data to create a SalesOrderProduct
     *   }
     * })
     * 
     */
    create<T extends SalesOrderProductCreateArgs>(args: SelectSubset<T, SalesOrderProductCreateArgs<ExtArgs>>): Prisma__SalesOrderProductClient<$Result.GetResult<Prisma.$SalesOrderProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SalesOrderProducts.
     * @param {SalesOrderProductCreateManyArgs} args - Arguments to create many SalesOrderProducts.
     * @example
     * // Create many SalesOrderProducts
     * const salesOrderProduct = await prisma.salesOrderProduct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SalesOrderProductCreateManyArgs>(args?: SelectSubset<T, SalesOrderProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SalesOrderProduct.
     * @param {SalesOrderProductDeleteArgs} args - Arguments to delete one SalesOrderProduct.
     * @example
     * // Delete one SalesOrderProduct
     * const SalesOrderProduct = await prisma.salesOrderProduct.delete({
     *   where: {
     *     // ... filter to delete one SalesOrderProduct
     *   }
     * })
     * 
     */
    delete<T extends SalesOrderProductDeleteArgs>(args: SelectSubset<T, SalesOrderProductDeleteArgs<ExtArgs>>): Prisma__SalesOrderProductClient<$Result.GetResult<Prisma.$SalesOrderProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SalesOrderProduct.
     * @param {SalesOrderProductUpdateArgs} args - Arguments to update one SalesOrderProduct.
     * @example
     * // Update one SalesOrderProduct
     * const salesOrderProduct = await prisma.salesOrderProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SalesOrderProductUpdateArgs>(args: SelectSubset<T, SalesOrderProductUpdateArgs<ExtArgs>>): Prisma__SalesOrderProductClient<$Result.GetResult<Prisma.$SalesOrderProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SalesOrderProducts.
     * @param {SalesOrderProductDeleteManyArgs} args - Arguments to filter SalesOrderProducts to delete.
     * @example
     * // Delete a few SalesOrderProducts
     * const { count } = await prisma.salesOrderProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SalesOrderProductDeleteManyArgs>(args?: SelectSubset<T, SalesOrderProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SalesOrderProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesOrderProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SalesOrderProducts
     * const salesOrderProduct = await prisma.salesOrderProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SalesOrderProductUpdateManyArgs>(args: SelectSubset<T, SalesOrderProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SalesOrderProduct.
     * @param {SalesOrderProductUpsertArgs} args - Arguments to update or create a SalesOrderProduct.
     * @example
     * // Update or create a SalesOrderProduct
     * const salesOrderProduct = await prisma.salesOrderProduct.upsert({
     *   create: {
     *     // ... data to create a SalesOrderProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SalesOrderProduct we want to update
     *   }
     * })
     */
    upsert<T extends SalesOrderProductUpsertArgs>(args: SelectSubset<T, SalesOrderProductUpsertArgs<ExtArgs>>): Prisma__SalesOrderProductClient<$Result.GetResult<Prisma.$SalesOrderProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SalesOrderProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesOrderProductCountArgs} args - Arguments to filter SalesOrderProducts to count.
     * @example
     * // Count the number of SalesOrderProducts
     * const count = await prisma.salesOrderProduct.count({
     *   where: {
     *     // ... the filter for the SalesOrderProducts we want to count
     *   }
     * })
    **/
    count<T extends SalesOrderProductCountArgs>(
      args?: Subset<T, SalesOrderProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SalesOrderProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SalesOrderProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesOrderProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SalesOrderProductAggregateArgs>(args: Subset<T, SalesOrderProductAggregateArgs>): Prisma.PrismaPromise<GetSalesOrderProductAggregateType<T>>

    /**
     * Group by SalesOrderProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesOrderProductGroupByArgs} args - Group by arguments.
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
      T extends SalesOrderProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SalesOrderProductGroupByArgs['orderBy'] }
        : { orderBy?: SalesOrderProductGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SalesOrderProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSalesOrderProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SalesOrderProduct model
   */
  readonly fields: SalesOrderProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SalesOrderProduct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SalesOrderProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    salesOrder<T extends Sales_OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, Sales_OrderDefaultArgs<ExtArgs>>): Prisma__Sales_OrderClient<$Result.GetResult<Prisma.$Sales_OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SalesOrderProduct model
   */
  interface SalesOrderProductFieldRefs {
    readonly id: FieldRef<"SalesOrderProduct", 'String'>
    readonly salesOrderId: FieldRef<"SalesOrderProduct", 'String'>
    readonly productId: FieldRef<"SalesOrderProduct", 'String'>
    readonly product_qty: FieldRef<"SalesOrderProduct", 'Int'>
    readonly price: FieldRef<"SalesOrderProduct", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SalesOrderProduct findUnique
   */
  export type SalesOrderProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesOrderProduct
     */
    select?: SalesOrderProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesOrderProduct
     */
    omit?: SalesOrderProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesOrderProductInclude<ExtArgs> | null
    /**
     * Filter, which SalesOrderProduct to fetch.
     */
    where: SalesOrderProductWhereUniqueInput
  }

  /**
   * SalesOrderProduct findUniqueOrThrow
   */
  export type SalesOrderProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesOrderProduct
     */
    select?: SalesOrderProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesOrderProduct
     */
    omit?: SalesOrderProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesOrderProductInclude<ExtArgs> | null
    /**
     * Filter, which SalesOrderProduct to fetch.
     */
    where: SalesOrderProductWhereUniqueInput
  }

  /**
   * SalesOrderProduct findFirst
   */
  export type SalesOrderProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesOrderProduct
     */
    select?: SalesOrderProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesOrderProduct
     */
    omit?: SalesOrderProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesOrderProductInclude<ExtArgs> | null
    /**
     * Filter, which SalesOrderProduct to fetch.
     */
    where?: SalesOrderProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalesOrderProducts to fetch.
     */
    orderBy?: SalesOrderProductOrderByWithRelationInput | SalesOrderProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SalesOrderProducts.
     */
    cursor?: SalesOrderProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalesOrderProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalesOrderProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SalesOrderProducts.
     */
    distinct?: SalesOrderProductScalarFieldEnum | SalesOrderProductScalarFieldEnum[]
  }

  /**
   * SalesOrderProduct findFirstOrThrow
   */
  export type SalesOrderProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesOrderProduct
     */
    select?: SalesOrderProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesOrderProduct
     */
    omit?: SalesOrderProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesOrderProductInclude<ExtArgs> | null
    /**
     * Filter, which SalesOrderProduct to fetch.
     */
    where?: SalesOrderProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalesOrderProducts to fetch.
     */
    orderBy?: SalesOrderProductOrderByWithRelationInput | SalesOrderProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SalesOrderProducts.
     */
    cursor?: SalesOrderProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalesOrderProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalesOrderProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SalesOrderProducts.
     */
    distinct?: SalesOrderProductScalarFieldEnum | SalesOrderProductScalarFieldEnum[]
  }

  /**
   * SalesOrderProduct findMany
   */
  export type SalesOrderProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesOrderProduct
     */
    select?: SalesOrderProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesOrderProduct
     */
    omit?: SalesOrderProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesOrderProductInclude<ExtArgs> | null
    /**
     * Filter, which SalesOrderProducts to fetch.
     */
    where?: SalesOrderProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalesOrderProducts to fetch.
     */
    orderBy?: SalesOrderProductOrderByWithRelationInput | SalesOrderProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SalesOrderProducts.
     */
    cursor?: SalesOrderProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalesOrderProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalesOrderProducts.
     */
    skip?: number
    distinct?: SalesOrderProductScalarFieldEnum | SalesOrderProductScalarFieldEnum[]
  }

  /**
   * SalesOrderProduct create
   */
  export type SalesOrderProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesOrderProduct
     */
    select?: SalesOrderProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesOrderProduct
     */
    omit?: SalesOrderProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesOrderProductInclude<ExtArgs> | null
    /**
     * The data needed to create a SalesOrderProduct.
     */
    data: XOR<SalesOrderProductCreateInput, SalesOrderProductUncheckedCreateInput>
  }

  /**
   * SalesOrderProduct createMany
   */
  export type SalesOrderProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SalesOrderProducts.
     */
    data: SalesOrderProductCreateManyInput | SalesOrderProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SalesOrderProduct update
   */
  export type SalesOrderProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesOrderProduct
     */
    select?: SalesOrderProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesOrderProduct
     */
    omit?: SalesOrderProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesOrderProductInclude<ExtArgs> | null
    /**
     * The data needed to update a SalesOrderProduct.
     */
    data: XOR<SalesOrderProductUpdateInput, SalesOrderProductUncheckedUpdateInput>
    /**
     * Choose, which SalesOrderProduct to update.
     */
    where: SalesOrderProductWhereUniqueInput
  }

  /**
   * SalesOrderProduct updateMany
   */
  export type SalesOrderProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SalesOrderProducts.
     */
    data: XOR<SalesOrderProductUpdateManyMutationInput, SalesOrderProductUncheckedUpdateManyInput>
    /**
     * Filter which SalesOrderProducts to update
     */
    where?: SalesOrderProductWhereInput
    /**
     * Limit how many SalesOrderProducts to update.
     */
    limit?: number
  }

  /**
   * SalesOrderProduct upsert
   */
  export type SalesOrderProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesOrderProduct
     */
    select?: SalesOrderProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesOrderProduct
     */
    omit?: SalesOrderProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesOrderProductInclude<ExtArgs> | null
    /**
     * The filter to search for the SalesOrderProduct to update in case it exists.
     */
    where: SalesOrderProductWhereUniqueInput
    /**
     * In case the SalesOrderProduct found by the `where` argument doesn't exist, create a new SalesOrderProduct with this data.
     */
    create: XOR<SalesOrderProductCreateInput, SalesOrderProductUncheckedCreateInput>
    /**
     * In case the SalesOrderProduct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SalesOrderProductUpdateInput, SalesOrderProductUncheckedUpdateInput>
  }

  /**
   * SalesOrderProduct delete
   */
  export type SalesOrderProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesOrderProduct
     */
    select?: SalesOrderProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesOrderProduct
     */
    omit?: SalesOrderProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesOrderProductInclude<ExtArgs> | null
    /**
     * Filter which SalesOrderProduct to delete.
     */
    where: SalesOrderProductWhereUniqueInput
  }

  /**
   * SalesOrderProduct deleteMany
   */
  export type SalesOrderProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SalesOrderProducts to delete
     */
    where?: SalesOrderProductWhereInput
    /**
     * Limit how many SalesOrderProducts to delete.
     */
    limit?: number
  }

  /**
   * SalesOrderProduct without action
   */
  export type SalesOrderProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesOrderProduct
     */
    select?: SalesOrderProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesOrderProduct
     */
    omit?: SalesOrderProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesOrderProductInclude<ExtArgs> | null
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
    customer_name: 'customer_name',
    product_qty: 'product_qty',
    finish_date: 'finish_date',
    delivery_date: 'delivery_date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    spkId: 'spkId'
  };

  export type Sales_OrderScalarFieldEnum = (typeof Sales_OrderScalarFieldEnum)[keyof typeof Sales_OrderScalarFieldEnum]


  export const SPKScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SPKScalarFieldEnum = (typeof SPKScalarFieldEnum)[keyof typeof SPKScalarFieldEnum]


  export const MaterialScalarFieldEnum: {
    id: 'id',
    material_name: 'material_name',
    price: 'price',
    stock: 'stock',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MaterialScalarFieldEnum = (typeof MaterialScalarFieldEnum)[keyof typeof MaterialScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    product_name: 'product_name',
    price: 'price',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductMaterialScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    materialId: 'materialId',
    stock_needed: 'stock_needed'
  };

  export type ProductMaterialScalarFieldEnum = (typeof ProductMaterialScalarFieldEnum)[keyof typeof ProductMaterialScalarFieldEnum]


  export const SalesOrderProductScalarFieldEnum: {
    id: 'id',
    salesOrderId: 'salesOrderId',
    productId: 'productId',
    product_qty: 'product_qty',
    price: 'price'
  };

  export type SalesOrderProductScalarFieldEnum = (typeof SalesOrderProductScalarFieldEnum)[keyof typeof SalesOrderProductScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const Sales_OrderOrderByRelevanceFieldEnum: {
    id: 'id',
    customer_name: 'customer_name',
    spkId: 'spkId'
  };

  export type Sales_OrderOrderByRelevanceFieldEnum = (typeof Sales_OrderOrderByRelevanceFieldEnum)[keyof typeof Sales_OrderOrderByRelevanceFieldEnum]


  export const SPKOrderByRelevanceFieldEnum: {
    id: 'id'
  };

  export type SPKOrderByRelevanceFieldEnum = (typeof SPKOrderByRelevanceFieldEnum)[keyof typeof SPKOrderByRelevanceFieldEnum]


  export const MaterialOrderByRelevanceFieldEnum: {
    id: 'id',
    material_name: 'material_name'
  };

  export type MaterialOrderByRelevanceFieldEnum = (typeof MaterialOrderByRelevanceFieldEnum)[keyof typeof MaterialOrderByRelevanceFieldEnum]


  export const ProductOrderByRelevanceFieldEnum: {
    id: 'id',
    product_name: 'product_name'
  };

  export type ProductOrderByRelevanceFieldEnum = (typeof ProductOrderByRelevanceFieldEnum)[keyof typeof ProductOrderByRelevanceFieldEnum]


  export const ProductMaterialOrderByRelevanceFieldEnum: {
    id: 'id',
    productId: 'productId',
    materialId: 'materialId'
  };

  export type ProductMaterialOrderByRelevanceFieldEnum = (typeof ProductMaterialOrderByRelevanceFieldEnum)[keyof typeof ProductMaterialOrderByRelevanceFieldEnum]


  export const SalesOrderProductOrderByRelevanceFieldEnum: {
    id: 'id',
    salesOrderId: 'salesOrderId',
    productId: 'productId'
  };

  export type SalesOrderProductOrderByRelevanceFieldEnum = (typeof SalesOrderProductOrderByRelevanceFieldEnum)[keyof typeof SalesOrderProductOrderByRelevanceFieldEnum]


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
    customer_name?: StringFilter<"Sales_Order"> | string
    product_qty?: IntFilter<"Sales_Order"> | number
    finish_date?: DateTimeFilter<"Sales_Order"> | Date | string
    delivery_date?: DateTimeFilter<"Sales_Order"> | Date | string
    createdAt?: DateTimeFilter<"Sales_Order"> | Date | string
    updatedAt?: DateTimeFilter<"Sales_Order"> | Date | string
    spkId?: StringNullableFilter<"Sales_Order"> | string | null
    products?: SalesOrderProductListRelationFilter
    spk?: XOR<SPKNullableScalarRelationFilter, SPKWhereInput> | null
  }

  export type Sales_OrderOrderByWithRelationInput = {
    id?: SortOrder
    customer_name?: SortOrder
    product_qty?: SortOrder
    finish_date?: SortOrder
    delivery_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    spkId?: SortOrderInput | SortOrder
    products?: SalesOrderProductOrderByRelationAggregateInput
    spk?: SPKOrderByWithRelationInput
    _relevance?: Sales_OrderOrderByRelevanceInput
  }

  export type Sales_OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    spkId?: string
    AND?: Sales_OrderWhereInput | Sales_OrderWhereInput[]
    OR?: Sales_OrderWhereInput[]
    NOT?: Sales_OrderWhereInput | Sales_OrderWhereInput[]
    customer_name?: StringFilter<"Sales_Order"> | string
    product_qty?: IntFilter<"Sales_Order"> | number
    finish_date?: DateTimeFilter<"Sales_Order"> | Date | string
    delivery_date?: DateTimeFilter<"Sales_Order"> | Date | string
    createdAt?: DateTimeFilter<"Sales_Order"> | Date | string
    updatedAt?: DateTimeFilter<"Sales_Order"> | Date | string
    products?: SalesOrderProductListRelationFilter
    spk?: XOR<SPKNullableScalarRelationFilter, SPKWhereInput> | null
  }, "id" | "spkId">

  export type Sales_OrderOrderByWithAggregationInput = {
    id?: SortOrder
    customer_name?: SortOrder
    product_qty?: SortOrder
    finish_date?: SortOrder
    delivery_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    spkId?: SortOrderInput | SortOrder
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
    customer_name?: StringWithAggregatesFilter<"Sales_Order"> | string
    product_qty?: IntWithAggregatesFilter<"Sales_Order"> | number
    finish_date?: DateTimeWithAggregatesFilter<"Sales_Order"> | Date | string
    delivery_date?: DateTimeWithAggregatesFilter<"Sales_Order"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Sales_Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Sales_Order"> | Date | string
    spkId?: StringNullableWithAggregatesFilter<"Sales_Order"> | string | null
  }

  export type SPKWhereInput = {
    AND?: SPKWhereInput | SPKWhereInput[]
    OR?: SPKWhereInput[]
    NOT?: SPKWhereInput | SPKWhereInput[]
    id?: StringFilter<"SPK"> | string
    createdAt?: DateTimeFilter<"SPK"> | Date | string
    updatedAt?: DateTimeFilter<"SPK"> | Date | string
    Sales_Order?: XOR<Sales_OrderNullableScalarRelationFilter, Sales_OrderWhereInput> | null
  }

  export type SPKOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Sales_Order?: Sales_OrderOrderByWithRelationInput
    _relevance?: SPKOrderByRelevanceInput
  }

  export type SPKWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SPKWhereInput | SPKWhereInput[]
    OR?: SPKWhereInput[]
    NOT?: SPKWhereInput | SPKWhereInput[]
    createdAt?: DateTimeFilter<"SPK"> | Date | string
    updatedAt?: DateTimeFilter<"SPK"> | Date | string
    Sales_Order?: XOR<Sales_OrderNullableScalarRelationFilter, Sales_OrderWhereInput> | null
  }, "id">

  export type SPKOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SPKCountOrderByAggregateInput
    _max?: SPKMaxOrderByAggregateInput
    _min?: SPKMinOrderByAggregateInput
  }

  export type SPKScalarWhereWithAggregatesInput = {
    AND?: SPKScalarWhereWithAggregatesInput | SPKScalarWhereWithAggregatesInput[]
    OR?: SPKScalarWhereWithAggregatesInput[]
    NOT?: SPKScalarWhereWithAggregatesInput | SPKScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SPK"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SPK"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SPK"> | Date | string
  }

  export type MaterialWhereInput = {
    AND?: MaterialWhereInput | MaterialWhereInput[]
    OR?: MaterialWhereInput[]
    NOT?: MaterialWhereInput | MaterialWhereInput[]
    id?: StringFilter<"Material"> | string
    material_name?: StringFilter<"Material"> | string
    price?: IntFilter<"Material"> | number
    stock?: IntFilter<"Material"> | number
    createdAt?: DateTimeFilter<"Material"> | Date | string
    updatedAt?: DateTimeFilter<"Material"> | Date | string
    products?: ProductMaterialListRelationFilter
  }

  export type MaterialOrderByWithRelationInput = {
    id?: SortOrder
    material_name?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    products?: ProductMaterialOrderByRelationAggregateInput
    _relevance?: MaterialOrderByRelevanceInput
  }

  export type MaterialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MaterialWhereInput | MaterialWhereInput[]
    OR?: MaterialWhereInput[]
    NOT?: MaterialWhereInput | MaterialWhereInput[]
    material_name?: StringFilter<"Material"> | string
    price?: IntFilter<"Material"> | number
    stock?: IntFilter<"Material"> | number
    createdAt?: DateTimeFilter<"Material"> | Date | string
    updatedAt?: DateTimeFilter<"Material"> | Date | string
    products?: ProductMaterialListRelationFilter
  }, "id">

  export type MaterialOrderByWithAggregationInput = {
    id?: SortOrder
    material_name?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MaterialCountOrderByAggregateInput
    _avg?: MaterialAvgOrderByAggregateInput
    _max?: MaterialMaxOrderByAggregateInput
    _min?: MaterialMinOrderByAggregateInput
    _sum?: MaterialSumOrderByAggregateInput
  }

  export type MaterialScalarWhereWithAggregatesInput = {
    AND?: MaterialScalarWhereWithAggregatesInput | MaterialScalarWhereWithAggregatesInput[]
    OR?: MaterialScalarWhereWithAggregatesInput[]
    NOT?: MaterialScalarWhereWithAggregatesInput | MaterialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Material"> | string
    material_name?: StringWithAggregatesFilter<"Material"> | string
    price?: IntWithAggregatesFilter<"Material"> | number
    stock?: IntWithAggregatesFilter<"Material"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Material"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Material"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    product_name?: StringFilter<"Product"> | string
    price?: IntFilter<"Product"> | number
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    materials?: ProductMaterialListRelationFilter
    salesOrders?: SalesOrderProductListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    product_name?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    materials?: ProductMaterialOrderByRelationAggregateInput
    salesOrders?: SalesOrderProductOrderByRelationAggregateInput
    _relevance?: ProductOrderByRelevanceInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    product_name?: StringFilter<"Product"> | string
    price?: IntFilter<"Product"> | number
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    materials?: ProductMaterialListRelationFilter
    salesOrders?: SalesOrderProductListRelationFilter
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    product_name?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    product_name?: StringWithAggregatesFilter<"Product"> | string
    price?: IntWithAggregatesFilter<"Product"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type ProductMaterialWhereInput = {
    AND?: ProductMaterialWhereInput | ProductMaterialWhereInput[]
    OR?: ProductMaterialWhereInput[]
    NOT?: ProductMaterialWhereInput | ProductMaterialWhereInput[]
    id?: StringFilter<"ProductMaterial"> | string
    productId?: StringFilter<"ProductMaterial"> | string
    materialId?: StringFilter<"ProductMaterial"> | string
    stock_needed?: IntFilter<"ProductMaterial"> | number
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    material?: XOR<MaterialScalarRelationFilter, MaterialWhereInput>
  }

  export type ProductMaterialOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    materialId?: SortOrder
    stock_needed?: SortOrder
    product?: ProductOrderByWithRelationInput
    material?: MaterialOrderByWithRelationInput
    _relevance?: ProductMaterialOrderByRelevanceInput
  }

  export type ProductMaterialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    productId_materialId?: ProductMaterialProductIdMaterialIdCompoundUniqueInput
    AND?: ProductMaterialWhereInput | ProductMaterialWhereInput[]
    OR?: ProductMaterialWhereInput[]
    NOT?: ProductMaterialWhereInput | ProductMaterialWhereInput[]
    productId?: StringFilter<"ProductMaterial"> | string
    materialId?: StringFilter<"ProductMaterial"> | string
    stock_needed?: IntFilter<"ProductMaterial"> | number
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    material?: XOR<MaterialScalarRelationFilter, MaterialWhereInput>
  }, "id" | "productId_materialId">

  export type ProductMaterialOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    materialId?: SortOrder
    stock_needed?: SortOrder
    _count?: ProductMaterialCountOrderByAggregateInput
    _avg?: ProductMaterialAvgOrderByAggregateInput
    _max?: ProductMaterialMaxOrderByAggregateInput
    _min?: ProductMaterialMinOrderByAggregateInput
    _sum?: ProductMaterialSumOrderByAggregateInput
  }

  export type ProductMaterialScalarWhereWithAggregatesInput = {
    AND?: ProductMaterialScalarWhereWithAggregatesInput | ProductMaterialScalarWhereWithAggregatesInput[]
    OR?: ProductMaterialScalarWhereWithAggregatesInput[]
    NOT?: ProductMaterialScalarWhereWithAggregatesInput | ProductMaterialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductMaterial"> | string
    productId?: StringWithAggregatesFilter<"ProductMaterial"> | string
    materialId?: StringWithAggregatesFilter<"ProductMaterial"> | string
    stock_needed?: IntWithAggregatesFilter<"ProductMaterial"> | number
  }

  export type SalesOrderProductWhereInput = {
    AND?: SalesOrderProductWhereInput | SalesOrderProductWhereInput[]
    OR?: SalesOrderProductWhereInput[]
    NOT?: SalesOrderProductWhereInput | SalesOrderProductWhereInput[]
    id?: StringFilter<"SalesOrderProduct"> | string
    salesOrderId?: StringFilter<"SalesOrderProduct"> | string
    productId?: StringFilter<"SalesOrderProduct"> | string
    product_qty?: IntFilter<"SalesOrderProduct"> | number
    price?: IntFilter<"SalesOrderProduct"> | number
    salesOrder?: XOR<Sales_OrderScalarRelationFilter, Sales_OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type SalesOrderProductOrderByWithRelationInput = {
    id?: SortOrder
    salesOrderId?: SortOrder
    productId?: SortOrder
    product_qty?: SortOrder
    price?: SortOrder
    salesOrder?: Sales_OrderOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
    _relevance?: SalesOrderProductOrderByRelevanceInput
  }

  export type SalesOrderProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    salesOrderId_productId?: SalesOrderProductSalesOrderIdProductIdCompoundUniqueInput
    AND?: SalesOrderProductWhereInput | SalesOrderProductWhereInput[]
    OR?: SalesOrderProductWhereInput[]
    NOT?: SalesOrderProductWhereInput | SalesOrderProductWhereInput[]
    salesOrderId?: StringFilter<"SalesOrderProduct"> | string
    productId?: StringFilter<"SalesOrderProduct"> | string
    product_qty?: IntFilter<"SalesOrderProduct"> | number
    price?: IntFilter<"SalesOrderProduct"> | number
    salesOrder?: XOR<Sales_OrderScalarRelationFilter, Sales_OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id" | "salesOrderId_productId">

  export type SalesOrderProductOrderByWithAggregationInput = {
    id?: SortOrder
    salesOrderId?: SortOrder
    productId?: SortOrder
    product_qty?: SortOrder
    price?: SortOrder
    _count?: SalesOrderProductCountOrderByAggregateInput
    _avg?: SalesOrderProductAvgOrderByAggregateInput
    _max?: SalesOrderProductMaxOrderByAggregateInput
    _min?: SalesOrderProductMinOrderByAggregateInput
    _sum?: SalesOrderProductSumOrderByAggregateInput
  }

  export type SalesOrderProductScalarWhereWithAggregatesInput = {
    AND?: SalesOrderProductScalarWhereWithAggregatesInput | SalesOrderProductScalarWhereWithAggregatesInput[]
    OR?: SalesOrderProductScalarWhereWithAggregatesInput[]
    NOT?: SalesOrderProductScalarWhereWithAggregatesInput | SalesOrderProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SalesOrderProduct"> | string
    salesOrderId?: StringWithAggregatesFilter<"SalesOrderProduct"> | string
    productId?: StringWithAggregatesFilter<"SalesOrderProduct"> | string
    product_qty?: IntWithAggregatesFilter<"SalesOrderProduct"> | number
    price?: IntWithAggregatesFilter<"SalesOrderProduct"> | number
  }

  export type Sales_OrderCreateInput = {
    id?: string
    customer_name: string
    product_qty: number
    finish_date: Date | string
    delivery_date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: SalesOrderProductCreateNestedManyWithoutSalesOrderInput
    spk?: SPKCreateNestedOneWithoutSales_OrderInput
  }

  export type Sales_OrderUncheckedCreateInput = {
    id?: string
    customer_name: string
    product_qty: number
    finish_date: Date | string
    delivery_date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    spkId?: string | null
    products?: SalesOrderProductUncheckedCreateNestedManyWithoutSalesOrderInput
  }

  export type Sales_OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    finish_date?: DateTimeFieldUpdateOperationsInput | Date | string
    delivery_date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: SalesOrderProductUpdateManyWithoutSalesOrderNestedInput
    spk?: SPKUpdateOneWithoutSales_OrderNestedInput
  }

  export type Sales_OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    finish_date?: DateTimeFieldUpdateOperationsInput | Date | string
    delivery_date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    spkId?: NullableStringFieldUpdateOperationsInput | string | null
    products?: SalesOrderProductUncheckedUpdateManyWithoutSalesOrderNestedInput
  }

  export type Sales_OrderCreateManyInput = {
    id?: string
    customer_name: string
    product_qty: number
    finish_date: Date | string
    delivery_date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    spkId?: string | null
  }

  export type Sales_OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    finish_date?: DateTimeFieldUpdateOperationsInput | Date | string
    delivery_date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Sales_OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    finish_date?: DateTimeFieldUpdateOperationsInput | Date | string
    delivery_date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    spkId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SPKCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Sales_Order?: Sales_OrderCreateNestedOneWithoutSpkInput
  }

  export type SPKUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Sales_Order?: Sales_OrderUncheckedCreateNestedOneWithoutSpkInput
  }

  export type SPKUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Sales_Order?: Sales_OrderUpdateOneWithoutSpkNestedInput
  }

  export type SPKUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Sales_Order?: Sales_OrderUncheckedUpdateOneWithoutSpkNestedInput
  }

  export type SPKCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SPKUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SPKUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialCreateInput = {
    id?: string
    material_name: string
    price: number
    stock: number
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductMaterialCreateNestedManyWithoutMaterialInput
  }

  export type MaterialUncheckedCreateInput = {
    id?: string
    material_name: string
    price: number
    stock: number
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductMaterialUncheckedCreateNestedManyWithoutMaterialInput
  }

  export type MaterialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    material_name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductMaterialUpdateManyWithoutMaterialNestedInput
  }

  export type MaterialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    material_name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductMaterialUncheckedUpdateManyWithoutMaterialNestedInput
  }

  export type MaterialCreateManyInput = {
    id?: string
    material_name: string
    price: number
    stock: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    material_name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    material_name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    product_name: string
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
    materials?: ProductMaterialCreateNestedManyWithoutProductInput
    salesOrders?: SalesOrderProductCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    product_name: string
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
    materials?: ProductMaterialUncheckedCreateNestedManyWithoutProductInput
    salesOrders?: SalesOrderProductUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    materials?: ProductMaterialUpdateManyWithoutProductNestedInput
    salesOrders?: SalesOrderProductUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    materials?: ProductMaterialUncheckedUpdateManyWithoutProductNestedInput
    salesOrders?: SalesOrderProductUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    product_name: string
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductMaterialCreateInput = {
    id?: string
    stock_needed: number
    product: ProductCreateNestedOneWithoutMaterialsInput
    material: MaterialCreateNestedOneWithoutProductsInput
  }

  export type ProductMaterialUncheckedCreateInput = {
    id?: string
    productId: string
    materialId: string
    stock_needed: number
  }

  export type ProductMaterialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stock_needed?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutMaterialsNestedInput
    material?: MaterialUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductMaterialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    materialId?: StringFieldUpdateOperationsInput | string
    stock_needed?: IntFieldUpdateOperationsInput | number
  }

  export type ProductMaterialCreateManyInput = {
    id?: string
    productId: string
    materialId: string
    stock_needed: number
  }

  export type ProductMaterialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stock_needed?: IntFieldUpdateOperationsInput | number
  }

  export type ProductMaterialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    materialId?: StringFieldUpdateOperationsInput | string
    stock_needed?: IntFieldUpdateOperationsInput | number
  }

  export type SalesOrderProductCreateInput = {
    id?: string
    product_qty: number
    price: number
    salesOrder: Sales_OrderCreateNestedOneWithoutProductsInput
    product: ProductCreateNestedOneWithoutSalesOrdersInput
  }

  export type SalesOrderProductUncheckedCreateInput = {
    id?: string
    salesOrderId: string
    productId: string
    product_qty: number
    price: number
  }

  export type SalesOrderProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    salesOrder?: Sales_OrderUpdateOneRequiredWithoutProductsNestedInput
    product?: ProductUpdateOneRequiredWithoutSalesOrdersNestedInput
  }

  export type SalesOrderProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    salesOrderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
  }

  export type SalesOrderProductCreateManyInput = {
    id?: string
    salesOrderId: string
    productId: string
    product_qty: number
    price: number
  }

  export type SalesOrderProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
  }

  export type SalesOrderProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    salesOrderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
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

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SalesOrderProductListRelationFilter = {
    every?: SalesOrderProductWhereInput
    some?: SalesOrderProductWhereInput
    none?: SalesOrderProductWhereInput
  }

  export type SPKNullableScalarRelationFilter = {
    is?: SPKWhereInput | null
    isNot?: SPKWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SalesOrderProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Sales_OrderOrderByRelevanceInput = {
    fields: Sales_OrderOrderByRelevanceFieldEnum | Sales_OrderOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type Sales_OrderCountOrderByAggregateInput = {
    id?: SortOrder
    customer_name?: SortOrder
    product_qty?: SortOrder
    finish_date?: SortOrder
    delivery_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    spkId?: SortOrder
  }

  export type Sales_OrderAvgOrderByAggregateInput = {
    product_qty?: SortOrder
  }

  export type Sales_OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    customer_name?: SortOrder
    product_qty?: SortOrder
    finish_date?: SortOrder
    delivery_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    spkId?: SortOrder
  }

  export type Sales_OrderMinOrderByAggregateInput = {
    id?: SortOrder
    customer_name?: SortOrder
    product_qty?: SortOrder
    finish_date?: SortOrder
    delivery_date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    spkId?: SortOrder
  }

  export type Sales_OrderSumOrderByAggregateInput = {
    product_qty?: SortOrder
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type Sales_OrderNullableScalarRelationFilter = {
    is?: Sales_OrderWhereInput | null
    isNot?: Sales_OrderWhereInput | null
  }

  export type SPKOrderByRelevanceInput = {
    fields: SPKOrderByRelevanceFieldEnum | SPKOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SPKCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SPKMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SPKMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMaterialListRelationFilter = {
    every?: ProductMaterialWhereInput
    some?: ProductMaterialWhereInput
    none?: ProductMaterialWhereInput
  }

  export type ProductMaterialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MaterialOrderByRelevanceInput = {
    fields: MaterialOrderByRelevanceFieldEnum | MaterialOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MaterialCountOrderByAggregateInput = {
    id?: SortOrder
    material_name?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaterialAvgOrderByAggregateInput = {
    price?: SortOrder
    stock?: SortOrder
  }

  export type MaterialMaxOrderByAggregateInput = {
    id?: SortOrder
    material_name?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaterialMinOrderByAggregateInput = {
    id?: SortOrder
    material_name?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaterialSumOrderByAggregateInput = {
    price?: SortOrder
    stock?: SortOrder
  }

  export type ProductOrderByRelevanceInput = {
    fields: ProductOrderByRelevanceFieldEnum | ProductOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    product_name?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    product_name?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    product_name?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type MaterialScalarRelationFilter = {
    is?: MaterialWhereInput
    isNot?: MaterialWhereInput
  }

  export type ProductMaterialOrderByRelevanceInput = {
    fields: ProductMaterialOrderByRelevanceFieldEnum | ProductMaterialOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductMaterialProductIdMaterialIdCompoundUniqueInput = {
    productId: string
    materialId: string
  }

  export type ProductMaterialCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    materialId?: SortOrder
    stock_needed?: SortOrder
  }

  export type ProductMaterialAvgOrderByAggregateInput = {
    stock_needed?: SortOrder
  }

  export type ProductMaterialMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    materialId?: SortOrder
    stock_needed?: SortOrder
  }

  export type ProductMaterialMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    materialId?: SortOrder
    stock_needed?: SortOrder
  }

  export type ProductMaterialSumOrderByAggregateInput = {
    stock_needed?: SortOrder
  }

  export type Sales_OrderScalarRelationFilter = {
    is?: Sales_OrderWhereInput
    isNot?: Sales_OrderWhereInput
  }

  export type SalesOrderProductOrderByRelevanceInput = {
    fields: SalesOrderProductOrderByRelevanceFieldEnum | SalesOrderProductOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SalesOrderProductSalesOrderIdProductIdCompoundUniqueInput = {
    salesOrderId: string
    productId: string
  }

  export type SalesOrderProductCountOrderByAggregateInput = {
    id?: SortOrder
    salesOrderId?: SortOrder
    productId?: SortOrder
    product_qty?: SortOrder
    price?: SortOrder
  }

  export type SalesOrderProductAvgOrderByAggregateInput = {
    product_qty?: SortOrder
    price?: SortOrder
  }

  export type SalesOrderProductMaxOrderByAggregateInput = {
    id?: SortOrder
    salesOrderId?: SortOrder
    productId?: SortOrder
    product_qty?: SortOrder
    price?: SortOrder
  }

  export type SalesOrderProductMinOrderByAggregateInput = {
    id?: SortOrder
    salesOrderId?: SortOrder
    productId?: SortOrder
    product_qty?: SortOrder
    price?: SortOrder
  }

  export type SalesOrderProductSumOrderByAggregateInput = {
    product_qty?: SortOrder
    price?: SortOrder
  }

  export type SalesOrderProductCreateNestedManyWithoutSalesOrderInput = {
    create?: XOR<SalesOrderProductCreateWithoutSalesOrderInput, SalesOrderProductUncheckedCreateWithoutSalesOrderInput> | SalesOrderProductCreateWithoutSalesOrderInput[] | SalesOrderProductUncheckedCreateWithoutSalesOrderInput[]
    connectOrCreate?: SalesOrderProductCreateOrConnectWithoutSalesOrderInput | SalesOrderProductCreateOrConnectWithoutSalesOrderInput[]
    createMany?: SalesOrderProductCreateManySalesOrderInputEnvelope
    connect?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
  }

  export type SPKCreateNestedOneWithoutSales_OrderInput = {
    create?: XOR<SPKCreateWithoutSales_OrderInput, SPKUncheckedCreateWithoutSales_OrderInput>
    connectOrCreate?: SPKCreateOrConnectWithoutSales_OrderInput
    connect?: SPKWhereUniqueInput
  }

  export type SalesOrderProductUncheckedCreateNestedManyWithoutSalesOrderInput = {
    create?: XOR<SalesOrderProductCreateWithoutSalesOrderInput, SalesOrderProductUncheckedCreateWithoutSalesOrderInput> | SalesOrderProductCreateWithoutSalesOrderInput[] | SalesOrderProductUncheckedCreateWithoutSalesOrderInput[]
    connectOrCreate?: SalesOrderProductCreateOrConnectWithoutSalesOrderInput | SalesOrderProductCreateOrConnectWithoutSalesOrderInput[]
    createMany?: SalesOrderProductCreateManySalesOrderInputEnvelope
    connect?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
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

  export type SalesOrderProductUpdateManyWithoutSalesOrderNestedInput = {
    create?: XOR<SalesOrderProductCreateWithoutSalesOrderInput, SalesOrderProductUncheckedCreateWithoutSalesOrderInput> | SalesOrderProductCreateWithoutSalesOrderInput[] | SalesOrderProductUncheckedCreateWithoutSalesOrderInput[]
    connectOrCreate?: SalesOrderProductCreateOrConnectWithoutSalesOrderInput | SalesOrderProductCreateOrConnectWithoutSalesOrderInput[]
    upsert?: SalesOrderProductUpsertWithWhereUniqueWithoutSalesOrderInput | SalesOrderProductUpsertWithWhereUniqueWithoutSalesOrderInput[]
    createMany?: SalesOrderProductCreateManySalesOrderInputEnvelope
    set?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    disconnect?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    delete?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    connect?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    update?: SalesOrderProductUpdateWithWhereUniqueWithoutSalesOrderInput | SalesOrderProductUpdateWithWhereUniqueWithoutSalesOrderInput[]
    updateMany?: SalesOrderProductUpdateManyWithWhereWithoutSalesOrderInput | SalesOrderProductUpdateManyWithWhereWithoutSalesOrderInput[]
    deleteMany?: SalesOrderProductScalarWhereInput | SalesOrderProductScalarWhereInput[]
  }

  export type SPKUpdateOneWithoutSales_OrderNestedInput = {
    create?: XOR<SPKCreateWithoutSales_OrderInput, SPKUncheckedCreateWithoutSales_OrderInput>
    connectOrCreate?: SPKCreateOrConnectWithoutSales_OrderInput
    upsert?: SPKUpsertWithoutSales_OrderInput
    disconnect?: SPKWhereInput | boolean
    delete?: SPKWhereInput | boolean
    connect?: SPKWhereUniqueInput
    update?: XOR<XOR<SPKUpdateToOneWithWhereWithoutSales_OrderInput, SPKUpdateWithoutSales_OrderInput>, SPKUncheckedUpdateWithoutSales_OrderInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type SalesOrderProductUncheckedUpdateManyWithoutSalesOrderNestedInput = {
    create?: XOR<SalesOrderProductCreateWithoutSalesOrderInput, SalesOrderProductUncheckedCreateWithoutSalesOrderInput> | SalesOrderProductCreateWithoutSalesOrderInput[] | SalesOrderProductUncheckedCreateWithoutSalesOrderInput[]
    connectOrCreate?: SalesOrderProductCreateOrConnectWithoutSalesOrderInput | SalesOrderProductCreateOrConnectWithoutSalesOrderInput[]
    upsert?: SalesOrderProductUpsertWithWhereUniqueWithoutSalesOrderInput | SalesOrderProductUpsertWithWhereUniqueWithoutSalesOrderInput[]
    createMany?: SalesOrderProductCreateManySalesOrderInputEnvelope
    set?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    disconnect?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    delete?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    connect?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    update?: SalesOrderProductUpdateWithWhereUniqueWithoutSalesOrderInput | SalesOrderProductUpdateWithWhereUniqueWithoutSalesOrderInput[]
    updateMany?: SalesOrderProductUpdateManyWithWhereWithoutSalesOrderInput | SalesOrderProductUpdateManyWithWhereWithoutSalesOrderInput[]
    deleteMany?: SalesOrderProductScalarWhereInput | SalesOrderProductScalarWhereInput[]
  }

  export type Sales_OrderCreateNestedOneWithoutSpkInput = {
    create?: XOR<Sales_OrderCreateWithoutSpkInput, Sales_OrderUncheckedCreateWithoutSpkInput>
    connectOrCreate?: Sales_OrderCreateOrConnectWithoutSpkInput
    connect?: Sales_OrderWhereUniqueInput
  }

  export type Sales_OrderUncheckedCreateNestedOneWithoutSpkInput = {
    create?: XOR<Sales_OrderCreateWithoutSpkInput, Sales_OrderUncheckedCreateWithoutSpkInput>
    connectOrCreate?: Sales_OrderCreateOrConnectWithoutSpkInput
    connect?: Sales_OrderWhereUniqueInput
  }

  export type Sales_OrderUpdateOneWithoutSpkNestedInput = {
    create?: XOR<Sales_OrderCreateWithoutSpkInput, Sales_OrderUncheckedCreateWithoutSpkInput>
    connectOrCreate?: Sales_OrderCreateOrConnectWithoutSpkInput
    upsert?: Sales_OrderUpsertWithoutSpkInput
    disconnect?: Sales_OrderWhereInput | boolean
    delete?: Sales_OrderWhereInput | boolean
    connect?: Sales_OrderWhereUniqueInput
    update?: XOR<XOR<Sales_OrderUpdateToOneWithWhereWithoutSpkInput, Sales_OrderUpdateWithoutSpkInput>, Sales_OrderUncheckedUpdateWithoutSpkInput>
  }

  export type Sales_OrderUncheckedUpdateOneWithoutSpkNestedInput = {
    create?: XOR<Sales_OrderCreateWithoutSpkInput, Sales_OrderUncheckedCreateWithoutSpkInput>
    connectOrCreate?: Sales_OrderCreateOrConnectWithoutSpkInput
    upsert?: Sales_OrderUpsertWithoutSpkInput
    disconnect?: Sales_OrderWhereInput | boolean
    delete?: Sales_OrderWhereInput | boolean
    connect?: Sales_OrderWhereUniqueInput
    update?: XOR<XOR<Sales_OrderUpdateToOneWithWhereWithoutSpkInput, Sales_OrderUpdateWithoutSpkInput>, Sales_OrderUncheckedUpdateWithoutSpkInput>
  }

  export type ProductMaterialCreateNestedManyWithoutMaterialInput = {
    create?: XOR<ProductMaterialCreateWithoutMaterialInput, ProductMaterialUncheckedCreateWithoutMaterialInput> | ProductMaterialCreateWithoutMaterialInput[] | ProductMaterialUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: ProductMaterialCreateOrConnectWithoutMaterialInput | ProductMaterialCreateOrConnectWithoutMaterialInput[]
    createMany?: ProductMaterialCreateManyMaterialInputEnvelope
    connect?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
  }

  export type ProductMaterialUncheckedCreateNestedManyWithoutMaterialInput = {
    create?: XOR<ProductMaterialCreateWithoutMaterialInput, ProductMaterialUncheckedCreateWithoutMaterialInput> | ProductMaterialCreateWithoutMaterialInput[] | ProductMaterialUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: ProductMaterialCreateOrConnectWithoutMaterialInput | ProductMaterialCreateOrConnectWithoutMaterialInput[]
    createMany?: ProductMaterialCreateManyMaterialInputEnvelope
    connect?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
  }

  export type ProductMaterialUpdateManyWithoutMaterialNestedInput = {
    create?: XOR<ProductMaterialCreateWithoutMaterialInput, ProductMaterialUncheckedCreateWithoutMaterialInput> | ProductMaterialCreateWithoutMaterialInput[] | ProductMaterialUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: ProductMaterialCreateOrConnectWithoutMaterialInput | ProductMaterialCreateOrConnectWithoutMaterialInput[]
    upsert?: ProductMaterialUpsertWithWhereUniqueWithoutMaterialInput | ProductMaterialUpsertWithWhereUniqueWithoutMaterialInput[]
    createMany?: ProductMaterialCreateManyMaterialInputEnvelope
    set?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    disconnect?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    delete?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    connect?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    update?: ProductMaterialUpdateWithWhereUniqueWithoutMaterialInput | ProductMaterialUpdateWithWhereUniqueWithoutMaterialInput[]
    updateMany?: ProductMaterialUpdateManyWithWhereWithoutMaterialInput | ProductMaterialUpdateManyWithWhereWithoutMaterialInput[]
    deleteMany?: ProductMaterialScalarWhereInput | ProductMaterialScalarWhereInput[]
  }

  export type ProductMaterialUncheckedUpdateManyWithoutMaterialNestedInput = {
    create?: XOR<ProductMaterialCreateWithoutMaterialInput, ProductMaterialUncheckedCreateWithoutMaterialInput> | ProductMaterialCreateWithoutMaterialInput[] | ProductMaterialUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: ProductMaterialCreateOrConnectWithoutMaterialInput | ProductMaterialCreateOrConnectWithoutMaterialInput[]
    upsert?: ProductMaterialUpsertWithWhereUniqueWithoutMaterialInput | ProductMaterialUpsertWithWhereUniqueWithoutMaterialInput[]
    createMany?: ProductMaterialCreateManyMaterialInputEnvelope
    set?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    disconnect?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    delete?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    connect?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    update?: ProductMaterialUpdateWithWhereUniqueWithoutMaterialInput | ProductMaterialUpdateWithWhereUniqueWithoutMaterialInput[]
    updateMany?: ProductMaterialUpdateManyWithWhereWithoutMaterialInput | ProductMaterialUpdateManyWithWhereWithoutMaterialInput[]
    deleteMany?: ProductMaterialScalarWhereInput | ProductMaterialScalarWhereInput[]
  }

  export type ProductMaterialCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductMaterialCreateWithoutProductInput, ProductMaterialUncheckedCreateWithoutProductInput> | ProductMaterialCreateWithoutProductInput[] | ProductMaterialUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductMaterialCreateOrConnectWithoutProductInput | ProductMaterialCreateOrConnectWithoutProductInput[]
    createMany?: ProductMaterialCreateManyProductInputEnvelope
    connect?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
  }

  export type SalesOrderProductCreateNestedManyWithoutProductInput = {
    create?: XOR<SalesOrderProductCreateWithoutProductInput, SalesOrderProductUncheckedCreateWithoutProductInput> | SalesOrderProductCreateWithoutProductInput[] | SalesOrderProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SalesOrderProductCreateOrConnectWithoutProductInput | SalesOrderProductCreateOrConnectWithoutProductInput[]
    createMany?: SalesOrderProductCreateManyProductInputEnvelope
    connect?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
  }

  export type ProductMaterialUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductMaterialCreateWithoutProductInput, ProductMaterialUncheckedCreateWithoutProductInput> | ProductMaterialCreateWithoutProductInput[] | ProductMaterialUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductMaterialCreateOrConnectWithoutProductInput | ProductMaterialCreateOrConnectWithoutProductInput[]
    createMany?: ProductMaterialCreateManyProductInputEnvelope
    connect?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
  }

  export type SalesOrderProductUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<SalesOrderProductCreateWithoutProductInput, SalesOrderProductUncheckedCreateWithoutProductInput> | SalesOrderProductCreateWithoutProductInput[] | SalesOrderProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SalesOrderProductCreateOrConnectWithoutProductInput | SalesOrderProductCreateOrConnectWithoutProductInput[]
    createMany?: SalesOrderProductCreateManyProductInputEnvelope
    connect?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
  }

  export type ProductMaterialUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductMaterialCreateWithoutProductInput, ProductMaterialUncheckedCreateWithoutProductInput> | ProductMaterialCreateWithoutProductInput[] | ProductMaterialUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductMaterialCreateOrConnectWithoutProductInput | ProductMaterialCreateOrConnectWithoutProductInput[]
    upsert?: ProductMaterialUpsertWithWhereUniqueWithoutProductInput | ProductMaterialUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductMaterialCreateManyProductInputEnvelope
    set?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    disconnect?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    delete?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    connect?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    update?: ProductMaterialUpdateWithWhereUniqueWithoutProductInput | ProductMaterialUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductMaterialUpdateManyWithWhereWithoutProductInput | ProductMaterialUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductMaterialScalarWhereInput | ProductMaterialScalarWhereInput[]
  }

  export type SalesOrderProductUpdateManyWithoutProductNestedInput = {
    create?: XOR<SalesOrderProductCreateWithoutProductInput, SalesOrderProductUncheckedCreateWithoutProductInput> | SalesOrderProductCreateWithoutProductInput[] | SalesOrderProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SalesOrderProductCreateOrConnectWithoutProductInput | SalesOrderProductCreateOrConnectWithoutProductInput[]
    upsert?: SalesOrderProductUpsertWithWhereUniqueWithoutProductInput | SalesOrderProductUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SalesOrderProductCreateManyProductInputEnvelope
    set?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    disconnect?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    delete?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    connect?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    update?: SalesOrderProductUpdateWithWhereUniqueWithoutProductInput | SalesOrderProductUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SalesOrderProductUpdateManyWithWhereWithoutProductInput | SalesOrderProductUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SalesOrderProductScalarWhereInput | SalesOrderProductScalarWhereInput[]
  }

  export type ProductMaterialUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductMaterialCreateWithoutProductInput, ProductMaterialUncheckedCreateWithoutProductInput> | ProductMaterialCreateWithoutProductInput[] | ProductMaterialUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductMaterialCreateOrConnectWithoutProductInput | ProductMaterialCreateOrConnectWithoutProductInput[]
    upsert?: ProductMaterialUpsertWithWhereUniqueWithoutProductInput | ProductMaterialUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductMaterialCreateManyProductInputEnvelope
    set?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    disconnect?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    delete?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    connect?: ProductMaterialWhereUniqueInput | ProductMaterialWhereUniqueInput[]
    update?: ProductMaterialUpdateWithWhereUniqueWithoutProductInput | ProductMaterialUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductMaterialUpdateManyWithWhereWithoutProductInput | ProductMaterialUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductMaterialScalarWhereInput | ProductMaterialScalarWhereInput[]
  }

  export type SalesOrderProductUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<SalesOrderProductCreateWithoutProductInput, SalesOrderProductUncheckedCreateWithoutProductInput> | SalesOrderProductCreateWithoutProductInput[] | SalesOrderProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SalesOrderProductCreateOrConnectWithoutProductInput | SalesOrderProductCreateOrConnectWithoutProductInput[]
    upsert?: SalesOrderProductUpsertWithWhereUniqueWithoutProductInput | SalesOrderProductUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SalesOrderProductCreateManyProductInputEnvelope
    set?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    disconnect?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    delete?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    connect?: SalesOrderProductWhereUniqueInput | SalesOrderProductWhereUniqueInput[]
    update?: SalesOrderProductUpdateWithWhereUniqueWithoutProductInput | SalesOrderProductUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SalesOrderProductUpdateManyWithWhereWithoutProductInput | SalesOrderProductUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SalesOrderProductScalarWhereInput | SalesOrderProductScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutMaterialsInput = {
    create?: XOR<ProductCreateWithoutMaterialsInput, ProductUncheckedCreateWithoutMaterialsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutMaterialsInput
    connect?: ProductWhereUniqueInput
  }

  export type MaterialCreateNestedOneWithoutProductsInput = {
    create?: XOR<MaterialCreateWithoutProductsInput, MaterialUncheckedCreateWithoutProductsInput>
    connectOrCreate?: MaterialCreateOrConnectWithoutProductsInput
    connect?: MaterialWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutMaterialsNestedInput = {
    create?: XOR<ProductCreateWithoutMaterialsInput, ProductUncheckedCreateWithoutMaterialsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutMaterialsInput
    upsert?: ProductUpsertWithoutMaterialsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutMaterialsInput, ProductUpdateWithoutMaterialsInput>, ProductUncheckedUpdateWithoutMaterialsInput>
  }

  export type MaterialUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<MaterialCreateWithoutProductsInput, MaterialUncheckedCreateWithoutProductsInput>
    connectOrCreate?: MaterialCreateOrConnectWithoutProductsInput
    upsert?: MaterialUpsertWithoutProductsInput
    connect?: MaterialWhereUniqueInput
    update?: XOR<XOR<MaterialUpdateToOneWithWhereWithoutProductsInput, MaterialUpdateWithoutProductsInput>, MaterialUncheckedUpdateWithoutProductsInput>
  }

  export type Sales_OrderCreateNestedOneWithoutProductsInput = {
    create?: XOR<Sales_OrderCreateWithoutProductsInput, Sales_OrderUncheckedCreateWithoutProductsInput>
    connectOrCreate?: Sales_OrderCreateOrConnectWithoutProductsInput
    connect?: Sales_OrderWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutSalesOrdersInput = {
    create?: XOR<ProductCreateWithoutSalesOrdersInput, ProductUncheckedCreateWithoutSalesOrdersInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSalesOrdersInput
    connect?: ProductWhereUniqueInput
  }

  export type Sales_OrderUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<Sales_OrderCreateWithoutProductsInput, Sales_OrderUncheckedCreateWithoutProductsInput>
    connectOrCreate?: Sales_OrderCreateOrConnectWithoutProductsInput
    upsert?: Sales_OrderUpsertWithoutProductsInput
    connect?: Sales_OrderWhereUniqueInput
    update?: XOR<XOR<Sales_OrderUpdateToOneWithWhereWithoutProductsInput, Sales_OrderUpdateWithoutProductsInput>, Sales_OrderUncheckedUpdateWithoutProductsInput>
  }

  export type ProductUpdateOneRequiredWithoutSalesOrdersNestedInput = {
    create?: XOR<ProductCreateWithoutSalesOrdersInput, ProductUncheckedCreateWithoutSalesOrdersInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSalesOrdersInput
    upsert?: ProductUpsertWithoutSalesOrdersInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutSalesOrdersInput, ProductUpdateWithoutSalesOrdersInput>, ProductUncheckedUpdateWithoutSalesOrdersInput>
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

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SalesOrderProductCreateWithoutSalesOrderInput = {
    id?: string
    product_qty: number
    price: number
    product: ProductCreateNestedOneWithoutSalesOrdersInput
  }

  export type SalesOrderProductUncheckedCreateWithoutSalesOrderInput = {
    id?: string
    productId: string
    product_qty: number
    price: number
  }

  export type SalesOrderProductCreateOrConnectWithoutSalesOrderInput = {
    where: SalesOrderProductWhereUniqueInput
    create: XOR<SalesOrderProductCreateWithoutSalesOrderInput, SalesOrderProductUncheckedCreateWithoutSalesOrderInput>
  }

  export type SalesOrderProductCreateManySalesOrderInputEnvelope = {
    data: SalesOrderProductCreateManySalesOrderInput | SalesOrderProductCreateManySalesOrderInput[]
    skipDuplicates?: boolean
  }

  export type SPKCreateWithoutSales_OrderInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SPKUncheckedCreateWithoutSales_OrderInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SPKCreateOrConnectWithoutSales_OrderInput = {
    where: SPKWhereUniqueInput
    create: XOR<SPKCreateWithoutSales_OrderInput, SPKUncheckedCreateWithoutSales_OrderInput>
  }

  export type SalesOrderProductUpsertWithWhereUniqueWithoutSalesOrderInput = {
    where: SalesOrderProductWhereUniqueInput
    update: XOR<SalesOrderProductUpdateWithoutSalesOrderInput, SalesOrderProductUncheckedUpdateWithoutSalesOrderInput>
    create: XOR<SalesOrderProductCreateWithoutSalesOrderInput, SalesOrderProductUncheckedCreateWithoutSalesOrderInput>
  }

  export type SalesOrderProductUpdateWithWhereUniqueWithoutSalesOrderInput = {
    where: SalesOrderProductWhereUniqueInput
    data: XOR<SalesOrderProductUpdateWithoutSalesOrderInput, SalesOrderProductUncheckedUpdateWithoutSalesOrderInput>
  }

  export type SalesOrderProductUpdateManyWithWhereWithoutSalesOrderInput = {
    where: SalesOrderProductScalarWhereInput
    data: XOR<SalesOrderProductUpdateManyMutationInput, SalesOrderProductUncheckedUpdateManyWithoutSalesOrderInput>
  }

  export type SalesOrderProductScalarWhereInput = {
    AND?: SalesOrderProductScalarWhereInput | SalesOrderProductScalarWhereInput[]
    OR?: SalesOrderProductScalarWhereInput[]
    NOT?: SalesOrderProductScalarWhereInput | SalesOrderProductScalarWhereInput[]
    id?: StringFilter<"SalesOrderProduct"> | string
    salesOrderId?: StringFilter<"SalesOrderProduct"> | string
    productId?: StringFilter<"SalesOrderProduct"> | string
    product_qty?: IntFilter<"SalesOrderProduct"> | number
    price?: IntFilter<"SalesOrderProduct"> | number
  }

  export type SPKUpsertWithoutSales_OrderInput = {
    update: XOR<SPKUpdateWithoutSales_OrderInput, SPKUncheckedUpdateWithoutSales_OrderInput>
    create: XOR<SPKCreateWithoutSales_OrderInput, SPKUncheckedCreateWithoutSales_OrderInput>
    where?: SPKWhereInput
  }

  export type SPKUpdateToOneWithWhereWithoutSales_OrderInput = {
    where?: SPKWhereInput
    data: XOR<SPKUpdateWithoutSales_OrderInput, SPKUncheckedUpdateWithoutSales_OrderInput>
  }

  export type SPKUpdateWithoutSales_OrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SPKUncheckedUpdateWithoutSales_OrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Sales_OrderCreateWithoutSpkInput = {
    id?: string
    customer_name: string
    product_qty: number
    finish_date: Date | string
    delivery_date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: SalesOrderProductCreateNestedManyWithoutSalesOrderInput
  }

  export type Sales_OrderUncheckedCreateWithoutSpkInput = {
    id?: string
    customer_name: string
    product_qty: number
    finish_date: Date | string
    delivery_date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: SalesOrderProductUncheckedCreateNestedManyWithoutSalesOrderInput
  }

  export type Sales_OrderCreateOrConnectWithoutSpkInput = {
    where: Sales_OrderWhereUniqueInput
    create: XOR<Sales_OrderCreateWithoutSpkInput, Sales_OrderUncheckedCreateWithoutSpkInput>
  }

  export type Sales_OrderUpsertWithoutSpkInput = {
    update: XOR<Sales_OrderUpdateWithoutSpkInput, Sales_OrderUncheckedUpdateWithoutSpkInput>
    create: XOR<Sales_OrderCreateWithoutSpkInput, Sales_OrderUncheckedCreateWithoutSpkInput>
    where?: Sales_OrderWhereInput
  }

  export type Sales_OrderUpdateToOneWithWhereWithoutSpkInput = {
    where?: Sales_OrderWhereInput
    data: XOR<Sales_OrderUpdateWithoutSpkInput, Sales_OrderUncheckedUpdateWithoutSpkInput>
  }

  export type Sales_OrderUpdateWithoutSpkInput = {
    id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    finish_date?: DateTimeFieldUpdateOperationsInput | Date | string
    delivery_date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: SalesOrderProductUpdateManyWithoutSalesOrderNestedInput
  }

  export type Sales_OrderUncheckedUpdateWithoutSpkInput = {
    id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    finish_date?: DateTimeFieldUpdateOperationsInput | Date | string
    delivery_date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: SalesOrderProductUncheckedUpdateManyWithoutSalesOrderNestedInput
  }

  export type ProductMaterialCreateWithoutMaterialInput = {
    id?: string
    stock_needed: number
    product: ProductCreateNestedOneWithoutMaterialsInput
  }

  export type ProductMaterialUncheckedCreateWithoutMaterialInput = {
    id?: string
    productId: string
    stock_needed: number
  }

  export type ProductMaterialCreateOrConnectWithoutMaterialInput = {
    where: ProductMaterialWhereUniqueInput
    create: XOR<ProductMaterialCreateWithoutMaterialInput, ProductMaterialUncheckedCreateWithoutMaterialInput>
  }

  export type ProductMaterialCreateManyMaterialInputEnvelope = {
    data: ProductMaterialCreateManyMaterialInput | ProductMaterialCreateManyMaterialInput[]
    skipDuplicates?: boolean
  }

  export type ProductMaterialUpsertWithWhereUniqueWithoutMaterialInput = {
    where: ProductMaterialWhereUniqueInput
    update: XOR<ProductMaterialUpdateWithoutMaterialInput, ProductMaterialUncheckedUpdateWithoutMaterialInput>
    create: XOR<ProductMaterialCreateWithoutMaterialInput, ProductMaterialUncheckedCreateWithoutMaterialInput>
  }

  export type ProductMaterialUpdateWithWhereUniqueWithoutMaterialInput = {
    where: ProductMaterialWhereUniqueInput
    data: XOR<ProductMaterialUpdateWithoutMaterialInput, ProductMaterialUncheckedUpdateWithoutMaterialInput>
  }

  export type ProductMaterialUpdateManyWithWhereWithoutMaterialInput = {
    where: ProductMaterialScalarWhereInput
    data: XOR<ProductMaterialUpdateManyMutationInput, ProductMaterialUncheckedUpdateManyWithoutMaterialInput>
  }

  export type ProductMaterialScalarWhereInput = {
    AND?: ProductMaterialScalarWhereInput | ProductMaterialScalarWhereInput[]
    OR?: ProductMaterialScalarWhereInput[]
    NOT?: ProductMaterialScalarWhereInput | ProductMaterialScalarWhereInput[]
    id?: StringFilter<"ProductMaterial"> | string
    productId?: StringFilter<"ProductMaterial"> | string
    materialId?: StringFilter<"ProductMaterial"> | string
    stock_needed?: IntFilter<"ProductMaterial"> | number
  }

  export type ProductMaterialCreateWithoutProductInput = {
    id?: string
    stock_needed: number
    material: MaterialCreateNestedOneWithoutProductsInput
  }

  export type ProductMaterialUncheckedCreateWithoutProductInput = {
    id?: string
    materialId: string
    stock_needed: number
  }

  export type ProductMaterialCreateOrConnectWithoutProductInput = {
    where: ProductMaterialWhereUniqueInput
    create: XOR<ProductMaterialCreateWithoutProductInput, ProductMaterialUncheckedCreateWithoutProductInput>
  }

  export type ProductMaterialCreateManyProductInputEnvelope = {
    data: ProductMaterialCreateManyProductInput | ProductMaterialCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type SalesOrderProductCreateWithoutProductInput = {
    id?: string
    product_qty: number
    price: number
    salesOrder: Sales_OrderCreateNestedOneWithoutProductsInput
  }

  export type SalesOrderProductUncheckedCreateWithoutProductInput = {
    id?: string
    salesOrderId: string
    product_qty: number
    price: number
  }

  export type SalesOrderProductCreateOrConnectWithoutProductInput = {
    where: SalesOrderProductWhereUniqueInput
    create: XOR<SalesOrderProductCreateWithoutProductInput, SalesOrderProductUncheckedCreateWithoutProductInput>
  }

  export type SalesOrderProductCreateManyProductInputEnvelope = {
    data: SalesOrderProductCreateManyProductInput | SalesOrderProductCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductMaterialUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductMaterialWhereUniqueInput
    update: XOR<ProductMaterialUpdateWithoutProductInput, ProductMaterialUncheckedUpdateWithoutProductInput>
    create: XOR<ProductMaterialCreateWithoutProductInput, ProductMaterialUncheckedCreateWithoutProductInput>
  }

  export type ProductMaterialUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductMaterialWhereUniqueInput
    data: XOR<ProductMaterialUpdateWithoutProductInput, ProductMaterialUncheckedUpdateWithoutProductInput>
  }

  export type ProductMaterialUpdateManyWithWhereWithoutProductInput = {
    where: ProductMaterialScalarWhereInput
    data: XOR<ProductMaterialUpdateManyMutationInput, ProductMaterialUncheckedUpdateManyWithoutProductInput>
  }

  export type SalesOrderProductUpsertWithWhereUniqueWithoutProductInput = {
    where: SalesOrderProductWhereUniqueInput
    update: XOR<SalesOrderProductUpdateWithoutProductInput, SalesOrderProductUncheckedUpdateWithoutProductInput>
    create: XOR<SalesOrderProductCreateWithoutProductInput, SalesOrderProductUncheckedCreateWithoutProductInput>
  }

  export type SalesOrderProductUpdateWithWhereUniqueWithoutProductInput = {
    where: SalesOrderProductWhereUniqueInput
    data: XOR<SalesOrderProductUpdateWithoutProductInput, SalesOrderProductUncheckedUpdateWithoutProductInput>
  }

  export type SalesOrderProductUpdateManyWithWhereWithoutProductInput = {
    where: SalesOrderProductScalarWhereInput
    data: XOR<SalesOrderProductUpdateManyMutationInput, SalesOrderProductUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductCreateWithoutMaterialsInput = {
    id?: string
    product_name: string
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
    salesOrders?: SalesOrderProductCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutMaterialsInput = {
    id?: string
    product_name: string
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
    salesOrders?: SalesOrderProductUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutMaterialsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutMaterialsInput, ProductUncheckedCreateWithoutMaterialsInput>
  }

  export type MaterialCreateWithoutProductsInput = {
    id?: string
    material_name: string
    price: number
    stock: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialUncheckedCreateWithoutProductsInput = {
    id?: string
    material_name: string
    price: number
    stock: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialCreateOrConnectWithoutProductsInput = {
    where: MaterialWhereUniqueInput
    create: XOR<MaterialCreateWithoutProductsInput, MaterialUncheckedCreateWithoutProductsInput>
  }

  export type ProductUpsertWithoutMaterialsInput = {
    update: XOR<ProductUpdateWithoutMaterialsInput, ProductUncheckedUpdateWithoutMaterialsInput>
    create: XOR<ProductCreateWithoutMaterialsInput, ProductUncheckedCreateWithoutMaterialsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutMaterialsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutMaterialsInput, ProductUncheckedUpdateWithoutMaterialsInput>
  }

  export type ProductUpdateWithoutMaterialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    salesOrders?: SalesOrderProductUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutMaterialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    salesOrders?: SalesOrderProductUncheckedUpdateManyWithoutProductNestedInput
  }

  export type MaterialUpsertWithoutProductsInput = {
    update: XOR<MaterialUpdateWithoutProductsInput, MaterialUncheckedUpdateWithoutProductsInput>
    create: XOR<MaterialCreateWithoutProductsInput, MaterialUncheckedCreateWithoutProductsInput>
    where?: MaterialWhereInput
  }

  export type MaterialUpdateToOneWithWhereWithoutProductsInput = {
    where?: MaterialWhereInput
    data: XOR<MaterialUpdateWithoutProductsInput, MaterialUncheckedUpdateWithoutProductsInput>
  }

  export type MaterialUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    material_name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    material_name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Sales_OrderCreateWithoutProductsInput = {
    id?: string
    customer_name: string
    product_qty: number
    finish_date: Date | string
    delivery_date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    spk?: SPKCreateNestedOneWithoutSales_OrderInput
  }

  export type Sales_OrderUncheckedCreateWithoutProductsInput = {
    id?: string
    customer_name: string
    product_qty: number
    finish_date: Date | string
    delivery_date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    spkId?: string | null
  }

  export type Sales_OrderCreateOrConnectWithoutProductsInput = {
    where: Sales_OrderWhereUniqueInput
    create: XOR<Sales_OrderCreateWithoutProductsInput, Sales_OrderUncheckedCreateWithoutProductsInput>
  }

  export type ProductCreateWithoutSalesOrdersInput = {
    id?: string
    product_name: string
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
    materials?: ProductMaterialCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutSalesOrdersInput = {
    id?: string
    product_name: string
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
    materials?: ProductMaterialUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutSalesOrdersInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSalesOrdersInput, ProductUncheckedCreateWithoutSalesOrdersInput>
  }

  export type Sales_OrderUpsertWithoutProductsInput = {
    update: XOR<Sales_OrderUpdateWithoutProductsInput, Sales_OrderUncheckedUpdateWithoutProductsInput>
    create: XOR<Sales_OrderCreateWithoutProductsInput, Sales_OrderUncheckedCreateWithoutProductsInput>
    where?: Sales_OrderWhereInput
  }

  export type Sales_OrderUpdateToOneWithWhereWithoutProductsInput = {
    where?: Sales_OrderWhereInput
    data: XOR<Sales_OrderUpdateWithoutProductsInput, Sales_OrderUncheckedUpdateWithoutProductsInput>
  }

  export type Sales_OrderUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    finish_date?: DateTimeFieldUpdateOperationsInput | Date | string
    delivery_date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    spk?: SPKUpdateOneWithoutSales_OrderNestedInput
  }

  export type Sales_OrderUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    finish_date?: DateTimeFieldUpdateOperationsInput | Date | string
    delivery_date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    spkId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductUpsertWithoutSalesOrdersInput = {
    update: XOR<ProductUpdateWithoutSalesOrdersInput, ProductUncheckedUpdateWithoutSalesOrdersInput>
    create: XOR<ProductCreateWithoutSalesOrdersInput, ProductUncheckedCreateWithoutSalesOrdersInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutSalesOrdersInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutSalesOrdersInput, ProductUncheckedUpdateWithoutSalesOrdersInput>
  }

  export type ProductUpdateWithoutSalesOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    materials?: ProductMaterialUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutSalesOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    materials?: ProductMaterialUncheckedUpdateManyWithoutProductNestedInput
  }

  export type SalesOrderProductCreateManySalesOrderInput = {
    id?: string
    productId: string
    product_qty: number
    price: number
  }

  export type SalesOrderProductUpdateWithoutSalesOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutSalesOrdersNestedInput
  }

  export type SalesOrderProductUncheckedUpdateWithoutSalesOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
  }

  export type SalesOrderProductUncheckedUpdateManyWithoutSalesOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
  }

  export type ProductMaterialCreateManyMaterialInput = {
    id?: string
    productId: string
    stock_needed: number
  }

  export type ProductMaterialUpdateWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    stock_needed?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutMaterialsNestedInput
  }

  export type ProductMaterialUncheckedUpdateWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    stock_needed?: IntFieldUpdateOperationsInput | number
  }

  export type ProductMaterialUncheckedUpdateManyWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    stock_needed?: IntFieldUpdateOperationsInput | number
  }

  export type ProductMaterialCreateManyProductInput = {
    id?: string
    materialId: string
    stock_needed: number
  }

  export type SalesOrderProductCreateManyProductInput = {
    id?: string
    salesOrderId: string
    product_qty: number
    price: number
  }

  export type ProductMaterialUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    stock_needed?: IntFieldUpdateOperationsInput | number
    material?: MaterialUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductMaterialUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    materialId?: StringFieldUpdateOperationsInput | string
    stock_needed?: IntFieldUpdateOperationsInput | number
  }

  export type ProductMaterialUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    materialId?: StringFieldUpdateOperationsInput | string
    stock_needed?: IntFieldUpdateOperationsInput | number
  }

  export type SalesOrderProductUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    salesOrder?: Sales_OrderUpdateOneRequiredWithoutProductsNestedInput
  }

  export type SalesOrderProductUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    salesOrderId?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
  }

  export type SalesOrderProductUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    salesOrderId?: StringFieldUpdateOperationsInput | string
    product_qty?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
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