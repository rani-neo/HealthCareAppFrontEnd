// const S3_BUCKET_NAME = "react-demo3";

// const REGION = "ap-southeast-2";

// const ACCESS_KEY = "AKIA2KXZ3CMIJ5HUPATA";

// const SECRET_KEY = "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";




import React, { useState } from "react";

import AWS from "aws-sdk";




const S3Uploader: React.FC = () => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);




  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files && event.target.files[0];

    setSelectedFile(file || null);

  };




  const handleUpload = () => {

    if (!selectedFile) return;




    const s3 = new AWS.S3({

      accessKeyId: "AAKIA2KXZ3CMIJ5HUPATA",

      secretAccessKey: "+n591mEFOqbBOdWoA4fmsDr+9EohjDYd6CAn8/xj",

      region: "ap-southeast-2",

    });




    const uploadParams = {

      Bucket: "react-demo3",

      Key: selectedFile.name,

      Body: selectedFile,

    };




    s3.upload(

      uploadParams,

      (err: Error, data: AWS.S3.ManagedUpload.SendData) => {

        if (err) {

          console.error("Error uploading file:", err);

        } else {

          console.log("File uploaded successfully. Location:", data.Location);

        }

      }

    );

  };




  return (

    <div>

      <input type="file" onChange={handleFileChange} />

      <button onClick={handleUpload}>Upload</button>

    </div>

  );

};




export default S3Uploader;