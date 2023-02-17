import { render } from 'src/test/utils'

import AppLayout from './AppLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AppLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <AppLayout>
          <p>content</p>
        </AppLayout>
      )
    }).not.toThrow()
  })
})
