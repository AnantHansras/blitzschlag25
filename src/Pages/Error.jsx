import React from 'react'

const Error = () => {
  return (
    <div className='bg-gray-700'><main>
    <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto space-y-3 text-center">
            <h3 className="text-red-400 font-semibold">
                404 Error
            </h3>
            <p className="text-gray-300 text-4xl font-semibold sm:text-5xl">
                Page not found
            </p>
            <p className="text-gray-500">
                Sorry, the page you are looking for could not be found or has been removed.
            </p>
        </div>
    </div>
</main></div>
  )
}

export default Error

