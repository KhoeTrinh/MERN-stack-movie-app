import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useRegisterMutation } from '../../redux/api/usersSlice';
import { toast } from 'react-toastify';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Password do not match');
        } else {
            try {
                const res = await register({
                    username,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
                toast.success('User successfully registered.');
            } catch (err) {
                console.log(err);
                toast.error('This email is already registered');
            }
        }
    };

    return (
        <div className='pl-[10rem] flex flex-wrap'>
            <div className='mr-[4rem] mt-[5rem]'>
                <h1 className='text-2xl font-semibold mb-4'>
                    Register
                </h1>
                <form
                    onSubmit={submitHandler}
                    className='container w-[40rem]'>
                    <div className='my-[2rem]'>
                        <label
                            htmlFor='name'
                            className='block text-sm font-semibold'>
                            Name
                        </label>
                        <input
                            type='text'
                            id='name'
                            className='mt-1 p-2 border rounded w-full'
                            placeholder='Enter your name'
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                        />
                    </div>
                    <div className='my-[2rem]'>
                        <label
                            htmlFor='email'
                            className='block text-sm font-semibold'>
                            Email Address
                        </label>
                        <input
                            type='email'
                            id='email'
                            className='mt-1 p-2 border rounded w-full'
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='my-[2rem]'>
                        <label
                            htmlFor='password'
                            className='block text-sm font-semibold'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            className='mt-1 p-2 border rounded w-full'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>
                    <div className='my-[2rem]'>
                        <label
                            htmlFor='confirmPassword'
                            className='block text-sm font-semibold'>
                            Confirm Password
                        </label>
                        <input
                            type='password'
                            id='confirmPassword'
                            className='mt-1 p-2 border rounded w-full'
                            placeholder='Confirm your password'
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />
                    </div>

                    <button
                        disabled={isLoading}
                        type='submit'
                        className='bg-teal-500 text-white px-4 py-2 
                        rounded curdor-pointer my-[1rem]'>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>

                    {isLoading && <Loader />}
                </form>

                <div className='mt-4'>
                    <p>
                        Already have an account?{' '}
                        <Link
                            to={
                                redirect
                                    ? `/login?redirect=${redirect}`
                                    : '/login'
                            }
                            className='text-teal-500 hover:underline'>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
            <img
                src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt=''
                className='h-[44rem] w-[47.9%] xl:block md:hidden 
                sm:hidden rounded-lg'
            />
        </div>
    );
};

export default Register;
