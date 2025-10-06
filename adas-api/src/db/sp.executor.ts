import { getPool } from "./mssql.config";

/**
 * Generic Stored Procedure executor.
 * @param spName The name of the stored procedure.
 * @param params  Optional object with key:value pairs for input parameters.
 * @returns Promise<any[]> The first recordset returned by the SP.
 */
export async function executeSP<T = any>(
  spName: string,
  params: Record<string, any> = {}
): Promise<T[]> {
  const pool = await getPool();
  const request = pool.request();

  // Add inputs if provided
  for (const [key, value] of Object.entries(params)) {
    request.input(key, value as any);
  }

  const result = await request.execute(spName);
  return result.recordset as T[];
}
