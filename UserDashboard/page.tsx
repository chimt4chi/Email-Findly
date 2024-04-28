// UserDashboard.tsx
import React from 'react'

interface UserDashboardProps {}

const UserDashboard: React.FC<UserDashboardProps> = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div className="hidden md:flex md:flex-shrink-0 w-64 overflow-y-auto bg-gray-800 p-4">
        <div className="flex items-center justify-between flex-grow px-4">
          <h1 className="text-lg font-bold text-white">Q Search...</h1>
          <div className="flex items-center space-x-4">
            <p className="text-white font-medium">Tom Cook</p>
            <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
              {/* Replace with your avatar */}
              <img
                className="w-full h-full object-cover"
                src="https://placehold.jpg"
                alt="user avatar"
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <nav className="flex flex-col space-y-1 px-4">
            <a
              href="#"
              className="text-gray-300 hover:text-gray-200 py-2 px-4 font-medium text-sm"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-gray-200 py-2 px-4 font-medium text-sm"
            >
              Team
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-gray-200 py-2 px-4 font-medium text-sm"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-gray-200 py-2 px-4 font-medium text-sm"
            >
              Calendar
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-gray-200 py-2 px-4 font-medium text-sm"
            >
              Documents
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-gray-200 py-2 px-4 font-medium text-sm"
            >
              Reports
            </a>
          </nav>
        </div>
      </div>
      <div className="flex flex-col flex-grow p-4">
        <header className="mb-6">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </header>
        <main className="flex flex-wrap space-y-4">
          {/* Add your dashboard content here */}
        </main>
      </div>
    </div>
  )
}

export default UserDashboard
