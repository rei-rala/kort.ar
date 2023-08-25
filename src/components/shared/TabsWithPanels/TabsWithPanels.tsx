"use client";

import { useState } from "react";
import type { ReactNode, SyntheticEvent } from "react";

import Box from "@mui/material/Box/Box";
import Tab from "@mui/material/Tab/Tab";
import Tabs from "@mui/material/Tabs/Tabs";

type TabPanel = {
  index?: number;
  value: string | number;
  label: string;
  children?: ReactNode;
};

type TabPanelProps = {
  panel: TabPanel;
  tabId?: string;
};

type TabProps = {
  panels: Omit<TabPanel, "value">[];
  tabId?: string;
};

function getTabPanelId(index: number, addedId?: string) {
  return `tabpanel-${addedId ?? ""}-${index}`;
}

function getTabId(index: number, addedId?: string) {
  return `tab-${addedId ?? ""}-${index}`;
}

function a11yProps(index: number, customId?: string) {
  return {
    id: getTabId(index, customId),
    "aria-controls": getTabPanelId(index, customId),
  };
}

const TabPanel: ExtendedComponent<TabPanelProps> = ({ panel, tabId }) => {
  const { label, children, value, index, ...rest } = panel;

  return (
    <div
      {...rest}
      role="tabpanel"
      hidden={value !== index}
      id={getTabPanelId(index!, tabId)}
      aria-labelledby={getTabId(index!, tabId)}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const TabsWithPanels: ExtendedComponent<TabProps> = ({ tabId, panels }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label={`tab '${tabId}'`}>
          {panels.map(({ label, children }, index) => (
            <Tab
              label={label}
              disabled={!Boolean(children)}
              {...a11yProps(index, tabId)}
              key={`tab:${label}`}
            />
          ))}
        </Tabs>
        {panels.map((panel, index) => (
          <TabPanel
            tabId={tabId}
            panel={{ ...panel, index, value }}
            key={`tabPanel:${panel.label}`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TabsWithPanels;
