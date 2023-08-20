/* eslint-disable @typescript-eslint/ban-types */
export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          id: number
          created_at: string
          updated_at: string
          title: string
        } // The data expected to be returned from a "select" statement.
        Insert: {} // The data expected passed to an "insert" statement.
        Update: {} // The data expected passed to an "update" statement.
      }
    }
  }
}
