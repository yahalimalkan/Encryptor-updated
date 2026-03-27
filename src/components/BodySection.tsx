import {Grid} from "@mui/material";
import FileHandler from "./files/FileHandler";
import ActionSelector from "./ActionSelector";
import AlgorithmCreator from "./algorithms/AlgorithmCreator";


const BodySection = () => {
    return (
        <Grid container
              spacing={4}
              sx={{
                  height: '100%',     // ממלא את כל הגובה שקיבל מה-App
                  width: '100%',
                  p: 2,               // מרווח מהקצוות
                  m: 0,
                  boxSizing: 'border-box',
                  overflow: 'auto',
              }}>
            <Grid size={4} sx={{height: '100%', minWidth: '300px'}}>
                    <FileHandler />
            </Grid>

            <Grid size={4} sx={{ height: '100%', minWidth: '300px' }}>
                    <ActionSelector />
            </Grid>

            <Grid size={4} sx={{ height: '100%', minWidth: '300px' }}>
                    <AlgorithmCreator />
            </Grid>
        </Grid>
    );
}

export default BodySection;