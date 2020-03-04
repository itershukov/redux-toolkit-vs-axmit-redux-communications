import React from 'react'
import classnames from 'classnames'

import { UserWithAvatar } from 'components/UserWithAvatar'

import styles from './IssueMeta.module.css'
import { IIssueModel } from '../../communications/issue/issue.types'

interface IssueProps {
  issue: IIssueModel
}

const IssueState = ({ issue: { state } }: IssueProps) => (
  <span
    className={classnames('issue-detail__state', styles.issueState, {
      [styles.open]: state === 'open'
    })}
  >
    {state}
  </span>
)

const IssueNumber = ({ issue }: IssueProps) => (
  <span className={classnames('issue-detail__number', styles.number)}>
    #{issue.number}
  </span>
)

export const IssueMeta = ({ issue }: IssueProps) => {
  return (
    <div className={classnames('issue-detail__meta', styles.meta)}>
      <IssueNumber issue={issue} />
      <IssueState issue={issue} />
      <UserWithAvatar user={issue.user} orientation="horizontal" />
    </div>
  )
}
