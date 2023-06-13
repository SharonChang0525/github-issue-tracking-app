import React, {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../actions/tasks';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert';

function TaskItem(props) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(props.task.title); 
  const [comments, setComments] = useState(props.task.body); 

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onDelete = () => {
    edit(
      props.task.owner, 
        props.task.repo, 
        props.task.issue_number, 
        props.task.title, 
        props.task.body,
        "close",
        props.task.id
    );
  }

  const onClose = () => {
    setTitle(props.task.title);
    setComments(props.task.body);
    handleClose();
  }

  const onSubmit = () => {
    //// Check Input ////
    if(!title.trim().length && comments.trim().length < 30){ // invalid title & comments
      setTitle(props.task.title);
      setComments(props.task.body);
    }else if(!title.trim().length){ // invalid title
      setTitle(props.task.title);
    }else if(comments.trim().length < 30){ // invalid comments
      setComments(props.task.body);
    }else{ //// OK, Do Edit ////
      handleClose();

      edit(
        props.task.owner, 
        props.task.repo, 
        props.task.issue_number, 
        title, 
        comments,
        props.task.state,
        props.task.id
      );
      
    }
  }

  async function edit(owner, repo, issue_number, title, body, state, id) {
    const codeParam = "?owner=" + owner + "&repo=" + repo + "&issue_number=" + issue_number + "&title=" + title + "&body=" + body + "&state=" + state;
    await fetch("http://localhost:4000/editTask" + codeParam, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      // console.log(data);
      dispatch(editTask(id, title, body, state));
    })
  }

  return (
    <div>
      <div class="d-flex justify-content-between mx-5 my-3 px-5">     
        <div class="d-flex flex-column mx-5"> 
          <h5 class="fw-bold text-start">
            {props.task.title}
            <span class="badge rounded-pill bg-light text-dark mx-3"> {props.task.state} </span>
          </h5>
          <p class="text-start">{props.task.body}</p>
        </div>
        <div class="d-flex align-items-center mx-5">
          <button 
          type='button'
          class=" mx-1 btn btn-outline-info btn-sm"
          data-bs-toggle="modal" data-bs-target="#exampleMod"
          onClick={handleShow}
          >
            Edit
          </button>
          <button 
          class=" mx-1 btn btn-outline-danger btn-sm"
          onClick={onDelete}
          disabled={props.task.state === "closed"}
          >
            Delete
          </button>
        </div>
      </div>    

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter New Title"
                value={title}
                onChange={(e) => {setTitle(e.target.value)}}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Comments</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={5} 
                placeholder="Enter New Comments"
                value={comments}
                onChange={(e) => {setComments(e.target.value)}}
                />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="success" size="sm" onClick={onSubmit}>
            Save Change
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  )
}

export default TaskItem