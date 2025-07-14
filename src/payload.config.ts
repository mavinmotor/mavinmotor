// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/users'
import { Media } from './collections/media'
import { Pages } from './collections/pages'
import { defaultLexical } from './fields/defaultLexical'
import { Products } from './collections/products'
import { Categories } from './collections/catagories'
import { Keywords } from './collections/keywords'
import { plugins } from './plugins'
import { Header } from './preferences/header/config'
import { Footer } from './preferences/footer/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    avatar: 'default',
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    meta: {
      titleSuffix: '- Mavin Motor',
      icons: {
        icon: "/favicon.svg",
        apple: "/favicon.svg"
      }
    }
  },
  collections: [Pages, Products, Keywords, Categories, Users, Media],
  globals: [Header, Footer],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET || '',
  graphQL: {
    disablePlaygroundInProduction: false,
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  email: resendAdapter({
    defaultFromAddress: 'info@mavinmotor.com',
    defaultFromName: 'MAVIN MOTOR WEBSITE',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  sharp,
  plugins: plugins,
})
