import express from  'express';
import { OAuth2Client } from 'google-auth-library'

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// verify authentication token
router.post('/', async (req, res) => {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const payload = ticket.getPayload();
  const uid = payload['sub'];


  console.log(ticket.getPayload());
})


export default router;