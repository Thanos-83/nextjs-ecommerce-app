import React from 'react';

// eslint-disable-next-line react/display-name
export const TableCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <label htmlFor=''>
          <input className='' type='checkbox' ref={resolvedRef} {...rest} />
        </label>
      </>
    );
  }
);
