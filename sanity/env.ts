export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-18'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skej8VgOBWaHhL3yJtH1PNAoT4Xd9mmcFe0bsmDjqPFCfwDZ1uVc1Q6oionbcNQLDMGc4m2BMpo60aNINMb2JEzsNUFYbvYyQIFoEZViW5QGXvzwiJk4ua48l8G0WRarK5PU1RDeu12uEkayu8JRR8jnlgDokcnc1qAUfJ9EubeJWoQGEXbp",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
