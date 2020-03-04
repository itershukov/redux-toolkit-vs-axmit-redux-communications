import axios from 'axios'
import parseLink, { Links } from 'parse-link-header'
import { IIssueCollection, IIssueModel, IIssueParams, IIssuesFilter } from '../communications/issue/issue.types'
import { IRepoModel, IRepoParams } from '../communications/repo/repo.types'
import { ICommentModel } from '../communications/comment/comment.types'

export interface Label {
  id: number
  name: string
  color: string
}

export interface User {
  login: string
  avatar_url: string
}

const isLastPage = (pageLinks: Links) => {
  return (
    Object.keys(pageLinks).length === 2 && pageLinks.first && pageLinks.prev
  )
}

const getPageCount = (pageLinks: Links) => {
  if (!pageLinks) {
    return 0
  }
  if (isLastPage(pageLinks)) {
    return parseInt(pageLinks.prev.page, 10) + 1
  } else if (pageLinks.last) {
    return parseInt(pageLinks.last.page, 10)
  } else {
    return 0
  }
}

export async function getIssues({org, repo, page = 1}: IIssuesFilter): Promise<IIssueCollection> {
  const url = `https://api.github.com/repos/${org}/${repo}/issues?per_page=25&page=${page}`

  try {
    const issuesResponse = await axios.get<IIssueModel[]>(url)
    let pageCount = 0
    const pageLinks = parseLink(issuesResponse.headers.link)

    if (pageLinks !== null) {
      pageCount = getPageCount(pageLinks)
    }

    return {
      pageLinks,
      pageCount,
      issues: issuesResponse.data
    }
  } catch (err) {
    throw err
  }
}

export async function getIssue({org, repo, number}: IIssueParams) {
  const url = `https://api.github.com/repos/${org}/${repo}/issues/${number}`

  const { data } = await axios.get<IIssueModel>(url)
  return data
}
export async function getRepoDetails({org, repo}: IRepoParams) {
  const url = `https://api.github.com/repos/${org}/${repo}`

  const { data } = await axios.get<IRepoModel>(url)
  return data
}

export async function getComments(url: string) {
  const { data } = await axios.get<ICommentModel[]>(url)
  return data
}
