import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search page properly', () => {
  render(<App />);
  expect(screen.getByText(/search topic/i)).toBeInTheDocument();
  // expect(screen.getByText(/search language/i)).toBeInTheDocument();
});
