import { useTheme } from 'src/providers/theme/ThemeContext'

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
        <MoonIcon data-testid="moon-icon" />
      ) : (
        <SunIcon data-testid="sun-icon" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

export default ThemeSwitch
