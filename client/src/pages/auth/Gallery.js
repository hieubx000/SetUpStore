import React from "react";
import { Image, Skeleton, List, Card } from "antd";
import axios from "axios";

function Gallery() {
  const [photos, setPhotos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const accessKey = "uCQCPXNFMbJKFb4xJjlnd8Yiuz03HBIoGMGhK1SCZ8c";
  const getPhotos = async () =>
    await axios.get(`https://api.unsplash.com/photos/random?client_id=${accessKey}&orientation=landscape&query=setup%20desk&count=9`);

  React.useEffect(() => {
    setLoading(true);
    const loadPhotos = () =>
      getPhotos().then((p) => {
        setPhotos(p.data);
        setLoading(false);
      });
    loadPhotos();
  }, []);

  return (
    <>
      {loading ? (
        <List
          grid={{ gutter: [24, 24], column: 3 }}
          dataSource={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          rowKey={(item) => item}
          renderItem={(item) => (
            <List.Item key={item} style={{ margin: 0 }}>
              <Card>
                <Skeleton active></Skeleton>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <List
          id="gallery"
          grid={{ gutter: 24, column: 3 }}
          dataSource={photos}
          rowKey={(item) => item.id}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Image width={"100%"} height={"100%"} src={item.urls.regular} alt={item.id} />
            </List.Item>
          )}
        />
      )}
    </>
  );
}

export default Gallery;
