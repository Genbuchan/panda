import type * as CSS from 'csstype'
import type { Loose } from './shared'

type CSSVarFunction = `var(--${string})` | `var(--${string}, ${string | number})`

export type Properties = CSS.PropertiesFallback<number | Loose>

export type CSSProperty = keyof Properties

export type CSSProperties = {
  [Property in keyof Properties]: Properties[Property] | CSSVarFunction
} & {
  [key in `--${string}`]: string | undefined
}

export type CSSKeyframes = {
  [time: string]: {
    [T in Loose | 'from' | 'to']?: CSSProperties
  }
}

export type PseudoProperty = `&${CSS.SimplePseudos}`

// TODO: Make this recursive condition
export type PandaCSSProperties = CSSProperties & {
  selectors?: {
    [key in PseudoProperty]?: CSSProperties
  } & {
    [key: string]: CSSProperties
  }
  '@media'?: {
    [query: string]: CSSProperties
  }
}
