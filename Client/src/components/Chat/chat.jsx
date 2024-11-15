import React from 'react';
import { Box } from '@chakra-ui/react';
import SideDraw from '../Miscellaneous/side-draw/SideDraw';
import MyChat from '../Miscellaneous/my-chats/MyChat';
import ChatBox from '../Miscellaneous/chat-box/ChatBox';

const Chat = () => {
    return (
    <div className="container">
        <SideDraw/>
        <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
            <MyChat/>
            <ChatBox/>
        </Box>
    </div>
    );
}

export default Chat;
