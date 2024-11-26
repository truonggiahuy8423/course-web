import React from 'react';
import styles from './index.module.scss';

interface CourseCardProps {
  title: string;
  description: string;
  originalPrice: string;
  salePrice: string;
  students: number;
  duration: string;
  author: string;
  backgroundColor?: string;
  imageUrl: Uint8Array | string; // Image URL hoặc dữ liệu Base64
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  title, 
  description, 
  originalPrice, 
  salePrice, 
  students, 
  duration, 
  author, 
  backgroundColor = '#f4f4f4', 
  imageUrl,
  onClick
}) => {
  // Nếu imageUrl là Base64, tạo URL với tiền tố "data:image/png;base64,"
  const imageSrc = typeof imageUrl === 'string' && imageUrl.startsWith('iVBOR')
    ? `data:image/png;base64,${imageUrl}` // Thêm tiền tố để trình duyệt hiển thị Base64
    : imageUrl; // Nếu là URL hoặc đã có tiền tố, giữ nguyên

  return (
    <button 
      className={styles.courseCard} 
      style={{ backgroundColor }}
      onClick={onClick} 
    >
      <div className={styles.courseCardImageWrapper}>
        <img src={imageSrc} alt={title} className={styles.courseCardImage} />
      </div>
      <div className={styles.courseCardContent}>
        <div className={styles.courseCardHeader}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className={styles.courseCardPrice}>
          <span className={styles.originalPrice}>{originalPrice}đ</span>
          <span className={styles.salePrice}>{salePrice}đ</span>
        </div>
        <div className={styles.courseCardFooter}>
          <span className={styles.author}>{author}</span>
          <span className={styles.students}>👥 {students}</span>
          <span className={styles.duration}>⏱️ {duration}</span>
        </div>
      </div>
    </button>
  );
};

export default CourseCard;
