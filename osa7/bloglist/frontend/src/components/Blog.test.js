import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  let component

  const blog = {
    title: 'Testi-title',
    author: 'Perttu Punakallio',
    likes: 10,
    url: 'http://testi.fi',
    user: {
      name: 'John Doe',
      username: 'jdoe'
    }
  }

  const user = {
    username: 'pertsa'
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  test('By default only blog title and author are shown', () => {
    expect(component.container).toHaveTextContent('Testi-title')
    expect(component.container).toHaveTextContent('Perttu Punakallio')
    expect(component.container).not.toHaveTextContent('10')
    expect(component.container).not.toHaveTextContent('http://testi.fi')
    expect(component.container).not.toHaveTextContent('John Doe')
  })

  test('when clicked show detailed information', () => {
    const div = component.container.querySelector('.blog')
    fireEvent.click(div)

    expect(component.container).toHaveTextContent('Testi-title')
    expect(component.container).toHaveTextContent('Perttu Punakallio')
    expect(component.container).toHaveTextContent('10')
    expect(component.container).toHaveTextContent('http://testi.fi')
    expect(component.container).toHaveTextContent('John Doe')
  })
})