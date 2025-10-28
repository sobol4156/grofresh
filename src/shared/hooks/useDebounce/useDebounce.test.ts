import { renderHook, act } from '@testing-library/react';
import useDebounce from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('должен возвращать начальное значение сразу', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('test');
  });

  it('обновляет значение только после задержки', () => {
    let value = 'initial';
    const { result, rerender } = renderHook(() => useDebounce(value));

    expect(result.current).toBe('initial');

    // Меняем значение
    value = 'updated';
    rerender();

    // Сразу debouncedValue не изменился
    expect(result.current).toBe('initial');

    // Прокручиваем таймер на 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('очищает предыдущий таймер при быстром изменении значения', () => {
    let value = 'first';
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    // Меняем значение до истечения delay
    value = 'second';
    rerender();

    act(() => {
      jest.advanceTimersByTime(499); // ещё не истек
    });
    expect(result.current).toBe('first'); // пока ещё старое значение

    act(() => {
      jest.advanceTimersByTime(1); // теперь прошло 500ms после последнего значения
    });
    expect(result.current).toBe('second');
  });
});
