// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import OAuth from 'oauth'
import { promisify } from 'util'
 console.log(process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_CONSUMER_SECRET,);
const  oauth2 = new OAuth.OAuth2(
  process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_CONSUMER_SECRET,
  'https://api.twitter.com/', null, 'oauth2/token', null
)
const getOAuthAccessToken = promisify(oauth2.getOAuthAccessToken.bind(oauth2))

const queryObject={
    expansions:'author_id',
    'place.fields':'country',
    'tweet.fields':'author_id',
    'user.fields':'name,profile_image_url,username'
}

export default async function handler(req, res) {
  const accessToken = await getOAuthAccessToken('', { grant_type: 'client_credentials' })

  const {search}=req.body
  const query=new URLSearchParams({...queryObject,query:search,}).toString()

  const response= await fetch(`https://api.twitter.com/2/tweets/search/recent?${query}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const {data,includes:{users}}=await response.json()
 
  //concat author data to tweets data
  res.status(200).json(data.map(tweet=>({...tweet,author:users.find(user=>user.id===tweet.author_id)})))
}
