const mysql = require('mysql2/promise')
import { NextApiRequest, NextApiResponse } from 'next'

async function connectToDatabase(req: NextApiRequest, res: NextApiResponse) {
  try {
    const connection = await mysql.createPool({
      connectionLimit: 10,
      host: process.env.NEXT_PUBLIC_DATABASE_HOST,
      user: process.env.NEXT_PUBLIC_DATABASE_USERNAME,
      password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
      database: 'rbi-softball',
      ssl: {
        rejectUnauthorized: false
        // other SSL options as needed
      }
    })

    // Check request method to determine what to do
    if (req.method === 'GET') {
      // Get all player stats
      const [rows] = await connection.query(`
        SELECT stats.id, players.name, stats.at_bats, stats.hits, stats.home_runs, stats.doubles, stats.triples, stats.avg 
        FROM players
        INNER JOIN stats ON players.id = stats.player_id
      `)

      const playersStats = rows.map(
        (row: {
          id: number
          name: string
          at_bats: number
          hits: number
          home_runs: number
          doubles: number
          triples: number
          avg: number
        }) => ({
          id: row.id,
          name: row.name,
          at_bats: row.at_bats,
          hits: row.hits,
          home_runs: row.home_runs,
          doubles: row.doubles,
          triples: row.triples,
          avg: row.avg
        })
      )

      res.status(200).json(playersStats)
      console.log('Connected to PlanetScale!')
    } else if (req.method === 'POST') {
      // Add new player stats
      const { playerId, atBats, hits, homeRuns, doubles, triples } = req.body
      const avg = calculateAverage(atBats, hits)

      const [result] = await connection.query(
        `
        INSERT INTO stats (player_id, at_bats, hits, home_runs, doubles, triples, avg)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
        [playerId, atBats, hits, homeRuns, doubles, triples, avg]
      )

      res.status(200).json(result)
      console.log('Added new stats:', result)
    } else if (req.method === 'PUT') {
      // Update existing player stats
      const { id, atBats, hits, homeRuns, doubles, triples } = req.body
      const avg = calculateAverage(atBats, hits)

      const [result] = await connection.query(
        `
        UPDATE stats
        SET at_bats = at_bats + ?, hits = hits + ?, home_runs = home_runs + ?, doubles = doubles + ?, triples = triples + ?, avg=?
        WHERE id=?
      `,
        [atBats, hits, homeRuns, doubles, triples, avg, id]
      )

      res.status(200).json(result)
      console.log('Updated stats:', result)
    } else {
      // Unsupported request method
      res.status(405).json({ message: 'Method not allowed' })
      console.error('Unsupported request method:', req.method)
    }

    return connection
  } catch (error: any) {
    console.error('Error connecting to PlanetScale:', error.message)
    process.exit(1)
  }
}

function calculateAverage(atBats: number, hits: number): number {
  return atBats > 0 ? Number((hits / atBats).toFixed(3)) : 0
}

module.exports = connectToDatabase
