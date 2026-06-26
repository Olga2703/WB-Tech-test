import { useEffect, type FC, type ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { fetchUsers } from '../features/users/usersThunks';
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
    Box,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';

export const UsersPage: FC = () => {
    const dispatch = useAppDispatch();
    const { items, isLoading, error, currentPage, totalCount } = useAppSelector(state => state.users);

    const totalPages = Math.ceil(totalCount/5);

    useEffect(() => {
        dispatch(fetchUsers({ page: currentPage, limit: 5 }));
    },[currentPage, dispatch]);

    const handleChange = (_event: ChangeEvent<unknown>, pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber));
    }
    return (
        <Box sx={{p: 3}}>
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
                                    <TableCell>
                                        <Button component={Link} to={`/users/${user.id}`} variant="outlined" >
                                            Просмотр
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Pagination count={totalPages} page={currentPage} onChange={handleChange}/>
            </Box>
        </Box>
    )

}