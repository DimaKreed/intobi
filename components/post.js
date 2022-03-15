import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';

const Post = ({name,username,authorImgUrl,text}) => {

    const PostContainer = {
        width: "448px",
        borderRadius: "5px",
        border: "1px solid grey",
        padding: "16px",
        marginTop:"10px"
      }
    
      const ImageContainer = {
        borderRadius: "50%",
        background: "grey",
        width: "40px",
        height: "40px"
      }

      const postTextStyle = {
          fontSize: "15px",
          margin: "0"
      }

    return (
        <Box {...PostContainer}>
        <Box display={"flex"}>
          <Box {...ImageContainer}>
            {/* I have tried to use Nest Image,but it crashes even if I add images hostnames to next.config */}
            <img height='100%' width='100%' src={authorImgUrl} alt={name}/>
          </Box>
          <Box marginLeft={"10px"}>
            <Text {...postTextStyle}>{name}</Text>
            <Text {...postTextStyle} color={"grey"}>{username}</Text>
          </Box>
          
          
        </Box>
          <Text {...postTextStyle} marginTop={"15px"}>
            {text}
          </Text>
      </Box>
    );
};

export default Post;