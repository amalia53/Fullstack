/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders titlen and author', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.testurl.com',
    likes: 1,
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Test Title by Test Author')
  expect(element).toBeDefined()

})

test('doesnt render url nor likes', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.testurl.com',
    likes: 1,
  }

  const container = render(<Blog blog={blog} />)

  const urlElement = container.queryByText('www.testurl.com')
  expect(urlElement).not.toBeInTheDocument()

  const likeElement = container.queryByText('likes 1')
  expect(likeElement).not.toBeInTheDocument()

})