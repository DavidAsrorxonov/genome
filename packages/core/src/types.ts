/**
 * Represents a resolved Genome token value.
 */
export type Primitive = string | number;

/**
 * Stores runtime values that derived tokens can react to.
 */
export interface RuntimeContext {
  [key: string]: unknown;
}

/**
 * Provides resolved token values to derived token functions.
 */
export type DNAReader = Record<string, Primitive>;

/**
 * Computes a derived token from resolved DNA and runtime context.
 */
export type TokenFn = (dna: DNAReader, context: RuntimeContext) => Primitive;

/**
 * Defines a token as either a primitive value or a derived token function.
 */
export type TokenDefinition = Primitive | TokenFn;

/**
 * Describes the primitive and derived tokens used to create a Genome.
 */
export interface GenomeConfig {
  primitives: Record<string, Primitive>;
  tokens: Record<string, TokenDefinition>;
}

/**
 * Represents runtime context changes passed into Genome mutation APIs.
 */
export type Mutator = RuntimeContext;
