/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Box,
  Text,
  Tooltip,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FaBell, FaSearch, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useUserName from "@/components/hooks/use-user-name";
import axios from "axios";
import { ProfileModeled } from "../profile-model/ProfileModeled";
import ChatLoading from "../../ChatLoading/chat-loading";
import UserListItem from "@/components/UserAvater/user-list-item";

const SideDraw = () => {
  const [search, setSearch] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  const userName = useUserName();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", { withCredentials: true });
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something to search.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `/api/auth/allUser?search=${search}`,
        config,
      );
      // console.log("Fetched Users:", data);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.error("Error during search:", error);

      setLoading(false);

      toast({
        title: "Error occurred!",
        description: error.response?.data?.message || "Failed to fetch users.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chat/access-chat",
        { userId },
        config,
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error to fatching the chat!",
        description: error.response?.data?.message || "Failed to fetch chats.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="1px"
      >
        {/* Search Button */}
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={() => setDrawerOpen(true)}>
            <FaSearch />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        {/* Title */}
        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        {/* Notifications and User Menu */}
        <Box>
          <Button variant="outline" fontSize="2xl" size="sm" p={1} mr="10px">
            <FaBell />
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FaCaretDown />}
              variant="outline"
              size="sm"
            >
              <Avatar size="sm" name={userName} />
            </MenuButton>
            <MenuList>
              <ProfileModeled userName={userName}>
                <MenuItem onClick={onOpen}>My Profile</MenuItem>
              </ProfileModeled>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      {/* Profile Modal
      {isOpen && <ProfileModeled isOpen={isOpen} onClose={onClose} />} */}

      {/* Drawer */}
      <Drawer
        isOpen={drawerOpen}
        placement="left"
        onClose={() => setDrawerOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" alignItems="center">
              <Input
                placeholder="Search by name or email"
                mr="2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Profile Modal */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{userName}&apos;s Profile</DrawerHeader>
          <DrawerBody>
            <Text>This is where the user profile details will go.</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDraw;
