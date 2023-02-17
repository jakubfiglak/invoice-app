import { render } from 'src/test/utils'

import UserAvatar from './UserAvatar'

describe('UserAvatar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserAvatar />)
    }).not.toThrow()
  })
})
