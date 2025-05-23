import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'hhvs5stc',
  dataset: 'production',
  apiVersion: '2023-01-01',       // Use current date or API version
  useCdn: true,                   // `true` for faster, cached queries; `false` for fresh data
})
