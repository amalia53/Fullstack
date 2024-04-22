import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return `You have voted '${action.content}'`
    case "ADD":
      return `You have created a new anecdote '${action.content}'`
    case "SHORT":
      return `Anecdote too short, must have length 5 or more`
    case "NULLIFY":
      return ""
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "")
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext