import {
  Grid, Switch,
} from '@material-ui/core';
import useHook from './hook';
import UserView from './UserView';
import AdminView from './AdminView';
import { version } from '../package.json';

function App() {
  const hook = useHook();

  return (
    <div>
      <Grid component="label" container alignItems="center" justify="flex-end" spacing={1}>
        <div className="version">
          Version :
          {` ${version}`}
        </div>
        <Grid item style={{ color: !hook.isAdmin ? 'magenta' : 'grey' }}>User</Grid>
        <Grid item>
          <Switch checked={hook.isAdmin} onChange={(e) => hook.setIsAdmin(e.target.checked)} />
        </Grid>
        <Grid item style={{ color: hook.isAdmin ? 'magenta' : 'grey' }}>Admin</Grid>
      </Grid>
      {hook.isAdmin ? <AdminView hook={hook} /> : <UserView hook={hook} />}
    </div>
  );
}

export default App;
