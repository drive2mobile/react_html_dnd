import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './styles/ModalAddDivStyle.module.css';

const ModalAddDiv = ({ showModal, setShowModal, inputValue, setIputValue, confirmFunction }) => {

    return (
        <Modal show={showModal} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>Add New Group</Modal.Body>
            
            <div className={styles.formInputContainer}>
                <div className={styles.formLabel}>Group Name</div>
                <Form.Control 
                    className={styles.formInput} 
                    type="text" 
                    size='sm' 
                    placeholder={'Group Name'} 
                    value={inputValue} 
                    onChange={(event) => {setIputValue(event.target.value);}} 
                    id='inputValue'
                />
            </div>

            <Modal.Footer>
                <Button variant="secondary" size='sm' onClick={() => {setShowModal(false); setIputValue(''); }}>
                    Cancel
                </Button>
                <Button size='sm' onClick={confirmFunction}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAddDiv;