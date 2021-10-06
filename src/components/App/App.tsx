import type { FC } from "react";
import "./App.css";
import { Route, Switch, BrowserRouter as Router, } from "react-router-dom";
import Agents from "../Agents/Agents";
import ViewAgentAndReviews from "../Agents/singleAgentWithReviews"

const App: FC = () => {
  return (
    <Router>
       <Switch>
        <div className="app">
          <Route path="/" exact component={Agents} /> 
          <Route path="/agent/:agentID" exact component={ViewAgentAndReviews } />  
        </div>
      </Switch>
    </Router>
  );
};

export default App;
