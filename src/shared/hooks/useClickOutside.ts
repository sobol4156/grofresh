import { useEffect, useRef } from 'react';

interface UseClickOutsideOptions {
  doubleEvent?: boolean;           // если true — двойной клик / даблтап
  doubleTapDelay?: number;         // интервал для double-tap (мс)
}

/**
 * Хук для отслеживания кликов вне указанного элемента.
 * 
 * @template T - тип HTML-элемента (например, HTMLDivElement)
 * @param {React.RefObject<T>} ref - ссылка на элемент, вне которого нужно отслеживать клики
 * @param {() => void} callback - функция, которая вызывается при клике или даблтапе вне элемента
 * @param {UseClickOutsideOptions} [options] - дополнительные опции
 * @param {boolean} [options.doubleEvent=false] - если true, срабатывает только на двойной клик (ПК) или double-tap (мобильные)
 * @param {number} [options.doubleTapDelay=300] - максимальный интервал между двумя тачами для распознавания double-tap (мс)
 */
export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void,
  options?: UseClickOutsideOptions
) {
  const lastTap = useRef(0);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    const handleDoubleTap = (event: TouchEvent) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap.current;

      if (tapLength < (options?.doubleTapDelay ?? 300) && tapLength > 0) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      }

      lastTap.current = currentTime;
    };

    if (options?.doubleEvent) {
      document.addEventListener('dblclick', handleClickOutside as EventListener);
      document.addEventListener('touchstart', handleDoubleTap);
      return () => {
        document.removeEventListener('dblclick', handleClickOutside as EventListener);
        document.removeEventListener('touchstart', handleDoubleTap);
      };
    } else {
      document.addEventListener('mousedown', handleClickOutside as EventListener);
      document.addEventListener('touchstart', handleClickOutside as EventListener);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside as EventListener);
        document.removeEventListener('touchstart', handleClickOutside as EventListener);
      };
    }
  }, [ref, callback, options?.doubleEvent, options?.doubleTapDelay]);
}
