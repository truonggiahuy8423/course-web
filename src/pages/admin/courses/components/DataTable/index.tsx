import classnames from 'classnames';
import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './index.module.scss';

type Props = {
};

const DataTable = (props: Props) => {
  // const { pageCount, onChangePage, activePage } = props;

  return (
    <div className={styles["wrap-table100"]}>
      <div className={styles["table100"]}>
        <table>
          <thead>
            <tr className={styles["table100-head"]}>
              <th className={styles["column1"]}>Date</th>
              <th className={styles["column2"]}>Order ID</th>
              <th className={styles["column3"]}>Name</th>
              <th className={styles["column4"]}>Price</th>
              <th className={styles["column5"]}>Quantity</th>
              <th className={styles["column6"]}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles["column1"]}>2017-09-29 01:22</td>
              <td className={styles["column2"]}>200398</td>
              <td className={styles["column3"]}>iPhone X 64Gb Grey</td>
              <td className={styles["column4"]}>$999.00</td>
              <td className={styles["column5"]}>1</td>
              <td className={styles["column6"]}>$999.00</td>
            </tr>
            <tr>
              <td className={styles["column1"]}>2017-09-28 05:57</td>
              <td className={styles["column2"]}>200397</td>
              <td className={styles["column3"]}>Samsung S8 Black</td>
              <td className={styles["column4"]}>$756.00</td>
              <td className={styles["column5"]}>1</td>
              <td className={styles["column6"]}>$756.00</td>
            </tr>
            {/* Các dòng dữ liệu khác */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
