import {Box} from "@mui/material";
import Header from "./components/Header";
import BodySection from "./components/BodySection";
import Executor from "./components/Executor.tsx";
import {AppProvider} from "./contexts/AppContext";

function App() {
    return (
        <AppProvider>
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Header/>
                <BodySection/>
                <Executor/>
            </Box>
        </AppProvider>
    );
}

export default App;