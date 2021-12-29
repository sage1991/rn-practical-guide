import { openDatabase, SQLResultSet, SQLTransaction } from "expo-sqlite"

import { CREATE_TABLE_PLACE } from "./tables"


const db = openDatabase("places.db")

export const init = () => execute({ query: CREATE_TABLE_PLACE })

export interface Statement {
  query: string
  args?: (number | string)[]
}

export const execute = (statement: Statement) => (
  new Promise<SQLResultSet>((resolve, reject) => {
    db.transaction(
      transaction => {
        transaction.executeSql(
          statement.query,
          statement.args,
          (_, resultSet) => resolve(resultSet),
          (_, error) => {
            reject(error)
            return false
          }
        )
      },
      reject
    )
  })
)
