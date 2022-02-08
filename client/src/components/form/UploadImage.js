import React from "react";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";

import { uploadImage, removeImage } from "../../functions/cloudinary";

import { toast } from "react-toastify";
import { Form, Upload } from "antd";

import { AiOutlineInbox } from "react-icons/ai";
function UploadImage({ form, setLoading, imagesList = [] }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    if (imagesList.length > 0) {
      setImages(imagesList);
      form.setFieldsValue({ images: imagesList });
    }
  }, [form, imagesList]);

  const fileUploadAndResize = ({ file, fileList }) => {
    if (file.status !== "removed") {
      let allUploadedFiles = images;
      if (fileList.length > 0) {
        Resizer.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            setLoading(true);
            uploadImage(uri, user ? user.token : "")
              .then((res) => {
                // console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setImages([...allUploadedFiles]);
                form.setFieldsValue({ images: allUploadedFiles });
                toast.success("Uploaded successfully");
              })
              .catch((err) => {
                setLoading(false);
                // console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    // console.log("remove image", public_id);
    removeImage(public_id, user ? user.token : "")
      .then((res) => {
        setLoading(false);
        let filteredImages = images.filter((item) => item.public_id !== public_id);
        setImages(filteredImages);
        form.setFieldsValue({ images: filteredImages });
        toast.error("Removed successfully");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <Form.Item name="images" noStyle>
      <Upload.Dragger
        multiple={true}
        maxCount={6}
        fileList={[...images]}
        listType="picture-card"
        beforeUpload={() => false}
        onChange={fileUploadAndResize}
        onRemove={({ public_id }) => handleImageRemove(public_id)}
      >
        <p className="ant-upload-drag-icon">
          <AiOutlineInbox size={45} />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
      </Upload.Dragger>
    </Form.Item>
  );
}

export default UploadImage;
