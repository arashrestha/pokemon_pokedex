const drawerWidth = 250;

export const appStyles = theme => ({
    iconButton: {
        padding: 10
    },
    input: {
        flex: 1,
        width: '100%',
    },
    list: {
        padding: 20,
        width: 300,
    },
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
        verticalAlign: 'center',
        marginLeft: 12
    },
    appBar: {
        color: 'white',
        backgroundColor: '#ef5350',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        // marginLeft: drawerWidth,
        // width: `calc(100% - ${drawerWidth}px)`,
        // transition: theme.transitions.create(['width', 'margin'], {
        //   easing: theme.transitions.easing.sharp,
        //   duration: theme.transitions.duration.enteringScreen,
        // }),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: 57
        // width: theme.spacing.unit * 7 - 15,
        // [theme.breakpoints.up('sm')]: {
        //   width: theme.spacing.unit * 9 - 15,
        // },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        height: `calc(100vh - ${70}px)`,
        flexGrow: 1,
        marginTop: 64,
    },
    contentShrinked: {
        // width: `calc(100vw - ${drawerWidth}px)`,
        width: `100vw`,
    },
    contentExpanded: {
        // width: `calc(100vw - ${57}px)`,
        width: `100vw`,
    },
    listItem: { marginRight: 0 },
    nestedListItem: {
        paddingLeft: theme.spacing.unit * 4,
    },
    activeListItem: {
        background: theme.palette.grey['200'],
        color: theme.palette.primary.main
    },
    menuItemText: { margin: '0 10px' },
    menuButton: {
        marginLeft: 12,
        marginRight: 12,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconMore: {
        position: 'fixed !important',
        top: '0 !important'
    },
    media: {
        height: 140,
        backgroundColor: '#FBFFC6'
    },
    cardWidth: {
        width: '150px',
        maxWidth: '275px',
        textAlign: 'center'
    },

});

export const iconStyles = theme => ({
    fab: {
        margin: theme.spacing.unit * 2,
        position: "fixed",
        bottom: 0,
        right: 0,
        color: theme.palette.alt
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});