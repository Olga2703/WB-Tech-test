import type {FC} from "react";
import React, {useEffect, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

interface UserModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (userData: { name: string; email: string }) => void;
    userToEdit?: { name: string; email: string } | null;
}

export const UserModal: FC<UserModalProps> = ({open, onClose, onSave, userToEdit}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
        } else {
            setName('');
            setEmail('');
        }
    }, [userToEdit, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) return;

        onSave({name, email});
        onClose();
    };

    return (
        <Dialog open={open} onClose={onclose} maxWidth="sm" fullWdth>
            <DialogTitle sx={{fontWeoght: 700}}>
                {userToEdit ? 'Редактировать пользователя' : 'Создать нового пользователя'}
            </DialogTitle>

            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3, pt: 1}}>
                        <TextField
                            label="ФИО пользователя"
                            variant="outlined"
                            fullWidth
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{p: 2}}>
                    <Button onClick={onClose} color="inherit">
                        Отмена
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        {userToEdit ? 'Сохранить' : 'Добавить'}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}