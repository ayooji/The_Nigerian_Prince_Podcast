import { Card, Col, Image, Spacer, Text, Grid } from "@nextui-org/react";



const CommentList = ({ comments }) => {
  return (
    <Grid.Container gap={2} justify="center">
      <Spacer y={1} />
      <Grid.Container justify="center">
        <Text
          h1
          size={55}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          Comments
        </Text>
      </Grid.Container>
      <Spacer y={1} />
      <Grid md={8}>
        {comments.map((comment) => (
         <Card
         key={comment.id}
         variant="bordered"
         isHoverable
         style={{ margin: "10px" }}
         css={{
           backgroundColor: "$black",
           borderRadius: "16px",
           padding: "16px",
           fontFamily: "sans-serif",
           fontSize: "16px",
           lineHeight: "1.5",
           color: "#333",
           transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
           "&:hover": {
             transform: "translateY(-5px)",
             boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
           },
           borderImage: "linear-gradient(to bottom left, transparent, $green700) 10",
         }}
       >
            <Card.Body>
              <Text>{comment.content}</Text>
              <Spacer y={1} />
              <Text
                h5
                b
                css={{
                  textGradient: "45deg, $green700 -20%, $black 50%",
                }}
              >
                {comment.name}
              </Text>

              <Text h6>
                <span>{new Date(comment.created_at).toLocaleString()}</span>
              </Text>
            </Card.Body>
          </Card>
        ))}
      </Grid>
    </Grid.Container>
  );
};

export default CommentList;
