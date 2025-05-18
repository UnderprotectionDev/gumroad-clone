import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import NavBar, { NavItem } from './navbar';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children, ...rest }: any) => <a href={to} {...rest}>{children}</a>,
}));

describe('NavBar Component', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('renders all provided nav items', () => {
    const items: NavItem[] = [
      { key: 'home', label: 'Home' },
      { key: 'settings', label: 'Settings' },
    ];
    render(<NavBar items={items} activeKey="home" onSelect={() => {}} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('applies the active class to the selected item', () => {
    const items: NavItem[] = [{ key: 'one', label: 'One' }];
    render(<NavBar items={items} activeKey="one" onSelect={() => {}} />);
    const element = screen.getByText('One');
    expect(element).toHaveClass('active');
  });

  it('calls onSelect with correct key when an item is clicked', () => {
    const items: NavItem[] = [
      { key: 'a', label: 'A' },
      { key: 'b', label: 'B' },
    ];
    const handleSelect = jest.fn();
    render(<NavBar items={items} activeKey="a" onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('B'));
    expect(handleSelect).toHaveBeenCalledWith('b');
  });

  describe('edge cases', () => {
    it('renders without items', () => {
      const { container } = render(
        <NavBar items={[]} activeKey="" onSelect={() => {}} />
      );
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });

    it('does not apply active class when activeKey is invalid', () => {
      const items: NavItem[] = [{ key: 'x', label: 'X' }];
      render(<NavBar items={items} activeKey="invalid" onSelect={() => {}} />);
      expect(screen.getByText('X')).not.toHaveClass('active');
    });

    it('renders gracefully without activeKey prop', () => {
      const items: NavItem[] = [{ key: 'y', label: 'Y' }];
      // @ts-ignore intentionally omit activeKey
      render(<NavBar items={items} onSelect={() => {}} />);
      expect(screen.getByText('Y')).toBeInTheDocument();
      expect(screen.getByText('Y')).not.toHaveClass('active');
    });
  });
});