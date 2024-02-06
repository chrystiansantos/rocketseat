import axios from 'axios'
import { API } from '../../env.json'
export const api = axios.create({
  baseURL: API,
})
