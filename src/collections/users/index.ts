import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Storage & Auth'
  },
  auth: true,
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: ['user', 'admin'],
      admin: {
        position: 'sidebar'
      }
    }
  ],
}
