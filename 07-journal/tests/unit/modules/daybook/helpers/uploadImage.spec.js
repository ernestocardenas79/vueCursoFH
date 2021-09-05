import axios from "axios";
import cloudinary from "cloudinary";

import uploadImage from "@/modules/daybook/helpers/uploadImage";

cloudinary.config({
  cloud_name: "dtqw2ohcj",
  api_key: 911898931497539,
  api_secret: "r9s5-aYQwZ_9nlOR5ENESS58Ii4",
});

describe("Pruebas en el uploadImage", () => {
  test("debe de cargar un archivo y retornar el url", async (done) => {
    const { data } = await axios.get(
      "https://res.cloudinary.com/dtqw2ohcj/image/upload/v1630518328/vezc0ylsf5iesoc8p0nl.jpg",
      {
        responseType: "arraybuffer",
      }
    );
    const file = new File([data], "foto.jpg");

    const url = await uploadImage(file);

    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");

    cloudinary.v2.api.delete_resources(imageId, {}, done);
  });
});
