import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProjectForm({
  _id,
  Title: existingTitle,
  Description: existingDescription,
  Price: existingPrice,
  Images: existingImages,
  // category: assignedCategory,
}) {
  const [Title, setTitle] = useState(existingTitle || '');
  const [Description, setDescription] = useState(existingDescription || '');
  // const [category, setCategory] = useState(assignedCategory || '');
  const [Price, setPrice] = useState(existingPrice || '');
  const [Images, setImages] = useState(existingImages || []);
  const [goToProjects, setGoToProjects] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // const [categories, setCategories] = useState([]);
  const router = useRouter();

  // useEffect(() => {
  //   axios.get('/api/categories').then(result => {
  //     setCategories(result.data);
  //   });
  // }, []);

  async function saveProject(ev) {
    ev.preventDefault();
    const data = { Title, Description, Price, Images };
    if (_id) {
      // Update
      await axios.put('/api/projects', { ...data, _id });
    } else {
      // Create
      await axios.post('/api/projects', data);
    }
    setGoToProjects(true);
  }

  if (goToProjects) {
    router.push('/projects');
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      setImages(oldImages => [...oldImages, ...res.data.links]);
      setIsUploading(false);
    }
  }

  function updateImagesOrder(newImages) {
    setImages(newImages);
  }

  return (
    <form onSubmit={saveProject}>
      <label>Project Name</label>
      <input
        type="text"
        placeholder="Project name"
        value={Title}
        onChange={ev => setTitle(ev.target.value)}
      />
      <label>Category</label>
      {/* <select value={category} onChange={ev => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 && categories.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select> */}
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          className="flex flex-wrap gap-1"
          list={Images}
          setList={updateImagesOrder}
        >
          {!!Images?.length && Images.map(link => (
            <div key={link} className="h-24 bg-white p-3 shadow-md rounded-sm border border-gray-200">
              <img src={link} alt="" className="rounded-lg" />
            </div>
          ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 p-1 flex items-center">
            <Spinner />
          </div>
        )}
        <label className="cursor-pointer w-24 h-24 text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-md border border-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          <div>Add Image</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>
      <label>Description</label>
      <textarea
        placeholder="Description"
        value={Description}
        onChange={ev => setDescription(ev.target.value)}
        rows={5} // Adjust the height of the textarea
        className="textarea"
      />
      <label>Price (CAD)</label>
      <input
        type="number"
        placeholder="Price"
        value={Price}
        onChange={ev => setPrice(ev.target.value)}
      />
      <button type="submit" className="btn-primary">Save</button>
    </form>
  );
}
