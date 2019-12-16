import React, { useState}  from 'react'
import { Modal, Button } from 'react-bootstrap'

 


export default function UserModal(props) {
  const { socket, cookies } = props;  
  const [show, setShow] = useState((cookies.get('userName')) ? false : true);
  const [userNameTemp, setUserNameTemp] = useState("");

  const closeModal = (e) => {
    e.preventDefault();
    cookies.set('userName', userNameTemp, { path: '/' });
    socket.emit("user Connected", cookies.get('userName'))
    setShow(false);
    setUserNameTemp("");
  } 


  return (
    <>
      <Modal show={show} backdrop="static" >
        <Modal.Header>
          <Modal.Title>Enter User Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="form-inline" onSubmit={(e) => closeModal(e)}>
          <input onChange={(e) => setUserNameTemp(e.target.value)} value={userNameTemp} className="form-control" id="userName" type="text" aria-label="Enter User Name"/>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => closeModal(e)} variant="light">Enter</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
