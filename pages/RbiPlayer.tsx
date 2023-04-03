// 'use client'
// import { useState, useEffect } from 'react'
// import Modal from '@/components/modal'
// import axios from 'axios'

// const StatsTable = () => {
//   const [playersStats, setPlayersStats] = useState<any>([])
//   const [selectedPlayer, setSelectedPlayer] = useState<any>([])
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [atBats, setAtBats] = useState(0)
//   const [hits, setHits] = useState(0)
//   const [homeRuns, setHomeRuns] = useState(0)
//   const [doubles, setDoubles] = useState(0)
//   const [triples, setTriples] = useState(0)

//   const fetchPlayersStats = async () => {
//     try {
//       const response = await axios.get('/api/players')
//       setPlayersStats(response.data)
//     } catch (error: any) {
//       console.error('Error fetching player stats:', error.message)
//     }
//   }

//   const updatePlayerStats = async () => {
//     try {
//       await axios.put('/api/players', {
//         id: selectedPlayer.id,
//         atBats,
//         hits,
//         homeRuns,
//         doubles,
//         triples
//       })
//       setSelectedPlayer([])
//       setAtBats(0)
//       setHits(0)
//       setHomeRuns(0)
//       setDoubles(0)
//       setTriples(0)
//       setIsModalOpen(false)
//       await fetchPlayersStats()
//     } catch (error: any) {
//       console.error('Error updating player stats:', error.message)
//     }
//   }

//   useEffect(() => {
//     fetchPlayersStats()
//   }, [])

