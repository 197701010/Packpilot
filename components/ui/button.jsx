import React from 'react';
import Link from 'next/link';

const Button = ({ href, children, className, ...props }) => {
  const styles =
    'inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ' +
    'bg-brand-primary text-brand-primary-foreground ' +
    'hover:bg-brand-primary/90 ' +
    'h-10 py-2 px-6 ' +
    className;

  if (href) {
    return (
      <Link href={href} className={styles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};

export default Button;