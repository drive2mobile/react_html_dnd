import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './styles/ModalAddDivStyle.module.css';

const ModalAddDiv = ({ showModal, setShowModal, dataList, setDataList }) => {
    const [groupName, setGroupName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (groupName != '' && (groupName in dataList == false))
        {
            const newDataList = {...dataList};
            newDataList[groupName] = [];
            setDataList(newDataList);
            setGroupName('');
            setShowModal(false);
        }
    }

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
                    value={groupName} 
                    onChange={(event) => {setGroupName(event.target.value);}} 
                    id='groupName'
                />
            </div>

            <Modal.Footer>
                <Button variant="secondary" size='sm' onClick={() => {setShowModal(false); setGroupName(''); }}>
                    Cancel
                </Button>
                <Button size='sm' onClick={handleSubmit}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAddDiv;