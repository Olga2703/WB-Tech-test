import type {FC} from "react";
import {Alert, Avatar, Box, Button, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/store.ts";
import {useEffect} from "react";
import {fetchUserById} from "../features/users/usersThunks.ts";
import {useNavigate, useParams} from "react-router-dom";

export const UserDetailPage: FC = () => {

    const dispatch = useAppDispatch();
    const { currentUser, isLoading, error} = useAppSelector((state) => state.users);
    const navigate = useNavigate();

    const { id} = useParams<{ id: string}>();

    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(id));
        }
    }, [id, dispatch]);

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
                            onClick={() => id && dispatch(fetchUserById(id))}>
                        Повторить
                    </Button>}>
                    Произошла ошибка: {error}
                </Alert>
            </Box>
        )
    }

    if (!currentUser) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="warning">Данные пользователя загружаются или не найдены</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{p: 3}}>
            <Button
                onClick={() => navigate(-1)}
                sx = {{mb: 3}}>
                Назад к списку
            </Button>

            <Typography variant="h3" sx={{mb: 2}}>
                Детальная страница пользователя
            </Typography>
            <Card>
                <CardContent sx={{p: 4, mb: 2}}>
                    <Box sx={{display: 'flex', justifyContent: 'column', alignItems: 'center'}}>
                        <Avatar src={currentUser.avatar} alt={currentUser.name} sx={{width: 120, height: 120, mb: 2, mr: 2}}/>
                        <Typography variant="h5" sx={{fontWeight: 700}}>{currentUser.name}</Typography>
                    </Box>

                    <Box sx={{display: 'flex', gap: 2}}>
                        <Typography variant="body1" sx={{fontWeight: 700}}>E-mail</Typography>
                        <Typography variant="body1">{currentUser.email}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', gap: 2}}>
                        <Typography variant="body1" sx={{fontWeight: 700}}>Телефон</Typography>
                        <Typography variant="body1">{currentUser.phone}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', gap: 2}}>
                        <Typography variant="body1" sx={{fontWeight: 700}}>Адрес</Typography>
                        <Typography variant="body1">{currentUser.address}</Typography>
                    </Box>
                </CardContent>

            </Card>
        </Box>

    )
}