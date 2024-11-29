import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
      const client = await clientPromise;
      const db = client.db('MainDatabase');
      const collection = db.collection('users');
  
      const topUsers  = await collection
      .find({})
      .sort({ topscore: -1 })
      .limit(5)
      .toArray();
  
      if (topUsers.length === 0) {
          return NextResponse.json({ users: [], message: 'No users found.' });
      }
  
      return NextResponse.json({
          users: topUsers.map((user) => ({
            username: user.username,
            topScore: user.topScore,
          })),
        });
  
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
    }
  }
