'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterProps {
  originalText: string;
  destination?: string;
}

export function TypeWriter({ originalText, destination }: TypewriterProps) {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'typing' | 'end'>('typing');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < originalText.length - 1) {
        setText((prevText) => prevText + originalText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setStatus('end');
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [originalText, destination]);
  return (
    <>
      <span>{text}</span>
      <span
        className={cn('typed-cursor', {
          'typed-cursor--blink': status === 'end',
        })}
        aria-hidden="true"
      >
        _
      </span>
    </>
  );
}
