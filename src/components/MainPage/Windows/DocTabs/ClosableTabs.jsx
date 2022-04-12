import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@material-ui/icons/Close";
import TabContainer from "./TabContainter";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  colorPrimary: {
    color: "red"
  }
});

export const TabsDemo = ({
  tabs,
  selectedTab = 1,
  onClose,
  tabsProps = { indicatorColor: "primary" },
  ...rest
}) => {
  const [activeTab, setActiveTab] = useState(selectedTab);
  const [activetabs, setActiveTabs] = useState([]);

  //  useEffect(() => {
  //    if (activeTab !== selectedTab) setActiveTab(selectedTab);
  //   }, [setActiveTab, selectedTab, activeTab]);

  // const handleChange = useCallback(event => setActiveTab(event.target.value), [
  //   setActiveTab,
  //  ]);

  useEffect(() => {
    setActiveTabs(tabs);
  }, [tabs]);

  const handleChange = useCallback((event, activeTab) => {
    setActiveTab(activeTab);
  }, []);

  const handleClose = useCallback(
    (event, tabToDelete) => {
      event.stopPropagation();

      const tabToDeleteIndex = activetabs.findIndex(
        tab => tab.id === tabToDelete.id
      );
      const updatedTabs = activetabs.filter((tab, index) => {
        return index !== tabToDeleteIndex;
      });
      const previousTab =
        activetabs[tabToDeleteIndex - 1] ||
        activetabs[tabToDeleteIndex + 1] ||
        {};
      setActiveTabs(updatedTabs);
      setActiveTab(previousTab.id);
    },
    [activetabs]
  );

  return (
    <>
      <div>
        <Tabs value={activeTab} onChange={handleChange}>
          {activetabs.map(tab => (
            <Tab
              key={tab.id}
              value={tab.id}
              label={
                typeof tab.label === "string" ? (
                  <span>
                    {" "}
                    tab.label
                    {tab.closeable && (
                      <IconButton
                        component="div"
                        onClick={event => handleClose(event, tab)}
                      >
                        <CloseIcon fontSize="1" style={{ paddingBottom:"2px" }}/>
                      </IconButton>
                    )}
                  </span>
                ) : (
                  tab.label
                )
              }
            />
          ))}
        </Tabs>
        {activetabs.map(tab =>
          activeTab === tab.id ? (
            <TabContainer key={tab.id}>{tab.component}</TabContainer>
          ) : null
        )}
      </div>
    </>
  );
};

TabsDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      id: PropTypes.number.isRequired,
      component: PropTypes.object.isRequired,
      closeable: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired
};

export default withStyles(styles)(TabsDemo);
