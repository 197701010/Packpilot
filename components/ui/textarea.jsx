import React from 'react';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  const styles =
    'flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ' +
    'text-dark placeholder:text-gray-400 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 ' +
    'disabled:cursor-not-allowed disabled:opacity-50 ' +
    className;

  return (
    <textarea
      className={styles}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;