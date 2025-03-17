// This is temporary fix fot @nuxtjs/medusa
declare module '#medusa/server' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function serverMedusaClient(event: any): any
}
