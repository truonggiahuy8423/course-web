import React, { useRef, useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useSetRecoilState } from "recoil";
import { getCourseCard } from "../../../services/ProductService";
import { loadingState } from "../../../states/loading";
import { useLocation, useNavigate } from "react-router-dom";
import ProductGrid from "../../../components/Grid"; // Import ProductGrid component

export type CourseCard = {
  id: number;
  title: string;
  description: string;
  originalPrice: string;
  salePrice: string;
  students: number;
  duration: string;
  author: string;
  backgroundColor: string;
  imageUrl: Uint8Array | string | undefined; // Cập nhật kiểu dữ liệu ảnh
};

const ProductsPage = () => {
  const [courses, setCourses] = useState<CourseCard[]>([]);
  const [total, setTotal] = useState(0);
  const setLoading = useSetRecoilState(loadingState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, [location.search]);

  const fetchCourses = async () => {
    setLoading(true);

    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page") || "1";
    const pageSize = queryParams.get("pageSize") || "12";
    const sort = queryParams.get("sort") || "1";
    const sortDir = queryParams.get("sortDir") || "asc";

    const params = {
      page: Number(page),
      pageSize: Number(pageSize),
      sort,
      sortDir,
    };

    try {
      const result = await getCourseCard(params);
      const data = result.data.courses;

      if (Array.isArray(data)) {
        const formattedCourses = data.map((course: any) => {
          const imageUrl = Array.isArray(course.thumbnail)
            ? new Uint8Array(course.thumbnail)
            : course.thumbnail || 'https://via.placeholder.com/150';

          return {
            id: course.courseId,
            title: course.subjectName,
            description: course.description,
            originalPrice: `${course.price.toLocaleString('vi-VN')} `,
            salePrice: `${(course.price * 0.7).toLocaleString('vi-VN')} `,
            students: course.numberOfStudents,
            duration: course.duration,
            author: course.author,
            backgroundColor: '#f4f4f4',
            imageUrl: imageUrl
          };
        });

        setCourses(formattedCourses);
        setTotal(result.data.total);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onChangePagination = (page: number, pageSize: number) => {
    const query = new URLSearchParams(location.search);
    query.set("page", page.toString());
    query.set("pageSize", pageSize.toString());
    navigate({
      pathname: location.pathname,
      search: query.toString(),
    });
  };

  return (
    <div className={styles.productsPage}>
      <div className={styles.contentArea}>
        <h1>Khóa học hiện có</h1>

        {/* Sử dụng ProductGrid để hiển thị danh sách khóa học */}
        <ProductGrid
          dataSource={courses} // Truyền courses vào dataSource
          total={total} // Tổng số khóa học
          rowKey="id" // Khóa của mỗi khóa học
          onClickRow={(id) => {
            console.log("Clicked on course with ID:", id);
            // Bạn có thể xử lý thêm khi click vào khóa học
          }}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
