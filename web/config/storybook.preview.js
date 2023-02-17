import React from 'react'

import { ThemeProvider } from 'web/src/providers/theme/ThemeContext'

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
]
