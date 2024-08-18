import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StatsTable from "./components/StatsTable";
import Graphs from "./components/Graphs";
import { useState } from "react";
import { Card } from "@mui/material";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    console.log(value, index);
    return (
        <Box
            width="100%"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [tab, setTab] = useState(0);

    return (
        <Card
            variant="outlined"
            sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                height: 700,
            }}
        >
            <Tabs
                orientation="vertical"
                value={tab}
                variant="standard"
                onChange={(_, t) => setTab(t)}
                aria-label="Vertical tabs"
                sx={{ borderRight: 1, borderColor: "divider", width: 200 }}
            >
                <Tab label="All Products" {...a11yProps(0)} />
                <Tab label="Graphs" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={tab} index={0}>
                <StatsTable />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Graphs />
            </TabPanel>
        </Card>
    );
}
