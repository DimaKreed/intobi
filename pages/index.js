import Head from 'next/head'
import axios from 'axios';
import Image from 'next/image'
import { useEffect, useRef,useState } from 'react'
import styles from '../styles/Home.module.css'
import { Box, Button, Input, Link, Text } from '@chakra-ui/react';
import Post from '../components/post';

export default function Home() {
  const [inputValue, setInputValue]  = useState("");
  const [tweets,setTweets]=useState([])

  const searchExamples = ["radio","dev","project", "city"]

  const getTweets=async()=>{
    if(inputValue){
      const {data}=await axios.post('api/tweets',{search:`@${inputValue}`});
      setTweets(data);
    }
    else setTweets([]);
  }

  const MainConainer = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "160px"
  }

  const marginStyle= {
    marginBottom: "10px",
    marginTop: "10px"
  }

  const butonsStyle = {
    border: "none",
    borderRadius: "5px",
    padding: "7px",
    marginLeft: "5px",
    cursor: "pointer"
  }

  const CustomLink = {
    color: "#0089ff",
  }

  const InputStyles = {
    border: "1px solid grey",
    borderRadius: "5px",
    with: "228px",
    height: "100%",
    padding: "0 20px",
    
  }

  const SearchButtonStyle = {
    fontSize: "16px",
    fontWeight: "600",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    height: "100%",
    marginLeft: "10px"
  }

  return (
    <Box {...MainConainer}>
        <Text fontSize={"32px"} fontWeight={700} {...marginStyle}>Best tweets search 🦸🏻‍♂️</Text>
        <Text {...marginStyle}>Find the best tweets</Text>
        <Text {...marginStyle}>I use Twitter OAath 2.0 to find best tweets 
          <Link {...CustomLink} href='https://developer.twitter.com/en/docs/twitter-api/tweets/search/introduction' isExternal>
          Learn more here.
          </Link>
        </Text>
        <Box display={"flex"}>
        {searchExamples.map((value)=>{
          return <Button 
            onClick={(e)=>setInputValue(e.target.innerText)} 
            {...butonsStyle} 
            key={value}
          >
            {value}
          </Button>
        })}
        </Box>
        <Box display={"flex"} height={"40px"} alignItems={"center"} margin={"20px 0"}>
          <Input 
          value={inputValue}
          {...InputStyles}
            onChange={(e)=>{setInputValue(e.target.value)}} 
            placeholder='Input text e.g. radio' />
          <Button {...SearchButtonStyle} onClick={getTweets}>Search</Button>
        </Box>
        <Box minHeight={"50px"}>
          { tweets.map((tweet)=>
            <Post 
              authorImgUrl={tweet.author.profile_image_url} 
              name={tweet.author.name} 
              text={tweet.text} 
              username={tweet.author.username} 
              key={tweet.id}
            />
            )
            }
        </Box>
        <Text>Created with passion by Dmytro Varchuk</Text>
    </Box>
  )

}
