import React from "react";
import { Pagination } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import ComponentContainer from "../ComponentContainer";
import CourseCard from "../CourseCard";
import styles from "./index.module.scss";

type Props<T> = {
  dataSource: T[]; // Mảng sản phẩm cần hiển thị
  total?: number; // Tổng số sản phẩm
  onClickRow?: (id: number) => void; // Hàm xử lý khi click vào sản phẩm
  rowKey?: string; // Khóa dòng
};

const Grid = <T extends Record<string, any>>(props: Props<T>) => {
  const { dataSource, total, onClickRow, rowKey } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const page = query.get("page") || "1";
  const pageSize = query.get("pageSize") || "12";

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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* Lặp qua từng sản phẩm và hiển thị */}
        {dataSource?.map((course: T, index: number) => (
          <div key={course.id} className={styles.courseCardWrapper}>
          <CourseCard
            id={course.id}
            imageUrl={course.imageUrl} // Chuyển qua byte array hoặc URL
            title={course.title}
            description={course.description}
            originalPrice={course.originalPrice}
            salePrice={course.salePrice}
            students={course.students}
            duration={course.duration}
            author={course.author}
          />
        </div>

        ))}
      </div>

      <ComponentContainer justifyContent="right" padding={{ top: "10px" }}>
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

Grid.defaultProps = {
  rowKey: "id",
};

export default Grid;
