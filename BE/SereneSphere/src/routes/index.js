import UsersRoute from './UsersRoute'
import AuthRoute from './AuthRoute'
import PostRoute from './PostRoute'
import FollowRoute from './FollowRoute'
import CommentRoute from './CommentRoute'
import MessageRoute from './MessageRoute'
import SearchRoute from './SearchRoute'

const initRoutes = (app) => {

  app.use('/api/v1/users', UsersRoute);
  app.use('/api/v1/oauth', AuthRoute);
  app.use('/api/v1/user/post',PostRoute);
  app.use('/api/v1/user/follow',FollowRoute);
  app.use('/api/v1/user/comment',CommentRoute);
  app.use('/api/v1/user/message',MessageRoute);
  app.use('/api/v1/user/search',SearchRoute);

  return app.use('/', (req, res) => {
    return res.send('server on')
  })
}
module.exports = initRoutes
