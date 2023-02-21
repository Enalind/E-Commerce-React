import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useDispatchAppSelector: () => AppDispatch = useDispatch
