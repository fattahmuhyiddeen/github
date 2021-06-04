import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search page properly', () => {
  render(<App />);
  expect(screen.getByText(/topic/i)).toBeInTheDocument();
  expect(screen.getByText(/search/i)).toBeInTheDocument();
  expect(screen.getByText(/language/i)).toBeInTheDocument();
});
