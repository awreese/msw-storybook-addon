import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'

import { getServer } from '../../test-utils'
import { MockedSuccess, MockedError } from './App.stories'
import { vi } from 'vitest'

const server = getServer()


afterAll(() => {
  vi.restoreAllMocks()
})

it('renders error message if it cannot load the films', async () => {
  server.use(...MockedError.parameters.msw.handlers)
  render(<MockedError />)

  const errorMsgNode = await screen.findByText(
    /could not fetch star wars data/i
  )
  expect(errorMsgNode).toBeInTheDocument()
})

it('renders film cards for each film', async () => {
  server.use(...MockedSuccess.parameters.msw.handlers)
  render(<MockedSuccess />)

  expect(screen.getByText(/fetching star wars data/i)).toBeInTheDocument()

  await waitFor(() => screen.getAllByRole('article'))

  const articleNodes = screen.getAllByRole('article')
  expect(articleNodes).toHaveLength(3)

  const headingNodes = screen.getAllByRole('heading')
  expect(headingNodes[0]).toHaveTextContent('A New Hope')
  expect(headingNodes[1]).toHaveTextContent('Empire Strikes Back')
  expect(headingNodes[2]).toHaveTextContent('Return of the Jedi')
})