//   return (
//     <div className="w-full overflow-x-auto">
//       <table className="w-full whitespace-nowrap rounded-lg overflow-hidden">
//         <thead className="bg-gray-50">
//           <tr className="text-gray-600 text-left">
//             <th className="py-3 px-4 font-semibold uppercase text-center">
//               Player Name
//             </th>
//             <th className="py-3 px-4 font-semibold uppercase text-center">
//               At Bats
//             </th>
//             <th className="py-3 px-4 font-semibold uppercase text-center">
//               Hits
//             </th>
//             <th className="py-3 px-4 font-semibold uppercase text-center">
//               Home Runs
//             </th>
//             <th className="py-3 px-4 font-semibold uppercase text-center">
//               Doubles
//             </th>
//             <th className="py-3 px-4 font-semibold uppercase text-center">
//               Triples
//             </th>
//             <th className="py-3 px-4 font-semibold uppercase text-center">
//               Avg
//             </th>
//             <th className="py-3 px-4 font-semibold uppercase text-center">
//               Update Stats
//             </th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-600">
//           {playersStats.map((playerStats: any) => (
//             <tr
//               key={playerStats.name}
//               className="border-b border-gray-200 hover:bg-gray-100"
//             >
//               <td className="py-3 px-4 text-center">{playerStats.name}</td>
//               <td className="py-3 px-4 text-center">{playerStats.at_bats}</td>
//               <td className="py-3 px-4 text-center">{playerStats.hits}</td>
//               <td className="py-3 px-4 text-center">{playerStats.home_runs}</td>
//               <td className="py-3 px-4 text-center">{playerStats.doubles}</td>
//               <td className="py-3 px-4 text-center">{playerStats.triples}</td>
//               <td className="py-3 px-4 text-center">
//                 {playerStats.at_bats === 0
//                   ? 0
//                   : (playerStats.hits / playerStats.at_bats).toFixed(3)}
//               </td>
//               <td className="py-3 px-4 text-center">
//                 <button
//                   className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full mr-3"
//                   onClick={() => {
//                     setSelectedPlayer(playerStats)
//                     setIsModalOpen(true)
//                   }}
//                 >
//                   Edit Stats
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {isModalOpen && (
//         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//           <h1 className="text-xl text-center py-3">{selectedPlayer.name}</h1>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex flex-col">
//               <label
//                 htmlFor="atBats"
//                 className="mb-1 font-semibold text-gray-600"
//               >
//                 At Bats
//               </label>
//               <input
//                 type="number"
//                 id="atBats"
//                 name="atBats"
//                 value={atBats}
//                 onChange={event => setAtBats(parseInt(event.target.value))}
//                 className="py-2 px-4 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label
//                 htmlFor="hits"
//                 className="mb-1 font-semibold text-gray-600"
//               >
//                 Hits
//               </label>
//               <input
//                 type="number"
//                 id="hits"
//                 name="hits"
//                 value={hits}
//                 onChange={event => setHits(parseInt(event.target.value))}
//                 className="py-2 px-4 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label
//                 htmlFor="homeRuns"
//                 className="mb-1 font-semibold text-gray-600"
//               >
//                 Home Runs
//               </label>
//               <input
//                 type="number"
//                 id="homeRuns"
//                 name="homeRuns"
//                 value={homeRuns}
//                 onChange={event => setHomeRuns(parseInt(event.target.value))}
//                 className="py-2 px-4 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label
//                 htmlFor="doubles"
//                 className="mb-1 font-semibold text-gray-600"
//               >
//                 Doubles
//               </label>
//               <input
//                 type="number"
//                 id="doubles"
//                 name="doubles"
//                 value={doubles}
//                 onChange={event => setDoubles(parseInt(event.target.value))}
//                 className="py-2 px-4 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label
//                 htmlFor="triples"
//                 className="mb-1 font-semibold text-gray-600"
//               >
//                 Triples
//               </label>
//               <input
//                 type="number"
//                 id="triples"
//                 name="triples"
//                 value={triples}
//                 onChange={event => setTriples(parseInt(event.target.value))}
//                 className="py-2 px-4 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//               />
//             </div>
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
//               onClick={updatePlayerStats}
//             >
//               Save
//             </button>
//           </div>
//         </Modal>
//       )}
//       <div id="modal-root"></div>
//     </div>
//   )
// }

// export default StatsTable

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
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 px-3">
        {playersStats.map((playerStats: any) => (
          <div
            key={playerStats.name}
            className="border-2 border-black rounded-md shadow-sm hover:shadow-md text-center"
          >
            <div className="bg-gray-100 px-4 py-2 rounded-t-md">
              <h3 className="text-lg font-medium dark:text-black">{playerStats.name}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 px-4 py-2">
              <div className="border-2 border-black dark:border-white rounded-md text-center">
                <label
                  htmlFor="atBats"
                  className="block font-semibold text-gray-600 dark:text-blue-700"
                >
                  At Bats
                </label>
                <td
                  id="atBats"
                  className="w-full py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent flex justify-center"
                >
                  {playerStats.at_bats}
                </td>
              </div>
              <div className="border-2 border-black dark:border-white rounded-md text-center">
                <label
                  htmlFor="hits"
                  className="block font-semibold text-gray-600 dark:text-blue-700"
                >
                  Hits
                </label>
                <td
                  id="hits"
                  className="w-full py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent flex justify-center"
                >
                  {playerStats.hits}
                </td>
              </div>
              <div className="border-2 border-black dark:border-white rounded-md text-center">
                <label
                  htmlFor="homeRuns"
                  className="block font-semibold text-gray-600 dark:text-blue-700"
                >
                  Home Runs
                </label>
                <td
                  id="homeRuns"
                  className="w-full py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent flex justify-center"
                >
                  {playerStats.home_runs}
                  </td>
              </div>
              <div className="border-2 border-black dark:border-white rounded-md text-center">
                <label
                  htmlFor="doubles"
                  className="block font-semibold text-gray-600 dark:text-blue-700"
                >
                  Doubles
                </label>
                <td
                  id="doubles"
                  className="w-full py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent flex justify-center"
                >
                  {playerStats.doubles}
                </td>
              </div>
              <div className="border-2 border-black dark:border-white rounded-md text-center">
                <label
                  htmlFor="triples"
                  className="block font-semibold text-gray-600 dark:text-blue-700"
                >
                  Triples
                </label>
                <td
                  id="triples"
                  className="w-full py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent flex justify-center"
                >
                  {playerStats.triples}
                </td>
              </div>
              <div className="border-2 border-black dark:border-white rounded-md text-center">
              <label
                  htmlFor="avg"
                  className="block font-semibold text-gray-600 dark:text-blue-700"
                >
                  Avg
                </label>
                <td
                  id="average"
                  className="w-full py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent flex justify-center"
                >
                  {playerStats.at_bats === 0 ? 0 : (playerStats.hits / playerStats.at_bats).toFixed(3)}
                </td>
                </div>
              <div className="col-span-2">
                <button
                  onClick={() => {
                    setSelectedPlayer(playerStats)
                    setIsModalOpen(true)
                  }}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-medium mb-4">Edit Player Stats</h2>
          <form
            onSubmit={e => {
              e.preventDefault()
              updatePlayerStats()
            }}
          >
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="atBatsModal"
                  className="block font-semibold text-gray-600"
                >
                  At Bats
                </label>
                <input
                  type="number"
                  id="atBatsModal"
                  name="atBatsModal"
                  value={atBats}
                  onChange={e => setAtBats(parseInt(e.target.value))}
                  className="w-full py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="hitsModal"
                  className="block font-semibold text-gray-600"
                >
                  Hits
                </label>
                <input
                  type="number"
                  id="hitsModal"
                  name="hitsModal"
                  value={hits}
                  onChange={e => setHits(parseInt(e.target.value))}
                  className="w-full py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="homeRunsModal"
                  className="block font-semibold text-gray-600"
                >
                  Home Runs
                </label>
                <input
                  type="number"
                  id="homeRunsModal"
                  name="homeRunsModal"
                  value={homeRuns}
                  onChange={e => setHomeRuns(parseInt(e.target.value))}
                  className="w-full py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="doublesModal"
                  className="block font-semibold text-gray-600"
                >
                  Doubles
                </label>
                <input
                  type="number"
                  id="doublesModal"
                  name="doublesModal"
                  value={doubles}
                  onChange={e => setDoubles(parseInt(e.target.value))}
                  className="w-full py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="triplesModal"
                  className="block font-semibold text-gray-600"
                >
                  Triples
                </label>
                <input
                  type="number"
                  id="triplesModal"
                  name="triplesModal"
                  value={triples}
                  onChange={e => setTriples(parseInt(e.target.value))}
                  className="w-full py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
      <div id="modal-root"></div>
    </div>
  )
}
export default StatsTable
