import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

export const useAppContext = () => useContext(AppContext)
