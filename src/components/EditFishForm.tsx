import React from 'react';
import PropTypes from 'prop-types';

const EditFishForm = ({ updateFish, deleteFish, index, fish }) => {
  const handleChange = event => {
    // update that fish
    const updatedFish = { ...fish, [event.currentTarget.name]: event.currentTarget.value };
    updateFish(index, updatedFish);
  };

  return (
    <div className="fish-edit">
      <input type="text" name="name" onChange={handleChange} value={fish.name} />
      <input type="text" name="price" onChange={handleChange} value={fish.price} />
      <select type="text" name="status" onChange={handleChange} value={fish.status}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea name="desc" onChange={handleChange} value={fish.desc} />
      <input type="text" name="image" onChange={handleChange} value={fish.image} />
      <button onClick={() => deleteFish(index)}>Remove Fish</button>
    </div>
  );
};

EditFishForm.propTypes = {
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  index: PropTypes.string,
  fish: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    status: PropTypes.string,
    desc: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default EditFishForm;
