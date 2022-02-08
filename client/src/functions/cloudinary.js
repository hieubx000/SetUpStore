import axios from "axios";

export const uploadImage = async (uri, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/uploadimages`,
    { image: uri },
    {
      headers: {
        authtoken,
      },
    }
  );
export const removeImage = async (public_id, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/removeimage`,
    { public_id },
    {
      headers: {
        authtoken,
      },
    }
  );
