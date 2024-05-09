import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) {
    return null
  }

  return notification.isError ? (
    <div className="error">{notification.message}</div>
  ) : (
    <div className="notification">{notification.message}</div>
  )
}

export default Notification
