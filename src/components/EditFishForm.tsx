import type { SyntheticEvent } from "react";

import type { EditFishFormProps } from "../types";

function EditFishForm({ updateFish, deleteFish, index, fish }: EditFishFormProps) {
  function handleChange(event: SyntheticEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const updatedFish = { ...fish, [event.currentTarget.name]: event.currentTarget.value };
    updateFish(index, updatedFish);
  }

  function handleClick() {
    deleteFish(index);
  }

  return (
    <div className="fish-edit">
      <input type="text" name="name" onChange={handleChange} value={fish.name} />
      <input type="text" name="price" onChange={handleChange} value={fish.price} />
      <select name="status" onBlur={handleChange} value={fish.status}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea name="desc" onChange={handleChange} value={fish.desc} />
      <input type="text" name="image" onChange={handleChange} value={fish.image} />
      <button type="button" onClick={handleClick}>
        Remove Fish
      </button>
    </div>
  );
}

export default EditFishForm;
