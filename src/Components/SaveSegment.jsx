import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];
function SaveSegment() {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);
  const [currentSchema, setCurrentSchema] = useState("");
  const [response, setResponse] = useState(null);
  const handleAddSchema = () => {
    if (currentSchema && !selectedSchemas.includes(currentSchema)) {
      setSelectedSchemas([...selectedSchemas, currentSchema]);
      setAvailableSchemas(
        availableSchemas.filter((schema) => schema.value !== currentSchema)
      );
      setCurrentSchema("");
    }
  };

  const handleSaveSegment = async (e) => {
    e.preventDefault();
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema]: schemaOptions.find((opt) => opt.value === schema).label,
      })),
    };

    try {
      const res = await fetch("http://localhost:5000/segments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setResponse(result);
      console.log(result, "result");
      console.log("Data successfully sent to the backend:", result);
      setSegmentName("");
      setSelectedSchemas([]);
      setShow(true);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="">
          <Form.Label className="">Enter the Name of the Segment</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name of the segment"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Add schema to segment</Form.Label>
          <Form.Select onChange={(e) => setCurrentSchema(e.target.value)}>
            <option value="">Select a schema</option>
            {availableSchemas.map((schema) => (
              <option key={schema.value} value={schema.value}>
                {schema.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Group className="mb-3">
            <Button variant="link" onClick={handleAddSchema}>
              + Add new Schema
            </Button>
          </Form.Group>
        </Form.Group>
        {selectedSchemas.length > 0 && (
          <div
            style={{
              border: "2px solid skyblue",
              padding: "10px",
              margin: "10px",
            }}
          >
            {selectedSchemas.map((schema) => (
              <div key={schema}>
                <Form.Group className="mb-3">
                  <Form.Select
                    value={schema}
                    onChange={(e) =>
                      setSelectedSchemas(
                        selectedSchemas.map((s) =>
                          s === schema ? e.target.value : s
                        )
                      )
                    }
                  >
                    {schemaOptions
                      .filter(
                        (opt) =>
                          !selectedSchemas.includes(opt.value) ||
                          opt.value === schema
                      )
                      .map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </div>
            ))}
          </div>
        )}
        <Form.Group className="mb-3">
          <Button
            type="submit"
            onClick={handleSaveSegment}
            disabled={!segmentName || !selectedSchemas.length > 0}
          >
            Save Segment
          </Button>
        </Form.Group>
      </Form>
      {response !== null && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Segment successfully saved.</Modal.Title>
          </Modal.Header>
          <Modal.Body >Your segment details saved.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default SaveSegment;
