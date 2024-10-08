import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import {
    Route,
    RouterProvider,
    createRoutesFromElements,
} from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

// Auth
import AdminRoutes from './pages/Admin/AdminRoutes.jsx';
import GenreList from './pages/Admin/GenreList.jsx';
import CreateMovie from './pages/Admin/CreateMovie.jsx';
import AdminMoviesList from './pages/Admin/AdminMoviesList.jsx';
import UpdateMovie from './pages/Admin/UpdateMovie.jsx';

// Restricted
import Home from './pages/Home.jsx'
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import PrivateRoute from './pages/Auth/PrivateRoute.jsx';
import Profile from './pages/Users/Profile.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path='/'
            element={<App />}>
                <Route index={true} path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='' element={<PrivateRoute />}>
                    <Route path='/profile' element={<Profile />} />
                </Route>
                <Route path='' element={<AdminRoutes />}>
                    <Route path='/admin/movies/genre' element={<GenreList />}></Route>
                    <Route path='/admin/movies/create' element={<CreateMovie />}></Route>
                    <Route path='/admin/movies-list' element={<AdminMoviesList />}></Route>
                    <Route path='/admin/movies/update/:id' element={<UpdateMovie />}></Route>
                </Route>
            </Route>
    )
);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
