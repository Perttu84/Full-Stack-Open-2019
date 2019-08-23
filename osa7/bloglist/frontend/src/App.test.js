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

    expect(component.container).not.toHaveTextContent('Test-title')
    expect(component.container).not.toHaveTextContent('Perttu Punakallio')
    expect(component.container).not.toHaveTextContent('Nothing')
    expect(component.container).not.toHaveTextContent('Nobody')
    expect(component.container).toHaveTextContent('username')
    expect(component.container).toHaveTextContent('password')
  })

  test('if user is logged in blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('blogs')
    )

    expect(component.container).toHaveTextContent('Test-title')
    expect(component.container).toHaveTextContent('Perttu Punakallio')
    expect(component.container).toHaveTextContent('Nothing')
    expect(component.container).toHaveTextContent('Nobody')
    expect(component.container).not.toHaveTextContent('username')
    expect(component.container).not.toHaveTextContent('password')
  })
})