import store from "@/redux/store"
import { useSelector } from "react-redux"

const Dashboard = () => {

  const user = useSelector((store: any) => store.auth.user)
  return (
    <div>
        <div className="flex md:h-screen bg-gray-100">
            <div className="flex-1 flex flex-col">
                <main className="p-6 space-y-6">
                    <section className="bg-blue-500 text-white rounded-lg p-6">
                        <h1 className="text-2xl font-bold">Welcome Back, {user.name}!</h1>
                    </section>
                </main>
            </div>
        </div>
    </div>
  )
}

export default Dashboard