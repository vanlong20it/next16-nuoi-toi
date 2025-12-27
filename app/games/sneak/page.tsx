import GameContainer from "@/features/games/sneak/game-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sneak Game",
  description: "Sneak Game",
};

const SneakPage = () => {
  return <GameContainer />;
};

export default SneakPage;
