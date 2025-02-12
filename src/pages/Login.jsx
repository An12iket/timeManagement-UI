import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { TextField, Button, Container, Typography, Paper, Box, Link } from "@mui/material";
import styles from './Login.module.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await login(email, password);
    navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container maxWidth="xs" className={styles.container}>
      <Paper className={styles.paper}>
        <Typography variant="h5" className={styles.title}>Login</Typography>
        <Box component="form" onSubmit={handleSubmit} className={styles.form}>
          <TextField 
            label="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            fullWidth 
            margin="normal"
            size="medium"
          />
          <TextField 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            fullWidth 
            margin="normal"
            size="medium"
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            className={styles.submitButton}
          >
            Login
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              New user?{' '}
              <Link href="/register" style={{ textDecoration: 'none' }}>
                Register here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
