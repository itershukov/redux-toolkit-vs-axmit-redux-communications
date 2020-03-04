import { StoreBranch } from '@axmit/redux-communications'
import { User } from '../../api/githubAPI'

export interface ICommentModel {
  id: number
  body: string
  user: User
  created_at: string
  updated_at: string
}

export interface ICommentConnectedProps {
  commentCollection: StoreBranch<ICommentModel[]>;
  getCommentCollection(params: string): Promise<ICommentModel[]>;
}
