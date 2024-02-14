import Reviews from './components/Reviews'

const App = () => {
  return (
    <main className="bg-white mx-auto max-w-screen-2xl py-10 px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold leading-7 text-gray-900">iOS App Reviewer</h1>

        <h2 className="border-l border-gray-200 ml-6 pl-6 text-base font-semibold leading-7 text-gray-900">Tiktok</h2>
      </div>

      <Reviews />
    </main>
  )
}

export default App
