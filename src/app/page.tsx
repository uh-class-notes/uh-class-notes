import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const Home = () => (
  <main className="container py-3">
    <Container id="landing-page" fluid>
      <Row className="mb-2">
        <Col xs={3}>
        </Col>
        <Col xs={9} className="text-left">
        	<h1 >UH CLASS NOTES</h1>
        </Col>
      </Row>
			<Row className="mb-3">
				<Col xs={3}>
				</Col>
				<Col xs={9} className="text-left">
					<ul>
						<li>A platform to share, access, and archive notes for all classes at UH</li>
					</ul>
				</Col>
			</Row>
			<Row>
				<Col xs={3}>
				</Col>
				<Col xs={9} className="text-left">
					<ul>
						<li><Link href="/notes">See all notes</Link></li>
						<li><Link href="/create">Post your notes</Link></li>
					</ul>
				</Col>
			</Row>
			<Row>
				<Col xs={3}>
				</Col>
				<Col xs={9} className="text-left">
					<ul>
						<li>Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link></li>
					</ul>
				</Col>
			</Row>
    </Container>
  </main>
);

export default Home;
