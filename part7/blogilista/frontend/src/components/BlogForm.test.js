import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('write title here...')
  const authorInput = screen.getByPlaceholderText('write name here...')
  const urlInput = screen.getByPlaceholderText('write url here...')
  const createButton = screen.getByText('CREATE')

  await user.type(titleInput, 'testing title field')
  await user.type(authorInput, 'testing author field')
  await user.type(urlInput, 'testing url field')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing title field')
  expect(createBlog.mock.calls[0][0].author).toBe('testing author field')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url field')
})
