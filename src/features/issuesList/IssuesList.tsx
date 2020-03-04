import React from 'react'

import { IssueListItem } from './IssueListItem'

import styles from './IssuesList.module.css'
import { IIssueModel } from '../../communications/issue/issue.types'

interface Props {
  issues: IIssueModel[]
  showIssueComments: (issueId: number) => void
}

export const IssuesList = ({ issues, showIssueComments }: Props) => {
  const renderedIssues = issues.map(issue => (
    <li key={issue.id}>
      <IssueListItem {...issue} showIssueComments={showIssueComments} />
    </li>
  ))

  return <ul className={styles.issuesList}>{renderedIssues}</ul>
}
