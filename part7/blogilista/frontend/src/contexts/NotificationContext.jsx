import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        message: `Added a new Blog '${action.blog.title} by ${action.blog.author}'`,
        isError: false,
      }
    case 'LIKE':
      return {
        message: `You liked '${action.blog.title} by ${action.blog.author}'`,
        isError: false,
      }
    case 'LIKEFAILED':
      return { message: 'Failed liking the blog', isError: true }
    case 'BADLOGIN':
      return { message: 'Wrong credentials', isError: true }
    case 'DELETE':
      return {
        message: `Deleted '${action.blog.title} by ${action.blog.author}'`,
        isError: false,
      }
    case 'FAILED':
      return { message: action.errormsg, isError: true }
    case 'NULLIFY':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    '',
  )
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
