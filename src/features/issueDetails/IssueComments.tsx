import React from 'react'
import ReactMarkdown from 'react-markdown'

import { insertMentionLinks } from 'utils/stringUtils'
import { UserWithAvatar } from 'components/UserWithAvatar'

import styles from './IssueComments.module.css'
import { IIssueModel } from '../../communications/issue/issue.types'
import { ICommentModel } from '../../communications/comment/comment.types'

interface ICLProps {
  issue: IIssueModel
  comments: ICommentModel[]
}

interface ICProps {
  comment: ICommentModel
}

function IssueComment({ comment }: ICProps) {
  return (
    <div className={styles.comment}>
      <UserWithAvatar
        user={comment.user}
        classes={{ avatar: styles.avatar, username: styles.username }}
        orientation="horizontal"
      />

      <div className={styles.body}>
        <ReactMarkdown
          className="markdown"
          source={insertMentionLinks(comment.body)}
        />
      </div>
    </div>
  )
}

export function IssueComments({ comments = [], issue }: ICLProps) {
  // The issue has no comments
  if (issue.comments === 0) {
    return <div className="issue-detail--no-comments">No comments</div>
  }

  // The issue has comments, but they're not loaded yet
  if (!comments || comments.length === 0) {
    return (
      <div className="issue-detail--comments-loading">Comments loading...</div>
    )
  }

  // Comments are loaded
  return (
    <ul className={styles.commentsList}>
      {comments.map(comment => (
        <li key={comment.id}>
          <IssueComment comment={comment} />
        </li>
      ))}
    </ul>
  )
}
