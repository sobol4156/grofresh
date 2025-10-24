


import { render } from '@testing-library/react';
import IconButton from './IconButton';

describe('IconButton component', () => {

  test('renders with default props', () => {
    render(<IconButton />);
  });

  test('renders with success variant', () => {
    render(<IconButton variant="success" />);
  });

  test('renders with custom sx', () => {
    render(<IconButton sx={{ border: '1px solid red' }} />);
  });

    test('renders with custom size', () => {
    render(<IconButton size='large' />);
  });

  test('renders with children', () => {
    render(<IconButton>Click me</IconButton>);
  });
});
