import { Outlet } from "react-router-dom"

export default function Layouts() {
  return (
    <>

        
        <header className="bg-slate-800">
            <div className="p-10">
                <h1 className="text-4xl font-extrabold text-white">
                    Administrador de Productos
                </h1>
            </div>
        </header>


        <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow rounded-lg relative">
            {/* <Loading /> */}
            <Outlet />
        </main>
    </>
    
  )
}
