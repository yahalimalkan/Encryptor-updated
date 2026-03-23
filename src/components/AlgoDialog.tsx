import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    Select,
    MenuItem,
    Box,
    Typography
} from '@mui/material';

interface AlgoNode {
    type: string;
    innerChild?: AlgoNode;
    childA?: AlgoNode;
    childB?: AlgoNode
}

interface AlgoDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (algos: string[]) => void;
}

const DOUBLE = 'Double';
const REVERSE = 'Reverse';
const XOR = 'Xor';
const MULTIPLICATION = 'Multiplication';
const CEASER = 'Ceaser';



const AlgoDialog: React.FC<AlgoDialogProps> = ({open, onClose, onSave}) => {
    const [rootAlgo, setRootAlgo] = useState<AlgoNode>({type: ''});

    const flatten = (node: AlgoNode): string[] => {
        if (node.type === DOUBLE && node.childA && node.childB) {
            return [DOUBLE , ...flatten(node.childA), ...flatten(node.childB)];
        }
        if (node.type === REVERSE && node.innerChild) {
            return [REVERSE, ...flatten(node.innerChild)];
        }
        return [node.type];
    };

    const handleSave = () => {
        const flatResult = flatten(rootAlgo);
        onSave(flatResult);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>הגדרת מבנה הצפנה רקורסיבי</DialogTitle>
            <DialogContent dividers>
                <RecursiveSelector
                    node={rootAlgo}
                    onChange={setRootAlgo}
                    label="אלגוריתם ראשי"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>ביטול</Button>
                <Button onClick={handleSave} variant="contained">שמור והחלף</Button>
            </DialogActions>
        </Dialog>
    );
};

const RecursiveSelector: React.FC<{
    node: AlgoNode;
    onChange: (newNode: AlgoNode) => void;
    label: string;
    }> = ({node, onChange, label}) => {

    const handleChange = (type: string) => {
        const newNode: AlgoNode = {type};
        // אתחול ילדים במידה ונבחר סוג מורכב
        if (type === REVERSE) newNode.innerChild = {type: ''};
        if (type === DOUBLE) {
            newNode.childA = {type: ''};
            newNode.childB = {type: ''};
        }
        onChange(newNode);
    };

    return (
        <Box sx={{
            mt: 2,
            p: 1,
            borderLeft: node.type === DOUBLE || node.type === REVERSE ? '2px solid #1976d2' : 'none',
            pl: 2
        }}>
            <Typography variant="caption" color="textSecondary">{label}</Typography>
            <FormControl fullWidth size="small" sx={{mb: 1}}>
                <Select value={node.type} onChange={(e) => handleChange(e.target.value)}>
                    <MenuItem value={XOR}>{XOR.toUpperCase()}</MenuItem>
                    <MenuItem value={CEASER}>{CEASER.toUpperCase()}</MenuItem>
                    <MenuItem value={MULTIPLICATION}>{MULTIPLICATION.toUpperCase()}</MenuItem>
                    <MenuItem value={REVERSE}>{REVERSE.toUpperCase()}</MenuItem>
                    <MenuItem value={DOUBLE}>{DOUBLE.toUpperCase()}</MenuItem>
                </Select>
            </FormControl>

            {/* כאן קורה הקסם - הרקורסיה */}
            {node.type === REVERSE && node.innerChild && (
                <RecursiveSelector
                    label="אלגוריתם פנימי"
                    node={node.innerChild}
                    onChange={(c) => onChange({...node, innerChild: c})}
                />
            )}
            {node.type === DOUBLE && node.childA && node.childB && (
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                    <RecursiveSelector
                        label="ענף א'"
                        node={node.childA}
                        onChange={(c) => onChange({...node, childA: c})}
                    />
                    <RecursiveSelector
                        label="ענף ב'"
                        node={node.childB}
                        onChange={(c) => onChange({...node, childB: c})}
                    />
                </Box>
            )}
        </Box>
    );
};

export default AlgoDialog;