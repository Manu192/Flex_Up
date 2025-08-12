import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function About() {
  return (
    <>
       <div className="about-page">
      <Container fluid className="hero-section text-center">
        <h1>FlexUp isn’t just fitness. It’s your comeback story.</h1>
        <p>Built for the dreamers, the grinders, the ones who rise again.</p>
      </Container>

      <Container className="mission-section">
        <h2>Why We Built FlexUp</h2>
        <p>
          We wanted more than reps and sets. We wanted a space that feels like a movie scene—
          where every drop of sweat means something. FlexUp is for those who train not just their bodies,
          but their minds, their spirit, their story.
        </p>
      </Container>

      <Container className="features-section">
        <Row>
          {[
            { title: 'Cinematic Dashboard', icon: '🎬' },
            { title: 'Motivational Quotes', icon: '💬' },
            { title: 'Progress Visuals', icon: '📈' },
            { title: 'Mindset Check-ins', icon: '🧠' },
          ].map((feature, idx) => (
            <Col md={3} key={idx}>
              <Card className="feature-card text-center">
                <Card.Body>
                  <h3>{feature.icon}</h3>
                  <Card.Title>{feature.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="architect-section text-center">
        <h2>Meet the Architect</h2>
        <p><strong>Manu</strong> — Creative Frontend Developer & Vision Architect</p>
        <blockquote>“I build with emotion, motion, and devotion.”</blockquote>
      </Container>

      <Container className="cta-section text-center">
        <h2>Ready to rise?</h2>
         <Link to={'/profile'}><Button variant="outline-light" size="lg">Start Your Journey</Button></Link>
      </Container>
    </div>
    </>
  )
}

export default About
