import React, { useState, useEffect } from 'react';
import AppLayout from '../../../layout/AppLayout';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { useRecoilState } from 'recoil';
import { adminNavigation } from "../../../states/adminNavigation";

const AdminGuests = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(6);
  }, []);

  return (
    <div>
      <h1>/admin/guests</h1>
    </div>
  );
}

export default AdminGuests;