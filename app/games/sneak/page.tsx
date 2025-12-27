import GameContainer from "@/components/pages/games/sneak/game-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sneak Game",
  description: "Sneak Game",
}

const SneakPage = () => {
  return (<GameContainer />)
}


export default SneakPage;