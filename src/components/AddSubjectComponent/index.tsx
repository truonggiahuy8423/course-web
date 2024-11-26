import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const SubjectTable: React.FC = () => {
  // State để hiển thị modal
  const [showModal, setShowModal] = useState<boolean>(false);
  // State để lưu trữ thông tin form
  const [subjectName, setSubjectName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');

  // Mở và đóng modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Xử lý khi nhấn "Save"
  const handleSave = () => {
    // Thực hiện logic thêm Subject mới ở đây
    // Ví dụ, gửi dữ liệu đến API hoặc cập nhật state
    console.log("Subject Name:", subjectName);
    console.log("Description:", description);
    console.log("Category ID:", categoryId);

    // Đóng modal và reset form sau khi lưu
    setShowModal(false);
    setSubjectName('');
    setDescription('');
    setCategoryId('');
  };

  return (
    <div>
      <h1>Subject</h1>
      {/* Nút Add Subject */}
      <Button variant="primary" onClick={handleShow}>Add Subject</Button>

      {/* Modal Add Subject */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSubjectName">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCategoryId">
              <Form.Label>Category ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter category ID"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SubjectTable;
