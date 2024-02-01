import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDollarContext } from './Context/DollarContext';
import { Transition } from 'react-transition-group';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar } from '@mui/base/Snackbar';
import { useRef, useState } from 'react';


const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

const CurrencyButton = () => {
    const { currencyInSite, rateS } = useDollarContext();

    //snackbar code
    const [open, setOpen] = useState(false);
    const [exited, setExited] = useState(true);
    const nodeRef = useRef(null);
    const snackbarView = () => {
        return (
            <StyledSnackbar
                autoHideDuration={3000}
                open={open}
                onClose={handleClose}
                exited={exited}
            >
                <Transition
                    timeout={{ enter: 400, exit: 400 }}
                    in={open}
                    appear
                    unmountOnExit
                    onEnter={handleOnEnter}
                    onExited={handleOnExited}
                    nodeRef={nodeRef}
                >
                    {(status) => (
                        <SnackbarContent
                            style={{
                                transform: positioningStyles[status],
                                transition: 'transform 300ms ease',
                            }}
                            ref={nodeRef}
                        >
                            <div className="snackbar-message">
                                <p className="snackbar-description">Currency Changed to {rateS}</p>
                            </div>
                            <CloseIcon onClick={handleClose} className="snackbar-close-icon" />
                        </SnackbarContent>
                    )}
                </Transition>
            </StyledSnackbar>
        )
    }
    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleOnEnter = () => {
        setExited(false);
    };

    const handleOnExited = () => {
        setExited(true);
    };
    return (<>
        <FormGroup>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography >₪</Typography>
                <AntSwitch defaultChecked={false} disableFocusRipple={true} onClick={handleClick} onChange={currencyInSite} inputProps={{ 'aria-label': 'ant design' }} />
                <Typography>$</Typography>
                {snackbarView()}
            </Stack>
        </FormGroup>
    </>);
}

export default CurrencyButton;




const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const blue = {
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const StyledSnackbar = styled(Snackbar)`
  position: fixed;
  z-index: 5500;
  display: flex;
  bottom: 16px;
  right: 16px;
  max-width: 560px;
  min-width: 300px;
`;

const SnackbarContent = styled('div')(
    ({ theme }) => `
  display: flex;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: ${theme.palette.mode === 'dark'
  ? `0 4px 8px rgb(0 0 0 / 0.7)`
  : `0 4px 8px rgb(0 0 0 / 0.1)`};
  padding: 0.75rem;
  color: ${theme.palette.mode === 'dark' ? blue[200] : blue[700]};
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;

  & .snackbar-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 500;
    color: ${theme.palette.mode === 'dark' ? blue[200] : blue[700]};
}

  & .snackbar-close-icon {
    cursor: pointer;
    flex-shrink: 0;
    padding: 2px;
    border-radius: 4px;

    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }
  }
  `,
);

const positioningStyles = {
    entering: 'translateX(0)',
    entered: 'translateX(0)',
    exiting: 'translateX(500px)',
    exited: 'translateX(500px)',
    unmounted: 'translateX(500px)',
};