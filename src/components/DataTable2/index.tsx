import React from "react";
import { Table as ATable, Pagination } from "antd";
import {
  ColumnTitle,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { useLocation, useNavigate } from "react-router-dom"; // Sử dụng React Router
import type { TablePaginationConfig } from "antd/es/table";
import ComponentContainer from "../ComponentContainer";

const sorterKey = {
  ascend: "ASC",
  descend: "DESC",
};

export type ColumnsType<T> = {
  title?: ColumnTitle<T>;
  sorter?: boolean;
  dataIndex?: string;
  sorterField?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  filters?: { text: string; value: string }[];
  onFilter?: (value: any, record: T) => boolean;
  width?: string | number;
};

export type paramsState = {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setPageSize: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setSortDir: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

type Props<T> = {
  columns: ColumnsType<T>[];
  dataSource: T[];
  total?: number;
  onClickRow?: (id: number) => void;
  rowKey?: string;
  paramsState?: paramsState;
  page: string;
  pageSize: string;
  height?: string; // Add optional height prop
};

const Table = <T, >(props: Props<T>) => {
  const {
    columns,
    dataSource,
    total,
    onClickRow,
    rowKey,
    paramsState,
    page,
    pageSize,
    height, // Destructure height prop
  } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const handleTableChange = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    _extra: any
  ) => {
    const sorting = Array.isArray(sorter) ? sorter[0] : sorter;
    const sorterField = sorting?.column
      ? (sorting.column as ColumnsType<T>).sorterField
      : "1";

    paramsState?.setSort(sorterField || "1");
    const sorterOrder = (sorting?.order?.toString() || "ascend") as
      | "ascend"
      | "descend";
    paramsState?.setSortDir(sorterKey[sorterOrder]);
  };

  const onChangePagination = (page: number, pageSize: number) => {
    paramsState?.setPage(page.toString());
    paramsState?.setPageSize(pageSize.toString());
  };

  return (
    <>
      <ATable
        columns={columns}
        dataSource={dataSource}
        size="small"
        onChange={handleTableChange}
        rowKey={rowKey}
        sortDirections={["descend", "ascend", "descend"]}
        pagination={false}
        onRow={(record: any) => ({
          onClick: () => {
            if (onClickRow) onClickRow(record.id);
          },
        })}
        // Apply conditional styling based on height
        style={{
          height: height, // Set max height if provided
          overflowY: height ? "auto" : undefined, // Enable overflow if height is set
        }}
      />
      {paramsState ? <ComponentContainer justifyContent="right" padding={{ top: "14px", right: "40px" }}>
        <Pagination
          defaultCurrent={1}
          total={total}
          showSizeChanger
          onChange={onChangePagination}
          current={Number(page)}
          pageSize={Number(pageSize)}
        />
      </ComponentContainer> : null}
    </>
  );
};

Table.defaultProps = {
  rowKey: "id",
};

export default Table;
