import { Game } from "../../types/game";

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

export default function GameCard({
  game,
  onPlay
}: GameCardProps) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-md border border-purple-100">

      <div className="text-5xl mb-4">
        {game.emoji}
      </div>

      <h2 className="text-xl font-bold text-gray-800">
        {game.title}
      </h2>

      <p className="text-gray-500 mt-2">
        {game.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">

        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
          {game.domain}
        </span>

        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
          {game.level}
        </span>

        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
          ⭐ {game.stars}
        </span>

      </div>

      <div className="mt-5 flex justify-between items-center">

        <span className="text-sm text-gray-500">
          ⏱️ {game.duration} min
        </span>

        <button
          onClick={() => onPlay(game)}
          className="px-5 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
        >
          Play 🎮
        </button>

      </div>

    </div>
  );
}