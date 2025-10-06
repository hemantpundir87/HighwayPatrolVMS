/**
 * Represents a single row returned from SQL stored procedure
 * (typically from #Temp table with StatusCode & AlertMessage)
 */
export interface DbRecord {
  StatusCode?: number;
  AlertMessage?: string;
}

/**
 * Represents the unified API response returned to the client
 * after processing DB output in generateSetupResponse()
 */
export interface ApiResponse {
  StatusCode: number;
  AlertMessage: string;
  AlertData: string[];
}
