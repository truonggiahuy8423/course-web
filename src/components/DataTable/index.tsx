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

type Props<T> = {
  columns: ColumnsType<T>[];
  dataSource: T[];
  total?: number;
  onClickRow?: (id: number) => void;
  rowKey?: string;
};

const Table = <T, >(props: Props<T>) => {
  const { columns, dataSource, total, onClickRow, rowKey } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const page = query.get("page") || "1";
  const pageSize = query.get("pageSize") || "10";

  const handleTableChange = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    _extra: any
  ) => {
    const sorting = Array.isArray(sorter) ? sorter[0] : sorter;

    // Lấy `sorterField` từ column nếu nó tồn tại
    const sorterField = sorting?.column
      ? (sorting.column as ColumnsType<T>).sorterField
      : '1';

    query.set("sort", sorterField || '1'); // Sử dụng `sorterField` hoặc 'id' nếu không có
    const sorterOrder = (sorting?.order?.toString() || "ascend") as
      | "ascend"
      | "descend";
    query.set("sortDir", sorterKey[sorterOrder] || "desc");

    navigate({
      pathname: location.pathname,
      search: query.toString(),
    });
  };

  const onChangePagination = (page: number, pageSize: number) => {
    query.set("page", page.toString());
    query.set("pageSize", pageSize.toString());

    navigate({
      pathname: location.pathname,
      search: query.toString(),
    });
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
      />
      <ComponentContainer justifyContent="right" padding={{top: '14px', right: '40px'}}>
        <Pagination
          defaultCurrent={1}
          total={total}
          showSizeChanger
          onChange={onChangePagination}
          current={Number(page)}
          pageSize={Number(pageSize)}
        />
      </ComponentContainer>
    </>
  );
};

Table.defaultProps = {
  rowKey: "id",
};

export default Table;
