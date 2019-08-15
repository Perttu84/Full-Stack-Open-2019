import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Testi-title',
    author: 'Perttu Punakallio',
    likes: 10
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testi-title'
  )

  expect(component.container).toHaveTextContent(
    'Perttu Punakallio'
  )

  expect(component.container).toHaveTextContent(
    'blog has 10 likes'
  )
})