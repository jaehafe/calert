import { forwardRef, ReactNode } from 'react'

import { HTMLMotionProps, motion } from 'framer-motion'
import theme from '@renderer/styles/theme'

interface MotionDivProps extends HTMLMotionProps<'div'> {
  children: ReactNode
}

const whileHoverEffect = {
  scale: 1.02,
  backgroundColor: theme.colors.colorFillTertiary
}

const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(({ children, ...props }, ref) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      ref={ref}
      {...props}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      {children}
    </motion.div>
  )
})

export { MotionDiv, whileHoverEffect }
