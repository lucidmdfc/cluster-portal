import { getAuth } from 'firebase-admin/auth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authorizationHeader = req.headers.authorization;

  // Validate the authorization header
  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const idToken = authorizationHeader.split('Bearer ')[1];

  // Create a session cookie
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  try {
    const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });

    // Set cookie in the response
    res.setHeader(
      'Set-Cookie',
      `session=${sessionCookie}; HttpOnly; Max-Age=${expiresIn / 1000}; Path=/`
    );
    return res.status(200).json({ success: true }); // Ensure to return this response
  } catch (error) {
    console.error('Error creating session cookie:', error);
    return res.status(500).json({ error: 'Failed to create session cookie' }); // Ensure to return this response
  }
}
