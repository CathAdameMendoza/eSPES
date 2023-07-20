fetch('/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      FirstName: '',
      LastName: '',
      AccountNumber: '',
      Username: '',
      Password: ''
    })
  })
    .then(response => {
      if (response.ok) {
        console.log('Registration successful');
      } else {
        console.error('Registration failed');
      }
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });