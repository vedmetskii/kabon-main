"use client"
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

export function SignInModalError({isOpen, onOpenChange}: {isOpen: boolean, onOpenChange: () => void}) {
    return <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader>Username or password is incorrect</ModalHeader>
                    <ModalBody>
                        <p>Please try again</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
}