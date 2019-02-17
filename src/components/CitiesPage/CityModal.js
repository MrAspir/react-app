import React from 'react'
import PropTypes from 'prop-types';

import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CityForm from '../../container/CitiesPage/CityForm';

Modal.setAppElement('#root');

const CitiesModal = ({ isOpen, onClose }) => {
    const customStyles = {
        overlay: {
          zIndex: 100
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            maxWidth: '400px',
            width: '100%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                style={customStyles}
                contentLabel="Modal window for adding a new city"
            >
                <div className="modal__header">
                    <h2>Adding a new city</h2>
                    <button className="modal__close" onClick={onClose}>
                        <FontAwesomeIcon icon="times" />
                    </button>
                </div>

                <div className="modal__content">
                    <CityForm onModalClose={() => onClose()}/>
                </div>
            </Modal>
        </div>
    );
};

CitiesModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default CitiesModal;
