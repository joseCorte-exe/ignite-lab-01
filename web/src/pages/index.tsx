import { getSession } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'

export default function Home() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = await getSession(req, res)

  console.log(token)

  if (!token)
    return {
      redirect: {
        destination: 'api/auth/login',
        permanent: false
      }
    }

  return {
    redirect: {
      destination: '/app',
      permanent: false
    },
  }
}
