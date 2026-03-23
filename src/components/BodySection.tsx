import {Grid} from "@mui/material";
import FileHandler from "./FileHandler";
import ActionSelector from "./ActionSelector";
import AlgorithmCreator from "./AlgorithmCreator";


const BodySection = () => {
    return (
        <Grid container
              spacing={4}
              sx={{
                  height: '100%',     // ממלא את כל הגובה שקיבל מה-App
                  width: '100%',
                  p: 2,               // מרווח מהקצוות
                  m: 0,
                  boxSizing: 'border-box'
              }}>
            <Grid size={4} sx={{height: '100%'}}>
                    <FileHandler />
            </Grid>

            <Grid size={4} sx={{ height: '100%' }}>
                    <ActionSelector />
            </Grid>

            <Grid size={4} sx={{ height: '100%' }}>
                    <AlgorithmCreator />
            </Grid>
        </Grid>
    );
}

export default BodySection;