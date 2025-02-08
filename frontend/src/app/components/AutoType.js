'use client';

import { useState, useEffect } from 'react';

const AutoType = ({
  texts = [],
  typingSpeed = 150,
  deletingSpeed = 75,
  pauseTime = 1000,
  loop = true,
}) => {
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (texts.length === 0) return;

    const currentFullText = texts[currentTextIndex];
    let timer;

    if (!isDeleting && index < currentFullText.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentFullText.substring(0, index + 1));
        setIndex(index + 1);
      }, typingSpeed);
    } else if (isDeleting && index > 0) {
      timer = setTimeout(() => {
        setDisplayedText(currentFullText.substring(0, index - 1));
        setIndex(index - 1);
      }, deletingSpeed);
    } else if (!isDeleting && index === currentFullText.length) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && index === 0) {
      setIsDeleting(false);
      setCurrentTextIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= texts.length ? (loop ? 0 : prevIndex) : nextIndex;
      });
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting, texts, currentTextIndex, typingSpeed, deletingSpeed, pauseTime, loop]);

  return <span>{displayedText}</span>;
};

export default AutoType;