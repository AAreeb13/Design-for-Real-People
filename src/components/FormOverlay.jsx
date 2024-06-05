import React, { useState } from "react";
import { addMainSubjectToGraph, addMiniSubjectToGraph, addTopicToGraph } from "../../database/graphData";

const FormOverlay = ({ onClose }) => {
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    subject: "",
    theme: "",
    prerequisites: "",
  });

  const handleTypeChange = (event) => {
    const newType = event.target.value
    setFormData((prevData) => {
        const newData = prevData;
        newData.type = newType;
        return newData
    })
    setSelectedType(newType);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("formdata", formData);

    if (formData.type === "main-subject") {
        console.log("handling main subject")
        addMainSubjectToGraph(formData.name, formData.theme)
    } else if (formData.type === "mini-subject") {
        console.log("handling mini-subject here")
        addMiniSubjectToGraph(formData.name, formData.subject, formData.prerequisites)
    } else if (formData.type === "topic") {
        console.log("handling topic here")
        addTopicToGraph(formData.name, formData.subject, formData.prerequisites)
    }

    onClose()
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const formContainerStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    position: "relative",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "600px",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#333",
  };

  const submitButtonStyle = {
    marginTop: "30px"
  }

  return (
    <div style={overlayStyle}>
      <div style={formContainerStyle}>
        <button style={closeButtonStyle} onClick={onClose} aria-label="Close form">
          &times;
        </button>
        <h2>Add a New Entry</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              className="form-control"
              value={selectedType}
              onChange={handleTypeChange}
            >
              <option value="">Select Type</option>
              <option value="main-subject">Main Subject</option>
              <option value="mini-subject">Mini Subject</option>
              <option value="topic">Topic</option>
            </select>
          </div>
          {selectedType && (
            <>
            
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>


              {selectedType === "topic" && (
                <>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      placeholder="Enter the subject that this topic will belong to"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prerequisites">Prerequisites</label>
                    <textarea
                      className="form-control"
                      id="prerequisites"
                      name="prerequisites"
                      placeholder="Enter prerequisites, separated by a ',' and ensure that it the prerequisite spelled correctly"
                      value={formData.prerequisites}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </>
              )}


              {selectedType === "main-subject" && (
                <div className="form-group">
                  <label htmlFor="theme">Theme</label>
                  <input
                    type="text"
                    className="form-control"
                    id="theme"
                    name="theme"
                    placeholder="Enter the theme of this topic, for example 'mathematics' "
                    value={formData.theme}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}


              {selectedType === "mini-subject" && (
                <>
                    <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        placeholder="Enter the name of the subject this mini-subject belongs to"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prerequisites">Prerequisites</label>
                        <textarea
                        className="form-control"
                        id="prerequisites"
                        name="prerequisites"
                        placeholder="Enter prerequisites, separated by a ',' and ensure that it the prerequisite spelled correctly"
                        value={formData.prerequisites}
                        onChange={handleChange}
                        required
                        ></textarea>
                    </div>
                </>
              )}


            </>
          )}
          <button type="submit" className="btn btn-success" style={submitButtonStyle}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormOverlay;