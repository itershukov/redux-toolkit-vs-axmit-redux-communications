import { IIssueConnectedProps } from './issue.types'
import { APIProvider, BaseStrategy, Branch, buildCommunication, EActionsTypes } from '@axmit/redux-communications'
import { getIssue, getIssues } from '../../api/githubAPI'

const namespace = 'issue';

const ModelAPIProvider = new APIProvider(EActionsTypes.get, getIssue);
const CollectionAPIProvider = new APIProvider(EActionsTypes.get, getIssues);

const branches = [
  new Branch('model', ModelAPIProvider),
  new Branch('collection', CollectionAPIProvider)
];

const strategy = new BaseStrategy({
  namespace,
  branches
});

export const issueCommunication = buildCommunication<IIssueConnectedProps>(strategy);
