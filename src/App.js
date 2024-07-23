import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { React, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import SaveSegment from "./Components/SaveSegment";
function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="App ">
        <button className="btn btn-light btn-lg btn-block" onClick={handleShow}>
          Save Segment
        </button>
        <Modal show={show} onHide={handleClose} backdrop={false}>
          <Modal.Header closeButton>
            <Modal.Title>Saving Segment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SaveSegment />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <footer>
          <p>
            In addition to this application, I've also developed a weather
            dashboard which is hosted on my GitHub. I'd appreciate it if you
            could take a look at it as well: <span></span>
            <a
              href="https://github.com/viji-queen/weather-dashboard-application"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Link
            </a>
            .
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
