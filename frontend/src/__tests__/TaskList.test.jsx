import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TaskList from '../components/TaskList.jsx'

test('renders tasks and clicks done', () => {
  const tasks = [
    { id: 1, title: 'Buy books', description: 'desc' },
    { id: 2, title: 'Clean home', description: '' }
  ]
  const onDone = vi.fn()
  render(<TaskList tasks={tasks} onDone={onDone} />)

  expect(screen.getByText('Buy books')).toBeInTheDocument()
  fireEvent.click(screen.getAllByText('Done')[0])
  expect(onDone).toHaveBeenCalledWith(1)
})

test('shows empty state', () => {
  render(<TaskList tasks={[]} onDone={() => {}} />)
  expect(screen.getByText('No tasks yet.')).toBeInTheDocument()
})
