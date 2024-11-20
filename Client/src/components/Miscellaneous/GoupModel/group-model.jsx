import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  // useToast,
} from "@chakra-ui/react";
// import { useState } from "react";

const GroupModel = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //  const [groupChatName, setGroupChatName] = useState()
  //  const [selectedUsers, setSetectedUser] = useState([])
  //  const [seacrch, setSearch] = useState("")
  //  const [seacrhResult, setSearchResult] = useState([])
  //  const [loading, setLoading] = useState(false)
  //  const [chats, setChats] = useState([]);

  // const toast = useToast();

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>ModalBody</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupModel;
