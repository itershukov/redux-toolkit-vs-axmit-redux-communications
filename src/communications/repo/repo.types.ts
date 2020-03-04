import { StoreBranch } from '@axmit/redux-communications'

export interface IRepoParams {
  org: string;
  repo: string;
}

export interface IRepoModel {
  id: number
  name: string
  full_name: string
  open_issues_count: number
}

export interface IRepoConnectedProps {
  repoModel: StoreBranch<IRepoModel>;
  getRepoModel(params: IRepoParams): Promise<IRepoModel>;
}
