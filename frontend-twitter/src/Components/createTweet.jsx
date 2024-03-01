import React, { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import { FaImage } from 'react-icons/fa';
import axios from 'axios';

function CreateTweet({ show, handleClose }) {

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState({ preview: '', data: null });
  const handleImageChange = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0]
    }
    setSelectedImage(img);
  };

  const handleTweet = async (req,res) => {
    try {
      
      // Check if both caption and image are provided
      
      if (!caption || !selectedImage.data) {
        alert('Please provide both caption and image.');
        return;
      }

      // Upload the image to the server
      let formData = new FormData();
      formData.append('file', selectedImage.data);
      const imgRes = await axios.post("http://localhost:5000/uploadFile", formData);

      // Post the tweet with caption and image URL
      const request = { description: caption, image: `http://localhost:5000/files/${imgRes.data.fileName}`, author: req.user };
      const postResponse = await axios.post('http://localhost:5000/createpost', request, CONFIG_OBJ);

      // Clear the input fields
      setCaption('');
      setSelectedImage({ preview: '', data: null });

      // Close the modal
      handleClose();
    } catch (error) {
      console.error('Error posting tweet:', error);
    }
  };

  


  return (
    <div>
      <Modal size="md" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Tweet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's happening?"
            rows="4"
            className="form-control mb-3"
          />

          <div className="mb-3">
            <label htmlFor="imagePicker" className="btn btn-outline-secondary">
              <FaImage className="mr-2" /> Select Image
              <input
                type="file"
                name="file"
                id="imagePicker"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
            {selectedImage.preview && <img alt="preview" src={selectedImage.preview} width='100' height='100' />}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleTweet}>
            Tweet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateTweet;
