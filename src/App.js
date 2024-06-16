import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Typography, Paper } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');
  const [api, setApi] = useState('dialogflow');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post('/chat', { message, api });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2em', marginTop: '2em' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          BABYLON Chat Interface
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ marginBottom: '1em' }}
          />
          <FormControl fullWidth style={{ marginBottom: '1em' }}>
            <InputLabel>API</InputLabel>
            <Select value={api} onChange={(e) => setApi(e.target.value)}>
              <MenuItem value="dialogflow">Dialogflow</MenuItem>
              <MenuItem value="openai">OpenAI</MenuItem>
              <MenuItem value="googleGemini">Google Gemini</MenuItem>
              <MenuItem value="huggingface">Hugging Face</MenuItem>
              <MenuItem value="pinecone">Pinecone</MenuItem>
              <MenuItem value="rasa">Rasa</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Send
          </Button>
        </form>
        <pre style={{ marginTop: '1em', whiteSpace: 'pre-wrap' }}>{response}</pre>
      </Paper>
    </Container>
  );
};

export default App;
