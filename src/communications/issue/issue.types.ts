
import { Links } from 'parse-link-header'
import { Label, User } from '../../api/githubAPI'
import { StoreBranch } from '@axmit/redux-communications'

export interface IIssueCollection {
  pageLinks: Links | null
  pageCount: number
  issues: IIssueModel[]
}

export interface IIssueModel {
  id: number
  title: string
  number: number
  user: User
  body: string
  labels: Label[]
  comments_url: string
  state: 'open' | 'closed'
  comments: number
}

export interface IIssueConnectedProps {
  issueModel: StoreBranch<IIssueModel>;
  issueCollection: StoreBranch<IIssueCollection>;
  getIssueModel(params: IIssueParams): Promise<IIssueModel>;
  getIssueCollection(params: IIssuesFilter): Promise<IIssueCollection>;
}

export interface IIssuesFilter {
  org: string;
  repo: string;
  page?: number;
}

export interface IIssueParams {
  org: string;
  repo: string;
  number: number;
}
