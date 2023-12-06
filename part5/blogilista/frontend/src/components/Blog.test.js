
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('clicking view button shows more information', async () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.testurl.com',
    likes: 1,
    user: { name: 'Test Person' }
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('VIEW')

  await user.click(button)

  screen.getByText('www.testurl.com')
  screen.getByText('likes 1')
  screen.getByText('Added by Test Person')
})

test('clicking the like button calls event handler twice', async () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.testurl.com',
    likes: 1,
    user: { name: 'Test Person' }
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('VIEW')

  await user.click(viewButton)

  const likeButton = screen.getByText('LIKE')

  await user.click(likeButton)

  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})