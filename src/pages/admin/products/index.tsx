import React, { useRef, useState, useEffect } from "react";
import styles from "./index.module.scss";
import Sidebar from "../../../components/Sidebar";
import CourseCard from "../../../components/CourseCard";
import {
  getCourseCard,
  GetRecommendation,
} from "../../../services/ProductService";
import { useSetRecoilState } from "recoil";
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
  const [expanded, setExpanded] = useState(false);
  const [recommendation, setRecommendation] = useState<CourseCard[]>([]);
  const courseListRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (courseListRef.current && !expanded) {
      const scrollAmount = direction === "left" ? -300 : 300;
      courseListRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const toggleExpandedView = () => setExpanded(!expanded);

  useEffect(() => {
    GetRecommendation()
      .then((response) => {
        console.log("Full response từ API:", response);

        if (response) {
          const data = response.data || response;
          console.log("Data:", data);

          if (Array.isArray(data)) {
            const formattedCourses = data.map((course: any) => {
              // Chuyển đổi ảnh nếu thumbnail là mảng byte (LONGBLOB)
              const imageUrl = Array.isArray(course.thumbnail)
                ? new Uint8Array(course.thumbnail) // Chuyển thumbnail thành Uint8Array
                : course.thumbnail || "https://via.placeholder.com/150"; // fallback nếu không có thumbnail

              return {
                id: course.courseId,
                title: course.subjectName,
                description: course.description,
                originalPrice: `${course.price.toLocaleString("vi-VN")} `,
                salePrice: `${(course.price * 0.7).toLocaleString("vi-VN")} `,
                students: course.numberOfStudents,
                duration: course.duration,
                author: course.author,
                backgroundColor: "#f4f4f4",
                imageUrl: imageUrl, // Truyền ảnh dưới dạng Uint8Array
              };
            });
            setRecommendation(formattedCourses);
          } else {
            console.error("Dữ liệu trả về không phải là mảng.");
          }
        } else {
          console.error(
            "API không trả về dữ liệu hợp lệ hoặc thiếu thuộc tính data."
          );
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ API:", error.message);
      });
  }, []);

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
            : course.thumbnail || "https://via.placeholder.com/150";

          return {
            id: course.courseId,
            title: course.subjectName,
            description: course.description,
            originalPrice: `${course.price.toLocaleString("vi-VN")} `,
            salePrice: `${(course.price * 0.7).toLocaleString("vi-VN")} `,
            students: course.numberOfStudents,
            duration: course.duration,
            author: course.author,
            backgroundColor: "#f4f4f4",
            imageUrl: imageUrl,
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
        <h1>Recommendation</h1>

        {!expanded && (
          <button
            className={`${styles.arrowButton} ${styles.left}`}
            onClick={() => scroll("left")}
          >
            &lt;
          </button>
        )}

        <div
          className={`${styles.courseList} ${expanded ? styles.expanded : ""}`}
          ref={courseListRef}
        >
          {recommendation.map((course) => (
            <div key={course.id} className={styles.courseCardWrapper}>
              <CourseCard
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
      </div>
      <div className={styles.contentArea}>
        <h1>All products</h1>

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
