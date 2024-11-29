"use client"
import Classic from "@/app/components/GameComponents/Classic";
import LeaderboardMode from "@/app/components/GameComponents/LeaderboardMode";
import { useParams } from "next/navigation";

const GameModePage = () => {
  const { gamemode } = useParams(); 

  if (!["classic", "leaderboard"].includes(gamemode as string )) { // shh
    return <div>Invalid Game Mode. Should not be seeing this, shoot me an email?</div>;
  }

const renderGamemode = () => {
  switch(gamemode){
    case "classic":
        return <Classic />
    case "leaderboard":
        return <LeaderboardMode />
    default:
        return <div>You shouldn&apos;t be seeing this. Shoot me an email?</div>
    }
}

  return (
    <div>
    {
        renderGamemode()
    }
    </div>
  );
};

export default GameModePage;
