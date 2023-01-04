import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
  } from '@chakra-ui/react'


const TransactionModal = ({ isOpen, onOpen, onClose }) => {
    
    return (
        <>
        <Button onClick={onOpen}>Trigger modal</Button>
    
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                ghhjhj
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose}>Close</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

export default TransactionModal