import { useRouter } from 'next/router';
import styles from './page.module.css';

const Pagination = ({ totalPages,currentPage, handleClick }) => {
  //const router = useRouter();
  //const currentPage = Number(router.query.page) || 1;

  // const handleClick = (page) => {
  //   router.push(`?page=${page}`);
  // };

  return (
    <div className={styles.pagination}>
      <ul className={styles['pagination-list']}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <li key={page}>
            <a
              className={page === currentPage ? styles.active : ''}
              onClick={()=>handleClick(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
