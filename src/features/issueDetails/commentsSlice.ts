import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getComments } from 'api/githubAPI'
import { AppThunk } from 'app/store'
import { IIssueModel } from '../../communications/issue/issue.types'
import { ICommentModel } from '../../communications/comment/comment.types'

interface CommentsState {
  commentsByIssue: Record<number, ICommentModel[] | undefined>
  loading: boolean
  error: string | null
}

interface CommentLoaded {
  issueId: number
  comments: ICommentModel[]
}

const initialState: CommentsState = {
  commentsByIssue: {},
  loading: false,
  error: null
}

const comments = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    getCommentsStart(state) {
      state.loading = true
      state.error = null
    },
    getCommentsSuccess(state, action: PayloadAction<CommentLoaded>) {
      const { comments, issueId } = action.payload
      state.commentsByIssue[issueId] = comments
      state.loading = false
      state.error = null
    },
    getCommentsFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const {
  getCommentsStart,
  getCommentsSuccess,
  getCommentsFailure
} = comments.actions
export default comments.reducer

export const fetchComments = (issue: IIssueModel): AppThunk => async dispatch => {
  try {
    dispatch(getCommentsStart())
    const comments = await getComments(issue.comments_url)
    dispatch(getCommentsSuccess({ issueId: issue.number, comments }))
  } catch (err) {
    dispatch(getCommentsFailure(err))
  }
}
