import { useState } from 'react';
import {
    useCreateGenreMutation,
    useUpdateGenreMutation,
    useDeleteGenreMutation,
    useFetchGenresQuery,
} from '../../redux/api/genreSlice';
import { toast } from 'react-toastify';
import GenreForm from '../../components/GenreForm';

const GenreList = () => {
    const { data: genres, refetch } = useFetchGenresQuery();
    const [name, setName] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [updatingName, setUpdatingName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [createGenre] = useCreateGenreMutation();
    const [updateGenre] = useUpdateGenreMutation();
    const [deleteGenre] = useDeleteGenreMutation();

    return (
        <div className='ml-[10rem] flex flex-col md:flex-row'>
            <div className='md:w-3/4 p-3'>
                <h1 className='h-12'>Manage Genres</h1>
                <GenreForm
                    value={name}
                    setValue={setName}
                    handleSubmit={handleCreateGenre}
                />
            </div>
        </div>
    );
};

export default GenreList;
