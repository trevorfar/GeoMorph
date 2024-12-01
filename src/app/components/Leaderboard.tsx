import { GetServerSideProps } from 'next';
import clientPromise from '../../../lib/mongodb';
import { useEffect, useState } from 'react';

interface User {
  username: string;
  highscore: number;
}


const Leaderboard = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchLeaderboard = async () => {
          try {
            const response = await fetch('/api/leaderboard');
            if (!response.ok) {
              throw new Error('Failed to fetch leaderboard data');
            }
            const data = await response.json();
            setUsers(data.users);
          } catch (error: unknown) {
            const typedError = error as Error;
            setError(typedError.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchLeaderboard();
      }, []);

      if (loading) {
        return <p>Loading leaderboard...</p>;
      }
    
      if (error) {
        return <p>Error: {error}</p>;
      }


      return (
        <div className="flex flex-col space-y-4 p-4 bg-gray-100">
          <h1 className="text-2xl font-bold text-center">Leaderboard</h1>
          {users.length > 0 ? (
            users.map((user, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-4 shadow-md rounded-md ${
                          index === 0 ? "bg-yellow-500 text-white" : 
                          index === 1 ? "bg-gray-400 text-white" : 
                          index === 2 ? "bg-yellow-800 text-white" : 
                          "bg-white"
                          }`}
              >
                <span className="text-lg font-medium">{user.username}</span>
                <span className="text-lg font-semibold text-blue-500">
                  {user.highscore}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No users found.</p>
          )}
        </div>
      );
    };

export default Leaderboard;
