import { colors } from './colors'

const theme: {
  colors: typeof colors
} = {
  colors
} as const

export type ThemeType = typeof theme

export default theme
