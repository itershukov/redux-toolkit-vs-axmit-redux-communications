import {
  APIProvider,
  buildCommunication,
  EActionsTypes,
  BaseStrategy, Branch
} from '@axmit/redux-communications'
import { getRepoDetails } from '../../api/githubAPI'
import { IRepoConnectedProps } from './repo.types'

const namespace = 'repo';

const ModelAPIProvider = new APIProvider(EActionsTypes.get, getRepoDetails);

const branches = [
  new Branch('model', ModelAPIProvider)
]

const strategy = new BaseStrategy({
  namespace,
  branches
});

export const repoCommunication = buildCommunication<IRepoConnectedProps>(strategy);
