import { useState } from 'react';

export function Test() {
    const [count, setCount] = useState(0);

    function handleClick() {
      setCount(count + 1);
    }
  
    return (
        <body>
            <button onClick={handleClick}>
                Click Here!
            </button>
            <p>Clicked {count} times</p>
        </body>
    );
}
