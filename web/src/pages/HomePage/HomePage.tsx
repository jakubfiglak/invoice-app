import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  const { currentUser, logOut } = useAuth()

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="space-y-6 dark:text-white">
        <h1 className="text-xl font-bold">Lorem ipsum dolor sit amet.</h1>

        <h2 className="text-lg font-bold">Lorem ipsum dolor sit amet.</h2>

        <h3 className="text-md font-bold">Lorem ipsum dolor sit amet.</h3>

        <h4 className="text-sm font-bold">Lorem ipsum dolor sit amet.</h4>

        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum odio
          minima, corrupti accusantium quidem ratione suscipit quod tempore!
          Similique, voluptatum. Aperiam, porro! Aliquid placeat nesciunt cum a
          unde, quia quo facilis animi odio, recusandae debitis nam
          reprehenderit eligendi eius nisi? Odio, accusamus! Esse aut, et eos
          architecto laboriosam officiis dolores!
        </p>

        <p className="text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          illum, autem, molestiae impedit perspiciatis maxime in ab placeat at
          quas voluptate unde consequatur cum, itaque suscipit assumenda omnis
          odit obcaecati explicabo aut adipisci alias debitis. Nemo assumenda ex
          possimus architecto? Adipisci omnis officia sit quisquam iste
          exercitationem harum et recusandae?
        </p>

        <pre>{JSON.stringify(currentUser, null, 2)}</pre>

        <button className="rw-button rw-button-blue" onClick={logOut}>
          Logout
        </button>
      </div>
    </>
  )
}

export default HomePage
