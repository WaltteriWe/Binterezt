import {ChangeEvent, useState} from 'react';
import { useFile, useMedia } from '../Hooks/apiHooks';
import { useForm } from '../Hooks/formHooks';


const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState('');
  const [file, setFile] = useState<File | null>(null);
  //const navigate = useNavigate();
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const initValues = {
    title: '',
    description: '',
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    setUploading(true);

    console.log(inputs);
    try {
      const token = localStorage.getItem('token');
      if (!file || !token) {
        return;
      }
      // upload the file to fileserver and post metadata to media api server
      const fileResult = await postFile(file, token);
      await postMedia(fileResult, inputs, token);

      // redirect to Home
      //navigate('/');

      // OR notify user & clear inputs
      setUploadResult('Media file uploaded!');
      resetForm();
    } catch (e) {
      console.log((e as Error).message);
      setUploadResult((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doUpload,
    initValues,
  );

  const resetForm = () => {
    setInputs(initValues);
    setFile(null);
  };

  return (
    <>
    <div className='flex flex-col items-center justify-center '>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input className='m-4 p-4 rounded-lg bg-black'
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
          className='m-4 p-4 rounded-lg bg-black'
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input className='m-4 p-4 rounded-lg bg-black'
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            // TODO: reset filename in form
          />
        </div>
        <img
        className='flex justify-center items-center'
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://place-hold.it/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
        className="bg-black rounded-lg p-4 m-4 flex-col"
          type="submit"
          disabled={
            file && inputs.title.length > 3 && inputs.description.length > 0
              ? false
              : true
          }
        >
          {uploading ? 'Uploading..' : 'Upload'}
        </button>
        <button className="bg-black rounded-lg p-4 m-4 flex-col" type="reset" onClick={resetForm}>
          Reset
        </button>
        <p>{uploadResult}</p>
      </form> </div>

    </>
  );
};

export default Upload;