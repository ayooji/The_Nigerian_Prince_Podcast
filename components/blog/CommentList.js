import {
  Card,
  Col,
  Image,
  Text,
  Grid,
  Row,
  Avatar,
  Spacer,
} from "@nextui-org/react";

const CommentList = ({ comments }) => {
  return (
    <Grid.Container gap={2} justify="center">
      <Spacer y={1} />

      <Grid.Container justify="center">
        <Text
          h1
          size={55}
          css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}
          weight="bold"
        >
          Comments
        </Text>
      </Grid.Container>

      <Spacer y={1} />

      {comments.map((comment) => (
        <Grid xs={12} sm={4} key={comment.id}>
          <Card
            css={{
              p: "10",
              backgroundColor: "$black",
              borderRadius: "16px",
              padding: "16px",
              fontFamily: "sans-serif",
              fontSize: "16px",
              lineHeight: "1.5",
              color: "#333",
              mw: "330px",
              background: "linear-gradient(to bottom right, $black, #1B1464)",
              transition:
                "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              },
              borderImage:
                "linear-gradient(to bottom left, transparent, $green700) 10",
            }}
          >
            <Card.Body css={{ d: "flex", flexDirection: "column" }}>
              <Row css={{ ai: "center" }}>
                <Avatar
                  src={comment.profiles.image_url}
                  css={{ size: "60px" }}
                  bordered
                  zoomed
                  color="gradient"
                />
                <Spacer x={0.5} />
                <Col>
                  <Text b size={18}>
                    {comment.profiles.name}
                  </Text>
                  <Text
                    color="#787F85"
                    size={12}
                  >
                    {new Date(comment.created_at).toLocaleString()}
                  </Text>
                </Col>
              </Row>
              <Text size={15} css={{ my: "$6" }}>
                {comment.content}
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
};

export default CommentList;
