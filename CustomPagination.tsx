import * as React from 'react';
interface ICustomPaginationProps {
  length: number;
}
export default function CustomPagination(props: ICustomPaginationProps) {
  let [currentPage, setCurrentPage]: [number, Function] = React.useState(() => {
    return 1;
  });
  let [startIndex, setStartIndex]: [number, Function] = React.useState(() => {
    return 1;
  });
  let [lastIndex, setLastIndex]: [number, Function] = React.useState(() => {
    return props.length > 5 ? 5 : props.length;
  });
  let elements = [];
  let setCurrentPages = (currentPage) => () => {
    if (currentPage <= 3) {
      setStartIndex(1);
      setLastIndex(props.length > 5 ? 5 : props.length);
    } else if (currentPage + 2 >= props.length) {
      setStartIndex(props.length - 4);
      setLastIndex(props.length);
    } else if (currentPage < (startIndex + lastIndex) / 2) {
      setStartIndex((startIndex) => startIndex - 2);
      setLastIndex((lastIndex) => lastIndex - 2);
    } else {
      setStartIndex((startIndex) => startIndex + 2);
      setLastIndex((lastIndex) => lastIndex + 2);
    }
    setCurrentPage(currentPage);
  };
  let setIncrement = () => () => {
    if (props.length > currentPage) {
      setCurrentPage((currentPage) => {
        return currentPage + 1;
      });
    }
  };
  let setDecrement = () => () => {
    if (1 < currentPage) {
      setCurrentPage((currentPage) => {
        return currentPage - 1;
      });
    }
  };
  for (let i = startIndex; i <= lastIndex; i++) {
    elements.push(
      <li>
        {currentPage === i ? (
          <li>
            <button onClick={setCurrentPages(i)}>
              <b>{i}</b>
            </button>
          </li>
        ) : (
          <li>
            <button onClick={setCurrentPages(i)}>{i}</button>
          </li>
        )}
      </li>
    );
  }
  return (
    <nav role="navigation" aria-label="Pagination Navigation">
      <ul>
        <li>
          <button onClick={setDecrement()}>Left</button>
        </li>
        {elements}
        <li>
          <button onClick={setIncrement()}>Right</button>
        </li>
      </ul>
    </nav>
  );
}
