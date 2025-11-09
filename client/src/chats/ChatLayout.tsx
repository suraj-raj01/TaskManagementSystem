import { Outlet } from "react-router-dom"

export default function chatLayout() {
  return (
    <section>
        <div className="flex flex-1 flex-col gap-4 p-2">
          <Outlet />
        </div>
      </section>
  )
}
