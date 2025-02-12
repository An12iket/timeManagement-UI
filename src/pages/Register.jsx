import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { TextField, Button, Container, Typography, Paper, Box, Link } from "@mui/material";
import styles from './Register.module.css';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(username, email, password);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      setError(
        error.response?.data?.message || 
        "Registration failed. Please try again later."
      );
    }
  };

  return (
    <Container maxWidth="xs" className={styles.container}>
      <Paper className={styles.paper}>
        <Typography variant="h5" className={styles.title}>Register</Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} className={styles.form}>
          <TextField 
            label="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            fullWidth 
            margin="normal"
            size="medium"
          />
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
            Register
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Already a user?{' '}
              <Link href="/login" style={{ textDecoration: 'none' }}>
                Login here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
