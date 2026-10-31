import { useState } from "react";

import { games } from "../data/games";

import GameCard from "../components/games/GameCard";

import CountAnimalsGame, {
  GameResult
} from "../components/games/CountAnimalsGame";

import { Game } from "../types/game";

export default function Games() {

  const [selectedGame, setSelectedGame] =
    useState<Game | null>(null);

  const [gameResult, setGameResult] =
    useState<GameResult | null>(null);

  const [selectedDomain, setSelectedDomain] =
    useState("all");

  const filteredGames =
    selectedDomain === "all"
      ? games
      : games.filter(
          game => game.domain === selectedDomain
        );

  const handleComplete = (result: GameResult) => {

    console.log("Game Result:", result);

    setGameResult(result);

    setSelectedGame(null);

    // Later:
    // send result to backend
  };

  if (gameResult) {

    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center p-6">

        <div className="bg-white rounded-3xl shadow-lg p-10 text-center max-w-md w-full">

          <div className="text-7xl mb-5">
            🎉
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Game Complete!
          </h1>

          <p className="text-gray-500 mt-3">
            Great work!
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">

            <div className="bg-purple-50 rounded-2xl p-4">
              <div className="text-3xl font-bold text-purple-600">
                {gameResult.score}%
              </div>
              <div className="text-sm text-gray-500">
                Score
              </div>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-4">
              <div className="text-3xl font-bold text-yellow-600">
                ⭐ 10
              </div>
              <div className="text-sm text-gray-500">
                Stars
              </div>
            </div>

          </div>

          <div className="mt-6 text-gray-600">

            <p>
              Correct answers:{" "}
              <strong>
                {gameResult.correctAnswers}
              </strong>
              {" / "}
              {gameResult.totalQuestions}
            </p>

            <p>
              Time:{" "}
              <strong>
                {gameResult.timeSpent}s
              </strong>
            </p>

          </div>

          <button
            onClick={() => setGameResult(null)}
            className="mt-8 w-full py-3 bg-purple-600 text-white rounded-xl font-bold"
          >
            Back to Games
          </button>

        </div>

      </div>
    );
  }

  if (selectedGame) {

    return (
      <CountAnimalsGame
        game={selectedGame}
        onComplete={handleComplete}
        onExit={() => setSelectedGame(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 p-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            🎮 Games
          </h1>

          <p className="text-gray-500 mt-2">
            Learn, play and build your skills!
          </p>

        </div>

        {/* Categories */}

        <div className="flex gap-3 flex-wrap mb-8">

          {[
            ["all", "🎮 All Games"],
            ["math", "🔢 Math"],
            ["attention", "👀 Attention"],
            ["memory", "🧠 Memory"],
            ["problemSolving", "🧩 Problem Solving"],
            ["communication", "💬 Communication"]
          ].map(([value, label]) => (

            <button
              key={value}
              onClick={() => setSelectedDomain(value)}
              className={`
                px-5 py-3
                rounded-2xl
                font-semibold
                transition

                ${
                  selectedDomain === value
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-600"
                }
              `}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Games */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredGames.map(game => (

            <GameCard
              key={game.id}
              game={game}
              onPlay={setSelectedGame}
            />

          ))}

        </div>

      </div>

    </div>
  );
}