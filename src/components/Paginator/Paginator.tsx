import React, { useState } from 'react';
import { memo } from 'react';
import { FC } from 'react';
import s from './style/Paginator.module.scss';
import { PaginatorPropsType } from './types';

const Paginator: FC<PaginatorPropsType> = memo(
  ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState<number>(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    return (
      <div className={s.pagination}>
        {portionNumber > 1 && (
          <div className={s.arrow} onClick={() => setPortionNumber(portionNumber - 1)}>
            &lt;
          </div>
        )}
        {pages
          .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
          .map(num => (
            <div
              key={num}
              onClick={() => onPageChanged(num)}
              className={`${s.pageNumber} ${currentPage === num ? s.active : ''}`}
            >
              {num}
            </div>
          ))}
        {portionCount > portionNumber && (
          <div className={s.arrow} onClick={() => setPortionNumber(portionNumber + 1)}>
            &gt;
          </div>
        )}
      </div>
    );
  },
);

export default Paginator;
