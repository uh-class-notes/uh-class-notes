import { Container, Row, Col } from "react-bootstrap";

const Home = () => (
	<main className="py-3">
		<Container fluid>
			<Row className="mb-5">
        <Col xs={2}>
        </Col>
        <Col xs={10} className="text-center">
        	<h1 >NOTES</h1>
        </Col>
      </Row>
			<Row className="px-0 g-0">
				<Col xs={2}>
					<input type="text" placeholder="Search classes..." className="form-control mb-4" />
					<h4 className="pt-2">Sort By:</h4>
					<select className="form-control mb-4">
						<option>Fall 2026</option>
						<option>Spring 2026</option>
						<option>Fall 2025</option>
					</select>
					<input type="text" placeholder="Search by professor..." className="form-control mb-4" />
					<input type="checkbox" className="form-check-input mb-4" />
					<label className="form-check-label">Bookmarked</label>
        </Col>
        <Col xs={10} className="text-left">
        </Col>
			</Row>
		</Container>
	</main>
)

export default Home;