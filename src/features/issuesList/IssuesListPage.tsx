import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'app/rootReducer'

import { IssuesPageHeader } from './IssuesPageHeader'
import { IssuesList } from './IssuesList'
import { IssuePagination, OnPageChangeCallback } from './IssuePagination'
import { IIssueConnectedProps } from '../../communications/issue/issue.types'
import { issueCommunication } from '../../communications/issue/issue.communication'
import { repoCommunication } from '../../communications/repo/repo.communication'
import { IRepoConnectedProps } from '../../communications/repo/repo.types'

interface ILProps {
  org: string
  repo: string
  page: number
  setJumpToPage: (page: number) => void
  showIssueComments: (issueId: number) => void
}

export const IssuesListPage = repoCommunication.injector(issueCommunication.injector(({
  org,
  repo,
  page = 1,
  setJumpToPage,
  showIssueComments,
  issueCollection,
  repoModel,
  getIssueCollection,
  getRepoModel
}: ILProps & IIssueConnectedProps & IRepoConnectedProps) => {
  // const dispatch = useDispatch()

  const {
    data,
    loading: isLoading,
    errors: issuesError
  } = issueCollection;

  const {issues = [], pageCount = 0} = data || {}

  const openIssueCount = repoModel.data ? repoModel.data.open_issues_count : 0
  // const {
  //   currentPageIssues,
  //   isLoading,
  //   error: issuesError,
  //   issuesByNumber,
  //   pageCount
  // } = useSelector((state: RootState) => state.issues)

  // const openIssueCount = useSelector(
  //   (state: RootState) => state.repoDetails.openIssuesCount
  // )

  // const issues = currentPageIssues.map(
  //     (issueNumber: string | number) => issuesByNumber[issueNumber]
  // )

  useEffect(() => {
    getIssueCollection({org, repo, page});
    getRepoModel({org, repo});
    // dispatch(fetchIssues(org, repo, page))
    // dispatch(fetchIssuesCount(org, repo))
  }, [org, repo, page])

  if (issuesError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{JSON.stringify(issuesError)}</div>
      </div>
    )
  }

  const currentPage = Math.min(pageCount, Math.max(page, 1)) - 1

  let renderedList = isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <IssuesList issues={issues} showIssueComments={showIssueComments} />
  )

  const onPageChanged: OnPageChangeCallback = selectedItem => {
    const newPage = selectedItem.selected + 1
    setJumpToPage(newPage)
  }

  return (
    <div id="issue-list-page">
      <IssuesPageHeader
        openIssuesCount={openIssueCount}
        org={org}
        repo={repo}
      />
      {renderedList}
      <IssuePagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={onPageChanged}
      />
    </div>
  )
}))
