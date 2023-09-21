import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { startLogin } from '../../../redux/actions/auth';
import Navbar from '../../../components/Navbar';
import { NavLink } from 'react-router-dom';
import SignUp from './SignUp';

const Login = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();
  const { email } = useSelector(state => state.auth);

  const defaultValues = {
    email: '',
    password: '',
  };

  const submit = data => {
    dispatch(startLogin(data.email, data.password));
    reset(defaultValues);
  };

  return (
    <>
      <Navbar />
      <form className="form-container" onSubmit={handleSubmit(submit)}>
        <div className="form-login--box">
          <img src="/pet-house.png" alt="" />
          <div className="test-box">
            <h3>Test user : <span className='test-span'>jhondoe@gmail.com</span> </h3>
            <h3>Password: <span className='test-span'>1234</span> </h3>
          </div>
          <div className="box-item">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              className="form-input"
              type="email"
              placeholder="Ex:jhondoe@gmail.com"
              id="email"
              name="email"
              defaultValue={email}
              {...register('email', { required: true })}
            />
          </div>
          <div className="box-item">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-input"
              type="password"
              placeholder="***********"
              id="password"
              name="password"
              {...register('password', { required: true })}
            />
          </div>
          <button className="form-button" type="submit">
            Login
          </button>
          <NavLink className="text-link" to="/signup">
          Don't have an account? Sign up
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default Login;
