import React, { useState } from 'react';
import AppLayout from '../../../layout/AppLayout';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../../components/Button';
import AdminNavigation from '../../../components/AdminNavigation';

const AdminCourses = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const varParam = queryParams.get('var'); // Lấy giá trị của 'var'
  const [count, setCount] = useState(varParam ? Number(varParam) : 0)


  return (
    <AppLayout>
      <AdminNavigation>
      {count}
      <Button type='button' onClick={() => setCount(count+1)}>Plus</Button>
      <Link to="/admin/courses?var=10">Click to redirect</Link>
      </AdminNavigation>
    </AppLayout>
  );
}

export default AdminCourses;
