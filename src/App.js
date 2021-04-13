import './App.css';
import * as Pages from './page'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'


const labs = Object.entries(Pages);
// console.log(labs);

function App() {


  return (
    <Router >
      <div style={{ height: "100vh" }} className="App">
        <Switch>
          {labs.map(([k, v]) => {
            if (v.default) {
              const Tmp = v.default
              return (
                <Route
                  exact
                  key={k}
                  path={`/${k}`}
                >
                  <Tmp />
                </Route>
              )
            }

            return null
          })}
          <Route
            exact
            path={`/`}
          >
            <h1 style={{marginTop:0}}>LAB</h1>
            {labs.map(([k, v]) => {
              if (v.default) {
                return (
                  <div key={k}>
                    <Link to={`/${k}`}>
                      {k}
                    </Link>
                  </div>
                )
              }

              return null
            })}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
