import { useAuth } from '@redwoodjs/auth'

import avatarPlaceholder from '../../assets/avatar.png'

const UserAvatar = () => {
  const { currentUser } = useAuth()

  return (
    <img
      src={
        (currentUser as { avatarUrl?: string } | null)?.avatarUrl ||
        avatarPlaceholder
      }
      alt="User avatar"
      className="h-8 w-8 rounded-full lg:h-10 lg:w-10"
    />
  )
}

export default UserAvatar
