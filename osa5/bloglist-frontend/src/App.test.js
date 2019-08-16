import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    // expectations here
    expect(component.container).not.toHaveTextContent('Test-title')
    expect(component.container).not.toHaveTextContent('Perttu Punakallio')
    expect(component.container).not.toHaveTextContent('Nothing')
    expect(component.container).not.toHaveTextContent('Nobody')
    expect(component.container).toHaveTextContent('username')
    expect(component.container).toHaveTextContent('password')
  })
})