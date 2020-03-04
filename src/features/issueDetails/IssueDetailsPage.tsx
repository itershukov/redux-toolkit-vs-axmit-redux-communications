import React, { useEffect } from 'react'
// import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import classnames from 'classnames'

import { insertMentionLinks } from 'utils/stringUtils'
import { IssueLabels } from 'components/IssueLabels'
// import { RootState } from 'app/rootReducer'
// import { fetchIssue } from 'features/issuesList/issuesSlice'

import { IssueMeta } from './IssueMeta'
import { IssueComments } from './IssueComments'
// import { fetchComments } from './commentsSlice'

import styles from './IssueDetailsPage.module.css'
import './IssueDetailsPage.css'
import { issueCommunication } from '../../communications/issue/issue.communication'
import { IIssueConnectedProps } from '../../communications/issue/issue.types'
import { commentCommunication } from '../../communications/comment/comment.communication'
import { ICommentConnectedProps } from '../../communications/comment/comment.types'

interface IDProps {
  org: string
  repo: string
  issueId: number
  showIssuesList: () => void
}

export const IssueDetailsPage = commentCommunication.injector(issueCommunication.injector( ({
  org,
  repo,
  issueId,
  showIssuesList,
  issueModel,
  commentCollection,
  getIssueModel,
  getCommentCollection
}: IDProps & IIssueConnectedProps & ICommentConnectedProps) => {
  // const dispatch = useDispatch()
  const issue = issueModel.data
  const {loading: commentsLoading, errors: commentsError}  = commentCollection
  const comments = commentCollection.data || []
  // const issue = useSelector(
  //   (state: RootState) => state.issues.issuesByNumber[issueId]
  // )
  // const issue = useSelector(
  //   (state: IApplicationState) => state.issue.issueCollection.data?.issues.find(el => el.id === issueId),
  //   shallowEqual
  // )

  // const { commentsLoading, commentsError, comments } = useSelector(
  //   (state: RootState) => {
  //     return {
  //       commentsLoading: state.comments.loading,
  //       commentsError: state.comments.error,
  //       comments: state.comments.commentsByIssue[issueId]
  //     }
  //   },
  //   shallowEqual
  // )

  useEffect(() => {
    if (!issue) {
      // dispatch(fetchIssue(org, repo, issueId))
      getIssueModel({org, repo, number: issueId})
    }

    // Since we may have the issue already, ensure we're scrolled to the top
    window.scrollTo({ top: 0 })
  }, [org, repo, issueId, issue])

  useEffect(() => {
    if (issue) {
      // dispatch(fetchComments(issue))
      getCommentCollection(issue.comments_url)
    }
  }, [issue])

  let content

  const backToIssueListButton = (
    <button className="pure-button" onClick={showIssuesList}>
      Back to Issues List
    </button>
  )

  if (issue === null) {
    content = (
      <div className="issue-detail--loading">
        {backToIssueListButton}
        <p>Loading issue #{issueId}...</p>
      </div>
    )
  } else {
    let renderedComments

    if (comments) {
      renderedComments = <IssueComments issue={issue} comments={comments} />
    } else if (commentsLoading) {
      renderedComments = (
        <div className="issue-detail--loading">
          <p>Loading comments...</p>
        </div>
      )
    } else if (commentsError) {
      renderedComments = (
        <div className="issue-detail--error">
          <h1>Could not load comments for issue #{issueId}</h1>
          <p>{JSON.stringify(commentsError)}</p>
        </div>
      )
    }

    content = (
      <div className={classnames('issueDetailsPage', styles.issueDetailsPage)}>
        <h1 className="issue-detail__title">{issue.title}</h1>
        {backToIssueListButton}
        <IssueMeta issue={issue} />
        <IssueLabels labels={issue.labels} className={styles.issueLabels} />
        <hr className={styles.divider} />
        <div className={styles.summary}>
          <ReactMarkdown
            className={'testing'}
            source={insertMentionLinks(issue.body)}
          />
        </div>
        <hr className={styles.divider} />
        <ul>{renderedComments}</ul>
      </div>
    )
  }

  return <div>{content}</div>
}))
