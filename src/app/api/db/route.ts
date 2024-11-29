import clientPromise from '../../../../lib/mongodb'; // Adjust the path as necessary
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

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('MainDatabase');
    
    const body = await req.json();
    const result = await db.collection('users').insertOne(body);

    return new Response(JSON.stringify({ success: true, insertedId: result.insertedId }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to insert data' }), { status: 500 });
  }
}
