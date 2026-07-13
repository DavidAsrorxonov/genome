export type Primitive = string | number;

export interface RuntimeContext {
  [key: string]: unknown;
}

export type DNAReader = Record<string, Primitive>;

export type TokenFn = (dna: DNAReader, context: RuntimeContext) => Primitive;

export type TokenDefinition = Primitive | TokenFn;

export interface GenomeConfig {
  primitives: Record<string, Primitive>;
  tokens: Record<string, TokenDefinition>;
}

export type Mutator = RuntimeContext;
