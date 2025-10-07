import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TaskForm from '../components/TaskForm.jsx'

test('submits title and description', () => {
  const onAdd = vi.fn()
  render(<TaskForm onAdd={onAdd} />)

  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Buy books' } })
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'For the next school year' } })
  fireEvent.click(screen.getByText('Add'))

  expect(onAdd).toHaveBeenCalledWith('Buy books', 'For the next school year')
})
