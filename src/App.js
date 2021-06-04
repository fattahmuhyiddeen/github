import {
  Grid, Switch,
} from '@material-ui/core';
import useHook from './hook';
import UserView from './UserView';

function App() {
  const hook = useHook();

  return (
    <div>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item style={{ color: !hook.isAdmin ? 'magenta' : 'grey' }}>User</Grid>
        <Grid item>
          <Switch checked={hook.isAdmin} onChange={(e) => hook.setIsAdmin(e.target.checked)} />
        </Grid>
        <Grid item style={{ color: hook.isAdmin ? 'magenta' : 'grey' }}>Admin</Grid>
      </Grid>
      <UserView hook={hook} />
    </div>
  );
}

export default App;
