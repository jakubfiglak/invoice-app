import { useTheme } from 'src/providers/theme/ThemeContext'
import { testIds } from 'src/test/ids'

import MoonIcon from '../../assets/moon.svg'
import SunIcon from '../../assets/sun.svg'

interface IThemeSwitchProps {
  className?: string
}

const ThemeSwitch = ({ className }: IThemeSwitchProps) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme} className={className}>
      {theme === 'light' ? (
        <MoonIcon data-testid={testIds.darkModeIcon} />
      ) : (
        <SunIcon data-testid={testIds.lightModeIcon} />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

export default ThemeSwitch
