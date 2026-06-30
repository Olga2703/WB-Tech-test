import React, {useEffect, type FC, type ChangeEvent, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import {createUser, fetchUsers, updateUser} from '../features/users/usersThunks';
import { setCurrentPage } from '../features/users/usersSlice';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Button,
    Typography,
    Box, CircularProgress, Alert,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import {UserModal} from "../components/UserModal.tsx";

export const UsersPage: FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const dispatch = useAppDispatch();
    const { items, isLoading, error, currentPage, totalCount } = useAppSelector(state => state.users);

    const usersLimit = 5;
    const totalPages = Math.ceil(totalCount / usersLimit);

    useEffect(() => {
        dispatch(fetchUsers({ page: currentPage, limit: usersLimit }));
    },[currentPage, dispatch]);

    const handleChange = (_event: ChangeEvent<unknown>, pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber));
    }

    const handleCreateOpen = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleEditOpen = (user: any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleSaveUser = async (userData: { name: string; email: string }) => {
        if (selectedUser) {
            try {
                await dispatch(updateUser({ id: selectedUser.id, data: userData })).unwrap();
                dispatch(fetchUsers({ page: currentPage, limit: usersLimit }));
            } catch (err) {
                console.error('Не удалось обновить пользователя:', err);
            }
        } else {
            try {
                await dispatch(createUser(userData)).unwrap();
                dispatch(fetchUsers({ page: currentPage, limit: usersLimit }));
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress aria-label="Loading…" />
            </Box>
        )
    }

    if (error) {
        return (
            <Box sx={{m: 2}}>
                <Alert severity='error' action={
                    <Button color="inherit" size="small"
                            onClick={() => dispatch(fetchUsers({page: currentPage, limit: usersLimit}))}>
                        Повторить
                    </Button>}>
                    Произошла ошибка: {error}
                </Alert>
            </Box>
        )
    }
    return (
        <Box sx={{p: 3}}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleCreateOpen}
                >
                    Добавить пользователя
                </Button>
            </Box>
            <Typography variant="h3" sx={{mb: 2}}>Список пользователей</Typography>
            <TableContainer component={Paper} sx={{mb: 2}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: 700}}>ID</TableCell>
                            <TableCell sx={{fontWeight: 700}}>Фото</TableCell>
                            <TableCell sx={{fontWeight: 700}}>ФИО</TableCell>
                            <TableCell sx={{fontWeight: 700}}>Действие</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            items.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>
                                        <Avatar src={user.avatar} alt={user.name} sx={{ width: 40, height: 40}} />
                                    </TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell sx={{display: 'flex', gap: 2}}>
                                        <Button component={Link} to={`/users/${user.id}`} variant="outlined" >
                                            Просмотр
                                        </Button>
                                        <Button onClick={() => handleEditOpen(user)} variant="contained" >
                                            Редактировать
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <UserModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveUser}
                userToEdit={selectedUser}
            />
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Pagination count={totalPages} page={currentPage} onChange={handleChange}/>
            </Box>
        </Box>
    )

}