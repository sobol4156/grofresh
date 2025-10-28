import { render, fireEvent } from '@testing-library/react';
import { useClickOutside, UseClickOutsideOptions } from './useClickOutside';
import { useRef } from 'react';

// Вспомогательный компонент для тестирования хука
function TestComponent({ callback, options }: { callback: () => void; options?: UseClickOutsideOptions }) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref as React.RefObject<HTMLElement>, callback, options);
  return <div ref={ref}>Inside</div>;
}

describe('useClickOutside', () => {
  it('вызывает callback при клике вне элемента', () => {
    const callback = jest.fn();
    const { getByText } = render(<TestComponent callback={callback} />);

    // клик вне элемента
    fireEvent.mouseDown(document);
    expect(callback).toHaveBeenCalled();

    callback.mockClear();

    // клик внутри элемента
    fireEvent.mouseDown(getByText('Inside'));
    expect(callback).not.toHaveBeenCalled();
  });

  it('не вызывает callback при клике внутри элемента', () => {
    const callback = jest.fn();
    const { getByText } = render(<TestComponent callback={callback} />);

    fireEvent.mouseDown(getByText('Inside'));
    expect(callback).not.toHaveBeenCalled();
  });

  it('работает с doubleEvent: true для dblclick', () => {
    const callback = jest.fn();
    render(<TestComponent callback={callback} options={{ doubleEvent: true }} />);

    fireEvent.dblClick(document);
    expect(callback).toHaveBeenCalled();
  });

    it('работает с обычным клик', () => {
    const callback = jest.fn();
    render(<TestComponent callback={callback} options={{ doubleTapDelay: 300 }} />);

    fireEvent.click(document);
    expect(callback).not.toHaveBeenCalled();
  });



  it('работает с doubleEvent: true для double-tap на touch', () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    const doubleTapDelay = 300
    render(<TestComponent callback={callback} options={{ doubleEvent: true, doubleTapDelay}} />);

    const touchEvent = new TouchEvent('touchstart', { bubbles: true });
    document.dispatchEvent(touchEvent);
    jest.advanceTimersByTime(doubleTapDelay - 100);
    document.dispatchEvent(touchEvent);

    expect(callback).toHaveBeenCalled();
    jest.useRealTimers(); 
  });

    it('работает с doubleEvent: true для double-tap на touch без параметра doubleTapDelay', () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    const doubleTapDelay = 300
    render(<TestComponent callback={callback} options={{ doubleEvent: true}} />);

    const touchEvent = new TouchEvent('touchstart', { bubbles: true });
    document.dispatchEvent(touchEvent);
    jest.advanceTimersByTime(doubleTapDelay - 100);
    document.dispatchEvent(touchEvent);

    expect(callback).toHaveBeenCalled();
    jest.useRealTimers(); 
  });

  it('не вызывает callback если первый touch', () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    render(<TestComponent callback={callback} options={{ doubleEvent: true, doubleTapDelay: 300 }} />);

    const touchEvent = new TouchEvent('touchstart', { bubbles: true });
    document.dispatchEvent(touchEvent);

    expect(callback).not.toHaveBeenCalled();
    jest.useRealTimers();
  });
});
