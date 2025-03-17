// Type pour les erreurs Medusa
export interface MedusaError extends Error {
  status?: number
  code?: string
  type?: string
}
