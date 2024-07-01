import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AlertDialog = ({ showModal, headerText, handleCancel, handleConfirm }) => {
        return (
        <Modal show={showModal} aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Body>{headerText}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" size='sm' onClick={handleCancel}>
                    取消
                </Button>
                <Button variant="primary" size='sm' onClick={handleConfirm}>
                    確認
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AlertDialog;