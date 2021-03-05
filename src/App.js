export default function App(){
    return (
            <Router history={history}>
                <Route exact={true} path={HostPath.page('')} component={SplashScreen}/>
                <Route exact={true} path={HostPath.page('Home')} component={Home}/>
                <Route exact={true} path={HostPath.page('Level4')} component={Level4}/>
                <Route exact={true} path={HostPath.page('PostDetails')} component={PostDetails}/>
                <Route exact={true} path={HostPath.page('search')} component={Search}/>
                <Route exact={true} path={HostPath.page('NewPost')} component={NewPost}/>
                <Route exact={true} path={HostPath.page('EditPost')} component={EditPost}/>
                <Route exact={true} path={HostPath.page('Upgrade')} component={Upgrade}/>
                <Route exact={true} path={HostPath.page('Filters')} component={Filters}/>
                <Route exact={true} path={HostPath.page('Authentication')} component={Authentication}/>
                <Route exact={true} path={HostPath.page('Profile')} component={Profile}/>
                <Route exact={true} path={HostPath.page('UsersProfile')} component={UsersProfile}/>
                <Route exact={true} path={HostPath.page('Inbox')} component={Inbox}/>
                <Route exact={true} path={HostPath.page('MessageDetail')} component={MessageDetail}/>
                <Route exact={true} path={HostPath.page('Offers')} component={Offers}/>
                <Route exact={true} path={HostPath.page('offices')} component={Offices}/>
         
            </Router>
        )
}
