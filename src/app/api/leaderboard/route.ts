// import { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '../../../../lib/mongodb';
// import { NextResponse } from 'next/server';

// export async function GET() {
//     try {
//       const client = await clientPromise;
//       const db = client.db('MainDatabase');
//       const collection = db.collection('users');
  
//       const topUsers  = await collection
//       .find({})
//       .sort({ highscore: -1 })
//       .limit(5)
//       .toArray();
  
//       if (topUsers.length === 0) {
//           return NextResponse.json({ users: [], message: 'No users found.' });
//       }
  
//       return NextResponse.json({
//           users: topUsers.map((user) => ({
//             username: user.username,
//             highscore: user.highscore,
//           })),
//         });
  
//     } catch (error) {
//       return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
//     }
//   }

//   export async function POST(request: Request) {
//     try {
//       const client = await clientPromise;
//       const db = client.db('MainDatabase');
//       const collection = db.collection('users');
  
//       // Parse the incoming request body
//       const body = await request.json();
//       const { username, highscore } = body;
  
//       if (!username || typeof highscore !== 'number') {
//         return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
//       }
  
//       // Fetch the user's current highscore
//       const user = await collection.findOne({ username });
  
//       if (!user) {
//         await collection.insertOne({ username, highscore });
//         return NextResponse.json({ message: 'User Added' });
//       }
  
//       // Update highscore if the new score is higher
//       if (highscore > (user.highscore || 0)) {
//         await collection.updateOne(
//           { username },
//           { $set: { highscore } }
//         );
//         return NextResponse.json({ message: 'Highscore updated successfully' });
//       } else {
//         return NextResponse.json({ message: 'Highscore not updated (lower or equal to current)' });
//       }
//     } catch (error) {
//       return NextResponse.json({ error: 'Failed to update highscore' }, { status: 500 });
//     }
//   }
  
