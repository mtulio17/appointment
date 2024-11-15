// src/emails/EventConfirmationEmail.jsx
import { Html, Body, Container, Heading, Text } from '@react-email/components';

// eslint-disable-next-line react/prop-types
export default function EventConfirmationEmail({ userName, eventName, eventDate, eventTime, eventLocation, hostName }) {
  return (
    <Html>
      <Body style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
        <Container style={{ maxWidth: "600px", padding: "20px", border: "1px solid #ccc" }}>
          <Heading style={{ color: "#333", textAlign: "center" }}>¡Hola {userName}!</Heading>
          <Text style={{ color: "#333", fontSize: "16px" }}>
            Te has inscrito exitosamente al evento <strong>{eventName}</strong>.
          </Text>
          <Text style={{ fontSize: "14px" }}>
            <strong>Detalles del evento:</strong>
          </Text>
          <ul style={{ fontSize: "14px", lineHeight: "24px", paddingLeft: "20px" }}>
            <li><strong>Fecha:</strong> {eventDate}</li>
            <li><strong>Hora:</strong> {eventTime}</li>
            <li><strong>Ubicación:</strong> {eventLocation}</li>
            <li><strong>Anfitrión:</strong> {hostName}</li>
          </ul>
          <Text style={{ marginTop: "20px" }}>
            Gracias por tu interés. ¡Nos vemos en el evento!
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
