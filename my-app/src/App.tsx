import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import S3Uploader from './upload';

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
      const response = await fetch('http://healthcareappbackend-env.eba-v2t9sawc.ap-southeast-2.elasticbeanstalk.com:3001/api/patients');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleDeletePatient = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/api/patients/${id}`, {
        method: 'DELETE',
      });
      // After successful deletion, fetch patients again to update the patient list
      fetchPatients();
    } catch (error) {
      console.error(`Error deleting patient with id ${id}:`, error);
    }
  };

  const renderPatients = () => {
    return (
      <Row className="mt-4">
        {patients.map((patient) => (
          <Col key={patient.id} sm={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={`https://xsgames.co/randomusers/assets/avatars/male/${patient.id}.jpg`} />
              <Card.Body>
                <Card.Title>{patient.name}</Card.Title>
                <Card.Text>{patient.age} years old</Card.Text>
                <Button variant="danger" onClick={() => handleDeletePatient(patient.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Container>
      <h1 className="mt-4">Healthcare App</h1>
      <S3Uploader />
      {renderPatients()}
    </Container>
  );
}

export default App;
