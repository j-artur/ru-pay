import { useAuth } from "./auth_context"

const LoggedAs = () => {
  const { user } = useAuth()
  return (
    <div className="fixed">
      <p>
        Logado como: <b>{user?.name}</b>
      </p>
    </div>
  )
}

export default LoggedAs
