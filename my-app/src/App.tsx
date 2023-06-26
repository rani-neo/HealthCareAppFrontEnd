// App.tsx
import React, { useEffect, useState } from 'react';

interface Patient {
id: number;
name: string;
age: number;
}

function App() {
const [patients, setPatients] = useState<Patient[]>([]);

useEffect(() => {
fetchPatients();
}, []);

const fetchPatients = async () => {
try {
const response = await fetch('http://13.210.153.137:3001/api/patients');
const data = await response.json();
setPatients(data);
} catch (error) {
console.error('Error fetching patients:', error);
}
};

return (
<div>
<h1>Healthcare App</h1>
<ul>
{patients.map((patient) => (
<li key={patient.id}>
{patient.name} - {patient.age} years old 
</li>
))}
</ul>
</div>
);
}

export default App;

