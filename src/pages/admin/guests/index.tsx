import React, { useState } from 'react';
import AppLayout from '../../../layout/AppLayout';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

const AdminGuests = () => {
  const [count, setCount] = useState(0)

  return (
    // <div>
    //   <h1>/admin/guests</h1>
    // </div>
    <AppLayout>
    {count}
    <Button type='button' onClick={() => setCount(count+1)}>Plus</Button>
    <Link to="/admin/courses">Click to redirect</Link>
  </AppLayout>
  );
}

export default AdminGuests;
