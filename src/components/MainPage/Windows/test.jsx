import React, { Fragment } from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route
          path="/"
          render={({ location }) => (
            <Fragment>
              <Tabs value={location.pathname}>
                <Tab label="Item One" component={Link} to="/" />
                <Tab label="Item Two" component={Link} to="/tab2" />
                <Tab
                  label="Item Three"
                  href="#basic-tabs"
                  component={Link}
                  to="/tab3"
                />
              </Tabs>
              <Switch>
                <Route path="/tab2" render={() => <div> <input/> </div>} />
                <Route path="/tab3" render={() => <div>Tab 3</div>} />
                <Route path="/" render={() => <div>Tab 1</div>} />
              </Switch>
            </Fragment>
          )}
        />
      </div>
    </BrowserRouter>
  );
}

