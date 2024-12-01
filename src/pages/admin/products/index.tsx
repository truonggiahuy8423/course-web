import React, { useRef, useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import Sidebar from '../../../components/Sidebar';
import CourseCard from '../../../components/CourseCard';
import { getCourseCard } from "../../../services/ProductService";
import { loadingState } from "../../../states/loading";
import ComponentContainer from "../../../components/ComponentContainer";
import { Table as ATable, Pagination } from "antd";

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
  const [courses, setCourses] = useState<CourseCard[]>([]);
  const [total, setTotal] = useState(0);
  const setLoading = useSetRecoilState(loadingState);
  const courseListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCourses();
  }, [location.search]);

  const fetchCourses = async () => {
    setLoading(true);

    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page") || "1";
    const pageSize = queryParams.get("pageSize") || "10";
    const sort = queryParams.get("sort") || "1";
    const sortDir = queryParams.get("sortDir") || "asc";

    const params = {
      page: Number(page),
      pageSize: Number(pageSize),
      sort,
      sortDir,
    };

    try{
      const result = await getCourseCard(params);
      const data = result.data.courses;

      if (Array.isArray(data)) {
        const formattedCourses = data.map((course: any) => {
          // Chuyển đổi ảnh nếu thumbnail là mảng byte (LONGBLOB)
          const imageUrl = Array.isArray(course.thumbnail)
            ? new Uint8Array(course.thumbnail) // Chuyển thumbnail thành Uint8Array
            : course.thumbnail || 'https://via.placeholder.com/150'; // fallback nếu không có thumbnail

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
            imageUrl: imageUrl // Truyền ảnh dưới dạng Uint8Array
          };
        });

        setCourses(formattedCourses);
        setTotal(result.data.total);
      }
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const scroll = (direction: string) => {
    if (courseListRef.current && !expanded) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      courseListRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const toggleExpandedView = () => setExpanded(!expanded);

  return (
    <div className={styles.productsPage}>
      {/* <div className={styles.sidebar}>
        <Sidebar />
      </div> */}
      <div className={styles.contentArea}>
        <h1>Khóa học hiện có</h1>

        {!expanded && (
          <button className={`${styles.arrowButton} ${styles.left}`} onClick={() => scroll('left')}>
            &lt;
          </button>
        )}

        <div className={`${styles.courseList} ${expanded ? styles.expanded : ''}`} ref={courseListRef}>
          {courses.map((course) => (
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

        {/* {!expanded && (
          <button className={`${styles.arrowButton} ${styles.right}`} onClick={() => scroll('right')}>
            &gt;
          </button>
        )} */}

        {/* <div className={styles.expanderButton} onClick={toggleExpandedView}>
          {expanded ? "Ẩn bớt" : "Xem tất cả"}
        </div> */}
      </div>
    </div>
  );
};

export default ProductsPage;
