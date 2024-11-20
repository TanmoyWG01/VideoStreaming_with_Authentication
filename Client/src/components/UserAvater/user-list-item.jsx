import { Box, Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      mt="5"
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Box display="flex" alignItems="center">
        <Avatar mr={3} size="sm" cursor="pointer" name={user.name} />
        <Box>
          <Text fontWeight="bold">{user.name}</Text>
          <Text fontSize="xs" color="gray.600">
            <b>Email:</b> {user.email}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default UserListItem;
