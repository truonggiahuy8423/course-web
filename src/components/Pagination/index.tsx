import classnames from 'classnames';
import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './index.module.scss';

type Props = {
  pageCount: number;
  activePage: number;
  onChangePage: (page: number) => void;
};

const Pagination = (props: Props) => {
  const { pageCount, onChangePage, activePage } = props;

  return (
    <ReactPaginate
      className={styles.paginationWrapper}
      pageClassName={classnames(styles.paginationItem)}
      pageLinkClassName={styles.pageLink}
      nextLinkClassName={styles.pageLink}
      previousLinkClassName={styles.pageLink}
      activeClassName={classnames(styles.paginationItemActive)}
      disabledClassName={styles.disable}
      nextClassName={classnames(styles.arrow)}
      previousClassName={classnames(styles.arrow)}
      renderOnZeroPageCount={null}
      marginPagesDisplayed={1}
      breakLabel="..."
      breakClassName={styles.break}
      previousLabel={
        <img
          src="/img/arrow-prev.svg"
          alt="previous_arrow"
          width={16}
          height={16}
        />
      }
      nextLabel={
        <img
          src="/img/arrow-next.svg"
          alt="next_arrow"
          width={16}
          height={16}
        />
      }
      pageCount={pageCount}
      forcePage={activePage - 1}
      onPageChange={(e) => {
        window.scrollTo(0, 0);
        onChangePage(e.selected + 1);
      }}
    />
  );
};

Pagination.defaultProps = {
  pageCount: 1,
  activePage: 1,
};

export default Pagination;
