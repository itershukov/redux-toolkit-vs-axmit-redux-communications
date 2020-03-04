import { all } from 'redux-saga/effects';
import { issueCommunication } from '../communications/issue/issue.communication'
import { repoCommunication } from '../communications/repo/repo.communication'
import { commentCommunication } from '../communications/comment/comment.communication'

export default function* rootSaga(): any {
  yield all([
    ...issueCommunication.sagas,
    ...commentCommunication.sagas,
    ...repoCommunication.sagas
  ]);
}
