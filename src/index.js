
import dva from 'dva';
import createHistory from 'history/createBrowserHistory'
import './index.css'
import './iconfont.css'

// 1. Initialize
const app = dva({
  history: createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/player').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');