import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaImage } from "react-icons/fa";
import axios from "axios";

function EditProfile({ show, handleClose, updatedUser }) {
  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [selectedImage, setSelectedImage] = useState({
    preview: "",
    data: null,
  });
  
// Dependency array ensures the effect runs only once on mount

  const handleImageChange = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setSelectedImage(img);
  };

  const UpdateBio = async () => {
    try {
      // Upload the image to the server if a new image is selected
      let imageLink = ""; // Placeholder for the image link
      if (selectedImage.data) {
        const formData = new FormData();
        formData.append("file", selectedImage.data);
        const imgRes = await axios.post(
          "http://localhost:5000/uploadFile",
          formData
        );
        imageLink = `http://localhost:5000/files/${imgRes.data.fileName}`;
      }

      // Send the edited profile data to the server
      const userData = { userName, bio: userBio, profileImage: imageLink };
      const response = await axios.put(
        "http://localhost:5000/updateBio",
        userData,
        CONFIG_OBJ
      );

      // Update user data in the parent component (Profile)
      updatedUser(response.data.user);

      // Clear the input fields
      setUserName("");
      setUserBio("");
      setSelectedImage({ preview: "", data: null });

      // Close the modal
      handleClose();
    } catch (error) {
      console.error(
        "Error updating user bio:",
        error.response?.data?.error || "An unexpected error occurred"
      );
    }
  };

  return (
    <div>
      <Modal size="md" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            className="form-control mb-3"
          />
          <textarea
            value={userBio}
            onChange={(e) => setUserBio(e.target.value)}
            placeholder="Bio"
            rows="4"
            className="form-control mb-3"
          />

          <div className="mb-3">
            <label htmlFor="imagePicker" className="btn btn-outline-secondary">
              <FaImage className="mr-2" /> Select Profile Image
              <input
                type="file"
                name="file"
                id="imagePicker"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
            {selectedImage.preview && (
              <img
                alt="preview"
                src={selectedImage.preview}
                width="100"
                height="100"
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={UpdateBio}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditProfile;
