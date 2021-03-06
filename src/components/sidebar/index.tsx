import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import customTheme from './theme'
import customStyle from './style'
import ListItems from './list-items'
import SubListItems from './sub-list-items'
import { ISideBarListItem } from './interfaces';
import { Link } from 'react-router-dom'
import { useAuthServiceValue } from '../../services';
import { ModalStateProvider } from '../../shared/state-handler';

const themeCreated = createMuiTheme(
  customTheme()
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles(customStyle(theme, 240)),
);

export default function MiniDrawer(
  { children }: { children: ReactNode }
) {
  const classes = useStyles();
  const theme = themeCreated;
  const [open, setOpen] = React.useState(false);
  const { logout } = useAuthServiceValue()

  const appTitle = process.env.REACT_APP_TITLE

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const buildListLinkItem = ( item: ISideBarListItem, key: number ) => (
    <ListItem
      button
      component={Link}
      to={item.link}
      key={key}
      data-testid={item.dataTestId}
    >
      <ListItemIcon>
        {item.icon}  
      </ListItemIcon>
      <ListItemText primary={item.text} />
    </ListItem>
  )

  const buildListActionItem = ( item: ISideBarListItem, key: number ) => (
    <ListItem
      button
      onClick={logout}
      key={key}
      data-testid={item.dataTestId}
    >
      <ListItemIcon>
        {item.icon}  
      </ListItemIcon>
      <ListItemText primary={item.text} />
    </ListItem>
  )

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              { appTitle }
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {ListItems.map((item: ISideBarListItem, key: number) => buildListLinkItem(item, key))}
          </List>
          <Divider />
          <List>
            {SubListItems.map((item: ISideBarListItem, key: number) => buildListActionItem(item, key))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar}></div>
          <ModalStateProvider>
            {children}
          </ModalStateProvider>
        </main>
      </div>
    </ThemeProvider>
  );
}