import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { Box, Text} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
// import { BsMenuButton } from 'react-icons/bs';
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
  } from "@/components/ui/menu"


const SideDraw = () => {
    const [search, setSearch]= useState("")
    const [searchResult, setSearchResult]= useState([])
    const [loading, setLoading]= useState(false)
    const [loadingChat, setLoadingChat]= useState()
    
    return (
       <>
       <Box display="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
       <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
        <Button variant="ghost">
        <i class="fa-solid fa-magnifying-glass"></i>
        <Text display={{base:"none", md: "flex"}} px="4">
            Search User
        </Text>
        </Button>
       </Tooltip>
       <Text fontSize="2xl" fontFamily="Work sans">
        Talk-A-Tive
       </Text>
      
       <div>
       
       <MenuRoot>
        <Button variant="outline" fontSize="2xl" size="sm" p={1} mr="10px">
        <i class="fa-solid fa-bell"></i>
        </Button>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm" p={1}>
          <Avatar size="sm" cursor="pointer" name="TK"/>
          <i class="fa-solid fa-caret-down"></i>
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="rename">My Profile</MenuItem>
        <MenuItem value="export">Logout</MenuItem>
        {/* <MenuItem
          value="delete"
          color="fg.error"
          _hover={{ bg: "bg.error", color: "fg.error" }}
        >
          Delete...
        </MenuItem> */}
      </MenuContent>
    </MenuRoot>
       </div>
       </Box>
       </>
    );
}

export default SideDraw;
