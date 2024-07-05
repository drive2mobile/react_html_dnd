import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './styles/ModalAddItemStyle.module.css';

const ModalAddItem = ({ showModal, setShowModal, dataList, setDataList, groupName }) => {
    const [itemName, setItemName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (itemName != '' && (itemName in dataList != true))
        {
            const newDataList = {...dataList};
            newDataList[groupName].push({'ItemName':itemName});
            setDataList(newDataList);
            setItemName('');
            setShowModal(false);
        }
    }

    return (
        <Modal show={showModal} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>Add New Item</Modal.Body>

            <div className={styles.formInputContainer}>
                <div className={styles.formLabel}>Item Name</div>
                <Form.Control 
                    className={styles.formInput} 
                    type="text" 
                    size='sm' 
                    placeholder={'Item Name'} 
                    value={itemName} 
                    onChange={(event) => {setItemName(event.target.value);}} 
                    id='itemName'
                />
            </div>

            <Modal.Footer>
                <Button variant="secondary" size='sm' onClick={() => {setShowModal(false); setItemName(''); }}>
                    Cancel
                </Button>
                <Button size='sm' onClick={handleSubmit}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAddItem;