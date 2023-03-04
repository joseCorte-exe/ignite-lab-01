import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useUser } from "@auth0/nextjs-auth0/client"
import { GetServerSideProps } from "next"
import Link from "next/link"

export default function Home() {
  const { user } = useUser()

  return (
    <>
      <h1>Hello World</h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>

      <Link href='/api/auth/logout'>Logout</Link>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired()