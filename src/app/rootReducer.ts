import { combineReducers } from '@reduxjs/toolkit'

import issuesDisplayReducer from 'features/issuesDisplay/issuesDisplaySlice'
// import repoDetailsReducer from 'features/repoSearch/repoDetailsSlice'
// import commentsReducer from 'features/issueDetails/commentsSlice'
// import issuesReducer from 'features/issuesList/issuesSlice'
import { issueCommunication } from '../communications/issue/issue.communication'
import { repoCommunication } from '../communications/repo/repo.communication'
import { commentCommunication } from '../communications/comment/comment.communication'
import { IApplicationState } from './store'

// @ts-ignore
const rootReducer = combineReducers({
  issuesDisplay: issuesDisplayReducer,
  // repoDetails: repoDetailsReducer,
  // comments: commentsReducer,
  // issues: issuesReducer,
  ...issueCommunication.reducers,
  ...repoCommunication.reducers,
  ...commentCommunication.reducers,
})

export type RootState = ReturnType<typeof rootReducer> & IApplicationState

export default rootReducer
