'use client'
import { useState, useEffect } from 'react'
import Modal from '@/components/modal'
import axios from 'axios'

const StatsTable = () => {
  const [playersStats, setPlayersStats] = useState<any>([])
  const [selectedPlayer, setSelectedPlayer] = useState<any>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [atBats, setAtBats] = useState(0)
  const [hits, setHits] = useState(0)
  const [homeRuns, setHomeRuns] = useState(0)
  const [doubles, setDoubles] = useState(0)
  const [triples, setTriples] = useState(0)

  const fetchPlayersStats = async () => {
    try {
      const response = await axios.get('/api/players')
      setPlayersStats(response.data)
    } catch (error: any) {
      console.error('Error fetching player stats:', error.message)
    }
  }

  const updatePlayerStats = async () => {
    try {
      await axios.put('/api/players', {
        id: selectedPlayer.id,
        atBats,
        hits,
        homeRuns,
        doubles,
        triples
      })
      setSelectedPlayer([])
      setAtBats(0)
      setHits(0)
      setHomeRuns(0)
      setDoubles(0)
      setTriples(0)
      setIsModalOpen(false)
      await fetchPlayersStats()
    } catch (error: any) {
      console.error('Error updating player stats:', error.message)
    }
  }

  useEffect(() => {
    fetchPlayersStats()
  }, [])

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full whitespace-nowrap rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr className="text-gray-600 text-left">
            <th className="py-3 px-4 font-semibold uppercase text-center">
              Player Name
            </th>
            <th className="py-3 px-4 font-semibold uppercase text-center">
              At Bats
            </th>
            <th className="py-3 px-4 font-semibold uppercase text-center">
              Hits
            </th>
            <th className="py-3 px-4 font-semibold uppercase text-center">
              Home Runs
            </th>
            <th className="py-3 px-4 font-semibold uppercase text-center">
              Doubles
            </th>
            <th className="py-3 px-4 font-semibold uppercase text-center">
              Triples
            </th>
            <th className="py-3 px-4 font-semibold uppercase text-center">
              Avg
            </th>
            <th className="py-3 px-4 font-semibold uppercase text-center">
              Update Stats
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {playersStats.map((playerStats: any) => (
            <tr
              key={playerStats.name}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-4 text-center">{playerStats.name}</td>
              <td className="py-3 px-4 text-center">{playerStats.at_bats}</td>
              <td className="py-3 px-4 text-center">{playerStats.hits}</td>
              <td className="py-3 px-4 text-center">{playerStats.home_runs}</td>
              <td className="py-3 px-4 text-center">{playerStats.doubles}</td>
              <td className="py-3 px-4 text-center">{playerStats.triples}</td>
              <td className="py-3 px-4 text-center">
                {playerStats.at_bats === 0
                  ? 0
                  : (playerStats.hits / playerStats.at_bats).toFixed(3)}
              </td>
              <td className="py-3 px-4 text-center">
                <button
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full mr-3"
                  onClick={() => {
                    setSelectedPlayer(playerStats)
                    setIsModalOpen(true)
                  }}
                >
                  Edit Stats
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h1 className="text-xl text-center py-3">{selectedPlayer.name}</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="atBats"
                className="mb-1 font-semibold text-gray-600"
              >
                At Bats
              </label>
              <input
                type="number"
                id="atBats"
                name="atBats"
                value={atBats}
                onChange={event => setAtBats(parseInt(event.target.value))}
                className="py-2 px-4 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="hits"
                className="mb-1 font-semibold text-gray-600"
              >
                Hits
              </label>
              <input
                type="number"
                id="hits"
                name="hits"
                value={hits}
                onChange={event => setHits(parseInt(event.target.value))}
                className="py-2 px-4 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="homeRuns"
                className="mb-1 font-semibold text-gray-600"
              >
                Home Runs
              </label>
              <input
                type="number"
                id="homeRuns"
                name="homeRuns"
                value={homeRuns}
                onChange={event => setHomeRuns(parseInt(event.target.value))}
                className="py-2 px-4 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="doubles"
                className="mb-1 font-semibold text-gray-600"
              >
                Doubles
              </label>
              <input
                type="number"
                id="doubles"
                name="doubles"
                value={doubles}
                onChange={event => setDoubles(parseInt(event.target.value))}
                className="py-2 px-4 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="triples"
                className="mb-1 font-semibold text-gray-600"
              >
                Triples
              </label>
              <input
                type="number"
                id="triples"
                name="triples"
                value={triples}
                onChange={event => setTriples(parseInt(event.target.value))}
                className="py-2 px-4 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={updatePlayerStats}
            >
              Save
            </button>
          </div>
        </Modal>
      )}
      <div id="modal-root"></div>
    </div>
  )
}

export default StatsTable