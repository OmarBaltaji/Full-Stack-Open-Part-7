import React from "react";
import { useQuery } from "react-query";
import { getAll } from "../services/users";
import { Link } from "react-router-dom";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";

const Users = () => {
  const { isError, isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: getAll,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (isError) {
    return <div>An error has occurred: {error.message}</div>
  }

  return (
    <Container>
      <Row className="align-items-center mb-3">
        <Col xs={2}>
          <h2>Users</h2>
        </Col>
        <Col xs={3}>
          <h2>Blogs created</h2>
        </Col>
      </Row>
      <ListGroup>
        {data.map(user =>
          <ListGroupItem key={user.id} className="p-3">
            <Row className="align-items-center">
              <Col xs={2}>
                <Link to={`/users/${user.id}`} state={user}>{user.name}</Link>
              </Col>
              <Col xs={3} className="ps-0">
                <span>{user.blogs.length}</span>
              </Col>
            </Row>
          </ListGroupItem>
        )}
      </ListGroup>
    </Container>
  )
}

export default Users;