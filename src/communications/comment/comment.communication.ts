import {
  APIProvider,
  buildCommunication,
  EActionsTypes,
  BaseStrategy, Branch
} from '@axmit/redux-communications'
import { getComments } from '../../api/githubAPI'
import { ICommentConnectedProps } from './comment.types'

const namespace = 'comment';

const CollectionAPIProvider = new APIProvider(EActionsTypes.get, getComments);

const branches = [
  new Branch('collection', CollectionAPIProvider)
]

const strategy = new BaseStrategy({
  namespace,
  branches
});

export const commentCommunication = buildCommunication<ICommentConnectedProps>(strategy);
