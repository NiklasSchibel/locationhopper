import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import DiningIcon from '@mui/icons-material/Dining';
import SportsBarIcon from '@mui/icons-material/SportsBar';


const placeTypes = ['Beer', 'Restaurant', 'Cafe'];

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

export function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>location type</DialogTitle>
            <List sx={{ pt: 0 }}>
                {placeTypes.map((place) => (
                    <ListItem button onClick={() => handleListItemClick(place)} key={place}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                {place==="Cafe" && <LocalCafeIcon />}
                                {place==="Restaurant" && <DiningIcon />}
                                {place==="Beer" && <SportsBarIcon />}
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={place} />
                    </ListItem>
                ))}
                {/*<ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>*/}
                {/*    <ListItemAvatar>*/}
                {/*        <Avatar>*/}
                {/*            <AddIcon />*/}
                {/*        </Avatar>*/}
                {/*    </ListItemAvatar>*/}
                {/*    <ListItemText primary="Add account" />*/}
                {/*</ListItem>*/}
            </List>
        </Dialog>
    );
}